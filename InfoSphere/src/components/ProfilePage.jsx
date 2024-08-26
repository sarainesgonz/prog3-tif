import NavBar from "./layout/NavBar";
import { useAuth } from "./context/AuthContext";
import { useUser } from "./context/UserContext";
import { useState } from 'react';
import { navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProfilePage() {
    const { authState } = useAuth();
    const { token, isAuth } = authState;
    const { userState, setUserState } = useUser()
    const [editing, setEditing] = useState(false)
    const [formData, setFormData] = useState({ username: "", first_name: "", last_name: "", email: "", dob: "", bio: "", image: "" })
    const [file, setFile] = useState(null)
    const id = userState.user__id;

    console.log("desde el profile", userState)
    if (!userState) {
        return <p className="text-center">No hay datos disponibles</p>
    }

    const handleEdit = () => {
       setEditing(true)
    }

    const handleCancel = () => {
        setEditing(false)
        setFormData({...userState})
    }

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image" && files.length > 0) {
            setFile(files[0]);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    }

    const handleSave = async (e) => {
        e.preventDefault();
        const formDataUpdated = new FormData();
        formDataUpdated.append("username", formData.username);
        formDataUpdated.append("first_name", formData.first_name);
        formDataUpdated.append("last_name", formData.last_name);
        formDataUpdated.append("email", formData.email);
        formDataUpdated.append("dob", formData.dob);
        formDataUpdated.append("bio", formData.bio);
        if (file) {
            formDataUpdated.append("image", formData.image);
        }
        try {
            const response = await fetch(`https://sandbox.academiadevelopers.com/users/profiles/${id}/`, {
                method: "PUT",
                headers: {
                    "Authorization": `Token ${token}`
                },
                body: formDataUpdated,
                credentials: "include"
            })
            if (response.ok) {
                const updatedUser = await response.json()
                console.log("response desde el profile", updatedUser)
                setUserState(previousState => ({
                    ...previousState,
                    ...updatedUser,
                    image: updatedUser.image ? updatedUser.image : null
                })
                    )   
                setFormData(updatedUser)
                setEditing(false)
                alert("Has actualizado tu perfil")
                
            } else {
                const errorResponse = await response.json()
                console.log("error desde el profile", errorResponse)
                alert("No se pudo actualizar el perfil")
            }
        } catch (error) {
            console.log(error)
            throw new Error("Ocurrió un error")
        }

    }
    // console.log(userState.image)

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
                    {editing ? (
                        <form onSubmit={handleSave}>
                            <div className="mb-3">
                                <label className="form-label">Nombre de usuario</label>
                                <input required type="text" placeholder="Nombre de usuario" name="username"  value={formData.username} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Nombre</label>
                                <input required type="text" placeholder="Nombre" name="first_name" value={formData.first_name} onChange={handleChange}  className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Apellido</label>
                                <input required type="text" placeholder="Apellido" value={formData.last_name} onChange={handleChange} name="last_name" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input required type="email" placeholder="Email" value={formData.email} onChange={handleChange} name="email" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Fecha de Nacimiento</label>
                                <input type="date" name="dob" className="form-control" value={formData.dob} onChange={handleChange}  />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Bio</label>
                                <textarea type="text" name="bio" className="form-control" placeholder="Bio" value={formData.bio} onChange={handleChange}  />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Imagen</label>
                                <input type="file" onChange={handleChange} name="image" className="form-control" />
                            </div>
                            <div className="d-flex justify-content-end">
                                <button type="submit" className="btn btn-primary me-2" >Guardar</button>
                                <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancelar</button>
                            </div>
                        </form>
                    ) : (
                        <div>
                    <p className="card-text mb-2"><span className="fw-bold">Nombre de usuario: </span > {userState.username}</p>
                    <p className="card-text mb-2"><span className="fw-bold">Nombre: </span > {userState.first_name}</p>
                    <p className="card-text mb-2"><span className="fw-bold" >Apellido: </span >{userState.last_name}</p>
                    <p className="card-text mb-2"><span className="fw-bold">Email: </span > {userState.email}</p>
                    <p className="card-text mb-2"><span className="fw-bold">Fecha de Nacimiento:</span > {userState.dob ? userState.dob : "Agrega tu fecha de nacimiento"}</p>
                    <p className="card-text mb-2"><span className="fw-bold" >Bio: </span >{userState.bio ? userState.bio : "Agrega algo sobre ti"}</p>
                    <button className="btn btn-primary me-2" onClick={handleEdit}>Editar</button>
                    </div>
                    )}  
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;