


plan = plpy.prepare("""
select i.iid, i.recycle_bin, j.proposed_iid
from orchard.aux as i
full outer join unnest($1) as j(proposed_iid)
on i.iid = j.proposed_iid
where (i.iid is null or j.proposed_iid is null)
and (i.submission_method = $2 or i.submission_method is null);
""", ["text[]", "text"]);
return plpy.execute(plan, [iids, method])