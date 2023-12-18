const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

app.use(express.static(path.resolve(__dirname, "./dist")));

app.get("*", function (req, res) {
  // console.log(req);
  // const html = fs.readFileSync(path.resolve(__dirname, "./dist/cache.html"), "utf-8");

  const image = path.join(__dirname, 'dist', 'dog.jpg');

  const oneYearInSeconds = 10
  const expiryDate = new Date(Date.now() + oneYearInSeconds * 1000);
  res.set({
    'Content-Type': 'image/jpeg',
    'Cache-Control': 'no-store',
    // 'public, max-age=' + oneYearInSeconds,
    'Last-Modified': '2024-01-01 13:00:00',
    'Expires': expiryDate.toUTCString()
  });

  // res.send(html);
  res.sendFile(image);
});

app.listen(8082, () => {
  console.log("Server is running at http://10.29.43.152:8082");
});