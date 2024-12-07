import { createBrowserRouter } from "react-router-dom";
import Error from "./Error";
import Home from "../Home Page/Home";

const router = createBrowserRouter([
    {
      path: "/:name",
      element: <Home />,
      errorElement: <Error />,
    },
])

export default router