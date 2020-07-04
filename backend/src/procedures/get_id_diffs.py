import json


plan = plpy.prepare("""
select i.submission_iid, k.recycle_bin, j.proposed_iid
from orchard.level as i
left join orchard.aux as k on i.sha256 = k.sha256
full outer join unnest($1) as j(proposed_iid)
on i.submission_iid = j.proposed_iid
where (i.submission_method = $2 or i.submission_method is null)
and (
    (i.submission_iid is null or j.proposed_iid is null)
    or (i.submission_iid = j.proposed_iid and k.recycle_bin)
);
""", ["text[]", "text"]);
result = plpy.execute(plan, [iids, method])

d = []
for row in result:
    d.append(row)

return json.dumps(d)