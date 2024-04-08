import { useContext } from "react"
import { AuthContext } from "../context/AuthProvider"
import axios from "axios"

function useRefresh() {
    const authCtx=useContext(AuthContext);
    const refresh=async ()=>{
    const response=await axios.post("http://localhost:5000/api/refresh",null,{
        withCredentials:true
    })
    authCtx.storeToken(response.data.accessToken);
    
    return response.data.accessToken
    }
    return refresh;
}

export default useRefresh
