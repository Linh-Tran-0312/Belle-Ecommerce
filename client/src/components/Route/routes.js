import { lazy } from "react";

const userRoutes = [
    {
        path: "/user",
        exact: true,
        label: "User",
        component: lazy(() => import("../../pages/user"))
    },
    {
        path: "/checkout",
        exact: true,
        label: "Checkout",
        component: lazy(() => import("../../pages/checkout"))
    }
];
const adminRoutes = [
    {
        path: "/admin",
        exact: true,
        label: "Admin Page",
        component: lazy(() => import("../../pages/admin/index"))
    }
];
const publicRoutes = [
    {
        path: "/",
        exact: true,
        label: "Home",
        component: lazy(() => import("../../pages/home"))
    },
    {
        path: "/blogs",
        exact: true,
        label: "Blogs",
        component: lazy(() => import("../../pages/blogs"))
    },
    {
        path: "/blogs/blog/:id",
        exact: false,
        label: "Article",
        component: lazy(() => import("../../pages/blog"))
    },
    {
        path: "/shop",
        exact: true,
        label: "Shop",
        component:lazy(() =>  import("../../pages/shop"))
    },
    {
        path: "/shop/product/:productId",
        exact: false,
        label: "Product",
        component: lazy(() => import("../../pages/product"))
    },
    {
        path: "/contact",
        exact: true,
        label: "Contact",
        component: lazy(() => import("../../pages/contact"))
    },
    {
        path: "/cart",
        exact: false,
        label: "Cart",
        component: lazy(() => import("../../pages/cart"))
    },
    {
        path: "/auth",
        exact: true,
        label: "User Auth",
        component: lazy(() => import("../../pages/auth"))
    },
    {
        path: "/admin/login",
        exact: true,
        label: "Admin Auth",
        component: lazy(() => import("../../pages/admin/login"))
    },
    {
        path: "*",
        exact: true,
        label: "Error Page",
        component: lazy(() => import("../../pages/404page"))
    }
]

export default { userRoutes, adminRoutes, publicRoutes}