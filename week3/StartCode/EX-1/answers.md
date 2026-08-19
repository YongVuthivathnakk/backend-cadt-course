## Q1 – What challenges did you face when using the native http module that Express.js helped you solve?

With the native http module, we had to manually handle routing, request methods, request bodies, and responses. As the application grew, the code became longer and harder to manage.

Express makes these common backend tasks simpler and keeps the code more organized.

## Q2 – How does Express simplify route handling compared to the native HTTP server?

It have `get` function for listen provided route rather that using if else conditions.

With node js:
```js
if (url === '/contact' && method === 'GET') {
    // ...
}

if (url === '/contact' && method === 'POST') {
    // ...
}
```

With Express js:
```js
app.get('/contact', (req, res) => {
    // ...
});

app.post('/contact', (req, res) => {
    // ...
});
```

## Q3 – What does middleware mean in Express, and how would you replicate similar behavior using the native module?

Middleware is code that processes a request before it reaches the final route handler. Express provides an easy way to reuse this processing across many routes.