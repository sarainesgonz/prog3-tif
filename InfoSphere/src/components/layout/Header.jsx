import { useNavigate } from "react-router-dom";
import "../../styles/Header.css";
import {useAuth} from "../context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';

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

  const handleBackClick = () => {
    navigate(-1)
  }

  return (
    <div>
      <div className="header">
        
        <img src="../../logo_infosphere.png" alt="img" onClick={handleBackClick} />
        <h1 className="font-header" onClick={handleBackClick}>InfoSphere</h1>
      </div>
      {/* <div className="login-btn">
        {isAuth ? (<button onClick={handleClickLogout}>Logout</button>) : (<button onClick={handleClickLogin}>Login</button>)}
      </div> */}
    </div>
  )

}
export default Header;
