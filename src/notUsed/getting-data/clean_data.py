# not so much clean data as turn it into a useable form in a js app
# which means normalizing everything to percent and converting it to json
import csv
import json
import pprint as pp

data = []
csv_path = "extracted_chars.csv"
with open(csv_path, "r") as csv_file:
    reader = csv.DictReader(csv_file)
    for row in reader:
        data.append(row)

# convert count to numeric and add the count to a big list to be maxed
counts = []
for rowIdx in range(len(data)):
    data[rowIdx]["count"] = int(data[rowIdx]["count"])
    counts.append(data[rowIdx]["count"])

max_count = max(counts)

# normalize the data to 0 to 1
normalized_data = []
for row in data:
    normalized_data.append({"char": row["char"], "frequency": row["count"] / max_count})

normalized_data = sorted(normalized_data, key=lambda x: x["frequency"], reverse=True) # sorts it, which is nice

pp.pp(normalized_data)

json_path = "norm_data.json"
with open(json_path, "w") as json_file:
    json_file.write(json.dumps(normalized_data, indent=4))