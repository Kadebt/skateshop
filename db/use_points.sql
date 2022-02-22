UPDATE users
set points = $2
where id = $1
returning id, email, points, username;