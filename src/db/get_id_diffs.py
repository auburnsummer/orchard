# a: submission method
# b: 

plan = plpy.prepare("""
select (i.iid) from unnest($1) as i(iid);
""", ["text[]"]);
return plpy.execute(plan, [iids])