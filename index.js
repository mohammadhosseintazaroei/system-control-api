const Application = require("./app/server");
new Application(process.env.APP_PORT || 4000)