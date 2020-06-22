import json


plan = plpy.prepare("""
select i.iid, i.recycle_bin, j.proposed_iid
from orchard.aux as i
full outer join unnest($1) as j(proposed_iid)
on i.iid = j.proposed_iid
where (i.submission_method = $2 or i.submission_method is null)
and (
    (i.iid is null or j.proposed_iid is null)
    or (i.iid = j.proposed_iid and i.recycle_bin)
);
""", ["text[]", "text"]);
result = plpy.execute(plan, [iids, method])

d = []
for row in result:
    d.append(row)

return json.dumps(d)