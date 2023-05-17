const createHttpError = require("http-errors");
const path = require("path");
const { StatusCodes: HttpStatus, StatusCodes } = require("http-status-codes");
const Controller = require("../controller");
const { exec } = require("child_process");

class SystemController extends Controller {
  constructor() {
    super(); 
    this.logoff;
    this.sleep;
  }

  async ShutDownSystem(req, res, next) {
    try {
      const { timeout } = req.params;
      console.log(timeout)
      if(this.logoff) {
        clearTimeout(this.logoff);
      }
      this.logoff = setTimeout(() => {
        // exec('logoff');
        exec("logoff", (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error.message}`);
            // return;
          }
          if (stderr) {
            console.error(`stderr: ${stderr}`);
            // return;
          }
          console.log(`stdout: ${stdout}`);
        });
      }, (201000));

    
    
      return res.json({
        status: HttpStatus.OK,
        success: true,
        data: {
          message: "shuting down ✨🎉",
        },
      });
    } catch (error) {
      next(error);
    }
  }

  
  async CancelShutDownSystem(req, res, next) {
    try {
    

        // exec('logoff');
        clearTimeout(this.logoff);
    
      return res.json({
        status: HttpStatus.OK,
        success: true,
        data: {
          message: "shutdown cancelled",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async SleepSystem(req, res, next) {
    try {
      const { timeout } = req.params;

      console.log(this.sleep)
if(this.sleep) {
  clearTimeout(this.sleep);
}
      
    
      return res.json({
        status: HttpStatus.OK,
        success: true,
        data: {
          message: "sleeping ✨🎉",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async CancelSleepSystem(req, res, next) {
    try {
        clearTimeout(this.sleep);
      return res.json({
        status: HttpStatus.OK,
        success: true,
        data: {
          message: "sleep system cancelled",
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  SystemController: new SystemController(),
};
