import { createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext();

// el provider para que le pase al contecto los datos a compartir con los children

function AuthProvider({ children }) {
    const [authState, setAuthState] = useState({token: null, isAuth: false}); //estado inicial

    const login = (token) => {
        localStorage.setItem("Token", token);
        setAuthState({token, isAuth: true})
    }

    const logout = () => {
        localStorage.removeItem("Token");
        setAuthState({token: null, isAuth: false})
    }

    useEffect(() => {
        const token = localStorage.getItem("Token");
        if(token) {
            setAuthState({token, isAuth: true})
        }
    }, []) //preserva el estado de auth para que no haga logout al recargar

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context
}

export { AuthContext, AuthProvider, useAuth };