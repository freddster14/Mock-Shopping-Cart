import { createBrowserRouter } from "react-router-dom";
import Error from "./Error";
import Home from "../Home Page/Home";
import Products from "../Products/Products";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/:name",
    element: <Home />,
    children: [
      {
        path: ":category",
        element: <Products />,
      },
    ]
  },
   
])

export default router