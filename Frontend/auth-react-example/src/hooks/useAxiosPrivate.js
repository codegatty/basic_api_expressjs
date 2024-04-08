import { axios_private } from "../axios_conifg/axios";
import { useEffect } from "react";
import useRefresh from "./useRefresh";

const useAxiosPrivate = () => {
  const refresh=useRefresh();
  useEffect(() => {
    
    const responseInterceptor=axios_private.interceptors.response.use(
      (response) => {
        console.log("this ismwssage from intercept");
        return response;
      },
      async (error) => {
        const prevRequest=error?.config
        console.log("intercepting....")
        if(error?.response?.status===401 && !prevRequest?.sent){
            prevRequest.sent=true;
            const accessToken = await refresh();
            prevRequest.headers['Authorization'] = 'Bearer ' + accessToken;
            return axios_private(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return ()=>{
      axios_private.interceptors.response.eject(responseInterceptor);
    }
  },[refresh]);
  return axios_private;
};

export default useAxiosPrivate;
