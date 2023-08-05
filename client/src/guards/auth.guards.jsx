import { Navigate } from "react-router-dom";
import { Layout } from "../components";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "../models/routes";

export default function AuthGuards({ privateValidation = false }) {
    // Verificamos si el usuario esta logueado
    // const { loggedIn } = useSelector(state => state.user);
    const loggedIn = localStorage.getItem("user") ? true : false;
    return loggedIn
        ?
        privateValidation
            ? <Layout />
            : < Navigate replace to={`${PRIVATE_ROUTES.PRIVATE}`} />
        :
        < Navigate replace to={PUBLIC_ROUTES.LOGIN} />
}