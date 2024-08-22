import { axiosWithAuth, axiosWithoutAuth } from "./axios.config";

type InfoUser = {
  email: string;
  password: string;
  name: string;
  gender: boolean;
  phone: string;
};

export const signUp = (data: InfoUser) => {
  return axiosWithoutAuth({
    url: "Users/signup",
    method: "post",
    data: data,
  });
};

type TSignIn = {
  email: string;
  password: string;
};

type TSignIn2 = Pick<InfoUser, "email" | "password">;

//
export const signIn = (
  data: TSignIn,
): Promise<{
  content: {
    accessToken: string;
  };
}> => {
  return axiosWithoutAuth({
    url: "Users/signin",
    method: "post",
    data: data,
  });
};

export const getProfile = (): Promise<{content:any}> => {
  return axiosWithAuth({
    method: "post",
    url: "Users/getProfile",
  });
};
