import { useContext, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useStore } from "../../store/store";

export function Profile() {
  const [{ profile }, { updateProfile }] = useStore();
  const data = useLoaderData();

  //   Đẩy lên context
  useEffect(() => {
    updateProfile(data);
  }, [data]);

  return <>{JSON.stringify(data)}</>;
}
