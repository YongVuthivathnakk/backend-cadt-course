## Q1 - Why is separating concerns (routes, controllers, models, middleware) important in backend development?
Because it makes the code more organized, readable, and maintainable, with each part having its own responsibility.

## Q2 - What challenges did you face when refactoring the monolithic server.js into multiple files?
The main challenges were deciding what code belongs in each folder, managing imports and exports, and making sure the different files work together correctly.

## Q3 - How does moving business logic into controllers improve the readability and testability of your code?
Because it keeps the route simple to manage. Moreover, all the logic inside the route will be hard to maintain when the project grows, so it is better to connect the route to a controller.

## Q4. - If this project were to grow to support authentication, database integration, and logging, how would this folder structure help manage that growth?
Using this structure makes it easier to add new features without making ``server.js`` too large.