import express, { Application } from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import dbConfig from './config/DatabaseConfig';
import morgan from "morgan";
import  dotenv  from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./api/routes/routes";
import { errorHandler } from "./api/middlewares/ErrorHandler";
import  "./api/controllers/pingController";
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

dotenv.config();
const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
// allow external access to swagger file in public folder and config swagger route 
app.use(express.static("public"));
 app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
); 

app.get("/", (req,res) => res.send({"message" : "Hello World. This is Belle-Ecommerce Web API created by Linh Tran. Please visit this https://***/docs to test API with Swagger UI"}))
//app.use(pingRoute)

RegisterRoutes(app);

app.use(errorHandler)

//app.listen(PORT, () => console.log(`Server started listening to port ${PORT}`));

createConnection(dbConfig).then((_connection) => {
  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });
}).catch((err) => {
  console.log("Unable to connect to db", err);
  process.exit(1);
}) 
