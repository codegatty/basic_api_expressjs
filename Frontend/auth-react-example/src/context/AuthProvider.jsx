import { createContext,useState } from "react";

export const  AuthContext=createContext({
    tokenId:null,
    isAuth:false,
    storeToken:(token)=>{},
    logOut:()=>{}
})

function AuthContextProvider({children}){
    const [tokenId,setTokenId]=useState("");
    
    function storeToken(token){
        setTokenId(token);
    }

    function logOut(){
        setTokenId(null);
    }

    const values ={
        tokenId,
        isAuth:!!tokenId,
        storeToken,
        logOut
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;