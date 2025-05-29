import csv

# read the file
data = []
csv_path = "passwords.csv"
with open(csv_path, "r") as csv_file:
    reader = csv.reader(csv_file)
    for row in reader:
        data.append({"password": row[0], "count": int(row[1])})

print(data)


# get number each char in each password
LOWERCASE_CHARS = "`1234567890-=qwertyuiop[]asdfghjkl;'zxcvbnm,./"
UPPERCASE_CHARS = '~!@#$%^&*()_+QWERTYUIOP{}ASDFGHJKL:"ZXCVBNM<>?'
chars = {"SHIFT":0} # we're just gonna initialize the dict with a shift key because
for entry in data:
    for char in entry["password"]:
        char_to_add = char
        if char not in LOWERCASE_CHARS:
            # loop through to find which key it is
            for idx in range(len(UPPERCASE_CHARS)):
                if UPPERCASE_CHARS[idx] == char:
                    char_to_add = LOWERCASE_CHARS[idx]
                    chars["SHIFT"] += entry["count"]

        if char_to_add in chars.keys():
            chars[char_to_add] += entry["count"]
        else:
            chars[char_to_add] = entry["count"]

# write to csv
csv_path = "extracted_chars.csv"
open(csv_path, "w").close() # clear the file
with open(csv_path, "a") as csv_file:
    writer = csv.writer(csv_file)
    writer.writerow(["char", "count"])
    for char in chars.keys():
        line = [char, chars[char]] # this is terrible
        writer.writerow(line)