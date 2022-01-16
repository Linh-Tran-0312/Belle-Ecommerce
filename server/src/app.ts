import express, { Application } from "express";
import "reflect-metadata";

import cookieParser from "cookie-parser"
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./api/routes/routes";
import { errorHandler } from "./api/middlewares/ErrorHandler";
import { morganConfig, Logger } from "./config";
import "./api/controllers/pingController";
import "./api/controllers/blogController";
import "./api/controllers/blogCategoryController";
import './api/controllers/authController';
import "./api/controllers/userController";
import "./api/controllers/sizeController";
import './api/controllers/brandController';
import "./api/controllers/colorController";
import "./api/controllers/productCategoryController";
import "./api/controllers/productController";
import "./api/controllers/orderController";
import { types } from 'pg';
dotenv.config();

export class ExpressApp {
  public app: Application = express();
  constructor() {
    this.config();
  }
  config() {
    this.generalConfig();
    this.loggerConfig();
    this.corsConfig();
    this.swaggerConfig();
    this.registerRoutes()
    this.initializeErrorHandler()
  }
  generalConfig() {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(express.static("public"));
    types.setTypeParser(20, function (val) {
      return parseInt(val)
    });
    this.app.get("/", (req, res) => res.send({ "message": "Hello World. This is Belle-Ecommerce Web API created by Linh Tran. Please visit this https://***/docs to test API with Swagger UI" }))

  }

  swaggerConfig() {
    this.app.use(
      "/docs",
      swaggerUi.serve,
      swaggerUi.setup(undefined, {
        swaggerOptions: {
          url: "/swagger.json",
        },
      })
    );
  }
  loggerConfig() {
    this.app.use(morganConfig)
  }
  corsConfig() {
    this.app.use(cors({ origin: [process.env.CLIENT_URL_LOCAL!, process.env.CLIENT_URL!], credentials: true }));
  }
  registerRoutes() {
    RegisterRoutes(this.app)
  }
  initializeErrorHandler() {
    this.app.use(errorHandler)
  }

  listen(port) {
    this.app.listen(port, () => {
      Logger.info(`Server is running on port ${port}`);
    })
  }
  getApplication() {
    return this.app
  }
}




