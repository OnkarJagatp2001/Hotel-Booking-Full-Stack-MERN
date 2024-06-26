import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
type ToastMessage = {
    message:string,
    type:"SUCCESS" | "ERROR";
}

type AppContext = {
  showToast : (toastMessage:ToastMessage)=>void;
  isLoggedIn : boolean;
}
 
const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({children}:{children:React.ReactNode})=>{
    const [toast,setToast] = useState<ToastMessage | undefined >(undefined);

    //executes when the actions causes the app to be rendered
    // Whenever the user changes the root or app to be refreshed
    const { isError } = useQuery("validateToken",apiClient.validateToken,{
        retry: false,
    })
    return(     
        <AppContext.Provider value={{
            showToast:(toastMessage)=>{
                setToast(toastMessage) 
            },
            isLoggedIn : !isError
        }}>
            {
                toast && (<Toast
                message={toast.message} type={toast.type} 
                onClose={()=>setToast(undefined)} />)
            }
                {children} 
        </AppContext.Provider>
    )
}


//createing hook that lets use of AppContext in aur application
export const useAppContext = () =>{
    const context = useContext(AppContext);
    return context as AppContext;
}