import { useEffect, useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";
import { getProfile } from "../../../services/user.service";
import { useStore } from "../../../store/store";

export function Authentication() {
  const [, { updateProfile, updateDateRole }] = useStore();

  // Chạy sau
  useEffect(() => {
    getProfile()
      .then((resp) => {
        // duy trì đăng nhập được
        updateProfile(resp.content);

        // Có role gì?
        updateDateRole("student");
      })
      .catch(() => {
        // hết hạn đăng nhập
        updateProfile(null);

        updateDateRole("anonymous");
      });
  }, []);

  //   Chạy trước khi giao diện render
  // useLayoutEffect(()=>{},[])

  return (
    <>
      <Outlet />
    </>
  );
}
