import { lazy, Suspense, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loader from "./components/Loader";
import "./stylesheets/app.css";

const HomePage = lazy(() => import("./components/Home.jsx"));
const SignupPage = lazy(() => import("./components/Signup.jsx"));
const LoginPage = lazy(() => import("./components/Login.jsx"));
const DashboardPage = lazy(() => import("./components/Dashboard.jsx"));

const router = createBrowserRouter([
  { path: "https://3w-assignment-y7y4-frontend.vercel.app/", element: <HomePage /> },
  { path: "https://3w-assignment-y7y4-frontend.vercel.app/signup", element: <SignupPage /> },
  { path: "https://3w-assignment-y7y4-frontend.vercel.app/login", element: <LoginPage /> },
  { path: "https://3w-assignment-y7y4-frontend.vercel.app/dashboard", element: <DashboardPage /> },
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