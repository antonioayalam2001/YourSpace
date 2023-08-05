import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { PRIVATE_ROUTES } from "../models/ROUTES";

export default function RoleGuard({ rol }) {
    // Verificamos si el usuario esta logueado
    const userState = useSelector(state => state.user);
    return userState.rol === rol ? <Outlet /> : < Navigate replace to={PRIVATE_ROUTES.PRIVATE} />
}