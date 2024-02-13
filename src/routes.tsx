import { createHashRouter } from "react-router-dom";

import About from "./routes/about";
import Root from "./routes/root";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

export default router;
