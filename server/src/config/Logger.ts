import morgan, { StreamOptions } from "morgan";
import winston from "winston";

const isDevEnvironment = () => {
    const env = process.env.NODE_ENV || 'development';
    return env === 'development'
}

// Winston configuration
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

const level = () => {
    return isDevEnvironment() ? 'debug' : 'warn'
}
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
}

winston.addColors(colors);


const format = winston.format.combine(
    winston.format.errors({stack: true}),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(info => {
        if(info.stack) {
            return `${info.timestamp}  ${info.level}: ${info.message} ${info.stack}`;
        }
        return `${info.timestamp}  ${info.level}: ${info.message}`;
    }),
  )
  
const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: 'logs/error.log',
        level: "error",
    }),
    new winston.transports.File({
        filename: "logs/all.log"
    })
]

export const Logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
})
// Morgan configuration 

const stream: StreamOptions = {
    write: (msg) => Logger.http(msg)
}
const skip = () => {
    return !isDevEnvironment()
}

export const morganConfig = morgan(":method :url :status :res[content-length] - :response-time ms", {stream,skip})

