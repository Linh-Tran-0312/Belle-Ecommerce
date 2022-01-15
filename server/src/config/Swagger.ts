import swaggerUi from "swagger-ui-express";

export class Swagger {
    ui = swaggerUi;
    link() {
        return "/docs"
    }
    serve() {
        this.ui.serve
    }
    setup() {
        this.ui.setup(undefined, {
            swaggerOptions: {
              url: "/swagger.json",
            },
          })
    }
}
 
