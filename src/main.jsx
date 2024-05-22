import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";

import SidebarProvider from "./contexts/SidebarContext";
import CartProvider from "./contexts/CartContext";
import { Provider } from "react-redux";
import productSlice from "./Toolkit/productSlice";
import MenuProvider from "./contexts/MenuContext";
const store = configureStore({
  reducer: {
    products: productSlice,
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <MenuProvider>
      <SidebarProvider>
        <CartProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </CartProvider>
      </SidebarProvider>
    </MenuProvider>
  </Provider>,
);
