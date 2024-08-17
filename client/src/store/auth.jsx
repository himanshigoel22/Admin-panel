import {  createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token , setToken] = useState(localStorage.getItem("token"));
    const [user , setUser] = useState("");
    const [services , setServices] = useState([]);
    const [isLoading , setIsLoading] = useState(true);
    const URL = "http://localhost:3000";

    const authorizationToken = `Bearer ${token}`;
    const storetokenInLS = (serverToken) => {
        localStorage.setItem('token', serverToken);
        setToken(serverToken); 
    };
    
    let isLoggedIn = !!token;

    console.log("is logged in :",isLoggedIn);

    const logoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    };

    //jwt authentication - to get loggedin users data

    const userAuthentication = async() =>{
        try {
            setIsLoading(true);
            const response = await fetch(`${URL}/api/auth/user` , {
                method: "GET",
                headers: {
                  Authorization: authorizationToken,
                  'Content-Type': 'application/json'
                },
              });

              if(response.ok){
                const data = await response.json();
                setUser(data.userData);
                setIsLoading(false);
              }
              else{
                setIsLoading(false);
              }
        } 
        catch (error) {
            console.log("error fetching user data")
        }
    }
    useEffect(() => {
        if (token) {
          userAuthentication();
        }
      }, [token]);

// to fetch service data from backend
const getServices = async() => {
    try {
        const response = await 
        fetch(
            `${URL}/api/data/service` , {
             method: "GET",
            });
        if(response.ok){
            const data = await response.json();
            setServices(data.msg);
        }

    } 
    catch (error) {
        console.log("services frontend error ")
    }
}
useEffect(() => {
    getServices();
    userAuthentication();
}, [])

    return (
        <AuthContext.Provider value={{ 
            storetokenInLS , logoutUser ,  
            isLoggedIn , user , services,
            authorizationToken,
            isLoading , URL
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth used outside provider");
    }

    return context;
};
