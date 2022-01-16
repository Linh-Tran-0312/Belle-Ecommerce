 
import { createConnection } from "typeorm";
import { DbConfig }from './config';
import { ExpressApp } from "./app";
import { ConnectionOptions } from "typeorm";

class Server {

  app: ExpressApp;
  DbConfig: any;

  constructor(dbConfig: ConnectionOptions){
    this.app = new ExpressApp();
    this.DbConfig = dbConfig;
  };

  start(port) {
    this.app.config();
    createConnection(this.DbConfig).then((_connection) => {
      this.app.listen(port);
    }).catch((err) => {
      console.log("Unable to connect to db", err);
      process.exit(1);
    }) 
  }

}
const PORT = process.env.PORT || 8000;
 
const server = new Server(DbConfig);

server.start(PORT);


