import { createContext, useContext, useEffect, useState } from "react";
import { cartContext } from "./CartContext";
import { tokenContext } from "./tokenContext";
import axios from "axios";

export let WishContext = createContext()
export function WishContextProvider(props){
    const WishList_API_URL ='https://ecommerce.routemisr.com/api/v1/wishlist'
    const{token}=useContext(tokenContext)
    const[count,setCount]=useState(0)
    const[wishDetails,setWishDetails]=useState(null)
    const[wishId,setWishtId]=useState('')
    // ay
    const[Activecolor,setActivecolor]=useState(null)
    const[colored,setColored]=useState('')
    // ss
    const headers ={
        token
    };
    async function AddToWishList(productId){
        let {data}=await axios.post(WishList_API_URL,{productId},{headers})
        console.log(data);
        if(data.status == "success"){
            // getWishList()
            setWishtId(data.data)
              return data
        }
    
    }
    async function getWishList(){
        let {data}=await axios.get(WishList_API_URL,{headers})
        console.log(data);
        if(data.status == "success"){
            setCount(data.count)
            setWishDetails(data.data)
        }
        console.log(wishDetails);
        return data
    }
    async function removeProduct(id){
        console.log(id)
        const {data}=await axios.delete(`${WishList_API_URL}/${id}`,{headers});
        console.log(data) 
        // if(data.status == "success"){
        //     // getWishList()
        // }
        return data
    }
   
    useEffect(()=>{
      token && getWishList();
      console.log(token);
      
    },[token])
    return(
        <WishContext.Provider value={{AddToWishList,wishDetails,count,removeProduct,getWishList,wishId,setActivecolor,Activecolor,colored,setColored}}>
            {props.children}
        </WishContext.Provider>
    )
}
