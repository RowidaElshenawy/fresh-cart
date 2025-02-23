import React, { useContext, useEffect, useState } from 'react'
import styles from './RecentProducts.module.css'
import axios from 'axios'
import ProductItem from '../../../Shared/ProductItem/ProductItem'
import Loader from '../../../Shared/Loader/Loader'
import { cartContext } from '../../../../context/CartContext'
import { toast } from 'react-toastify'
// import ProductItem from '../../Shared/ProductItem/ProductItem'
export default function RecentProducts() {
    const[count,setCount]=useState(0)
    let[products,setProducts]=useState([])
    let{AddToCart}=useContext(cartContext)
    let[calling,setCalling]=useState("")

    function getProducts(){
      axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then(({data})=>{
        console.log(data.data ,"hello")
        setProducts(data.data)
      }).catch(error=>{
        console.log(error)
      })
    }
    useEffect(()=>{
      getProducts()
    },[])
    async function AddProductToCart(id){
     let data =await AddToCart(id)
     console.log(data)
     setCalling(data.status)
     console.log(data.status)
     if(data.status == "success"){
      toast("Product added successfully",{position:"bottom-right" ,theme:"dark" , type:"success"})
     }
    }
  return (
    <>
    {products.length ==0 && <Loader/>}
    {products.length !=0 && <div className='flex flex-wrap g-y-3 mb-16'>
        {products.map(product=> <ProductItem  key={product.id} calling={calling} AddProductToCart={AddProductToCart} product={product}/>)}
      </div>}
    </>
  )
}
