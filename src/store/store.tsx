import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";

type TStore = readonly [
  { readonly profile: any; readonly role: TRole },
  { readonly updateProfile: (info: any) => void; readonly updateDateRole: any },
];
// Không được bao bọc bên trong context mà lấy giá trị về thì sẽ bị null
const StoreContext = createContext<TStore>(null as unknown as TStore);

export const useStore = () => {
  return useContext(StoreContext);
};

type TRole = "anonymous" | "student" | "admin" | "supper-admin";

export function Provider({ children }: PropsWithChildren) {
  const [profile, setProfile] = useState(null);
  const [role, setRole] = useState<TRole>("anonymous");

  const updateDateRole = (role: TRole) => {
    setRole(role);
  };
  const updateProfile = (info: any) => {
    setProfile(info);
  };

  const value = [
    { profile, role }, //data
    { updateProfile, updateDateRole }, // function
  ] as const;

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
