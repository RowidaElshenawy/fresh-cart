import { Navigate } from "react-router-dom";

export default function(props){
    if(localStorage.getItem("userToken")){
        return <Navigate to={"/"}/>
    }else{
        return props.children
    }
}