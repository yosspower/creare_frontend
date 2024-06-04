import { lazy } from "react";

import Home from "../pages/Home";
import ProductDetails from "../pages/Products/ProductDetails";
import Contact from "../pages/Contact";
import Shop from "../pages/Products/Shop";
import Category from "../pages/category";
import About from "../pages/About";
import Preview from "../pages/Products/Preview";

export const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/shop/product/:slug",
    component: ProductDetails,
  },
  {
    path: "/shop",
    component: Shop,
  },
  {
    path: "/product/make-design",
    component: Preview,
  },
  {
    path: "/categories",
    component: Category,
  },
  {
    path: "/contact-us",
    component: Contact,
  },
  {
    path: "/about",
    component: About,
  },
];
