const {  SystemRouter } = require("./system/system.routes");
const Router = require("express").Router();

Router.use("/system", SystemRouter);

module.exports = Router;
