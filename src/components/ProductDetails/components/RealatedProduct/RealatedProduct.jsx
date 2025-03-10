import React, { useContext, useEffect, useState } from 'react'
import styles from './RealatedProduct.module.css'
import axios from 'axios'
import ProductItem from '../../../Shared/ProductItem/ProductItem';
import { cartContext } from '../../../../context/CartContext';
import { WishContext } from '../../../../context/WishListContext';
import { tokenContext } from '../../../../context/tokenContext';
export default function RealatedProduct(props) {
    const[count,setCount]=useState(0)
    let{categoryId,id}=props
    let[realatedProducts,setRelatedProducts]=useState([])
    const{productInCart,AddProductToCart,productsInCart}=useContext(cartContext)
    const{getWishListProducts,toggleWishList,wishListClicked}=useContext(WishContext)
    const{token}=useContext(tokenContext)
    function getProducts(){
      axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then(({data})=>{
        console.log(data.data)
        let result = data.data.filter(product=>product.category._id==categoryId)
        console.log(result)
        setRelatedProducts(result)
      }).catch(error=>{
        console.log(error)
      })
    }
    useEffect(()=>{
      getProducts()
      getWishListProducts()
      console.log(token);
      productInCart()
    },[token])
  return (
      <div className='flex flex-wrap g-y-3 mb-16'>
        {realatedProducts.map(product=> <ProductItem key={product.id} product={product} wishListClicked={wishListClicked} toggleWishList={toggleWishList} productsInCart={productsInCart}   AddProductToCart={AddProductToCart}/>)}
      </div>
  )
}
