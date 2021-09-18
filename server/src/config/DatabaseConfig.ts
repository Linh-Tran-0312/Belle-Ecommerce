import { ConnectionOptions } from 'typeorm';
import * as Entity from '../api/models';

const config: ConnectionOptions= {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
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
    synchronize: true,
};

export default config;