import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./pages/Navbar";
import { Process } from "./process/Process"; // Ensure correct path
import SignIn from "./pages/SignIn";
import { Home } from "./pages/Home";
import { PLCV } from "./process/PLCV";
import H2S from "./process/H2S";
import { IT_Admin } from "./admin/IT_Admin";
import { Details } from "./process/Details";
// Layout component with Navbar and Outlet
function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        <Outlet /> {/* Top-level Outlet */}
      </main>
    </div>
  );
}

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, // Default route ("/")
        element: <Home />,
      },
      {
        path: "signin", // "/signin"
        element: <SignIn />,
      },
      {
        path: "it_admin", // "/signin"
        element: <IT_Admin/>,
      },
      {
        path: "process", // "/process"
        element: <Process />,
        children: [
          {
            index: true, // Default route ("/process")
            element: <PLCV/>
          },
          {
            path: "/process/h2s", // "/process/steps"
            element: <H2S/>,
          },
          {
            path: "/process/details", // "/process/details"
            element: <Details/>,
          },
        ],
      },
      {
        path: "*", // Catch-all for 404
        element: <div className="text-center p-4">404 - Page Not Found</div>,
      },
    ],
  },
]);

// Main Routes component
export default function AppRoutes() {
  return <RouterProvider router={router} />;
}