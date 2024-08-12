import "../../styles/NavBar.css";
import { useNavigate } from "react-router-dom";

function NavBar(props) {
    const navigate = useNavigate() //navigate para cambiar de pagina una vez autenticado
    const handleClick = (e) => {
        if(e.target.textContent === "Noticias"){
            navigate("/")
        } else if (e.target.textContent === "Login"){
            navigate("/login")
        }
    }
    return (
    <div>
        <ul className="options">
            <li onClick={handleClick}>Noticias</li>
            <li onClick={handleClick}>Login</li>
        </ul>
    </div>
)
  }
export default NavBar;
