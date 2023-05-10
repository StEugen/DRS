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
gets: [comment, user optional] <br>
returns: <br>
description: used for creating comments <br>
<br>
route: api/comments/:id/delete <br>
method: DELETE <br>
gets: [id] <br>
returns: 200 <br>
description: used to delete comments by their id <br>
<br>
route: api/hardwarelist/ <br>
method: GET <br>
gets: [] <br>
returns: 
<pre>
[
    {
        "id": id,
        "hardware_name": hardware_name,
        "hardware_number": hardware_number,
        "comment": null or comment,
        "cabinet": id of cabinet
    }
]
</pre>
description: used to get list of hardware <br>
<br>
route: api/facultylist/ <br>
method: GET <br>
gets: [] <br>
returns:
<pre>
[
    {
        "id": id,
        "name": name of faculty
    }
]
</pre>
description: used to get list of faculties <br>
<br>
route: api/cabinetslist/ <br>
method: GET <br>
gets: [] <br>
returns:
<pre>
[
    {
        "id": id,
        "cabinet": "cabinetNumber",
        "faculty": id of faculty cabinet belongs to
    }
]
</pre>
description: used to get list of cabinets



