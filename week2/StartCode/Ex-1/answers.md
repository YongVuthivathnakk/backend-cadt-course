## Q1 – What error message do you see in the terminal when you access http://localhost:3000? What line of code causes it?

> The error message: res.end() is not a function

The main cause is from the line ``return res.endd();``

## Q2 – What is the purpose of ``res.write()`` and how is it different from ``res.end()``?

+ ``res.write()``   : is used to send pices data to client.
+ ``res.end()``     : signals to the server that the response headers and body are complete, closing the connection.

## Q3 – What do you think will happen if res.end() is not called at all?
+ The request will keep loading because the server does not complete the response.

## Q4 – Why do we use ``http.createServer()`` instead of just calling a function directly?
+ Becasue it gives Node.js a function to run later, whenever a client sends a request.
+ When calling function directly Node.js will run one time only.

## Q5 - How can the server be made more resilient to such errors during development?

+ It can be done by adding error handling so one error does not stop the entire server.