import { lazy, Suspense, useState } from "react";
import { createBrowserRouter, Link, Navigate, Outlet } from "react-router-dom";
import Login from "../atomic/pages/login";
import { Profile } from "../atomic/pages/profile";
import { Template } from "../atomic/templates/template.js";
import { getProfile } from "../services/user.service.js";
import { Authentication } from "../atomic/components/authentication/index.js";
import { Authorization } from "../atomic/components/authorization/index.js";
import { Admin } from "../atomic/pages/admin.js";
const Register = lazy(() => import("../atomic/pages/register"));

export const router = createBrowserRouter([
  {
    path: "",
    element: <Authentication />,
    children: [
      {
        path: "",
        // Gọi API getProfile ở mọi page khi chúng ta vào lại trang web
        element: <Template />,
        children: [
          {
            path: "/",
            element: (
              <>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Mollitia, sint.
                </p>
              </>
            ),
          },
          {
            path: "register",
            element: (
              <>
                <Suspense fallback="Loading...">
                  <Register />
                </Suspense>
              </>
            ),
          },
          {
            path: "login",
            element: <Login />,
          },

          {
            path: "",
            errorElement: <Navigate to={"login"} />,
            element: (
              <>
                <Outlet />
              </>
            ),
            children: [
              {
                path: "profile",
                loader: async () => {
                  console.log("loader");
                  const data = await getProfile();

                  // localStorage.setItem(
                  //   "profile",
                  //   JSON.stringify(data) + Math.random(),
                  // );

                  console.log("data ::: ", data.content);
                  return data.content;
                },
                element: <Profile />,
              },
            ],
          },
        ],
      },
      {
        path: "admin",

        element: (
          <>
            <Authorization roles={["admin", "supper-admin"]}>
              <Admin />
            </Authorization>
          </>
        ),
      },
      {
        path: "contact",
        element: (
          <>
            <Authorization roles={["student", "anonymous"]}>
              Contact Page
            </Authorization>
          </>
        ),
      },
      {
        path: "*",
        element: <Navigate to={"/"} />,
      },
    ],
  },
]);
