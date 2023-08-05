import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoCompleto } from "../assets/resources";
import { AuthContext } from "../context/authContext";
import { PRIVATE_ROUTES } from "../models/routes";

export default function NavBar() {
    const navigate = useNavigate()
    const { user, startLogOut } = useContext(AuthContext);
    function handleLogOut() {
        startLogOut()
        navigate("/login")
    }

    return (
        <nav>
            <div className="container">
                <Link to={PRIVATE_ROUTES.PRIVATE} className="logo" >
                    <img src={logoCompleto} alt="" />
                </Link>
                <div className="links flex">
                    <ul className="flex">
                        <NavLink to={"/?cat=art"} className={"link"} > Art</NavLink>
                        <NavLink to={"/?cat=science"} className={"link"} > Science</NavLink>
                        <NavLink to={"/?cat=technology"} className={"link"} > Tech</NavLink>
                        <NavLink to={"/?cat=cinema"} className={"link"} > Cinema</NavLink>
                        <NavLink to={"/?cat=design"} className={"link"} > Design</NavLink>
                        <NavLink to={"/?cat=videogames"} className={"link"} > Videogames</NavLink>
                        <NavLink to={"/?cat=food"} className={"link"} > Food</NavLink>
                    </ul>
                    <div className="user">
                        {user ? <span className="user__name">{user.username}</span> : <Link to="/login" className="btn login">Login</Link>}
                        {user ? <span className="user__img"><img src={user.img} alt="" /></span> : <Link to="/register" className="register">
                        </Link>}
                        <span className="write flex">
                            <NavLink to={PRIVATE_ROUTES.WRITE}  >
                                <span className="material-symbols-outlined">
                                    edit_note
                                </span>
                            </NavLink>
                        </span>
                        {user && <span className="logout" onClick={handleLogOut}>
                            <span className="material-symbols-outlined">
                                door_open
                            </span>
                        </span>}
                    </div>
                </div>
            </div>
        </nav>
    )
}