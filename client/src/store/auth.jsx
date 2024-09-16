import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"
import { toast } from "react-toastify";

export const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [token,setToken]=useState(localStorage.getItem("token"))
    const[user,setUser]=useState(null);
    const[services,setServices]=useState("")
    const[isLoading,setIsLoading]=useState(true)
    const authorizationToken=`Bearer ${token}`
   
const storeTokenInLS=(serverToken)=>{
    setToken(serverToken)
return localStorage.setItem('token',serverToken);
};
let isLoggedIn=!!token

// logout function create 
const LogoutUser = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    toast.success("Logout Successfull"); // Moved toast inside context
  };

// jwt token authorization and get user data

const userAuthentication=async()=>{
    setIsLoading(true)
    try {
        const response=await axios.get("https://mern-auth-api-uve6.onrender.com/api/auth/user",{
            headers:{
                Authorization:authorizationToken,
            }
        })

        if (response.status===200) {
            const data=await response.data
            // console.log("user data",data.userData)
            setUser(data.userData);
            setIsLoading(false)
        }else{
            console.log("Error fetching user data")
            setIsLoading(false)
        }
    } catch (error) {
        console.log("Error fetching user data")
    }
}
// getServiceData from backend service data

const getServiceData=async()=>{
    try {
        const response=await axios.get("https://mern-auth-api-uve6.onrender.com/api/data/service");
        if (response.status===200) {
            const services=await response.data
            // console.log(services)
            setServices(services.msg)
        }
        // console.log("services:",response)
    } catch (error) {
        console.log(error)
    }
};


useEffect(()=>{
    getServiceData()
    if (token) {
        userAuthentication()        
    }
    
},[token]);


return(
    <AuthContext.Provider value={{isLoggedIn,LogoutUser,storeTokenInLS,user,services,authorizationToken,isLoading}}>
            {children}
    </AuthContext.Provider>
)
}

export const useAuth=()=>{
    const authContextValue=useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAth used outside of the Provider");
    }
    return authContextValue;
}
