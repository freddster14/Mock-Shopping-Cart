import { createBrowserRouter } from "react-router-dom";
import Home from '../Home Page/Home'
import Shopping from "../Shopping Page/Shopping";
import Error from "./Error";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
    },
    {
      path: "/shop",
      element: <Shopping />
    },
])

export default router