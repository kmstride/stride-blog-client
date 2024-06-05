import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home/Home";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import Contact from "../pages/Contact/Contact";
import About from "../pages/About/About";
import MyPosts from "../pages/Dashboard/MyPosts";
import EditPost from "../pages/Dashboard/EditPost";
import SinglePost from "../pages/SinglePost/SinglePost";
import CreatePost from "../pages/CreatePost/CreatePost";
import EditProfile from "../pages/Dashboard/EditProfile";
import ChangePassword from "../pages/Dashboard/ChangePassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "posts/:id",
        element: <SinglePost />
      }
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute><DashboardLayout /></PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "my-posts",
        element: <MyPosts />
      },
      {
        path: "create-post",
        element: <CreatePost />
      },
      {
        path: "edit-post/:id",
        element: <EditPost />
      },
      {
        path: "edit-profile",
        element: <EditProfile />
      },
      {
        path: "change-password",
        element: <ChangePassword />
      }
    ],
  },
]);
