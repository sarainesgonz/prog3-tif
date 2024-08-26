import NavBar from "./layout/NavBar";
import { useAuth } from "./context/AuthContext";
import { useUser } from "./context/UserContext";
import 'bootstrap/dist/css/bootstrap.min.css';

function ProfilePage() {
    const { authState } = useAuth();
    const { token } = authState;
    const { userState } = useUser()

    console.log("desde el profile", userState)
    if (!userState) {
        return <p>No hay dato disponibles</p>
    }

    const handleEdit = () => {
        navigate(`/`)
    }

    return (
        <div>
            <NavBar />
            <div className="d-flex justify-content-center my-4">
                
                <div className="card p-4" style={{ maxWidth: '500px' }}>
                    <h1 className="text-center mb-4">Mi perfil</h1>
                    <div className="d-flex justify-content-center mb-4">
                    {userState.image ? (
                        <div className="d-flex justify-content-center align-items-center rounded-circle" style={{ height: '150px', width: '150px' }}>
                            <img src={userState.image} alt="" className="card-img-top" style={{ height: '150px', objectFit: 'contain' }} />
                        </div>)
                    : (
                        <div className="d-flex justify-content-center align-items-center rounded-circle bg-secondary mb-4" style={{ height: '150px', width: '150px' }}>
                            <span className="text-center">Agrega una foto de perfil</span>
                        </div>
                    )}
                    </div>
                    <p className="card-text mb-2"><span className="fw-bold">Nombre de usuario: </span > {userState.username}</p>
                    <p className="card-text mb-2"><span className="fw-bold">Nombre: </span > {userState.first_name}</p>
                    <p className="card-text mb-2"><span className="fw-bold" >Apellido: </span >{userState.last_name}</p>
                    <p className="card-text mb-2"><span className="fw-bold">Email: </span > {userState.email}</p>
                    <p className="card-text mb-2"><span className="fw-bold">Fecha de Nacimiento:</span > {userState.dob ? userState.dob : "Agrega tu fecha de nacimiento"}</p>
                    <p className="card-text mb-2"><span className="fw-bold" >Bio: </span >{userState.bio ? userState.bio : "Agrega algo sobre ti"}</p>
                    <button className="btn btn-primary me-2" onClick={handleEdit}>Editar</button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;