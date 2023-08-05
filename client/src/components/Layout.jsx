import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

export function Layout() {
    return (
        <div className="container">
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}