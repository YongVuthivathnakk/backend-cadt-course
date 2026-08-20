
## Q1 - How do sub-resource routes (e.g., /journalists/:id/articles) improve the organization and clarity of your API?
It shows the relationship between both resources.


## Q2 - What are the pros and cons of using in-memory dummy data instead of a real database during development?
### Pros
- Easy to set up and use.
- No database configuration is required.
- Good for learning and testing API logic.
- Fast
### Cons
- Data is lost when the server restarts.
- Not suitable for large amounts of data.
- Cannot easily support multiple users or servers.
- Does not provide the features of a real database.

## Q3 - How would you modify the current structure if you needed to add user authentication for journalists to manage only their own articles?
I would add auth middleware to authenticate the user.


## Q4 - What challenges did you face when linking related resources (e.g., matching journalistId in articles), and how did you resolve them?
The challenge is matching the id and it can be solved by using ``filter()`` function to find article to match ``journalistId``


## Q5 - If your API were connected to a front-end application, how would RESTful design help the frontend developer understand how to interact with your API?
RESTful design gives the frontend developer clear and predictable endpoints.