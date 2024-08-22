import { useNavigate } from "react-router-dom";
import "../../styles/Header.css";
import {useAuth} from "../context/AuthContext";

function Header() {
/* displays the logo, name, and login/logout button that changes depending if user is authenticated or not */

  const navigate = useNavigate() //navigate para cambiar de pagina una vez autenticado
  const {authState, logout } = useAuth();
  const {isAuth} = authState

  const handleClickLogin = (e) => {
    navigate("/login")
  };

  const handleClickLogout = (e)=> {
    logout()
    navigate("/")
  }

  return (
    <div>
      <div className="header">
        <img src="../../intelectual_cat_reading.png" alt="img" />
        <h1>InfoSphere</h1>
      </div>
      <div className="login-btn">
        {isAuth ? (<button onClick={handleClickLogout}>Logout</button>) : (<button onClick={handleClickLogin}>Login</button>)}
      </div>
    </div>
  )

}
export default Header;
