import "../../styles/NavBar.css";
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <div>
            <ul className="options">
                {/* better to use navlink */}
                {/* <li onClick={handleClick}>Read Articles</li> */}
                <li><NavLink to="/">Read Articles</NavLink></li>
                {/* <li onClick={handleClick}>Publish Articles</li> */}
                <li><NavLink to="/create">Create Articles</NavLink></li>
                <li><NavLink to="/myarticles">My Articles</NavLink></li>
                <li><NavLink to="/myprofile">My Profile</NavLink></li>
                <li><NavLink to="/dashboard">My Dashboard</NavLink></li>
                {/* temporary until backclick button */}

            </ul>
        </div>
    )
}
export default NavBar;
