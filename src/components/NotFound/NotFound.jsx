import React, { useEffect, useState } from 'react'
import styles from './NotFound.module.css'
import notFoundImage from '../../assets/images/404.svg'
export default function NotFound() {
    const[count,setCount]=useState(0)
    useEffect(()=>{
          document.title = "Not Found";
     },[])
  return (
    <div className='h-screen flex '>
        <img className='w-full' src={notFoundImage} alt="" />
    </div>
  )
}
