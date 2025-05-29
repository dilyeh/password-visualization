import csv
import pprint as pp

csv_path = "extracted_chars.csv"
data = []
with open(csv_path, "r") as csv_file:
    reader = csv.DictReader(csv_file)
    for row in reader:
        data.append(row)

# turn count into numeric
for idx in range(len(data)):
    data[idx]["count"] = int(data[idx]["count"]) / 100000

#print(data)
sorted_data = sorted(data, key=lambda x: x["count"])
pp.pp(sorted_data)