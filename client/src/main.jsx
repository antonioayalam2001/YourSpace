import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import AuthGuards from "./guards/auth.guards";
import "./index.css";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./models/routes";
import Login from "./pages/Login/Login";
import Home from "./pages/Private/Home/Home";
import Single from "./pages/Private/Single/Single";
import Write from "./pages/Private/Write/Write";
import Register from "./pages/Register/Register";
import "./styles.scss";
import { Layout } from "./components";
const router = createBrowserRouter([
  {
    path: "/",
    // element: <AuthGuards privateValidation={true} />,
    element: <Layout />,
    //Los children se muestran en el OUTLET
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:postId",
        element: <Single />
      },
      {
        path: PRIVATE_ROUTES.WRITE,
        element: <Write />,
      }
    ]
  },
  {
    path: PUBLIC_ROUTES.REGISTER,
    element: <Register />,
  },
  {
    path: PUBLIC_ROUTES.LOGIN,
    element: <Login />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <div className="app" id="app">
      <RouterProvider router={router} />
    </div >
  </AuthProvider>
);