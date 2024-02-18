import { createHashRouter, redirect } from "react-router-dom";

import { getAccountStored } from "./components/shared/hooks/useGetAccount";
import Home from "./routes/home";
import Inventory from "./routes/inventory";
import Login from "./routes/login";
import Market from "./routes/market";
import Root from "./routes/root";

export enum Route {
  ROOT = "/",
  ACCOUNT = "",
  INVENTORY = "inventory",
  MARKET = "market",
  LOGIN = "login",
}

const router = createHashRouter([
  {
    path: Route.ROOT,
    element: <Root />,
    loader: async () => {
      const account = getAccountStored();
      if (!account) {
        return redirect(Route.LOGIN);
      }
      return account;
    },
    children: [
      {
        path: Route.ACCOUNT,
        element: <Home />,
      },
      {
        path: Route.INVENTORY,
        element: <Inventory />,
      },
      {
        path: Route.MARKET,
        element: <Market />,
      },
    ],
  },
  {
    path: Route.LOGIN,
    element: <Login />,
  },
]);

export default router;
