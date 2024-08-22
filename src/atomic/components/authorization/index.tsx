import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import { useStore } from "../../../store/store";

export function Authorization({
  children,
  roles,
}: PropsWithChildren<{
  roles: any;
}>) {
  const [{ role }] = useStore();

  if (roles.includes(role)) {
    return <>{children}</>;
  } else {
    return (
      <>
        <p>Bạn không đủ quyền để truy cập vào page này</p>
      </>
    );
  }
}
