import { Outlet } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import useRefresh from "../hooks/useRefresh";
import { AuthContext } from "../context/AuthProvider";
function PersistLogin() {
  const refresh = useRefresh();
  const authCtx = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const verifyRefreshToken = async () => {
        console.log("verifyRefreshToken")
      try {
        await refresh(); // Assuming refresh handles token refresh
      } catch (error) {
        console.error("Error refreshing token:", error);
      } finally {
        setLoading(false);
       
      }
    };
    !authCtx.tokenId?verifyRefreshToken():setLoading(false);
  }, []);

  return (
    <>
    {
        isLoading?<div>Loading...</div>:<Outlet/>
    }
    </>
  )
}

export default PersistLogin;
