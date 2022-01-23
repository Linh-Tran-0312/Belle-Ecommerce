# Belle-Ecommerce



Beller-ecommerce is an full-stack wep application built using PERN (Postgres, Express, React and Node) with typical shopping functionalites, including shopper browsing and shop management (this is also my final project of Software Analysis and Design subject).

# Features!

##### Browsing
  - Blog: search for blog posts by titles and topics, view and comment (incomplete) on blog content.
  - Product: allow customers to browse products by their name, category, brand and price range, comments on products (incomplete), review products after purchase.
  - Shopping cart feature: enable users to add, update quantity and delete items from cart, check out and place order.
##### Administration (admin role and editor role)
- Blog (editor role): create, update and delete blog topics and blog posts.
- Product (editor role): create, update and delete product, product properties (category, brand, size, color) and product variants.
- User (admin role): create, update user profiles and search for users by their info (name, email, phone, address).
- Order (admin role): search orders by customers' name, phone, address, order ID, order status,... and update order status.
- Report (admin role): present the overview of current month (number of new users, new orders and sales), release (daily, monthly) sales and order statistics and list of top-selling products.

 
# Technology

#### Backend
- Postgres - SQL database for storing data
- TypeORM - ORM used to create and query data from database
 - Express - build web server (used with Typescript)
 - TSOA - build OpenAPI-compliant REST APIs using TypeScript and Node
 - JsonWebToken - generate and verify access token and refress token
 - Morgan and Winston - info and error logging for both development and production environment

#### Frontend
- React and Material UI (v4) - building user interface
- Reduct - manage gloal state (used with Thunk middleware)
- Axios - fetching data and handle expired requests
- Cloundianry - storing images


### Installation

This app requires [Node.js](https://nodejs.org/) v12+ to run.

Install the dependencies and devDependencies and start React app in client.

```sh
$ cd client
$ npm install 
$ npm start
```

Install the dependencies and devDependencies and start Express app in server.

```sh
$ cd server
$ npm install 
$ npm run dev
```


#### List of env variables

In React app:
```sh
REACT_APP_GOOGLE_MAP_KEY=<key for google map API>
REACT_APP_LOCAL_URL=<localhost>
REACT_APP_HEROKU_URL=<server host in production>
REACT_APP_CLOUDINARY_URL=<cloudinary api key for storing image>
REACT_APP_CLOUDINARY_PRESET=<preset name>
REACT_APP_CLOUDINARY_NAME=<cloudinary name>
```
In Express app:
```sh
POSTGRES_HOST=<localhost>
POSTGRES_PORT=5432
POSTGRES_USER=<postgres user in local>
POSTGRES_PASSWORD=<postgres password in local>
POSTGRES_DB=<postgres db name in local>
POSTGRES_DB_TEST=<postgres db name in local>
PORT=8000
ACCESS_TOKEN_SECRET=<secret key for generate, verify access token>
REFRESH_TOKEN_SECRET=<secret key for generate, verify refresh token>
CLIENT_URL_LOCAL=<client url in local host>
CLIENT_URL=<client url in production>
HEROKU_POSTGRES_HOST=<postgres host in heroku>
HEROKU_POSTGRES_PORT=<postgres port>
HEROKU_POSTGRES_USER=<postgres user in heroku>
HEROKU_POSTGRES_PASSWORD=<postgres password in heroku>
HEROKU_POSTGRES_DB=<postgres db name in heroku>
```
### Docker
Belle-Ecommerce is also containerized with Docker and delivered in Docker Hub.

(Work in progress...)

# Resources
- [Main template was cloned and customized from Belle Ecommerce template](https://themeforest.net/item/belle-multipurpose-bootstrap-4-html-template/24652217)
- [Admin panel was used and customized from MUI Admin Dashboard](https://mui.com/getting-started/templates/dashboard/)
- [Design Document (usecase diagram, database schemma,...)](https://drive.google.com/drive/folders/16uBzaj-2AzskFsXk6JPjNgA9m5l_tfud?usp=sharing)

# References
- [Building REST API with Express, TypeScript and Swagger](https://rsbh.dev/blog/rest-api-with-express-typescript)
- [Using Axios interceptors for refreshing your API token.](https://thedutchlab.com/blog/using-axios-interceptors-for-refreshing-your-api-token)
- [Better logs for ExpressJS using Winston and Morgan with Typescript](https://dev.to/vassalloandrea/better-logs-for-expressjs-using-winston-and-morgan-with-typescript-516n)
- [Handle JWT Token expiration with response status](https://www.bezkoder.com/handle-jwt-token-expiration-react/)
 