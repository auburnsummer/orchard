import json

# a is a string argument of json from postgres
d = json.loads(a)

# parse the dict
return d['test']