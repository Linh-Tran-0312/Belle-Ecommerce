 
import { createConnection } from "typeorm";
import { DbConfig }from './config';
import "./api/controllers/orderController";
import app from "./app";

const PORT = process.env.PORT || 8000;
createConnection(DbConfig).then((_connection) => {
  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });
}).catch((err) => {
  console.log("Unable to connect to db", err);
  process.exit(1);
}) 
