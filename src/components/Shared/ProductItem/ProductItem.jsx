import React, { useEffect, useState } from 'react'
import stylesProuctItem from './ProductItem.module.css'
import { Link } from 'react-router-dom'
export default function ProductItem(props) {
    const[count,setCount]=useState(0)
    console.log(props)
    let{imageCover,title,category,price,ratingsAverage,id}=props.product
  return (
    <div className='sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 mt-20 '>
        <div className="product p-2">
          <Link to={`/productDetails/${id}/${category._id}`}>
            <img src={imageCover} alt="" />
            <span className='main-color'>{category.name}</span>
            <h2 className='mb-3 font-semibold'>{title.split(" ").splice(0,2).join(" ")}</h2>
            <div className='flex justify-between'>
              <p>{price}EGP</p>
              <p>
                <i className="fa-solid fa-star rating-color"></i>
                {ratingsAverage}</p>
            </div>
          </Link>
          <div className='px-3 flex items-center'>
            <button onClick={()=> props.AddProductToCart(id)} className='btn text-white bg-main w-full my-4 rounded p-2 '>Add to Cart</button>
            <i className="fa-solid fa-heart ms-3 text-2xl"></i>
          </div>
        </div>
    </div>
  )
}
