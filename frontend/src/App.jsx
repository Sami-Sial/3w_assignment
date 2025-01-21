import { lazy, Suspense, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loader from "./components/Loader";
import "./stylesheets/app.css";

const HomePage = lazy(() => import("./components/Home.jsx"));
const SignupPage = lazy(() => import("./components/Signup.jsx"));
const LoginPage = lazy(() => import("./components/Login.jsx"));
const DashboardPage = lazy(() => import("./components/Dashboard.jsx"));

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/dashboard", element: <DashboardPage /> },
]);

function App() {

  return(
    <>
        <Suspense fallback={<Loader />}>
           <RouterProvider router={router} />
        </Suspense>
    </>
  )
}

export default App