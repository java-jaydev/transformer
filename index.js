const express = require("express");
const app = express();
const port = 3000;

const TIME = new Date().toLocaleTimeString();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`[${TIME}]Example app listening at http://localhost:${port}`);
});
