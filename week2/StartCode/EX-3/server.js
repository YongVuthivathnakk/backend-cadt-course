// server.js

import http from "http";
import fs from "fs/promises";

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  const filePath = "./submissions.json";

  console.log(`Received ${method} request for ${url}`);

  if (url === "/" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("Welcome to the Home Page");
  }

  if (url === "/contact" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
          <form method="POST" action="/contact">
            <input type="text" name="name" placeholder="Your name" />
            <button type="submit">Submit</button>
          </form>
        `);
    return;
  }

  if (url === "/contact" && method === "POST") {
    // Implement form submission handling
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const params = new URLSearchParams(body);
      const name = params.get("name")?.trim();
      if (!name) {
        res.writeHead(400, { "Content-Type": "text/html" });
        return res.end(`
                <html>
                    <head><title>Error</title></head>
                    <body>
                        <h1>Name is required</h1>
                        <a href="/contact">Go back</a>
                    </body>
                </html>
            `);
      }

      try {
        let submissions = [];
        try {
          const fileData = await fs.readFile(filePath, "utf-8");
          submissions = JSON.parse(fileData);
        } catch {
          submissions = [];
        }
        submissions.push({
          name: name,
        });

        await fs.writeFile(filePath, JSON.stringify(submissions, null, 2));

        res.writeHead(200, { "Content-Type": "text/html" });

        return res.end(`
                <html>
                    <head><title>Success</title></head>
                    <body>
                        <h1>Thank you, ${name}!</h1>
                        <p>Your submission has been saved successfully.</p>
                        <a href="/contact">Submit another name</a>
                    </body>
                </html>
            `);
      } catch (error) {
        console.error(error);
        res.writeHead(500, { "Content-Type": "text/plain" });
        return res.end("Internal Server Error");
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    return res.end("404 Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
