## Q1 - What happens when you visit a URL that doesn’t match any of the three defined?

+ It will return Not Found 404 message

## Q2 - Why do we check both the req.url and req.method?

+ Because same url can do many different things depends on the method such as GET, POST, DELETE, or PUT.

## Q3 - What MIME type (Content-Type) do you set when returning HTML instead of plain text?

+ For HTML I use:
> ``"Content-Type : text/html"``


## Q4 - How might this routing logic become harder to manage as routes grow?

+ As routes grow, the routing logic becomes large and difficult to maintain.

## Q5 - What benefits might a framework offer to simplify this logic?

+ Frameworks like Express use separate route handlers to keep the code organized.