import React, {  useEffect, useState } from 'react'
import styles from './WishList.module.css'
import axios from 'axios'
import { cartContext } from '../../context/CartContext'
import { tokenContext } from '../../context/tokenContext'
import { WishContext } from '../../context/WishListContext'
import { useContext } from 'react';
import { ClockLoader } from 'react-spinners'
import { toast } from 'react-toastify'
export default function WishList() {
    const[count,setCount]=useState(0)
    const{wishDetails ,removeProduct , getWishList}=useContext(WishContext)
    const{AddToCart}=useContext(cartContext)
    async function  AddtoCart(id){
      let data =await AddToCart(id)
      console.log(data)
      console.log(data.status)
      if(data.status == "success"){
      toast("Product added successfully",{position:"bottom-right" ,theme:"dark" , type:"success"})
      }
    }
    async function deleteProduct(id){
      let data= await removeProduct(id)
      console.log(data);
      if(data.status == 'success'){
        getWishList()
      }
    }
    useEffect(()=>{
      document.title="Wish List"
    },[])
  return (
    <>
      {wishDetails? wishDetails?.data?.length==0 ? <div className='my-20 bg-[#F8F9FA] p-4'>
        <h2 className='text-2xl font-medium'>My wish List</h2>
        <h3 className='text-xl mt-3'>Empty Wish List</h3></div>:<div className='my-20 bg-[#F8F9FA] p-4'>
        <h2 className='text-2xl font-medium'>My wish List</h2>
        {wishDetails.map(wish=> <div className=' my-5 text-center sm:text-left border-b-2 mb-5 pb-3 sm:mb-0  sm:flex sm:justify-between sm:items-center'>
          <div className='sm:flex sm:w-[70%] sm:items-center'>
            <div className='sm:w-[40%] '>
              <img  src={wish.imageCover} alt="" />
            </div>
            <div className='my-5 sm:my-0 sm:ps-5 sm:w-[60%]'>
              <h3 className='text-2xl '>{wish.title}</h3>
              <span className='text-main my-2 inline-block'>{wish.price}EGP</span>
              <span onClick={()=>deleteProduct(wish.id)} className='text-red-800 font-medium cursor-pointer block'><i class="fa-solid fa-trash"></i> Remove</span>
            </div>
          </div>
          <div>
            <button className='border border-2 border-main p-2 text-xl rounded-md' onClick={()=>AddtoCart(wish.id)}>Add To Cart</button>
          </div>
        </div>)}
       

      </div> : <div className='h-screen py-10 flex justify-center'><ClockLoader color="green" /></div>}




    </>
  )
}
