import { createBrowserRouter } from "react-router-dom";
import Error from "./Error";
import Home from "../Home Page/Home";


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
        element: <Home />,
      },
    ]
  },
   
])

export default router