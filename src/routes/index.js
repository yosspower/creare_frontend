import { lazy } from "react"

import Home from "../pages/Home"
import ProductDetails from "../pages/ProductDetails"
import Contact from "../pages/Contact"
import Shop from "../pages/Shop"
import Category from "../pages/category"
export  const routes = [
     {
        path: '/',
        component: Home
     },
     {
        path:"/shop/product/:id",
        component:ProductDetails
     },
     {
        path:"/shop",
        component:Shop
     },
     {
      path:"/category",
      component:Category
   },
     {
        path:"/contact-us",
        component:Contact
     }
]