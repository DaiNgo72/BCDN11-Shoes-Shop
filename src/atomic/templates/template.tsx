import { useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useStore } from "../../store/store";

export function Template() {
  // lấy từ context
  const [{ profile }, { updateProfile }] = useStore();
  console.log({ profile });

  // const profile = localStorage.getItem("profile");

  // useEffect(() => {
  //   console.log("gan event");
  //   const handle = (event: StorageEvent) => {
  //     console.log(event);
  //   };

  //   window.addEventListener("storage", handle);

  //   return () => {
  //     console.log("remove event");
  //     window.removeEventListener("storage", handle);
  //   };
  // }, []);

  return (
    <>
      <header
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        {profile ? (
          <>
            {profile.email}
            <button
              onClick={() => {
                // Call api logout

                localStorage.removeItem("access_token");
                
                updateProfile(null);
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to={"login"}>Login</Link>
            <Link to={"register"}>Register</Link>
          </>
        )}

        <Link to={"profile"}>Profile</Link>
        <Link to={"admin"}>Admin</Link>
        <Link to={"contact"}>Contact</Link>
      </header>

      <Outlet />
    </>
  );
}
