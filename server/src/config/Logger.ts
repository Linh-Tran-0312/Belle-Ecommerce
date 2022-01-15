import fs from "fs";
import path from "path";
import morgan from "morgan";
 
const accessLogStream = fs.createWriteStream(path.join(__dirname, "app.log"), { flags: "a"});
export const morganConfig = {
    interval: "7d",
    stream: accessLogStream
}
export const logger = () => {
    morgan("combined", morganConfig)
}

