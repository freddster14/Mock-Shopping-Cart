import { createBrowserRouter } from "react-router-dom";
import NavBar from "../Nav Bar/NavBar";
import Error from "./Error";

const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBar />,
      errorElement: <Error />,
    },
    {
      path: '/:name',
      element: <NavBar />,
      errorElement: <Error />
    },
  
])

export default router