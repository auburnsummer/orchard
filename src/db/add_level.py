import json

# a is a string argument of json from postgres
parsed_dict = json.loads(a)

# parse the dict
level = parsed_dict['level']
aux = parsed_dict['aux']
tags = parsed_dict['tags']
authors = parsed_dict['authors']

"""
Given a table name, return a dict mapping column names to their types
"""
def get_table_columns_and_types(table_name):
    plan = plpy.prepare("select column_name, data_type from information_schema.columns where table_name = $1 and table_schema = 'orchard'", ["text"])
    result = plpy.execute(plan, [table_name])
    d = {}
    for row in result:
        d[row["column_name"]] = row["data_type"]
    
    return d

"""
Given a table name and a dictionary of values to put in that table, insert those things
"""
def do_the_insert(table_name, the_dict):
    column_type_map = get_table_columns_and_types(table_name)

    # names of the columns we're adding
    column_names = list(the_dict.keys())
    column_types = [ column_type_map[key] for key in column_names ]
    placeholders = [ "$" + str(i+1) for i in range(len(column_names)) ]

    plan_str = """
    INSERT INTO {0} ({1}) VALUES ({2})
    """.format(table_name, ",".join(column_names), ",".join(placeholders))
    plan = plpy.prepare(plan_str, column_types)

    values = [ the_dict[s] for s in column_names ]
    return plpy.execute(plan, values)

plpy.log("Hello World!")

try:
    with plpy.subtransaction():
        do_the_insert('level', level)
        do_the_insert('aux', aux)
        for idx, tag in enumerate(tags):
            do_the_insert('level_tag', {
                'sha256': level['sha256'],
                'tag' : tag,
                'seq' : idx
            })
        for idx, author in enumerate(authors):
            do_the_insert('level_author', {
                'sha256': level['sha256'],
                'author' : author,
                'seq' : idx
            })
except e:
    plpy.log("Error!")
    plpy.log(str(e))
    return False
else:
    return True