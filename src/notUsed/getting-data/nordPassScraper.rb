require 'ferrum'
require 'csv'

# do the scraping
browser = Ferrum::Browser.new(headless:false)

browser.goto("https://nordpass.com/most-common-passwords-list/")

sleep(1)

magic_number = 1
passwords = [] # di
for idx in 1..200 do
    # the xpath template was unreasonably difficult to find because when you scroll in the website, random DOM bloat appears
    password_xpath = "/html/body/div[1]/div/div/main/div/div[3]/section/div/div[1]/div/div/div/div[3]/div[2]/div[#{idx}]/div[2]"
    count_xpath = "/html/body/div[1]/div/div/main/div/div[3]/section/div/div[1]/div/div/div/div[3]/div[2]/div[#{idx}]/div[4]"

    #entry = Hash.new
    #entry["password"] = browser.at_xpath(password_xpath).text
    #entry["count"] = browser.at_xpath(count_xpath).text
    entry = [
        browser.at_xpath(password_xpath).text,
        Integer(browser.at_xpath(count_xpath).text.gsub(",", ""))]
    passwords << entry
end

browser.quit


# write to csv
csv_path = "passwords.csv"
CSV.open(csv_path, "wb") do |csv|
    for row in passwords
        csv << row
    end
end
puts passwords