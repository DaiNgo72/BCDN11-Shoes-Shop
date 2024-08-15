import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const Register = lazy(() => import("../atomic/pages/register"))

export const router = createBrowserRouter([
  {
    path: "register",
    element: <>
      <Suspense fallback="Loading...">
        <Register />
      </Suspense>
    </>,
  },
]);


