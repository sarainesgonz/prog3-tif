import NavBar from "./layout/NavBar";
import { useAuth } from "./context/AuthContext";
import { useUser } from "./context/UserContext";


function ProfilePage() {
    const { authState } = useAuth();
    const { token } = authState;
    const { userState } = useUser()
    // const [profileInfo, setProfileInfo] = useState(null)
    // const { data, loading, error } = useFetch("https://sandbox.academiadevelopers.com/users/profiles/profile_data/",
    //     {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Token ${token}`,
    //         },
    //         credentials: "include",
    //     });

    // const {setUserState} = useUser()

    // useEffect(() => {
    //     if (data && profileInfo !== data) {
    //         setProfileInfo(data)
    //         console.log(data)
    // setUserState({userData: data})
    // gaurdo los datos en el contexto
    //     }
    // }, [data, profileInfo]);
    console.log("desde el profile", userState)
    if (!userState) {
        return <p>No hay dato disponibles</p>
    }

    return (
        <div>
            <NavBar />
            <div>
                <h1>My Profile</h1>
                <div>

                    <p>{userState.username}</p>
                    <p>{userState.first_name}</p>
                    <p>{userState.last_name}</p>
                    <p>{userState.email}</p>
                    <p>{userState.dob ? userState.dob : "Agrega tu fecha de nacimiento"}</p>
                    <p>{userState.state ? userState.dob : "Agrega un estado"}</p>

                </div>
            </div>
        </div>
    )
}

export default ProfilePage;