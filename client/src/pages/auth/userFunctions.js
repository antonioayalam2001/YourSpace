import { FETCH_URL } from "../../models/variables";
const AUTH_URL = `${FETCH_URL}/auth`;
export const register = async (newUser) => {
    // const { username, email, password } = newUser;
    try {
        const response = await fetch(`${AUTH_URL}/register`, {
            method: 'POST',
            mode: 'cors',
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });
        const data = await response.json();
        return data.ok
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const login = async (user) => {
    try {
        const response = await fetch(`${AUTH_URL}/login`, {
            method: 'POST',
            "Access-Control-Allow-Origin": "*",
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        const data = await response.json();
        return {
            status: data.ok,
            user: data.user
        };
    } catch (error) {
        // console.log(error);
    }
    return false;
};

export const logout = async () => {
    const response = await fetch(`${AUTH_URL}/logout`, {
        method: 'GET',
        "Access-Control-Allow-Origin": "*",
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return { status: data.ok, msg: data.msg };
}