import { lazy } from "react";

import Home from "../pages/Home";

import Contact from "../pages/Contact";
import ProductDetails from "../pages/Produts/ProductDetails";
import Shop from "../pages/Produts/Shop";
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
    path: "/contact-us",
    component: Contact,
  },
];
