const express = require("express");

const port = 8080;

const app = express();

app.get("/test", (req, res) => {
  res.send({ data: "Server says hi" });
});

app.listen(port, () => {
  console.log(`srrver running on port: ${port}`);
});
