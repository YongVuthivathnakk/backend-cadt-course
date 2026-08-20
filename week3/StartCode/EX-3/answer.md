# Middleware & Architecture

## Q1 - What are the advantages of using middleware in an Express application?

The advantage is that we can handle common tasks separately from our route logic, which makes the route more organized and easier to maintain.

## Q2 - How does separating middleware into dedicated files improve the maintainability of your code?

It keeps the main server file smaller and easier to understand. Each middleware can have its own responsibility and can be modified or tested independently without affecting the route logic.

## Q3 - If you had to scale this API to support user roles (e.g., admin vs student), how would you modify the middleware structure?

I would create authentication and authorization middleware separately.
Authentication verifies who the user is, and authorization checks what the user is allowed to do.

# Query Handling & Filtering

## Q4 - How would you handle cases where multiple query parameters conflict or are ambiguous (e.g., minCredits=4 and maxCredits=3)?

I would create a separate middleware to validate before filtering the course.

## Q5 - What would be a good strategy to make the course filtering more user-friendly (e.g., handling typos in query parameters like “falll” or “dr. smtih”)?

To make it a good strategy, I would convert the value to lowercase, trim spaces, and possibly use fuzzy matching for things like instructor names.

# Security & Validation

## Q6 - What are the limitations of using a query parameter for authentication (e.g., ?token=xyz123)? What alternatives would be more secure?

Using token as a query in the url is not safe which it can appear in the browser history and server logs. A more secure approach is to send the token in an HTTP header.

## Q7 - Why is it important to validate and sanitize query inputs before using them in your backend logic?

Because users can send unexpected or malicious input to the API. Validation ensures the input has the expected type and format before we use it.

# Abstraction & Reusability

## Q8 - Can any of the middleware you wrote be reused in other projects? If so, how would you package and document it?

Yes. Middleware such as logging, authentication, error handling, and validation can be reused in many Express applications.
For a larger project, middleware could be packaged as an npm package with documentation explaining installation, configuration, and usage.

## Q9 - How could you design your route and middleware system to support future filters (e.g., course format, time slot)?

I would keep each filter independent rather than putting all the logic into one large condition.

# Bonus – Real-World Thinking

## 10. How would this API behave under high traffic? What improvements would you need to make for production readiness (e.g., rate limiting, caching)?

The basic API could handle requests, but under high traffic the server and file-based data could become a problem.

For production, I would consider:

- Rate limiting to prevent abuse.
- Caching for frequently requested courses.
- A proper database instead of an in-memory array.
- Input validation and authentication.
- Load balancing across multiple server instances.
- Logging and monitoring to detect errors and performance issues.
- Using HTTPS to protect data in transit.
