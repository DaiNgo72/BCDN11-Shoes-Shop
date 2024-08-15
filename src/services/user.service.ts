import { axiosWithoutAuth } from "./axios.config"


type InfoUser = {
    email: string,
    password: string,
    name: string,
    gender: boolean,
    phone: string,
}

export const signUp = (data: InfoUser) => {
    return axiosWithoutAuth({
        baseURL: '/Users/signup', method: 'post',
        data: data
    })
}
