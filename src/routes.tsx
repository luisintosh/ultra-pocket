import { createHashRouter } from "react-router-dom";

import Home from "./routes/home";
import Inventory from "./routes/inventory";
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
]);

export default router;
