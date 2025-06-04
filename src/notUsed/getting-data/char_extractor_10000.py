import pprint as pp

path = "/Users/dilyeh/Documents/10th Grade/Semester 2/DataScience/MA2/ma2-vis/ma2-vis-react/src/notUsed/getting-data/Pwdb_top-10000.txt"

passwords = []
chars = []

with open(path, "r") as file:
    for line in file:
        passwords.append(line.strip()) # strip removes the \n or other whitespace

pp.pp(passwords)

