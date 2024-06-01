import { lazy } from "react";

import Home from "../pages/Home";
import ProductDetails from "../pages/Produts/ProductDetails";
import Contact from "../pages/Contact";
import Shop from "../pages/Produts/Shop";
import Category from "../pages/category";
import Profile from "../pages/Customer/Profile";
import About from "../pages/About";

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
