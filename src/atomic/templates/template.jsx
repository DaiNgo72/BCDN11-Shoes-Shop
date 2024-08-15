import { NavLink, Outlet } from "react-router-dom";

export function Template() {
  return (
    <>
      <header
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        <NavLink
          style={({ isActive }) => {
            if (isActive) {
              return {
                color: "blue",
              };
            }
          }}
          className={"border-2 rounded px-4 py-4"}
          to={"/"}
        >
          Product
        </NavLink>

        <NavLink
          style={({ isActive }) => {
            if (isActive) {
              return {
                color: "blue",
              };
            }
          }}
          className={({ isActive }) => {

            // run time:
            return `border-2 rounded px-4 py-4`;
          }}
          to={"/create"}
        >
          Create
        </NavLink>
      </header>

      <Outlet />
    </>
  );
}
