const express = require('express');
const morgan = require('morgan');
require("dotenv").config()
const path = require('path');
const Router = require("./routes/router");
const createError = require("http-errors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors")
const ExpressEjsLayouts = require("express-ejs-layouts");

module.exports = class Application {
    #app = express();
    #PORT;
    constructor(PORT) {
        this.#PORT = PORT;
        this.ConfigApplication();
        this.InitTemplateEngine();
        this.CreateServer();
        this.CreateRoutes();
        this.ErrorHandler();
    }

    ConfigApplication() {
        this.#app.use(morgan("dev"))
        this.#app.use(express.json())
        this.#app.use(express.urlencoded({ extended: true }));
        this.#app.use(express.static(path.join(__dirname, '..', "public")));
        this.#app.use(cors({
            origin: 'http://localhost:3000',
            methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD',"DELETE","PATCH"],
            credentials: true
          }));
        this.#app.use("/swagger", swaggerUI.serve)
        this.#app.get("/swagger", swaggerUI.setup(swaggerJsDoc({
            swaggerDefinition: {
                openapi: "3.0.0",
                info: {
                    title: "Shutdowner ",
                    version: "1.0.0",
                    description: "an api to shut down system",
                    contact: {
                        name: "Mohammad",
                        url: "https://github.com/mohammadhosseintazaroei",
                        email: "m.h.tazaroie753@gmail.com",
                    },
                },
                servers: [
                    {
                        url: "http://localhost:8000",
                    },
                ],
            },
            apis: ["./app/routes/**/*.js"],
        }),
            { explorer: true }
        ))
    }

    CreateServer() {
        const http = require('http');
        const server = http.createServer(this.#app)
        server.listen(this.#PORT, () => {
            console.log(`http://localhost:${this.#PORT || 8000}/swagger/`);
    
        });
    }



    InitTemplateEngine() {
        this.#app.use(ExpressEjsLayouts)
        this.#app.set("view engine","ejs")
        this.#app.set("views","resource/views")
        this.#app.set("layout extractStyles","true")
        this.#app.set("layout extractScripts","true")
        this.#app.set("layout","./layouts/master")
    }
    CreateRoutes() {
        this.#app.use(Router);
    }

    ErrorHandler() {
        this.#app.use((req, res, next) => {
            next(createError.NotFound("Route not found 🔍"))
        })
        this.#app.use((error, req, res, next) => {
            const serverError = createError.InternalServerError()
            const status = error.status || serverError.status
            const message = error.message || serverError.message
            return res.status(status).json({
                errors: {
                    status,
                    message
                }
            })
        })
    }
}