# Belle-Ecommerce



Beller-ecommerce is an full-stack wep application built using PERN (Postgres, Express, React and Node) with typical shopping functionalites, including shopper browsing and shop management (this is also my final project of Software Analysis and Design subject).

# Features!

##### Browsing
  - Blog page: search blogs by titles and topics, read blog content, leave comments on blogs (incomlete)
  - Product page: browse products by their categories, brands and price ranges, leave comments on products (incomplete), review products after purchase.
  - Cart functinality: enable users to add, update quantity and delete items from cart, check out and place order.
##### Administration (admin role and editor role)
- Blog (editor role): create, update and delete blog categories and blogs.
- Product (editor role): create, update and delete product, product properties (category, brand, size, color) and product variants.
- User (admin role): create, update user profiles and search users by their info (name, email, phone, address).
- Order (admin role): search orders by customers' name, phone, address, order ID, order status,...
- Report (admin role): present the overview of current month (number of new users, new orders and sales), release (daily, monthly) sales and order statistic and list of top-selling products.

 
# Technology

#### Backend
- Postgres - database
- TypeORM - ORM used to create and query data from database
 - Express - build web server (used with Typescript)
 - TSOA - build OpenAPI-compliant REST APIs using TypeScript and Node
 - JsonWebToken - generate and verify access token and refress token
 - Morgan and Winston - info and error logging during both development and production environment

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

By default, the Docker will expose port 8080, so change this within the Dockerfile if necessary. When ready, simply use the Dockerfile to build the image.

```sh
cd dillinger
docker build -t joemccann/dillinger:${package.json.version} .
```
This will create the dillinger image and pull in the necessary dependencies. Be sure to swap out `${package.json.version}` with the actual version of Dillinger.

Once done, run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 8000 of the host to port 8080 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 8000:8080 --restart="always" <youruser>/dillinger:${package.json.version}
```

Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:8000
```

# Resources
- [Main template was cloned and modified from Belle Ecommerce template](https://themeforest.net/item/belle-multipurpose-bootstrap-4-html-template/24652217)
- [Admin panel was used and modifie from MUI Admin Dashboard](https://mui.com/getting-started/templates/dashboard/)

# References
- [Building REST API with Express, TypeScript and Swagger](https://rsbh.dev/blog/rest-api-with-express-typescript)
- [Using Axios interceptors for refreshing your API token.](https://thedutchlab.com/blog/using-axios-interceptors-for-refreshing-your-api-token)
 
