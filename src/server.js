const app = require("./app");
const portServer = process.env.portServer || 3000;

app.listen(portServer, () => {
  console.info("Listening on port " + portServer);
});
