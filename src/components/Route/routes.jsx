import { createBrowserRouter } from "react-router-dom";
import Error from "./Error";
import Home from "../Home Page/Home";
import Buy from "../Buy Page/Buy";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
      children: [
        {
          path: "/:name",
          element: <Buy />
        }
      ]
    },
])

export default router