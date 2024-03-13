const express = require("express");
const app = express();

app.use(express.json());

const database = require("./src/config/config");
const routes = require("./src/routes/UserLogin");
app.use(routes);

app.listen(8000, () => {
  console.log("Web server started");
});
