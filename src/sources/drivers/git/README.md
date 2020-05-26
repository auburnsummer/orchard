# git

Driver that gets rdzips from a specified Git repository. The driver scans the
specified repository for files ending with `.rdzip`. The SHA-1 object ID of 
each file is used as the iid.

## Arguments

`cloneURL`: the URL of the git repository to be cloned. Should end in `.git`.