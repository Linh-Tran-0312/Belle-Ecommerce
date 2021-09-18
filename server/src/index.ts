import express, { Application } from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import dbConfig from './config/DatabaseConfig';
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import pingRoute from './api/routes/ping';
const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
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

app.get("/", (req,res) => res.send({"message" : "Hello ABa to Belle Api build on TypeScript"}))
app.use(pingRoute)

createConnection(dbConfig).then((_connection) => {
  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });
}).catch((err) => {
  console.log("Unable to connect to db", err);
  process.exit(1);
})
