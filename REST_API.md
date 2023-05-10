# Description of api

All api routes start with api/ <br>
route: api/ <br>
description: starting point for api routes.<br>
<br>
route: api/login/ <br>
method: POST <br>
gets: [username, password] <br>
returns: {access_token: token}, status 200 <br>
if fails: status 401 <br>
description: login route (it's obvious) <br>
<br>
route: api/comments/ <br>
method: GET <br>
gets: [] <br>
returns: 
<pre>
[
    {
        "id": id,
        "text": text,
        "created_at": date,
        "user": null or user
    }
]
</pre>
description: this route is used to retrieve list of comments <br>
<br>
route: api/comments/create <br> 
method: POST <br>


