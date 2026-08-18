// server.js
const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  console.log(`Received ${method} request for ${url}`);

  switch (`${url} ${method}`) {
    case "/ GET":
      res.writeHead(200, { "Content-Type": "text/html" });
      return res.end(`
            <html>
                <head><title>Home</title></head>
                <body>
                    <h1>Welcome to the Home Page</h1>
                    <p>This is a simple Node.js server.</p>
                </body>
            </html>
        `);
      break;
    case "/about GET":
      res.writeHead(200, { "Content-Type": "text/html" });
      return res.end(`
            <html>
                <head><title>About</title></head>
                <body>
                    <h1>Welcome to the About Page</h1>
                    <p>This is a simple Node.js server.</p>
                </body>
            </html>
            `);
      break;
    case "/contact-us GET":
      res.writeHead(200, { "Content-Type": "text/html" });
      return res.end(`
            <html>
                <head><title>Contact</title></head>
                <body>
                    <h1>Welcome to the Contact Page</h1>
                    <p>This is a simple Node.js server.</p>
                </body>
            </html>
            `);
      break;
    case "/products GET":
      res.writeHead(200, { "Content-Type": "text/html" });
      return res.end(`
            <html>
                <head><title>Products</title></head>
                <body>
                    <h1>Welcome to the Products Page</h1>
                    <p>This is a simple Node.js server.</p>
                </body>
            </html>
            `);
      break;
    case "/projects GET":
      res.writeHead(200, { "Content-Type": "text/html" });
      return res.end(`
            <html>
                <head><title>Projecs</title></head>
                <body>
                    <h1>Welcome to the Projects Page</h1>
                    <p>This is a simple Node.js server.</p>
                </body>
            </html>
            `);
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("404 Not Found");
      break;
  }

  // Implement more routes here
});

server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
