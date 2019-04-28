const routes = require("express").Router();
const UserController = require("./app/controllers/UserController");

// User routes
routes.post("/", UserController.store);
routes.put("/:id", UserController.update);
routes.get("/:id", UserController.get);
routes.delete("/:id", UserController.destroy);

module.exports = routes;
