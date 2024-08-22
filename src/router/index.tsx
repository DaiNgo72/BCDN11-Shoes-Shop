import { lazy, Suspense } from "react";
import { createBrowserRouter, Link, Navigate, Outlet } from "react-router-dom";
import Login from "../atomic/pages/login";
import { Profile } from "../atomic/pages/profile";
import { Template } from '../atomic/templates/template.js'
import { getProfile } from "../services/user.service.js";
const Register = lazy(() => import("../atomic/pages/register"))

export const router = createBrowserRouter([
  {
    path: '',
    // Gọi API getProfile ở mọi page khi chúng ta vào lại trang web
    element: <Template />,
    children: [
      {
        path: '/',
        element: <>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia, sint.</p>
        </>
      },
      {
        path: "register",
        element: <>
          <Suspense fallback="Loading...">
            <Register />
          </Suspense>
        </>,
      },
      {
        path: 'login',
        element: <Login />
      },

      {
        path: '',
        loader:async () => {
          const data = await getProfile();
          return data;
        },
        errorElement: <Navigate to={'login'} />,
        element: <>
          <Outlet />

          
        </>,
        children: [
          {
            path: 'profile',
            element: <Profile />
          },
        ]
      }

    ]
  },
  {
    path: '*',
    element: <Navigate to={'/'} />
  }
]);


