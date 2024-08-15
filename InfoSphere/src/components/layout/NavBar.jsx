import "../../styles/NavBar.css";
import { NavLink} from "react-router-dom";

function NavBar() {
    return (
    <div>
        <ul className="options">
            {/* better to use navlink */}
            {/* <li onClick={handleClick}>Read Articles</li> */}
            <li><NavLink to="/">Read Articles</NavLink></li>
            {/* <li onClick={handleClick}>Publish Articles</li> */}
            <li><NavLink to="/create">Create Articles</NavLink></li>
            <li >My Articles</li>
            <li >My profile</li>
        </ul>
    </div>
)
  }
export default NavBar;
