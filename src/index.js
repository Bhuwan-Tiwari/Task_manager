const express = require("express");
const bodyParser = require("body-parser");

const apiRoutes = require("./routes/index");

const app = express();

const prepareAndStarrtServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/", apiRoutes);

  app.listen(3000, async () => {
    console.log(`SERVER STARTED AT PORT 3000`);
  });
};
prepareAndStarrtServer();
