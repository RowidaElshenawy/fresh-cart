import React, { useEffect, useState } from 'react'
import styles from './Item.module.css'
export default function Item(props) {
    const[count,setCount]=useState(0)
    let{image,name}=props.brand
  return (
    <>
      {/* <div className='w-[100%] sm:w-1/2 md:w-1/3 lg:w-1/4 p-3'> */}
            <div className='box flex flex-col items-center border-2'>
              <img src={image} alt="" />
              <h4 className='py-3'>{name}</h4>
            </div>
      {/* </div> */}
    </>
  )
}
