import React, { useEffect, useState } from 'react'
import styles from './Products.module.css'
import RecentProducts from '../Home/component/RecentProducts/RecentProducts'
export default function Products() {
    const[count,setCount]=useState(0)
    useEffect(()=>{
      document.title = "Products";
     },[])
  return (
    <div>
      <RecentProducts/>
    </div>
  )
}
