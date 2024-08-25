import "../../styles/NavBar.css";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar() {
    return (
        <div>
            <ul className="options">
                {/* better to use navlink */}
                <li><NavLink to="/dashboard">Inicio</NavLink></li>
                <li><NavLink to="/">Todos los artículos</NavLink></li>
                <li><NavLink to="/create">Publicar artículos</NavLink></li>
                <li><NavLink to="/myarticles">Mis artículos</NavLink></li>
                <li><NavLink to="/myprofile">Mi perfil</NavLink></li>

            </ul>
        </div>
    )
}
export default NavBar;
