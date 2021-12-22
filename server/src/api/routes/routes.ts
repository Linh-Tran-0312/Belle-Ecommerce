/* tslint:disable */
/* eslint-disable */
import { Controller, ValidateParam, FieldErrors, ValidateError, TsoaRoute } from '@tsoa/runtime';
import { ReportController } from './../controllers/reportController';
import { BlogController } from './../controllers/blogController';
import { ProductController } from './../controllers/productController';
import { UserController } from './../controllers/userController';
import { AuthController } from './../controllers/authController';
import { OrderController } from './../controllers/orderController';
import { PingController } from './../controllers/pingController';
import { BlogCategoryController } from './../controllers/blogCategoryController';
import { SizeController } from './../controllers/sizeController';
import { BrandController } from './../controllers/brandController';
import { ProductCategoryController } from './../controllers/productCategoryController';
import { ColorController } from './../controllers/colorController';
import { expressAuthentication } from './../middlewares/AuthHandler';

const models: TsoaRoute.Models = {
    "IOverviewReport": {
        "dataType": "refObject",
        "properties": {
            "sales": {"dataType":"double","required":true},
            "orders": {"dataType":"double","required":true},
            "registers": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    "ISalesReport": {
        "dataType": "refObject",
        "properties": {
            "time": {"dataType":"string","required":true},
            "sales": {"dataType":"double","required":true},
            "orders": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    "IOrderReport": {
        "dataType": "refObject",
        "properties": {
            "completedOrders": {"dataType":"double","required":true},
            "canceledOrders": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    "IProductReport": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "brand": {"dataType":"string","required":true},
            "quantity": {"dataType":"double","required":true},
            "sales": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    "BlogCategory": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    "Blog": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "title": {"dataType":"string","required":true},
            "categoryId": {"dataType":"double","required":true},
            "imgPath": {"dataType":"string","required":true},
            "content": {"dataType":"string","required":true},
            "commentAllow": {"dataType":"boolean","required":true},
            "category": {"ref":"BlogCategory","required":true},
        },
        "additionalProperties": false,
    },
    "IBlogs": {
        "dataType": "refObject",
        "properties": {
            "blogs": {"dataType":"array","array":{"dataType":"refObject","ref":"Blog"},"required":true},
            "total": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    "BlogField": {
        "dataType": "refEnum",
        "enums": ["title","createdAt"],
    },
    "Change": {
        "dataType": "refEnum",
        "enums": ["DESC","ASC"],
    },
    "IBlogCategory": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    "IBlog": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string","required":true},
            "categoryId": {"dataType":"double","required":true},
            "imgPath": {"dataType":"string"},
            "content": {"dataType":"string","required":true},
            "commentAllow": {"dataType":"boolean"},
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "category": {"ref":"IBlogCategory"},
        },
        "additionalProperties": false,
    },
    "IBlogCreateProps": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string","required":true},
            "categoryId": {"dataType":"double","required":true},
            "imgPath": {"dataType":"string"},
            "content": {"dataType":"string","required":true},
            "commentAllow": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    "IBlogUpdateProps": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string"},
            "categoryId": {"dataType":"double"},
            "imgPath": {"dataType":"string"},
            "content": {"dataType":"string"},
            "commentAllow": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    "IBlogCommentCreateProps": {
        "dataType": "refObject",
        "properties": {
            "text": {"dataType":"string","required":true},
            "blogId": {"dataType":"double","required":true},
            "parentCommentId": {"dataType":"double"},
            "userId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    "UserRole": {
        "dataType": "refEnum",
        "enums": ["all","admin","editor","customer"],
    },
    "ProductCategory": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "name": {"dataType":"string","required":true},
            "imgPath": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    "Brand": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "name": {"dataType":"string","required":true},
            "imgPath": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    "User": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "fname": {"dataType":"string","required":true},
            "lname": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "role": {"ref":"UserRole","required":true},
            "phone": {"dataType":"string","required":true},
            "address": {"dataType":"string","required":true},
            "token": {"dataType":"string","required":true},
            "wishList": {"dataType":"array","array":{"dataType":"refObject","ref":"Product"},"required":true},
            "orders": {"dataType":"array","array":{"dataType":"refObject","ref":"Order"},"required":true},
        },
        "additionalProperties": false,
    },
    "Product": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "sku": {"dataType":"string","required":true},
            "categoryId": {"dataType":"double","required":true},
            "brandId": {"dataType":"double","required":true},
            "imgPaths": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "name": {"dataType":"string","required":true},
            "summary": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "price": {"dataType":"double","required":true},
            "category": {"ref":"ProductCategory","required":true},
            "brand": {"ref":"Brand","required":true},
            "overallReview": {"dataType":"double","required":true},
            "reviewCount": {"dataType":"double","required":true},
            "comments": {"dataType":"array","array":{"dataType":"refObject","ref":"ProductComment"},"required":true},
            "variants": {"dataType":"array","array":{"dataType":"refObject","ref":"ProductVariant"},"required":true},
            "reviews": {"dataType":"array","array":{"dataType":"refObject","ref":"ProductReview"},"required":true},
        },
        "additionalProperties": false,
    },
    "ProductComment": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "text": {"dataType":"string","required":true},
            "userId": {"dataType":"double","required":true},
            "productId": {"dataType":"double","required":true},
            "parentCommentId": {"dataType":"double","required":true},
            "user": {"ref":"User","required":true},
            "product": {"ref":"Product","required":true},
            "parentComment": {"ref":"ProductComment","required":true},
            "childComments": {"dataType":"array","array":{"dataType":"refObject","ref":"ProductComment"},"required":true},
        },
        "additionalProperties": false,
    },
    "Size": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    "Color": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "code": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    "ProductVariant": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "productId": {"dataType":"double","required":true},
            "sizeId": {"dataType":"double","required":true},
            "colorId": {"dataType":"double","required":true},
            "quantity": {"dataType":"double","required":true},
            "product": {"ref":"Product","required":true},
            "size": {"ref":"Size","required":true},
            "color": {"ref":"Color","required":true},
        },
        "additionalProperties": false,
    },
    "ProductReview": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "title": {"dataType":"string","required":true},
            "text": {"dataType":"string","required":true},
            "productId": {"dataType":"double","required":true},
            "rating": {"dataType":"double","required":true},
            "userId": {"dataType":"string","required":true},
            "user": {"ref":"User","required":true},
            "product": {"ref":"Product","required":true},
        },
        "additionalProperties": false,
    },
    "Order": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "userId": {"dataType":"double","required":true},
            "details": {"dataType":"array","array":{"dataType":"refObject","ref":"IOrderDetail"},"required":true},
            "user": {"ref":"User","required":true},
            "status": {"ref":"Status","required":true},
            "paymentMethod": {"ref":"PaymentMethod","required":true},
            "paymentCheck": {"dataType":"boolean","required":true},
            "note": {"dataType":"string","required":true},
            "address": {"dataType":"string","required":true},
            "shipping": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "orderAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    "Status": {
        "dataType": "refEnum",
        "enums": ["ordering","ordered","delivery","canceled","completed"],
    },
    "PaymentMethod": {
        "dataType": "refEnum",
        "enums": ["cod","banktransfer","e-wallet","gateway"],
    },
    "IOrderDetail": {
        "dataType": "refObject",
        "properties": {
            "orderId": {"dataType":"double"},
            "productVariantId": {"dataType":"double","required":true},
            "quantity": {"dataType":"double","required":true},
            "unitPrice": {"dataType":"double","required":true},
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    "IOrderDetailCreateProps": {
        "dataType": "refObject",
        "properties": {
            "orderId": {"dataType":"double"},
            "productVariantId": {"dataType":"double","required":true},
            "quantity": {"dataType":"double","required":true},
            "unitPrice": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    "Pick_IUserCreateProps.Exclude_keyofIUserCreateProps.password-or-email__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"password":{"dataType":"string"},"email":{"dataType":"string"},"token":{"dataType":"string"},"phone":{"dataType":"string"},"address":{"dataType":"string"},"orders":{"dataType":"array","array":{"dataType":"refObject","ref":"Order"}},"fname":{"dataType":"string","required":true},"lname":{"dataType":"string","required":true},"role":{"ref":"UserRole"},"id":{"dataType":"double","required":true},"createdAt":{"dataType":"datetime","required":true}},"validators":{}},
    },
    "IUser": {
        "dataType": "refObject",
        "properties": {
            "password": {"dataType":"string"},
            "email": {"dataType":"string"},
            "token": {"dataType":"string"},
            "phone": {"dataType":"string"},
            "address": {"dataType":"string"},
            "orders": {"dataType":"array","array":{"dataType":"refObject","ref":"Order"}},
            "fname": {"dataType":"string","required":true},
            "lname": {"dataType":"string","required":true},
            "role": {"ref":"UserRole"},
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    "IBlogComment": {
        "dataType": "refObject",
        "properties": {
            "text": {"dataType":"string","required":true},
            "blogId": {"dataType":"double","required":true},
            "parentCommentId": {"dataType":"double"},
            "userId": {"dataType":"double","required":true},
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "childComments": {"dataType":"array","array":{"dataType":"refObject","ref":"IBlogCommentCreateProps"}},
            "user": {"ref":"IUser"},
        },
        "additionalProperties": false,
    },
    "IBlogCommentUpdateProps": {
        "dataType": "refObject",
        "properties": {
            "text": {"dataType":"string","required":true},
            "blogId": {"dataType":"double","required":true},
            "userId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    "IProducts": {
        "dataType": "refObject",
        "properties": {
            "products": {"dataType":"array","array":{"dataType":"refObject","ref":"Product"},"required":true},
            "total": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    "ProductField": {
        "dataType": "refEnum",
        "enums": ["price","name","overallReview","createdAt"],
    },
    "IProductCategory": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "imgPath": {"dataType":"string"},
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    "IBrand": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "imgPath": {"dataType":"string"},
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    "ISize": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    "IColor": {
        "dataType": "refObject",
        "properties": {
            "code": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    "IProductVariant": {
        "dataType": "refObject",
        "properties": {
            "productId": {"dataType":"double","required":true},
            "sizeId": {"dataType":"double","required":true},
            "colorId": {"dataType":"double","required":true},
            "quantity": {"dataType":"double","required":true},
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "size": {"ref":"ISize"},
            "color": {"ref":"IColor"},
        },
        "additionalProperties": false,
    },
    "IProduct": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "imgPath": {"dataType":"string"},
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "category": {"ref":"IProductCategory"},
            "brand": {"ref":"IBrand"},
            "overallReview": {"dataType":"double"},
            "reviewCount": {"dataType":"double"},
            "variants": {"dataType":"array","array":{"dataType":"refObject","ref":"IProductVariant"}},
        },
        "additionalProperties": false,
    },
    "IProductCreateProps": {
        "dataType": "refObject",
        "properties": {
            "sku": {"dataType":"string"},
            "categoryId": {"dataType":"double","required":true},
            "brandId": {"dataType":"double","required":true},
            "imgPaths": {"dataType":"array","array":{"dataType":"string"}},
            "name": {"dataType":"string","required":true},
            "summary": {"dataType":"string"},
            "description": {"dataType":"string"},
            "price": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    "IProductUpdateProps": {
        "dataType": "refObject",
        "properties": {
            "sku": {"dataType":"string"},
            "categoryId": {"dataType":"double"},
            "brandId": {"dataType":"double"},
            "imgPaths": {"dataType":"array","array":{"dataType":"string"}},
            "name": {"dataType":"string"},
            "summary": {"dataType":"string"},
            "description": {"dataType":"string"},
            "price": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    "IProductVariantCreateProps": {
        "dataType": "refObject",
        "properties": {
            "productId": {"dataType":"double","required":true},
            "sizeId": {"dataType":"double","required":true},
            "colorId": {"dataType":"double","required":true},
            "quantity": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    "IProductVariantUpdateProps": {
        "dataType": "refObject",
        "properties": {
            "colorId": {"dataType":"double"},
            "sizeId": {"dataType":"double"},
            "quantity": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    "IUsers": {
        "dataType": "refObject",
        "properties": {
            "users": {"dataType":"array","array":{"dataType":"refObject","ref":"User"},"required":true},
            "total": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    "UserField": {
        "dataType": "refEnum",
        "enums": ["fname","sale","createdAt"],
    },
    "IUserCreateProps": {
        "dataType": "refObject",
        "properties": {
            "fname": {"dataType":"string","required":true},
            "lname": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "role": {"ref":"UserRole"},
            "phone": {"dataType":"string"},
            "address": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    "IUserUpdateProps": {
        "dataType": "refObject",
        "properties": {
            "lname": {"dataType":"string"},
            "fname": {"dataType":"string"},
            "password": {"dataType":"string"},
            "email": {"dataType":"string"},
            "phone": {"dataType":"string"},
            "address": {"dataType":"string"},
            "role": {"ref":"UserRole"},
        },
        "additionalProperties": false,
    },
    "ILogin": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    "IRevokeMessage": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    "IOrders": {
        "dataType": "refObject",
        "properties": {
            "orders": {"dataType":"array","array":{"dataType":"refObject","ref":"Order"},"required":true},
            "total": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    "OrderField": {
        "dataType": "refEnum",
        "enums": ["orderAt","total"],
    },
    "Pick_IOrderCreateProps.Exclude_keyofIOrderCreateProps.details__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"userId":{"dataType":"double","required":true}},"validators":{}},
    },
    "IOrder": {
        "dataType": "refObject",
        "properties": {
            "userId": {"dataType":"double","required":true},
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "status": {"ref":"Status"},
            "total": {"dataType":"double"},
            "details": {"dataType":"array","array":{"dataType":"refObject","ref":"IOrderDetail"}},
        },
        "additionalProperties": false,
    },
    "IOrderCreateProps": {
        "dataType": "refObject",
        "properties": {
            "userId": {"dataType":"double","required":true},
            "details": {"dataType":"array","array":{"dataType":"refObject","ref":"IOrderDetailCreateProps"}},
        },
        "additionalProperties": false,
    },
    "IOrderUpdateItems": {
        "dataType": "refObject",
        "properties": {
            "details": {"dataType":"array","array":{"dataType":"refObject","ref":"IOrderDetailCreateProps"},"required":true},
        },
        "additionalProperties": false,
    },
    "IOrderUpdateProps": {
        "dataType": "refObject",
        "properties": {
            "status": {"ref":"Status"},
            "paymentCheck": {"dataType":"boolean"},
            "paymentMethod": {"ref":"PaymentMethod"},
            "address": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    "IPlaceOrder": {
        "dataType": "refObject",
        "properties": {
            "address": {"dataType":"string","required":true},
            "note": {"dataType":"string"},
            "paymentMethod": {"ref":"PaymentMethod","required":true},
            "shipping": {"dataType":"double"},
            "total": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    "IOrderDetailQtyUpdate": {
        "dataType": "refObject",
        "properties": {
            "quantity": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    "PingMessage": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    "IBlogCategoryCreateProps": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    "ISizeCreateProps": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    "ISizeUpdateProps": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    "IBrandCreateProps": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "imgPath": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    "IBrandUpdateProps": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "imgPath": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    "IProductCategoryCreateProps": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "imgPath": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    "IProductCategoryUpdateProps": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "imgPath": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    "IColorCreateProps": {
        "dataType": "refObject",
        "properties": {
            "code": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    "IColorUpdateProps": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "code": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
};

export function RegisterRoutes(app: any) {
        app.get('/report/overview',
            function (request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ReportController();


            const promise = controller.getOverviewReport.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/report/sales',
            function (request: any, response: any, next: any) {
            const args = {
                    time: {"in":"query","name":"time","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ReportController();


            const promise = controller.getSalesReport.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/report/orders',
            function (request: any, response: any, next: any) {
            const args = {
                    time: {"in":"query","name":"time","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ReportController();


            const promise = controller.getOrderReport.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/report/products',
            function (request: any, response: any, next: any) {
            const args = {
                    time: {"in":"query","name":"time","required":true,"dataType":"string"},
                    page: {"in":"query","name":"page","required":true,"dataType":"double"},
                    limit: {"in":"query","name":"limit","required":true,"dataType":"double"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ReportController();


            const promise = controller.getTopProductsReport.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/blogs',
            function (request: any, response: any, next: any) {
            const args = {
                    category: {"in":"query","name":"category","dataType":"double"},
                    limit: {"in":"query","name":"limit","dataType":"double"},
                    sort: {"in":"query","name":"sort","ref":"BlogField"},
                    page: {"in":"query","name":"page","dataType":"double"},
                    change: {"in":"query","name":"change","ref":"Change"},
                    search: {"in":"query","name":"search","dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new BlogController();


            const promise = controller.getBlogs.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.post('/blogs',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    data: {"in":"body","name":"data","required":true,"ref":"IBlogCreateProps"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new BlogController();


            const promise = controller.createBlog.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/blogs/:id',
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new BlogController();


            const promise = controller.getBlogById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.patch('/blogs/:id',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    data: {"in":"body","name":"data","required":true,"ref":"IBlogUpdateProps"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new BlogController();


            const promise = controller.updateBlogById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.delete('/blogs/:id',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new BlogController();


            const promise = controller.deleteBlogById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/blogs/:blogId/comments',
            function (request: any, response: any, next: any) {
            const args = {
                    blogId: {"in":"path","name":"blogId","required":true,"dataType":"double"},
                    date: {"in":"query","name":"date","dataType":"string"},
                    limit: {"in":"query","name":"limit","dataType":"double"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new BlogController();


            const promise = controller.getCommentsOfBlog.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.post('/blogs/comments',
            authenticateMiddleware([{"jwt":["admin","editor","customer"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    data: {"in":"body","name":"data","required":true,"ref":"IBlogCommentCreateProps"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new BlogController();


            const promise = controller.createComment.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.patch('/blogs/comments/:commentId',
            authenticateMiddleware([{"jwt":["admin","editor","customer"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    commentId: {"in":"path","name":"commentId","required":true,"dataType":"double"},
                    data: {"in":"body","name":"data","required":true,"ref":"IBlogCommentUpdateProps"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new BlogController();


            const promise = controller.updateCommentById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.delete('/blogs/comments/:commentId',
            authenticateMiddleware([{"jwt":["admin","editor","customer"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    commentId: {"in":"path","name":"commentId","required":true,"dataType":"double"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new BlogController();


            const promise = controller.deleteCommentById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/products',
            function (request: any, response: any, next: any) {
            const args = {
                    category: {"in":"query","name":"category","dataType":"double"},
                    brand: {"in":"query","name":"brand","dataType":"double"},
                    limit: {"in":"query","name":"limit","dataType":"double"},
                    page: {"in":"query","name":"page","dataType":"double"},
                    sort: {"in":"query","name":"sort","ref":"ProductField"},
                    change: {"in":"query","name":"change","ref":"Change"},
                    search: {"in":"query","name":"search","dataType":"string"},
                    min: {"in":"query","name":"min","dataType":"double"},
                    max: {"in":"query","name":"max","dataType":"double"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductController();


            const promise = controller.getProducts.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/products/:id',
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductController();


            const promise = controller.getProductById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.post('/products',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    data: {"in":"body","name":"data","required":true,"ref":"IProductCreateProps"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductController();


            const promise = controller.createProduct.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.patch('/products/:id',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    data: {"in":"body","name":"data","required":true,"ref":"IProductUpdateProps"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductController();


            const promise = controller.updateProductById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.delete('/products/:id',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductController();


            const promise = controller.deleteProductById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.post('/products/variant',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    data: {"in":"body","name":"data","required":true,"ref":"IProductVariantCreateProps"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductController();


            const promise = controller.createProductVariant.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.patch('/products/variant/:variantId',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    variantId: {"in":"path","name":"variantId","required":true,"dataType":"double"},
                    data: {"in":"body","name":"data","required":true,"ref":"IProductVariantUpdateProps"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductController();


            const promise = controller.updateProductVariant.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.delete('/products/variant/:variantId',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    variantId: {"in":"path","name":"variantId","required":true,"dataType":"double"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductController();


            const promise = controller.deleteProductVariant.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/users',
            authenticateMiddleware([{"jwt":["admin"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    search: {"in":"query","name":"search","dataType":"string"},
                    role: {"in":"query","name":"role","ref":"UserRole"},
                    limit: {"in":"query","name":"limit","dataType":"double"},
                    page: {"in":"query","name":"page","dataType":"double"},
                    sort: {"in":"query","name":"sort","ref":"UserField"},
                    change: {"in":"query","name":"change","ref":"Change"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UserController();


            const promise = controller.getUsers.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/users/:id',
            authenticateMiddleware([{"jwt":["admin","editor","customer"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UserController();


            const promise = controller.getUserById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.post('/users',
            authenticateMiddleware([{"jwt":["admin"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    data: {"in":"body","name":"data","required":true,"ref":"IUserCreateProps"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UserController();


            const promise = controller.createUser.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.patch('/users/:id',
            authenticateMiddleware([{"jwt":["admin","editor","customer"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    data: {"in":"body","name":"data","required":true,"ref":"IUserUpdateProps"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UserController();


            const promise = controller.updateUser.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.post('/auth/register',
            function (request: any, response: any, next: any) {
            const args = {
                    data: {"in":"body","name":"data","required":true,"ref":"IUserCreateProps"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AuthController();


            const promise = controller.register.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.post('/auth/login',
            function (request: any, response: any, next: any) {
            const args = {
                    data: {"in":"body","name":"data","required":true,"ref":"ILogin"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AuthController();


            const promise = controller.login.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.post('/auth/admin/login',
            function (request: any, response: any, next: any) {
            const args = {
                    data: {"in":"body","name":"data","required":true,"ref":"ILogin"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AuthController();


            const promise = controller.adminLogin.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/auth/token',
            function (request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AuthController();


            const promise = controller.revokeToken.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/orders',
            authenticateMiddleware([{"jwt":["admin"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    search: {"in":"query","name":"search","dataType":"string"},
                    limit: {"in":"query","name":"limit","dataType":"double"},
                    page: {"in":"query","name":"page","dataType":"double"},
                    time: {"in":"query","name":"time","dataType":"string"},
                    status: {"in":"query","name":"status","dataType":"string"},
                    paymentCheck: {"in":"query","name":"paymentCheck","dataType":"string"},
                    sort: {"in":"query","name":"sort","ref":"OrderField"},
                    change: {"in":"query","name":"change","ref":"Change"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new OrderController();


            const promise = controller.getOrders.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.post('/orders',
            authenticateMiddleware([{"jwt":["admin","customer","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    data: {"in":"body","name":"data","required":true,"ref":"IOrderCreateProps"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new OrderController();


            const promise = controller.createOrder.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/orders/:userId/all',
            authenticateMiddleware([{"jwt":["admin","customer","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"double"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new OrderController();


            const promise = controller.getOrdersOfUser.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/orders/:userId/current',
            authenticateMiddleware([{"jwt":["admin","customer","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"double"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new OrderController();


            const promise = controller.getCurrentOrderOfUser.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/orders/:orderId',
            authenticateMiddleware([{"jwt":["admin","customer","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    orderId: {"in":"path","name":"orderId","required":true,"dataType":"double"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new OrderController();


            const promise = controller.getOrderById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.patch('/orders/:orderId/addItems',
            authenticateMiddleware([{"jwt":["admin","customer","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    orderId: {"in":"path","name":"orderId","required":true,"dataType":"double"},
                    data: {"in":"body","name":"data","required":true,"ref":"IOrderUpdateItems"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new OrderController();


            const promise = controller.updateOrderItems.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.patch('/orders/:orderId/updateStatus',
            authenticateMiddleware([{"jwt":["admin","customer","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    orderId: {"in":"path","name":"orderId","required":true,"dataType":"double"},
                    data: {"in":"body","name":"data","required":true,"ref":"IOrderUpdateProps"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new OrderController();


            const promise = controller.updateOrderStatus.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.patch('/orders/:orderId/place',
            authenticateMiddleware([{"jwt":["admin","customer","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    orderId: {"in":"path","name":"orderId","required":true,"dataType":"double"},
                    data: {"in":"body","name":"data","required":true,"ref":"IPlaceOrder"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new OrderController();


            const promise = controller.placeOrder.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.delete('/orders/:orderId',
            authenticateMiddleware([{"jwt":["admin","customer","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    orderId: {"in":"path","name":"orderId","required":true,"dataType":"double"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new OrderController();


            const promise = controller.deleteOrderById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.post('/orders/:orderId/items',
            authenticateMiddleware([{"jwt":["admin","customer","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    orderId: {"in":"path","name":"orderId","required":true,"dataType":"double"},
                    data: {"in":"body","name":"data","required":true,"ref":"IOrderDetailCreateProps"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new OrderController();


            const promise = controller.addItemToOrder.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.patch('/orders/items/:itemId',
            authenticateMiddleware([{"jwt":["admin","customer","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    itemId: {"in":"path","name":"itemId","required":true,"dataType":"double"},
                    data: {"in":"body","name":"data","required":true,"ref":"IOrderDetailQtyUpdate"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new OrderController();


            const promise = controller.updateItemQuantity.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.delete('/orders/items/:itemId',
            authenticateMiddleware([{"jwt":["admin","customer","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    itemId: {"in":"path","name":"itemId","required":true,"dataType":"double"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new OrderController();


            const promise = controller.deleteItem.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/ping',
            function (request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new PingController();


            const promise = controller.getMessage.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/blog-categories',
            function (request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new BlogCategoryController();


            const promise = controller.getBlogCategory.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.post('/blog-categories',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    data: {"in":"body","name":"data","required":true,"ref":"IBlogCategoryCreateProps"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new BlogCategoryController();


            const promise = controller.createBlogCategory.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.patch('/blog-categories/:id',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    data: {"in":"body","name":"data","required":true,"ref":"IBlogCategoryCreateProps"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new BlogCategoryController();


            const promise = controller.updateBlogCategoryById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.delete('/blog-categories/:id',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new BlogCategoryController();


            const promise = controller.deleteBlogCategoryById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/sizes',
            function (request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new SizeController();


            const promise = controller.getSizes.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.post('/sizes',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    data: {"in":"body","name":"data","required":true,"ref":"ISizeCreateProps"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new SizeController();


            const promise = controller.createSize.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.patch('/sizes/:id',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    data: {"in":"body","name":"data","required":true,"ref":"ISizeUpdateProps"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new SizeController();


            const promise = controller.updateSizeById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.delete('/sizes/:id',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new SizeController();


            const promise = controller.deleteSizeById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/brands',
            function (request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new BrandController();


            const promise = controller.getBrands.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.post('/brands',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    data: {"in":"body","name":"data","required":true,"ref":"IBrandCreateProps"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new BrandController();


            const promise = controller.createBrand.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.patch('/brands/:id',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    data: {"in":"body","name":"data","required":true,"ref":"IBrandUpdateProps"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new BrandController();


            const promise = controller.updateBrandById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.delete('/brands/:id',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new BrandController();


            const promise = controller.deleteBrandById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/product-categories',
            function (request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductCategoryController();


            const promise = controller.getProductCategorys.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.post('/product-categories',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    data: {"in":"body","name":"data","required":true,"ref":"IProductCategoryCreateProps"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductCategoryController();


            const promise = controller.createProductCategory.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.patch('/product-categories/:id',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    data: {"in":"body","name":"data","required":true,"ref":"IProductCategoryUpdateProps"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductCategoryController();


            const promise = controller.updateProductCategoryById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.delete('/product-categories/:id',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ProductCategoryController();


            const promise = controller.deleteProductCategoryById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/colors',
            function (request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ColorController();


            const promise = controller.getColors.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.post('/colors',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    data: {"in":"body","name":"data","required":true,"ref":"IColorCreateProps"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ColorController();


            const promise = controller.createColor.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.patch('/colors/:id',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    data: {"in":"body","name":"data","required":true,"ref":"IColorUpdateProps"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ColorController();


            const promise = controller.updateColorById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.delete('/colors/:id',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ColorController();


            const promise = controller.deleteColorById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });

    function authenticateMiddleware(securities: TsoaRoute.Security[] = []) {
        return (request: any, _response: any, next: any) => {
            let responded = 0;
            let success = false;
            Object.keys(securities[0])
              .forEach(name => {
                expressAuthentication(request, name, securities[0][name]).then((user: any) => {
                  // only need to respond once
                  if (!success) {
                    success=true;
                    responded++;
                    request['user']=user;
                    next();
                  }
                })
                  .catch((error: any) => {
                    responded++;
                    if (responded==securities.length&&!success) {
                      _response.status(error.status || 401);
                      next(error)
                    }
                  })
              })
        }
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode;
                if (controllerObj instanceof Controller) {
                    const controller = controllerObj as Controller
                    const headers = controller.getHeaders();
                    Object.keys(headers).forEach((name: string) => {
                        response.set(name, headers[name]);
                    });

                    statusCode = controller.getStatus();
                }
                if (typeof controllerObj.getCookies === 'function') {
                    const cookies = controllerObj.getCookies();
                    Object.keys(cookies).forEach((name: string) => {
                        if(!cookies[name]) {
                            response.clearCookie(name);
                        } else {
                            response.cookie(name, cookies[name].value, cookies[name].options);
                        }
                    });
                }
                if (data !== null && data !== undefined) {
                    response.status(statusCode || 200).json(data);
                } else {
                    response.status(statusCode || 204).end();
                }
            })
            .catch((error: any) => next(error));
    }

    function getValidatedArgs(args: any, request: any): any[] {
        const errorFields: FieldErrors = {};
        const values = Object.keys(args).map(function(key) {
            const name = args[key].name;
            switch (args[key].in) {
            case 'request':
                return request;
            case 'query':
                return ValidateParam(args[key], request.query[name], models, name, errorFields, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
            case 'path':
                return ValidateParam(args[key], request.params[name], models, name, errorFields, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
            case 'header':
                return ValidateParam(args[key], request.header(name), models, name, errorFields, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
            case 'body':
                return ValidateParam(args[key], request.body, models, name, errorFields, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
            case 'body-prop':
                return ValidateParam(args[key], request.body[name], models, name, errorFields, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
            }
        });

        if (Object.keys(errorFields).length > 0) {
            throw new ValidateError(errorFields, '');
        }
        return values;
    }
}