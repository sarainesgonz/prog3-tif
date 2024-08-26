import "../../styles/NavBar.css";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar() {
    return (
        <div  className="navbar navbar-expand-lg navbar-light bg-light mb-3" >
            <div className="container-fluid m-3" >
            <ul className="navbar-nav mx-auto d-flex justify-content-evenly w-100">
                {/* better to use navlink */}
                <li className="navbar-item "><NavLink to="/dashboard" className="navbar-link btn btn-outline-dark mx-1 px-5" activeClassName="active" >Inicio</NavLink></li>
                <li className="navbar-item"><NavLink to="/" className="navbar-link btn btn-outline-dark mx-1 px-5" activeClassName="active">Todos los artículos</NavLink></li >
                <li className="navbar-item"><NavLink to="/create" className="navbar-link btn btn-outline-dark mx-1 px-5" activeClassName="active">Publicar artículos</NavLink></li >
                <li className="navbar-item"><NavLink to="/myarticles" className="navbar-link btn btn-outline-dark mx-1 px-5" activeClassName="active">Mis artículos</NavLink></li >
                <li className="navbar-item"><NavLink to="/myprofile" className="navbar-link btn btn-outline-dark mx-1 px-5" activeClassName="active">Mi perfil</NavLink></li>

            </ul>
            </div>
        </div>
    )
}
export default NavBar;
