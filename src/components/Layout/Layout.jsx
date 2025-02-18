import React, { useEffect, useState } from 'react'
import styles from './Layout.module.css'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import NavBar from '../NavBar/NavBar'
export default function Layout() {
    const[count,setCount]=useState(0)
  return (
    <div>
      <NavBar/>
      <div className='sm:w-[80%] mx-auto mt-[100px] overflow-auto'>
        <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}
