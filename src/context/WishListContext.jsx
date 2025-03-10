import { createContext, useContext, useEffect, useState } from "react";
import { cartContext } from "./CartContext";
import { tokenContext } from "./tokenContext";
import axios from "axios";
import { toast } from "react-toastify";

export let WishContext = createContext()
export function WishContextProvider(props){
    const WishList_API_URL ='https://ecommerce.routemisr.com/api/v1/wishlist'
    const {token} =useContext(tokenContext)
    console.log(token);
    
    const[count,setCount]=useState(0)
    const[wishDetails,setWishDetails]=useState(null)
    const[wishId,setWishtId]=useState('')
    const[Activecolor,setActivecolor]=useState(null)
    const[colored,setColored]=useState('')
    const headers ={
        token
    };
    async function AddToWishList(productId){
        let {data}=await axios.post(WishList_API_URL,{productId},{headers})
        console.log(data);
        if(data.status == "success"){
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
        return data
    }


    // heart call in recent
    const[wishListClicked,setWishListClicked]=useState([])
    async function getWishListProducts(){
      const data = await getWishList()
      console.log(data );
      const wishProducts= data?.data.map(product=>product._id)
      console.log(wishProducts);
      setWishListClicked(wishProducts)
      
    }
    async function toggleWishList(id){
      if(wishListClicked.includes(id)){
          let data = await removeProduct(id);
          console.log(data);
          setWishListClicked(data.data)
          if(data.status == "success"){
            toast("Removed from your wish list",{position:"bottom-right" ,theme:"dark" , type:"success"})
            getWishList()
            console.log(data.data);
            
          }
          
      }else{
        let data = await AddToWishList(id);
        console.log(data);
        setWishListClicked(data.data)
        if(data.status == "success"){
          toast("Product added to wish list successfully",{position:"bottom-right" ,theme:"dark" , type:"success"})
          getWishList()
      }
      }
    }
    useEffect(()=>{
      token && getWishList();
      console.log(token);
      
    },[token])
    return(
        <WishContext.Provider value={{AddToWishList,wishDetails,count,removeProduct,getWishList,wishId,setActivecolor,Activecolor,colored,setColored,getWishListProducts,toggleWishList,wishListClicked,setWishListClicked}}>
            {props.children}
        </WishContext.Provider>
    )
}
