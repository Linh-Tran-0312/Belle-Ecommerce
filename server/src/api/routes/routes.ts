/* tslint:disable */
/* eslint-disable */
import { Controller, ValidateParam, FieldErrors, ValidateError, TsoaRoute } from '@tsoa/runtime';
import { iocContainer } from './../ioc';
import { AuthController } from './../controllers/authController';
import { BlogCategoryController } from './../controllers/blogCategoryController';
import { BlogController } from './../controllers/blogController';
import { BrandController } from './../controllers/brandController';
import { ColorController } from './../controllers/colorController';
import { OrderController } from './../controllers/orderController';
import { PingController } from './../controllers/pingController';
import { ProductCategoryController } from './../controllers/productCategoryController';
import { ProductController } from './../controllers/productController';
import { SizeController } from './../controllers/sizeController';
import { UserController } from './../controllers/userController';
import { ReportController } from './../controllers/reportController';
import { ReviewController } from './../controllers/reviewController';
import { expressAuthentication } from './../middlewares/AuthHandler';

const models: TsoaRoute.Models = {
    "UserRole": {
        "dataType": "refEnum",
        "enums": ["admin","editor","customer"],
    },
    "IUserAuth": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "fname": {"dataType":"string","required":true},
            "lname": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "phone": {"dataType":"string"},
            "address": {"dataType":"string"},
            "role": {"ref":"UserRole"},
        },
        "additionalProperties": false,
    },
    "ValidateUserCreateModel": {
        "dataType": "refObject",
        "properties": {
            "fname": {"dataType":"string","required":true,"validators":{"pattern":{"errorMsg":"First name must not be empty","value":"^(?!\\s*$).+"}}},
            "lname": {"dataType":"string","required":true,"validators":{"pattern":{"errorMsg":"Last name must not be empty","value":"^(?!\\s*$).+"}}},
            "email": {"dataType":"string","required":true,"validators":{"pattern":{"errorMsg":"Email is invalid","value":"^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$"}}},
            "role": {"ref":"UserRole"},
            "phone": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"Phone number is invalid","value":9},"pattern":{"errorMsg":"Phone number is invalid","value":"[0-9]{9,12}"}}},
            "address": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"Address is invalid","value":5}}},
            "password": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"Password must be at least 6 characters","value":6}}},
        },
        "additionalProperties": false,
    },
    "ValidateLoginModel": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true,"validators":{"pattern":{"errorMsg":"Email is invalid","value":"^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$"}}},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    "IRefreshMessage": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
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
    "ValidateBlogCateModel": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true,"validators":{"pattern":{"errorMsg":"Blog category must not be empty","value":"^(?!\\s*$).+"}}},
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
            "category": {"ref":"BlogCategory","required":true},
            "imgPath": {"dataType":"string","required":true},
            "content": {"dataType":"string","required":true},
            "commentAllow": {"dataType":"boolean","required":true},
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
    "ValidateBlogModel": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string","required":true,"validators":{"pattern":{"errorMsg":"Blog title must not be empty","value":"^(?!\\s*$).+"}}},
            "categoryId": {"dataType":"integer","required":true,"validators":{"isInt":{"errorMsg":"Category id must be an integer"},"minimum":{"errorMsg":"Category id value must be at least 0","value":0}}},
            "imgPath": {"dataType":"string"},
            "content": {"dataType":"string","required":true},
            "commentAllow": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    "BlogComment": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "text": {"dataType":"string","required":true},
            "blogId": {"dataType":"double","required":true},
            "blog": {"ref":"Blog","required":true},
            "parentCommentId": {"dataType":"double","required":true},
            "parentComment": {"ref":"BlogComment","required":true},
            "userId": {"dataType":"double","required":true},
            "user": {"ref":"User","required":true},
            "childComments": {"dataType":"array","array":{"dataType":"refObject","ref":"BlogComment"},"required":true},
        },
        "additionalProperties": false,
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
            "token": {"dataType":"string","required":true},
            "phone": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "address": {"dataType":"string","required":true},
            "role": {"ref":"UserRole","required":true},
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
            "category": {"ref":"ProductCategory","required":true},
            "brandId": {"dataType":"double","required":true},
            "brand": {"ref":"Brand","required":true},
            "name": {"dataType":"string","required":true},
            "summary": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "overallReview": {"dataType":"double","required":true},
            "reviewCount": {"dataType":"double","required":true},
            "price": {"dataType":"double","required":true},
            "imgPaths": {"dataType":"array","array":{"dataType":"string"},"required":true},
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
            "user": {"ref":"User","required":true},
            "productId": {"dataType":"double","required":true},
            "product": {"ref":"Product","required":true},
            "parentCommentId": {"dataType":"double","required":true},
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
            "product": {"ref":"Product","required":true},
            "sizeId": {"dataType":"double","required":true},
            "size": {"ref":"Size","required":true},
            "colorId": {"dataType":"double","required":true},
            "color": {"ref":"Color","required":true},
            "quantity": {"dataType":"double","required":true},
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
            "rating": {"dataType":"double","required":true},
            "userId": {"dataType":"double","required":true},
            "user": {"ref":"User","required":true},
            "productId": {"dataType":"double","required":true},
            "product": {"ref":"Product","required":true},
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
    "Order": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "userId": {"dataType":"double","required":true},
            "user": {"ref":"User","required":true},
            "status": {"ref":"Status","required":true},
            "paymentMethod": {"ref":"PaymentMethod","required":true},
            "paymentCheck": {"dataType":"boolean","required":true},
            "note": {"dataType":"string","required":true},
            "address": {"dataType":"string","required":true},
            "shipping": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
            "orderAt": {"dataType":"datetime","required":true},
            "details": {"dataType":"array","array":{"dataType":"refObject","ref":"OrderDetail"},"required":true},
        },
        "additionalProperties": false,
    },
    "OrderDetail": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "orderId": {"dataType":"double","required":true},
            "order": {"ref":"Order","required":true},
            "productVariantId": {"dataType":"double","required":true},
            "productVariant": {"ref":"ProductVariant","required":true},
            "quantity": {"dataType":"double","required":true},
            "unitPrice": {"dataType":"double","required":true},
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
    "ValidateBrandModel": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true,"validators":{"pattern":{"errorMsg":"Brand must not be empty","value":"^(?!\\s*$).+"}}},
            "imgPath": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    "ValidateColorModel": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true,"validators":{"pattern":{"errorMsg":"Category must not be empty","value":"^(?!\\s*$).+"}}},
            "code": {"dataType":"string","required":true,"validators":{"maxLength":{"value":7},"pattern":{"errorMsg":"Color code must be HEX format","value":"^[#]\\w{6}"}}},
        },
        "additionalProperties": false,
    },
    "IUserName": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "fname": {"dataType":"string","required":true},
            "lname": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    "IOrderSearchProps": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "status": {"ref":"Status","required":true},
            "paymentMethod": {"ref":"PaymentMethod","required":true},
            "paymentCheck": {"dataType":"boolean","required":true},
            "address": {"dataType":"string","required":true},
            "total": {"dataType":"double","required":true},
            "shipping": {"dataType":"double"},
            "note": {"dataType":"string"},
            "orderAt": {"dataType":"datetime","required":true},
            "user": {"ref":"IUserName","required":true},
        },
        "additionalProperties": false,
    },
    "IOrders": {
        "dataType": "refObject",
        "properties": {
            "orders": {"dataType":"array","array":{"dataType":"refObject","ref":"IOrderSearchProps"},"required":true},
            "total": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    "Period": {
        "dataType": "refEnum",
        "enums": ["today","week","month","quarter","year"],
    },
    "OrderField": {
        "dataType": "refEnum",
        "enums": ["orderAt","total"],
    },
    "IItemDetails": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "orderId": {"dataType":"double","required":true},
            "quantity": {"dataType":"double","required":true},
            "unitPrice": {"dataType":"double","required":true},
            "productVariantId": {"dataType":"double","required":true},
            "product": {"dataType":"nestedObjectLiteral","nestedProperties":{"size":{"dataType":"string","required":true},"color":{"dataType":"string","required":true},"brand":{"dataType":"string","required":true},"imgPaths":{"dataType":"array","array":{"dataType":"string"},"required":true},"name":{"dataType":"string","required":true},"id":{"dataType":"double","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    "IOrderInfo": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "status": {"ref":"Status","required":true},
            "paymentMethod": {"ref":"PaymentMethod","required":true},
            "paymentCheck": {"dataType":"boolean","required":true},
            "address": {"dataType":"string","required":true},
            "total": {"dataType":"double","required":true},
            "shipping": {"dataType":"double"},
            "note": {"dataType":"string"},
            "orderAt": {"dataType":"datetime","required":true},
            "user": {"ref":"IUserAuth","required":true},
            "details": {"dataType":"array","array":{"dataType":"refObject","ref":"IItemDetails"},"required":true},
        },
        "additionalProperties": false,
    },
    "ValidateOrderDetailModel": {
        "dataType": "refObject",
        "properties": {
            "orderId": {"dataType":"integer","validators":{"minimum":{"value":0}}},
            "productVariantId": {"dataType":"integer","required":true,"validators":{"minimum":{"value":0}}},
            "quantity": {"dataType":"integer","required":true,"validators":{"minimum":{"value":0}}},
            "unitPrice": {"dataType":"double","required":true,"validators":{"minimum":{"value":0}}},
        },
        "additionalProperties": false,
    },
    "ValidateOrderCreateModel": {
        "dataType": "refObject",
        "properties": {
            "details": {"dataType":"array","array":{"dataType":"refObject","ref":"ValidateOrderDetailModel"},"required":true},
            "userId": {"dataType":"integer","required":true,"validators":{"minimum":{"value":0}}},
        },
        "additionalProperties": false,
    },
    "IOrderBasicProps": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "status": {"ref":"Status","required":true},
            "paymentMethod": {"ref":"PaymentMethod","required":true},
            "paymentCheck": {"dataType":"boolean","required":true},
            "address": {"dataType":"string","required":true},
            "total": {"dataType":"double","required":true},
            "shipping": {"dataType":"double"},
            "note": {"dataType":"string"},
            "orderAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    "ValidateOrderUpdateModel": {
        "dataType": "refObject",
        "properties": {
            "details": {"dataType":"array","array":{"dataType":"refObject","ref":"ValidateOrderDetailModel"},"required":true},
        },
        "additionalProperties": false,
    },
    "ValidateOrderStatusModel": {
        "dataType": "refObject",
        "properties": {
            "paymentMethod": {"ref":"PaymentMethod","required":true},
            "paymentCheck": {"dataType":"boolean","required":true},
            "status": {"ref":"Status","required":true},
        },
        "additionalProperties": false,
    },
    "ValidateOrderPlacementModel": {
        "dataType": "refObject",
        "properties": {
            "address": {"dataType":"string","required":true,"validators":{"pattern":{"errorMsg":"Address must not be empty","value":"^(?!\\s*$).+"}}},
            "paymentMethod": {"ref":"PaymentMethod","required":true},
            "paymentCheck": {"dataType":"boolean"},
            "note": {"dataType":"string"},
            "shipping": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    "ValidateUpdateQuantityModel": {
        "dataType": "refObject",
        "properties": {
            "quantity": {"dataType":"integer","required":true},
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
    "ValidateCategoryModel": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true,"validators":{"pattern":{"errorMsg":"Category must not be empty","value":"^(?!\\s*$).+"}}},
            "imgPath": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    "IProductSearchProps": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "sku": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "overallReview": {"dataType":"double","required":true},
            "price": {"dataType":"double","required":true},
            "imgPaths": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "brand": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string","required":true},"id":{"dataType":"double","required":true}},"required":true},
            "category": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string","required":true},"id":{"dataType":"double","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    "IProducts": {
        "dataType": "refObject",
        "properties": {
            "products": {"dataType":"array","array":{"dataType":"refObject","ref":"IProductSearchProps"},"required":true},
            "total": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    "ProductField": {
        "dataType": "refEnum",
        "enums": ["price","name","overallReview","createdAt"],
    },
    "IVariantInfo": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "productId": {"dataType":"double","required":true},
            "quantity": {"dataType":"double","required":true},
            "color": {"dataType":"nestedObjectLiteral","nestedProperties":{"code":{"dataType":"string","required":true},"name":{"dataType":"string","required":true},"id":{"dataType":"double","required":true}},"required":true},
            "size": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string","required":true},"id":{"dataType":"double","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    "IProductInfo": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "sku": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "overallReview": {"dataType":"double","required":true},
            "price": {"dataType":"double","required":true},
            "imgPaths": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "brand": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string","required":true},"id":{"dataType":"double","required":true}},"required":true},
            "category": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string","required":true},"id":{"dataType":"double","required":true}},"required":true},
            "summary": {"dataType":"string","required":true},
            "variants": {"dataType":"array","array":{"dataType":"refObject","ref":"IVariantInfo"},"required":true},
        },
        "additionalProperties": false,
    },
    "ValidateProductCreateModel": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true,"validators":{"pattern":{"errorMsg":"Product name must not be empty","value":"^(?!\\s*$).+"}}},
            "sku": {"dataType":"string"},
            "categoryId": {"dataType":"integer","required":true,"validators":{"isInt":{"errorMsg":"Category id must be an integer"},"minimum":{"errorMsg":"Category id value must be at least 0","value":0}}},
            "brandId": {"dataType":"integer","required":true,"validators":{"isInt":{"errorMsg":"Brand id must be an integer"},"minimum":{"errorMsg":"Brand id value must be at least 0","value":0}}},
            "imgPaths": {"dataType":"array","array":{"dataType":"string"},"validators":{"minItems":{"value":0}}},
            "summary": {"dataType":"string"},
            "description": {"dataType":"string"},
            "price": {"dataType":"double","required":true,"validators":{"minimum":{"errorMsg":"Price value must be at least 0","value":0}}},
        },
        "additionalProperties": false,
    },
    "ValidateProductUpdateModel": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true,"validators":{"pattern":{"errorMsg":"Product name must not be empty","value":"^(?!\\s*$).+"}}},
            "sku": {"dataType":"string"},
            "categoryId": {"dataType":"integer","required":true,"validators":{"isInt":{"errorMsg":"Category id must be an integer"},"minimum":{"errorMsg":"Category id value must be at least 0","value":0}}},
            "brandId": {"dataType":"integer","required":true,"validators":{"isInt":{"errorMsg":"Brand id must be an integer"},"minimum":{"errorMsg":"Brand id value must be at least 0","value":0}}},
            "imgPaths": {"dataType":"array","array":{"dataType":"string"},"validators":{"minItems":{"value":0}}},
            "summary": {"dataType":"string"},
            "description": {"dataType":"string"},
            "price": {"dataType":"double","required":true,"validators":{"minimum":{"errorMsg":"Price value must be at least 0","value":0}}},
            "id": {"dataType":"integer","required":true,"validators":{"isInt":{"errorMsg":"Product id must be an integer"},"minimum":{"errorMsg":"Product id value must be at least 0","value":0}}},
        },
        "additionalProperties": false,
    },
    "ValidateVariantCreateModel": {
        "dataType": "refObject",
        "properties": {
            "sizeId": {"dataType":"integer","required":true,"validators":{"isInt":{"errorMsg":"Size id must be an integer"},"minimum":{"errorMsg":"Size id value must be at least 0","value":0}}},
            "colorId": {"dataType":"integer","required":true,"validators":{"isInt":{"errorMsg":"Color id must be an integer"},"minimum":{"errorMsg":"Color id value must be at least 0","value":0}}},
            "quantity": {"dataType":"integer","required":true,"validators":{"isInt":{"errorMsg":"Quantity must be an integer"},"minimum":{"errorMsg":"Quantity value must be at least 0","value":0}}},
            "productId": {"dataType":"integer","required":true,"validators":{"isInt":{"errorMsg":"Product id must be an integer"},"minimum":{"errorMsg":"Product id value must be at least 0","value":0}}},
        },
        "additionalProperties": false,
    },
    "ValidateVariantUpdateModel": {
        "dataType": "refObject",
        "properties": {
            "sizeId": {"dataType":"integer","required":true,"validators":{"isInt":{"errorMsg":"Size id must be an integer"},"minimum":{"errorMsg":"Size id value must be at least 0","value":0}}},
            "colorId": {"dataType":"integer","required":true,"validators":{"isInt":{"errorMsg":"Color id must be an integer"},"minimum":{"errorMsg":"Color id value must be at least 0","value":0}}},
            "quantity": {"dataType":"integer","required":true,"validators":{"isInt":{"errorMsg":"Quantity must be an integer"},"minimum":{"errorMsg":"Quantity value must be at least 0","value":0}}},
        },
        "additionalProperties": false,
    },
    "ValidateSizeModel": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true,"validators":{"pattern":{"errorMsg":"Size must not be empty","value":"^(?!\\s*$).+"}}},
        },
        "additionalProperties": false,
    },
    "IUserSearchProps": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "fname": {"dataType":"string","required":true},
            "lname": {"dataType":"string","required":true},
            "phone": {"dataType":"string","required":true},
            "address": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "role": {"ref":"UserRole","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "sale": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    "IUsers": {
        "dataType": "refObject",
        "properties": {
            "users": {"dataType":"array","array":{"dataType":"refObject","ref":"IUserSearchProps"},"required":true},
            "total": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    "UserField": {
        "dataType": "refEnum",
        "enums": ["fname","sale","createdAt"],
    },
    "IUserWithOrders": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "fname": {"dataType":"string","required":true},
            "lname": {"dataType":"string","required":true},
            "phone": {"dataType":"string","required":true},
            "address": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "role": {"ref":"UserRole","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "orders": {"dataType":"array","array":{"dataType":"refObject","ref":"IOrderBasicProps"}},
        },
        "additionalProperties": false,
    },
    "ValidateUserUpdateModel": {
        "dataType": "refObject",
        "properties": {
            "fname": {"dataType":"string","required":true,"validators":{"pattern":{"errorMsg":"First name must not be empty","value":"^(?!\\s*$).+"}}},
            "lname": {"dataType":"string","required":true,"validators":{"pattern":{"errorMsg":"Last name must not be empty","value":"^(?!\\s*$).+"}}},
            "email": {"dataType":"string","required":true,"validators":{"pattern":{"errorMsg":"Email is invalid","value":"^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$"}}},
            "role": {"ref":"UserRole"},
            "phone": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"Phone number is invalid","value":9},"pattern":{"errorMsg":"Phone number is invalid","value":"[0-9]{9,12}"}}},
            "address": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"Address is invalid","value":5}}},
        },
        "additionalProperties": false,
    },
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
    "IProductReports": {
        "dataType": "refObject",
        "properties": {
            "total": {"dataType":"double","required":true},
            "products": {"dataType":"array","array":{"dataType":"refObject","ref":"IProductReport"},"required":true},
        },
        "additionalProperties": false,
    },
    "IReview": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string","required":true},
            "text": {"dataType":"string","required":true},
            "productId": {"dataType":"double","required":true},
            "rating": {"dataType":"double","required":true},
            "userId": {"dataType":"double","required":true},
            "user": {"ref":"IUserName","required":true},
        },
        "additionalProperties": false,
    },
    "IReviewCount": {
        "dataType": "refObject",
        "properties": {
            "reviewCount": {"dataType":"double","required":true},
            "overallReview": {"dataType":"double","required":true},
            "details": {"dataType":"array","array":{"dataType":"double"},"required":true},
        },
        "additionalProperties": false,
    },
    "ValidateReviewModel": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string"},
            "text": {"dataType":"string"},
            "productId": {"dataType":"integer","required":true,"validators":{"isInt":{"errorMsg":"Product id must be an integer"},"minimum":{"errorMsg":"Product id value must be at least 0","value":0}}},
            "rating": {"dataType":"integer","required":true,"validators":{"isInt":{"errorMsg":"Rating must be an integer"},"minimum":{"errorMsg":"Min rating must be 1","value":1},"maximum":{"errorMsg":"Max rating must be 5","value":5}}},
            "userId": {"dataType":"integer","required":true,"validators":{"isInt":{"errorMsg":"User id must be an integer"},"minimum":{"errorMsg":"User id value must be at least 0","value":0}}},
        },
        "additionalProperties": false,
    },
};

export function RegisterRoutes(app: any) {
        app.get('/auth/user',
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

            const controller = iocContainer.get<AuthController>(AuthController);


            const promise = controller.getUserProfile.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.post('/auth/user/register',
            function (request: any, response: any, next: any) {
            const args = {
                    data: {"in":"body","name":"data","required":true,"ref":"ValidateUserCreateModel"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<AuthController>(AuthController);


            const promise = controller.register.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.post('/auth/user/login',
            function (request: any, response: any, next: any) {
            const args = {
                    data: {"in":"body","name":"data","required":true,"ref":"ValidateLoginModel"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<AuthController>(AuthController);


            const promise = controller.login.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/auth/admin',
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

            const controller = iocContainer.get<AuthController>(AuthController);


            const promise = controller.getAdminProfile.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.post('/auth/admin/login',
            function (request: any, response: any, next: any) {
            const args = {
                    data: {"in":"body","name":"data","required":true,"ref":"ValidateLoginModel"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<AuthController>(AuthController);


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

            const controller = iocContainer.get<AuthController>(AuthController);


            const promise = controller.RefreshToken.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/auth/logout',
            function (request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<AuthController>(AuthController);


            const promise = controller.logout.apply(controller, validatedArgs as any);
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

            const controller = iocContainer.get<BlogCategoryController>(BlogCategoryController);


            const promise = controller.getBlogCategory.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.post('/blog-categories',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    data: {"in":"body","name":"data","required":true,"ref":"ValidateBlogCateModel"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<BlogCategoryController>(BlogCategoryController);


            const promise = controller.createBlogCategory.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.patch('/blog-categories/:id',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"Blog category id must be an integer"},"minimum":{"errorMsg":"Blog category id value must be at least 0","value":0}}},
                    data: {"in":"body","name":"data","required":true,"ref":"ValidateBlogCateModel"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<BlogCategoryController>(BlogCategoryController);


            const promise = controller.updateBlogCategoryById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.delete('/blog-categories/:id',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"Blog category id must be an integer"},"minimum":{"errorMsg":"Blog category id value must be at least 0","value":0}}},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<BlogCategoryController>(BlogCategoryController);


            const promise = controller.deleteBlogCategoryById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/blogs',
            function (request: any, response: any, next: any) {
            const args = {
                    category: {"in":"query","name":"category","dataType":"integer","validators":{"isInt":{"errorMsg":"Blog category id must be an integer"},"minimum":{"errorMsg":"Blog category id value must be at least 0","value":0}}},
                    limit: {"in":"query","name":"limit","dataType":"integer","validators":{"isInt":{"errorMsg":"Limit must be an integer"},"minimum":{"errorMsg":"Limit must be at least 1","value":1}}},
                    sort: {"in":"query","name":"sort","ref":"BlogField"},
                    page: {"in":"query","name":"page","dataType":"integer","validators":{"isInt":{"errorMsg":"Page must be an integer"},"minimum":{"errorMsg":"Page must be at least 1","value":1}}},
                    change: {"in":"query","name":"change","ref":"Change"},
                    search: {"in":"query","name":"search","dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<BlogController>(BlogController);


            const promise = controller.getBlogs.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.post('/blogs',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    data: {"in":"body","name":"data","required":true,"ref":"ValidateBlogModel"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<BlogController>(BlogController);


            const promise = controller.createBlog.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/blogs/:id',
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"Blog id must be an integer"},"minimum":{"errorMsg":"Blog id must be at least 0","value":0}}},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<BlogController>(BlogController);


            const promise = controller.getBlogById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.patch('/blogs/:id',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"Blog id must be an integer"},"minimum":{"errorMsg":"Blog id must be at least 0","value":0}}},
                    data: {"in":"body","name":"data","required":true,"ref":"ValidateBlogModel"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<BlogController>(BlogController);


            const promise = controller.updateBlogById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.delete('/blogs/:id',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"Blog id must be an integer"},"minimum":{"errorMsg":"Blog id must be at least 0","value":0}}},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<BlogController>(BlogController);


            const promise = controller.deleteBlogById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/blogs/:blogId/comments',
            function (request: any, response: any, next: any) {
            const args = {
                    blogId: {"in":"path","name":"blogId","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"blogId"},"minimum":{"value":0}}},
                    date: {"in":"query","name":"date","dataType":"string"},
                    limit: {"in":"query","name":"limit","dataType":"integer","validators":{"isInt":{"errorMsg":"limit"},"minimum":{"value":1}}},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<BlogController>(BlogController);


            const promise = controller.getCommentsOfBlog.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.post('/blogs/comments',
            authenticateMiddleware([{"jwt":["admin","editor","customer"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    data: {"in":"body","name":"data","required":true,"ref":"BlogComment"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<BlogController>(BlogController);


            const promise = controller.createComment.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.patch('/blogs/comments/:commentId',
            authenticateMiddleware([{"jwt":["admin","editor","customer"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    commentId: {"in":"path","name":"commentId","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"commentId"},"minimum":{"value":0}}},
                    data: {"in":"body","name":"data","required":true,"ref":"IBlogCommentUpdateProps"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<BlogController>(BlogController);


            const promise = controller.updateCommentById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.delete('/blogs/comments/:commentId',
            authenticateMiddleware([{"jwt":["admin","editor","customer"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    commentId: {"in":"path","name":"commentId","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"commentId"},"minimum":{"value":0}}},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<BlogController>(BlogController);


            const promise = controller.deleteCommentById.apply(controller, validatedArgs as any);
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

            const controller = iocContainer.get<BrandController>(BrandController);


            const promise = controller.getBrands.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.post('/brands',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    data: {"in":"body","name":"data","required":true,"ref":"ValidateBrandModel"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<BrandController>(BrandController);


            const promise = controller.createBrand.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.patch('/brands/:id',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"Brand id must be an integer"},"minimum":{"errorMsg":"Brand id must be at least 0","value":0}}},
                    data: {"in":"body","name":"data","required":true,"ref":"ValidateBrandModel"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<BrandController>(BrandController);


            const promise = controller.updateBrandById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.delete('/brands/:id',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"Brand id must be an integer"},"minimum":{"errorMsg":"Brand id must be at least 0","value":0}}},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<BrandController>(BrandController);


            const promise = controller.deleteBrandById.apply(controller, validatedArgs as any);
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

            const controller = iocContainer.get<ColorController>(ColorController);


            const promise = controller.getColors.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.post('/colors',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    data: {"in":"body","name":"data","required":true,"ref":"ValidateColorModel"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<ColorController>(ColorController);


            const promise = controller.createColor.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.patch('/colors/:id',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"Color id must be an integer"},"minimum":{"errorMsg":"Color id must be at least 0","value":0}}},
                    data: {"in":"body","name":"data","required":true,"ref":"ValidateColorModel"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<ColorController>(ColorController);


            const promise = controller.updateColorById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.delete('/colors/:id',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"Color id must be an integer"},"minimum":{"errorMsg":"Color id must be at least 0","value":0}}},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<ColorController>(ColorController);


            const promise = controller.deleteColorById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/orders',
            authenticateMiddleware([{"jwt":["admin"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    search: {"in":"query","name":"search","dataType":"string"},
                    limit: {"in":"query","name":"limit","dataType":"integer","validators":{"isInt":{"errorMsg":"Limit must be an integer"},"minimum":{"errorMsg":"Limit must be at least 1","value":1}}},
                    page: {"in":"query","name":"page","dataType":"integer","validators":{"isInt":{"errorMsg":"Page must be an integer"},"minimum":{"errorMsg":"Page must be at least 1","value":1}}},
                    time: {"in":"query","name":"time","ref":"Period"},
                    status: {"in":"query","name":"status","ref":"Status"},
                    paymentCheck: {"in":"query","name":"paymentCheck","dataType":"boolean"},
                    sort: {"in":"query","name":"sort","ref":"OrderField"},
                    change: {"in":"query","name":"change","ref":"Change"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<OrderController>(OrderController);


            const promise = controller.getOrders.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.post('/orders',
            authenticateMiddleware([{"jwt":["admin","customer","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    data: {"in":"body","name":"data","required":true,"ref":"ValidateOrderCreateModel"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<OrderController>(OrderController);


            const promise = controller.createOrder.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/orders/:userId/all',
            authenticateMiddleware([{"jwt":["admin","customer","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"User id must be an integer"},"minimum":{"errorMsg":"User id value must be at least 0","value":0}}},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<OrderController>(OrderController);


            const promise = controller.getOrdersOfUser.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/orders/:userId/current',
            authenticateMiddleware([{"jwt":["admin","customer","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"User id must be an integer"},"minimum":{"errorMsg":"User id value must be at least 0","value":0}}},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<OrderController>(OrderController);


            const promise = controller.getCurrentOrderOfUser.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/orders/:orderId',
            authenticateMiddleware([{"jwt":["admin","customer","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    orderId: {"in":"path","name":"orderId","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"Order id must be an integer"},"minimum":{"errorMsg":"Order id value must be at least 0","value":0}}},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<OrderController>(OrderController);


            const promise = controller.getOrderById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.patch('/orders/:userId/afterLogin',
            authenticateMiddleware([{"jwt":["admin","customer","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"User id must be an integer"},"minimum":{"errorMsg":"User id value must be at least 0","value":0}}},
                    data: {"in":"body","name":"data","required":true,"ref":"ValidateOrderUpdateModel"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<OrderController>(OrderController);


            const promise = controller.updateOrderItems.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.patch('/orders/:orderId/updateStatus',
            authenticateMiddleware([{"jwt":["admin","customer","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    orderId: {"in":"path","name":"orderId","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"Order id must be an integer"},"minimum":{"errorMsg":"Order id value must be at least 0","value":0}}},
                    data: {"in":"body","name":"data","required":true,"ref":"ValidateOrderStatusModel"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<OrderController>(OrderController);


            const promise = controller.updateOrderStatus.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.patch('/orders/:orderId/place',
            authenticateMiddleware([{"jwt":["admin","customer","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    orderId: {"in":"path","name":"orderId","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"Order id must be an integer"},"minimum":{"errorMsg":"Order id value must be at least 0","value":0}}},
                    data: {"in":"body","name":"data","required":true,"ref":"ValidateOrderPlacementModel"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<OrderController>(OrderController);


            const promise = controller.placeOrder.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.delete('/orders/:orderId',
            authenticateMiddleware([{"jwt":["admin","customer","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    orderId: {"in":"path","name":"orderId","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"Order id must be an integer"},"minimum":{"errorMsg":"Order id value must be at least 0","value":0}}},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<OrderController>(OrderController);


            const promise = controller.deleteOrderById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.post('/orders/:orderId/items',
            authenticateMiddleware([{"jwt":["admin","customer","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    orderId: {"in":"path","name":"orderId","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"Order id must be an integer"},"minimum":{"errorMsg":"Order id value must be at least 0","value":0}}},
                    data: {"in":"body","name":"data","required":true,"ref":"ValidateOrderDetailModel"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<OrderController>(OrderController);


            const promise = controller.addItemToOrder.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.patch('/orders/:orderId/items/:itemId',
            authenticateMiddleware([{"jwt":["admin","customer","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    orderId: {"in":"path","name":"orderId","required":true,"dataType":"double"},
                    itemId: {"in":"path","name":"itemId","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"Item id must be an integer"},"minimum":{"errorMsg":"Item id value must be at least 0","value":0}}},
                    data: {"in":"body","name":"data","required":true,"ref":"ValidateUpdateQuantityModel"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<OrderController>(OrderController);


            const promise = controller.updateItemQuantity.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.delete('/orders/:orderId/items/:itemId',
            authenticateMiddleware([{"jwt":["admin","customer","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    orderId: {"in":"path","name":"orderId","required":true,"dataType":"double"},
                    itemId: {"in":"path","name":"itemId","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"Item id must be an integer"},"minimum":{"errorMsg":"Item id value must be at least 0","value":0}}},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<OrderController>(OrderController);


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

            const controller = iocContainer.get<PingController>(PingController);


            const promise = controller.getMessage.apply(controller, validatedArgs as any);
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

            const controller = iocContainer.get<ProductCategoryController>(ProductCategoryController);


            const promise = controller.getProductCategorys.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.post('/product-categories',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    data: {"in":"body","name":"data","required":true,"ref":"ValidateCategoryModel"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<ProductCategoryController>(ProductCategoryController);


            const promise = controller.createProductCategory.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.patch('/product-categories/:id',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"Product category id must be an integer"},"minimum":{"errorMsg":"Product category id must be at least 0","value":0}}},
                    data: {"in":"body","name":"data","required":true,"ref":"ValidateCategoryModel"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<ProductCategoryController>(ProductCategoryController);


            const promise = controller.updateProductCategoryById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.delete('/product-categories/:id',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"Product category id must be an integer"},"minimum":{"errorMsg":"Product category id must be at least 0","value":0}}},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<ProductCategoryController>(ProductCategoryController);


            const promise = controller.deleteProductCategoryById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/products',
            function (request: any, response: any, next: any) {
            const args = {
                    category: {"in":"query","name":"category","dataType":"integer","validators":{"isInt":{"errorMsg":"Product category id must be an integer"},"minimum":{"errorMsg":"Product category id must be at least 0","value":0}}},
                    brand: {"in":"query","name":"brand","dataType":"integer","validators":{"isInt":{"errorMsg":"Product brand id must be an integer"},"minimum":{"errorMsg":"Product brand id must be at least 0","value":0}}},
                    limit: {"in":"query","name":"limit","dataType":"integer","validators":{"isInt":{"errorMsg":"Limit must be an integer"},"minimum":{"errorMsg":"Limit must be at least 1","value":1}}},
                    page: {"in":"query","name":"page","dataType":"integer","validators":{"isInt":{"errorMsg":"Page must be an integer"},"minimum":{"errorMsg":"Page must be at least 1","value":1}}},
                    sort: {"in":"query","name":"sort","ref":"ProductField"},
                    change: {"in":"query","name":"change","ref":"Change"},
                    search: {"in":"query","name":"search","dataType":"string"},
                    min: {"in":"query","name":"min","dataType":"double","validators":{"minimum":{"errorMsg":"Min price must be at least 0","value":0}}},
                    max: {"in":"query","name":"max","dataType":"double","validators":{"minimum":{"errorMsg":"Max price must be at least 0","value":0}}},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<ProductController>(ProductController);


            const promise = controller.getProducts.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/products/:id',
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"Product id must be an integer"},"minimum":{"errorMsg":"Product id must be at least 0","value":0}}},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<ProductController>(ProductController);


            const promise = controller.getProductById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.post('/products',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    data: {"in":"body","name":"data","required":true,"ref":"ValidateProductCreateModel"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<ProductController>(ProductController);


            const promise = controller.createProduct.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.patch('/products/:id',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"Product id must be an integer"},"minimum":{"errorMsg":"Product id must be at least 0","value":0}}},
                    data: {"in":"body","name":"data","required":true,"ref":"ValidateProductUpdateModel"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<ProductController>(ProductController);


            const promise = controller.updateProductById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.delete('/products/:id',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"Product id must be an integer"},"minimum":{"errorMsg":"Product id must be at least 0","value":0}}},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<ProductController>(ProductController);


            const promise = controller.deleteProductById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.post('/products/variant',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    data: {"in":"body","name":"data","required":true,"ref":"ValidateVariantCreateModel"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<ProductController>(ProductController);


            const promise = controller.createProductVariant.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.patch('/products/variant/:variantId',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    variantId: {"in":"path","name":"variantId","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"Product variant id must be an integer"},"minimum":{"errorMsg":"Product variant id must be at least 0","value":0}}},
                    data: {"in":"body","name":"data","required":true,"ref":"ValidateVariantUpdateModel"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<ProductController>(ProductController);


            const promise = controller.updateProductVariant.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.delete('/products/variant/:variantId',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    variantId: {"in":"path","name":"variantId","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"Product variant id must be an integer"},"minimum":{"errorMsg":"Product variant id must be at least 0","value":0}}},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<ProductController>(ProductController);


            const promise = controller.deleteProductVariant.apply(controller, validatedArgs as any);
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

            const controller = iocContainer.get<SizeController>(SizeController);


            const promise = controller.getSizes.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.post('/sizes',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    data: {"in":"body","name":"data","required":true,"ref":"ValidateSizeModel"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<SizeController>(SizeController);


            const promise = controller.createSize.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.patch('/sizes/:id',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"Size id must be an integer"},"minimum":{"errorMsg":"Size id must be at least 0","value":0}}},
                    data: {"in":"body","name":"data","required":true,"ref":"ValidateSizeModel"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<SizeController>(SizeController);


            const promise = controller.updateSizeById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.delete('/sizes/:id',
            authenticateMiddleware([{"jwt":["admin","editor"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"Size id must be an integer"},"minimum":{"errorMsg":"Size id must be at least 0","value":0}}},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<SizeController>(SizeController);


            const promise = controller.deleteSizeById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/users',
            authenticateMiddleware([{"jwt":["admin"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    search: {"in":"query","name":"search","dataType":"string"},
                    role: {"in":"query","name":"role","ref":"UserRole"},
                    limit: {"in":"query","name":"limit","dataType":"integer","validators":{"isInt":{"errorMsg":"Limit must be an integer"},"minimum":{"errorMsg":"Limit must be at least 1","value":1}}},
                    page: {"in":"query","name":"page","dataType":"integer","validators":{"isInt":{"errorMsg":"Page must be an integer"},"minimum":{"errorMsg":"Page must be at least 1","value":1}}},
                    sort: {"in":"query","name":"sort","ref":"UserField"},
                    change: {"in":"query","name":"change","ref":"Change"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<UserController>(UserController);


            const promise = controller.getUsers.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/users/:id',
            authenticateMiddleware([{"jwt":["admin","editor","customer"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"User id must be an integer"},"minimum":{"errorMsg":"User id value must be at least 0","value":0}}},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<UserController>(UserController);


            const promise = controller.getUserById.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.post('/users',
            authenticateMiddleware([{"jwt":["admin"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    data: {"in":"body","name":"data","required":true,"ref":"ValidateUserCreateModel"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<UserController>(UserController);


            const promise = controller.createUser.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.patch('/users/:id',
            authenticateMiddleware([{"jwt":["admin","editor","customer"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"User id must be an integer"},"minimum":{"errorMsg":"User id value must be at least 0","value":0}}},
                    data: {"in":"body","name":"data","required":true,"ref":"ValidateUserUpdateModel"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<UserController>(UserController);


            const promise = controller.updateUser.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/report/overview',
            authenticateMiddleware([{"jwt":["admin"]}]),
            function (request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<ReportController>(ReportController);


            const promise = controller.getOverviewReport.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/report/sales',
            authenticateMiddleware([{"jwt":["admin"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    time: {"in":"query","name":"time","required":true,"dataType":"string","validators":{"pattern":{"errorMsg":"Time query is invalid","value":"(^[\\d]{4}$)|(^[\\d]{4}-([0][1-9]|[1][0-2])|(^week$)|(^today$))"}}},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<ReportController>(ReportController);


            const promise = controller.getSalesReport.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/report/orders',
            authenticateMiddleware([{"jwt":["admin"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    time: {"in":"query","name":"time","required":true,"dataType":"string","validators":{"pattern":{"errorMsg":"Time query is invalid","value":"(^[\\d]{4}$)|(^[\\d]{4}-([0][1-9]|[1][0-2])|(^week$))"}}},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<ReportController>(ReportController);


            const promise = controller.getOrderReport.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/report/products',
            authenticateMiddleware([{"jwt":["admin"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    time: {"in":"query","name":"time","required":true,"dataType":"string","validators":{"pattern":{"errorMsg":"Time query is invalid","value":"(^[\\d]{4}$)|(^[\\d]{4}-([0][1-9]|[1][0-2])|(^week$))"}}},
                    page: {"in":"query","name":"page","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"Page must be an integer"},"minimum":{"errorMsg":"Page must be at least 1","value":1}}},
                    limit: {"in":"query","name":"limit","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"Limit must be an integer"},"minimum":{"errorMsg":"Limit must be at least 1","value":1}}},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<ReportController>(ReportController);


            const promise = controller.getTopProductsReport.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/reviews/:productId',
            function (request: any, response: any, next: any) {
            const args = {
                    productId: {"in":"path","name":"productId","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"Product id must be an integer"},"minimum":{"errorMsg":"Product id must be at least 0","value":0}}},
                    size: {"in":"query","name":"size","required":true,"dataType":"double"},
                    cursor: {"in":"query","name":"cursor","required":true,"dataType":"double"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<ReviewController>(ReviewController);


            const promise = controller.getReviewsByProductId.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.get('/reviews/:productId/count',
            function (request: any, response: any, next: any) {
            const args = {
                    productId: {"in":"path","name":"productId","required":true,"dataType":"integer","validators":{"isInt":{"errorMsg":"Product id must be an integer"},"minimum":{"errorMsg":"Product id must be at least 0","value":0}}},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<ReviewController>(ReviewController);


            const promise = controller.getReviewCountByProductId.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
        app.post('/reviews',
            authenticateMiddleware([{"jwt":["admin","editor","customer"]}]),
            function (request: any, response: any, next: any) {
            const args = {
                    data: {"in":"body","name":"data","required":true,"ref":"ValidateReviewModel"},
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<ReviewController>(ReviewController);


            const promise = controller.createReview.apply(controller, validatedArgs as any);
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