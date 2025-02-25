import React, { useEffect, useState } from 'react'
import styles from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import RealatedProduct from './components/RealatedProduct/RealatedProduct'
import Slider from 'react-slick'
import Loader from '../Shared/Loader/Loader'
import { useContext } from 'react'
import { cartContext } from './../../context/CartContext';
import { toast } from 'react-toastify'
import { WishContext } from '../../context/WishListContext'
export default function ProductDetails() {
    const[count,setCount]=useState(0)
    let[details,setDetails]=useState(null)
    const {id,categoryId}=useParams()
    let{AddToCart}=useContext(cartContext)
    const{AddToWishList , getWishList}=useContext(WishContext)
    function getProductDetails(){
      axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({data})=>{
        console.log(data.data)
        setDetails(data.data)
      }).catch((err)=>{
        console.log(err)
      })
    }
    useEffect(()=>{
      getProductDetails()
      document.title="Product Details"
    },[id])
    const settings = {
      dots: true,
      infinite: true,
      arrows:false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    async function AddProductToCart(id){
      let data = await AddToCart(id)
      if(data.status == "success"){
        toast("Product added successfully",{position:"bottom-right" ,theme:"dark" , type:"success"})
      }
    }
     async function AddProductToWishList(id){
          let data =await  AddToWishList(id)
          console.log(data);
          if(data.status == "success"){
            toast("Product added to wish list successfully",{position:"bottom-right" ,theme:"dark" , type:"success"})
            getWishList()
           }
      }
  return (
    <>
      {details&& <div className='flex flex-wrap items-center py-16 px-5'>
        <div className="pb-16 w-[100%] md:pb-0 md:w-4/12 pe-4">
          <Slider {...settings}>
              {details?.images.map(img=><img className='w-[100%]' src={img} alt="" />)}
          </Slider>
        </div>
        <div className="md:w-8/12">
          <h1 className='font-semibold text-3xl'>{details?.title}</h1>
          <p className='my-5'>{details?.description}</p>
          <span>{details?.category?.name}</span>
          <div className='flex justify-between'>
            <p>{details?.price}EGP</p>
            <p>
              <i className="fa-solid fa-star rating-color"></i>
              {details?.ratingsAverage}</p>
          </div>
          <div className='px-16 flex items-center'>
            <button onClick={()=>{AddProductToCart(details.id)}} className='btn text-white bg-main w-full my-4 rounded p-2 '>Add to Cart</button>
            <i onClick={()=> AddProductToWishList(details.id)} className="cursor-pointer fa-solid fa-heart ms-3 text-2xl"></i>
          </div>
        </div>
      </div>}
      {!details&& <Loader/>}
      <h2 className='text-4xl font-medium text-center'>Related Product</h2>
      <RealatedProduct categoryId={categoryId}/>
    </>
  )
}
