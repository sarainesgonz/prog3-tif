import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext()

function UserProvider({ children}) {
    const [userState, setUserState] = useState(null)


    return (
        <UserContext.Provider value={{ userState, setUserState }}>
            {children}
        </UserContext.Provider>
    )
}

function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context
}

export { UserContext, UserProvider, useUser }