import { Link, NavLink, Outlet } from "react-router-dom";

export function Template() {
  return (
    <>
      <header
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        {/* daingo@gmail.com */}
        <Link to={"login"}>Login</Link>
        <Link to={"register"}>Register</Link>

        <Link to={"profile"}>Profile</Link>
      </header>

      <Outlet />
    </>
  );
}
