import { useEffect,useContext } from "react";
import {useNavigate} from 'react-router-dom'

import { AuthContext } from "../context/AuthProvider";

function ProtectedRoute({children}) {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
   
    useEffect(()=>{
        if(authCtx.tokenId==""){
        navigate("/login",{replace:true});
        }
    },[navigate,authCtx.tokenId])
  return children;
}

export default ProtectedRoute
