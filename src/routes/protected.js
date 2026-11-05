import Profile from "../pages/Customer/Profile";
import Checkout from "../pages/Payment/Checkout";

export const protectedRoutes = [
  {
    path: "/account",
    component: Profile,
  },
  {
    path: "/checkout",
    component: Checkout,
  },
];
