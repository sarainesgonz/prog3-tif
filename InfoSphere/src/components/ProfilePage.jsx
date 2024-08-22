import NavBar from "./layout/NavBar";
import useFetch from "./useFetch";
import { useEffect, useState } from 'react';
import { useAuth } from "./context/AuthContext";

function ProfilePage() {
    // retrieves a user's profile info
    const { authState } = useAuth();
    const { token } = authState;
    const [profileInfo, setProfileInfo] = useState(null)
    const { data, loading, error } = useFetch("https://sandbox.academiadevelopers.com/users/profiles/profile_data/",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`,
            },
            credentials: "include",
        });


    useEffect(() => {
        if (data && profileInfo !== data) {
            setProfileInfo(data)
            console.log(data)
        }
    }, [data, profileInfo]);

    return (
        <div>
            <NavBar />
            <div>
                <h1>My Profile</h1>
                <div>
                    {loading ? (
                        <p>Cargando datos del perfil...</p>
                    ) : error ? (
                        <p>Ocurrio un error</p>
                    ) :
                        profileInfo ? (
                            <div>
                                <p>{profileInfo.username}</p>
                                <p>{profileInfo.first_name}</p>
                                <p>{profileInfo.last_name}</p>
                                <p>{profileInfo.email}</p>
                                <p>{profileInfo.dob ? profileInfo.dob : "Agrega tu fecha de nacimiento"}</p>
                                <p>{profileInfo.state ? profileInfo.dob : "Agrega un estado"}</p>
                            </div>
                    ) : (
                        <p>No hay datos</p>)}

                </div>

            </div>
        </div>
    )
}

export default ProfilePage;