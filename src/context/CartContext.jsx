import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { tokenContext } from './tokenContext';
import axios from "axios";
export const cartContext = createContext();
export default function CartContextProvider(props){
    const[ numOfCartItems,setNumOfCartItems]=useState(0)
    const{token}=useContext(tokenContext)
    const[cartId,setCartId]=useState('')
    const API_URL ='https://ecommerce.routemisr.com/api/v1/cart'
    const Order_API_URL='https://ecommerce.routemisr.com/api/v1/orders'
    const headers={
        token
    };
    const[cartDetails,setCartDetails]=useState(null)
    console.log(headers)
    async function AddToCart(productId){
        const {data}=await axios.post(API_URL,{productId},{headers});
        console.log(data)
        if(data.status == "success"){
            setNumOfCartItems(data.numOfCartItems)
            setCartDetails(data)
        }
        return data
    }
    async function getCart(){
        const {data}=await axios.get(API_URL,{headers});
        console.log(data) 
        if(data.status == "success"){
            setNumOfCartItems(data.numOfCartItems)
        }
        setCartId(data.cartId)
        setCartDetails(data)
    }
    async function removeProduct(id){
        console.log(id)
        const {data}=await axios.delete(`${API_URL}/${id}`,{headers});
        console.log(data) 
        if(data.status == "success"){
            setNumOfCartItems(data.numOfCartItems)
        }
        setCartDetails(data)
        return data
    }
    async function updateCount(id,count){
        console.log(id)
        const {data}=await axios.put(`${API_URL}/${id}`,{count},{headers});
        console.log(data) 
        if(data.status == "success"){
            setNumOfCartItems(data.numOfCartItems)
        }
        setCartDetails(data)
        return data
    }
    async function cashOnDelivary(shippingAddress){
        const{data}=await axios.post(`${Order_API_URL}/${cartId}`,{shippingAddress},{headers});
        if(data.status == "success"){
            getCart()
        }
        return data
    }
    async function onlinePayment(shippingAddress){
        const {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,{shippingAddress},{headers})
        return data
    }
    async function getUserOrders(userId){
        let {data} = await axios.get(`${Order_API_URL}/user/${userId}`)
        return data
    }
    useEffect(()=>{
        token && getCart();
        console.log(cartId);
        
     },[token])
   return(
   <cartContext.Provider value={{numOfCartItems,setNumOfCartItems,AddToCart,getCart,cartDetails,removeProduct,updateCount,cashOnDelivary,onlinePayment,getUserOrders}}>
        {props.children}
    </cartContext.Provider>
   )
   
}