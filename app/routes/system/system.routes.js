const SystemRouter = require('express').Router();
const {  SystemController } = require('../../http/controllers/system/systemComand.controller');


SystemRouter.post("/shutdown/:timeout", SystemController.ShutDownSystem)

SystemRouter.get("/shutdown/cancel", SystemController.CancelShutDownSystem)
SystemRouter.post("/sleep/:timeout", SystemController.SleepSystem)

SystemRouter.get("/sleep/cancel", SystemController.CancelSleepSystem)

module.exports = {
    SystemRouter
}
