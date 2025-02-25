import React, { useContext, useEffect, useState } from 'react'
import styles from './RecentProducts.module.css'
import axios from 'axios'
import ProductItem from '../../../Shared/ProductItem/ProductItem'
import Loader from '../../../Shared/Loader/Loader'
import { cartContext } from '../../../../context/CartContext'
import { toast } from 'react-toastify'
import { WishContext } from '../../../../context/WishListContext'
import { tokenContext } from '../../../../context/tokenContext'
// import ProductItem from '../../Shared/ProductItem/ProductItem'
export default function RecentProducts() {
    const[count,setCount]=useState(0)
    let[products,setProducts]=useState([])
    let{AddToCart}=useContext(cartContext)
    let[calling,setCalling]=useState("")
    let{token}=useContext(tokenContext)
    let{ AddToWishList,wishId, removeProduct,getWishList,setActivecolor,Activecolor,wishDetails}=useContext(WishContext)

    function getProducts(){
      axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then(({data})=>{
          setProducts(data.data)
      }).catch(error=>{
        console.log(error)
      })
    }
    useEffect(()=>{
      getProducts()
      console.log(token);
      
    },[token])
    async function AddProductToCart(id){
     let data =await AddToCart(id)
     console.log(data)
     setCalling(data.status)
     console.log(data.status)
     if(data.status == "success"){
      toast("Product added successfully",{position:"bottom-right" ,theme:"dark" , type:"success"})
     }
    }
    async function AddProductToWishList(id){
        let data =await  AddToWishList(id)
        console.log(data);
        if(data.status == "success"){
          toast("Product added to wish list successfully",{position:"bottom-right" ,theme:"dark" , type:"success"})
          setActivecolor('text-red-600')
          getWishList()
      }
      
    }
    async function deleteProduct(id){
      let data= await removeProduct(id)
      console.log(data);
      if(data.status == "success"){
        toast("Removed from your wish list",{position:"bottom-right" ,theme:"dark" , type:"success"})
        setActivecolor('')
        getWishList()

      }
    }
    // heart
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
          
      }else{
        let data = await AddToWishList(id);
        console.log(data);
        setWishListClicked(data.data)
      }
    }

    useEffect(()=>{
      getWishListProducts()
    },[])
  return (
    <>
    {products.length ==0 && <Loader/>}
    {products.length !=0 && <div className='flex flex-wrap g-y-3 mb-16'>
        {products.map(product=> <ProductItem  key={product.id} calling={calling} AddProductToCart={AddProductToCart} AddProductToWishList={AddProductToWishList} product={product} wishId={wishId} Activecolor={Activecolor} deleteProduct={deleteProduct} wishListClicked={wishListClicked} toggleWishList={toggleWishList} />)}
      </div>}
    </>
  )
}
