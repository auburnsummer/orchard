# a: submission method
# b: 

plan = plpy.prepare("""
select i.iid, j.proposed_iid
from orchard.aux as i
full outer join unnest($1) as j(proposed_iid)
on i.iid = j.proposed_iid
where i.iid is null
or j.proposed_iid is null;
""", ["text[]"]);
return plpy.execute(plan, [iids])