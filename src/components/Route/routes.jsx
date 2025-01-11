import { createBrowserRouter } from "react-router-dom";
import Error from "./Error";
import Home from "../Home Page/Home";
import NavBar from "../Nav Bar/NavBar";
import Products from "../Products/Products";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
      children: [
        {
          path: ":name",
          element: <NavBar />,
          children: [
            {
              path: ":category",
              element: <Products />
            }
          ]
        }
      ]
    },
   
])

export default router