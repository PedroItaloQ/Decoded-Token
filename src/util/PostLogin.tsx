import axios, { AxiosResponse } from "axios"

export interface User {
    email: string;
    password: string;
}

const API = process.env.NEXT_PUBLIC_API_HOMOLOG_USER;

export const Login = async (credentials: User): Promise<AxiosResponse<any>> => {
    try {
        const response: AxiosResponse<any> = await axios.post(`${API}/auth/login`, credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.log("Error ao estabelecer conexão: ", error);
        throw error;
    }
};

