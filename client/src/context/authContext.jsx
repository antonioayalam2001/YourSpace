import { createContext } from "react";
import { useLocalStorage } from "../hooks";
import { login, logout } from "../pages/auth/userFunctions";

export const AuthContext = createContext();
export const USER_KEY = "user";
export const DEMO_USER_NAME = "Demo";
export const AuthProvider = ({ children }) => {

    const { storedValue: user, setValue: setUser, deleteValue: deleteUser } = useLocalStorage(USER_KEY, null);

    const startLogIn = async (formFields) => {
        try {
            const data = await login(formFields);
            if (data.status) {
                setUser(data.user);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const startLoginDemoVersion = async (formFields) => {
        const DEMO_USER = {
            username: DEMO_USER_NAME,
            email: "antonioayalam2001@gmail.com",
            img: "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg",
        }
        setUser(DEMO_USER);
        return true;
    }

    const startLogOut = async () => {
        const { status, msg } = await logout();
        if (status) {
            deleteUser();
        }
    }


    return (
        <AuthContext.Provider value={{ user, startLogIn, startLogOut, startLoginDemoVersion }}>
            {children}
        </AuthContext.Provider >
    )

}