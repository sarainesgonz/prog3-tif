import "../../styles/NavBar.css";
import { useNavigate } from "react-router-dom";

function NavBar(props) {
    const navigate = useNavigate() //navigate para cambiar de pagina una vez autenticado
    const handleClick = (e) => {
        if(e.target.textContent === "Read Articles"){
            navigate("/")
        } else if (e.target.textContent === "Publish Articles"){
            navigate("/")
        }
    }
    return (
    <div>
        <ul className="options">
            <li onClick={handleClick}>Read Articles</li>
            <li onClick={handleClick}>Publish Articles</li>
            {/* <li onClick={handleClick}>My Articles</li> */}
            {/* <li onClick={handleClick}>My profile</li> */}
        </ul>
    </div>
)
  }
export default NavBar;
