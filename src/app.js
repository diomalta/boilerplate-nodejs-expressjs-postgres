require("./config/env");

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

class AppController {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(cors());
    this.express.use(helmet());
    this.express.use(express.json());
  }

  routes() {
    this.express.use("/api", require("./routes"));
  }
}

module.exports = new AppController().express;
