import json

# a is a string argument of json from postgres
parsed_dict = json.loads(a)

# parse the dict
level = parsed_dict['level']
aux = parsed_dict['aux']
tags = parsed_dict['tags']
authors = parsed_dict['authors']

"""
Given a schema-qualified table name, return a dict mapping column names to their types
"""
def get_table_columns_and_types(table_name):
    tokens = table_name.split(".")
    table = tokens[1]
    schema = tokens[0]

    plan = plpy.prepare("""
    SELECT column_name, data_type, character_maximum_length FROM information_schema.columns
    WHERE table_name = $1 AND table_schema = $2
    """, ["text", "text"])
    result = plpy.execute(plan, [table, schema])

    d = {}
    for row in result:
        column_name = row['column_name']
        data_type = row['data_type']
        if (data_type == 'character'):
            data_type = f'{data_type}({row["character_maximum_length"]})'
        
        d[column_name] = data_type
    
    return d

def insert_dict_into_table(table_name, the_dict):
    column_map = get_table_columns_and_types(table_name)

    column_names = list(the_dict.keys())
    column_types = [ column_map[name] for name in column_names ]
    placeholders = [ f'${i+1}' for i in range(len(column_names)) ]
    values = [ the_dict[key] for key in column_names ]

    plan_string = f"""
    INSERT INTO {table_name} ({','.join(column_names)}) VALUES ({','.join(placeholders)})
    """
    plan = plpy.prepare(plan_string, column_types)
    return plan.execute(values)

plpy.log("Hello World!")

try:
	with plpy.subtransaction():
		insert_dict_into_table('orchard.level', level)
		insert_dict_into_table('orchard.aux', aux)
		for idx, tag in enumerate(tags):
			insert_dict_into_table('orchard.level_tag', {
				'sha256': level['sha256'],
				'tag' : tag,
				'seq' : idx
			})
		for idx, author in enumerate(authors):
			insert_dict_into_table('orchard.level_author', {
				'sha256': level['sha256'],
				'author' : author,
				'seq' : idx
			})
except Exception as e:
	plpy.log("Error!")
	plpy.log(str(e))
	raise
else:
	return True