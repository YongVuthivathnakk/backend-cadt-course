## Q1 - Why do we `listen` for data and `end` events when handling POST?

- We `listen` because the POST body can arrive in multiple chunks. Moreover, `data` collects each chunk, and `end` tells us that the full request body has arrived.

## Q2 - What would happen if we didn’t buffer the body correctly?

- The data won't be received correctly, which will lead to incorrect or incomplete values.

## Q3 - What is the format of form submissions when using the default browser form POST?

- For a normal HTML form, the default format is:
> ``application/x-www-form-urlencoded``
- Example:
> ``name=John&email=john%40example.com``

## Q4 - Why do we use fs.appendFile instead of fs.writeFile?

- ``fs.appendFile()`` adds new data to the end of the file without removing previous submissions.
- ``fs.writeFile()`` can overwrite the existing contents.

## Q5 - How could this be improved or made more secure?
- We could add try...catch for error handling, limit body size, check the ``Content-Type``, and reject empty or invalid input.