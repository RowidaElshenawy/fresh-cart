import React, { useContext, useEffect, useState } from 'react'
import styles from './NavBar.module.css'
import logo from '../../assets/images/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { tokenContext } from '../../context/tokenContext'
import { cartContext } from '../../context/CartContext'
export default function NavBar() {
    const[count,setCount]=useState(0)
    let {token,setToken}=useContext(tokenContext)
    let{numOfCartItems}=useContext(cartContext)
    console.log(token,"navbartoken")
    let navigate =useNavigate()
    function Logout(){
      localStorage.removeItem("userToken")
      setToken(null)
      navigate("/login")
    }
  return (
    

<nav className="bg-[rgba(242,242,242)]  border-gray-200 dark:bg-gray-900 fixed z-[1000000] w-[100%] top-0 ">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between  p-4 sm:w-[80%] mx-auto">
    <div className="flex items-center gap-4">
      <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={logo} width={'200px'} alt="" />
      </a>
      <div className="hidden w-full md:block md:w-auto absolute top-[40px] left-0 md:relative md:top-0" id="navbar-default">
        {token?<ul className="font-medium flex md:items-center flex-col p-4 md:p-0 mt-4 border  rounded-lg bg-[rgba(242,242,242,0.8)] md:bg-[rgba(242,242,242)]  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <NavLink to={''} className="block py-2 px-3  rounded-sm   dark:text-white md:dark:text-blue-500" aria-current="page">Home</NavLink>
          </li>
          <li>
            <NavLink to={'cart'} className="block py-2 px-3 text-gray-900 rounded-sm   md:border-0   dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Cart {numOfCartItems}</NavLink>
          </li>
          <li>
            <NavLink to={'products'}  className="block py-2 px-3 text-gray-900 rounded-sm   md:border-0   dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Products</NavLink>
          </li>
          <li>
            <NavLink to={'categories'} className="block py-2 px-3 text-gray-900 rounded-sm   md:border-0   dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Categories</NavLink>
          </li>
          <li>
            <NavLink to={'brands'} className="block py-2 px-3 text-gray-900 rounded-sm   md:border-0   dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Brands</NavLink>
          </li>
        </ul> : ''}
        
      </div>
    </div>
    <div className='flex gap-3'>
      <ul className='flex gap-3'>
        <li>
          <i className="fa-brands fa-instagram"></i>
        </li>
        <li>
          <i className="fa-brands fa-facebook"></i>
        </li>
        <li>
          <i className="fa-brands fa-tiktok"></i>
        </li>
        <li>
          <i className="fa-brands fa-twitter"></i>
        </li>
        <li>
          <i className="fa-brands fa-linkedin"></i>
        </li>
        <li>
          <i className="fa-brands fa-youtube"></i>
        </li>
      </ul>
      <ul className='flex gap-3'>
        {token?<li>
          <span onClick={Logout}>Signout</span>
        </li>:<><li>
          <NavLink to={'register'}>Register</NavLink>
        </li>
        <li>
          <NavLink to={'login'}>Login</NavLink>
        </li></>}
      </ul>
    </div>
    {token?<button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
      </svg>
    </button>:''}
    
  </div> 
</nav>


  )
}
