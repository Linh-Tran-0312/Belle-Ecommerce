import { ConnectionOptions } from 'typeorm';
import * as Entity from '../api/models';
import { OrderDetailSubscriber, OrderSubscriber, ProductSubscriber } from "../api/subscribers";
import  dotenv  from "dotenv";
dotenv.config();


export const LocalConfig: ConnectionOptions= {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB_TEST,
    entities: [ Entity.Blog,
                Entity.BlogCategory, 
                Entity.BlogComment, 
                Entity.Brand, 
                Entity.Color,
                Entity.Size,
                Entity.Order,
                Entity.OrderDetail,
                Entity.Product,
                Entity.ProductCategory,
                Entity.ProductComment,
                Entity.ProductVariant,
                Entity.ProductReview,
                Entity.User
            ],
    subscribers:[OrderSubscriber,OrderDetailSubscriber, ProductSubscriber],
    synchronize: true,
};
export const DeployConfig: ConnectionOptions= {
    type: 'postgres',
    host: process.env.HEROKU_POSTGRES_HOST,
    port: Number(process.env.HEROKU_POSTGRES_PORT),
    username: process.env.HEROKU_POSTGRES_USER,
    password: process.env.HEROKU_POSTGRES_PASSWORD,
    database: process.env.HEROKU_POSTGRES_DB,
    entities: [ Entity.Blog,
                Entity.BlogCategory, 
                Entity.BlogComment, 
                Entity.Brand, 
                Entity.Color,
                Entity.Size,
                Entity.Order,
                Entity.OrderDetail,
                Entity.Product,
                Entity.ProductCategory,
                Entity.ProductComment,
                Entity.ProductVariant,
                Entity.ProductReview,
                Entity.User
            ],
    subscribers:[OrderSubscriber,OrderDetailSubscriber, ProductSubscriber],
    ssl: {
        rejectUnauthorized: false 
    }
};

 