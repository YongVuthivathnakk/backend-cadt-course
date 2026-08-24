# Reflective Questions

## Q1 - How do sub-resource routes like /journalists/:id/articles help in designing a clear and organized API?
For the api routes like it shows the relationships between resources.
-  Benifits
    - Shows relationships clearly
    - Easy to understand
    - Make fronend integration more easier

## Q2 - What challenges did you face when managing multiple filter states (journalist and category) in React?
The challenges is to create and manage multiple stats such as ``jornalistId`` and ``categoryId``.
I handled this by keeping each filter in its own state and checking their values before making the API request.

## Q3 - What would be the advantages and disadvantages of handling the filter entirely on the frontend versus using API-based filtering?
Client-side Filtering
- Advantages:
    - Simple to implement for small datasets.
    - Filtering feels fast because the data is already loaded.
    - Reduces the number of API requests.

- Disadvantages:

    - The frontend must download all data first.
    - Can become slow when there are many articles.
    - Uses more browser memory.
    - May expose data that the user does not need to see.

Server-side Filtering
- Advantages:
    - Only the required data is sent to the frontend.
    - Better for large datasets. 
    - Reduces frontend memory and processing.
    - Can work efficiently with database queries.
    - Better for access control and sensitive data.

- Disadvantages:
    - Requires an API request whenever the filters change.
    - Backend filtering logic is more complex.
    - Depends on network performance.

## Q4 - If you needed to allow filtering by both journalist and category at the same time on the backend, how would you modify the API structure?
I would keep the existing route ``GET /articles`` and add query params for both filters 
Example: 
`` GET /articles?journalistId=1&categoryId=2``