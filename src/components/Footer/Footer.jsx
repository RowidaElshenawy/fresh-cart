import React, { useEffect, useState } from 'react'
import styles from './Footer.module.css'
import amazone from '../../assets/images/amazon.png'
import american from '../../assets/images/American.png'
import mastercard from '../../assets/images/mastercard.webp'
import paypal from '../../assets/images/paypal.png'
import get from '../../assets/images/get-apple.png'
import play from'../../assets/images/play.png'
export default function Footer() {
    const[count,setCount]=useState(0)
  return (
    <footer className='bg-[rgba(242,242,242)]  p-6'>
      <div className="container ">
        <h2 className='text-2xl text-[#212529]'>Get The Fresh Cart App</h2>
        <p className='text-[#6d767e] font-light mb-4'>We will send you a link , open it on your phone to download the app.</p>
        <div className='flex flex-wrap mb-5'>
          <input type="email" id="email" class="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block grow me-3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
          <button className='mb-3 text-white bg-main rounded-md p-3'>Share app link</button>
        </div>
        <div className="partner flex flex-wrap  justify-between border-y-2 py-6 px-3">
            <div className="payment mb-3  flex flex-wrap items-center justify-between">
              <p className=' text-xl pe-3'>Payment Partners</p>
              <div className='pe-2 mt-3'>
                <img className='w-[100px]' src={amazone} alt="" />
              </div>
              <div className='pe-2' >
                <img className='w-[100px]' src={american} alt="" />
              </div>
              <div className='pe-2' >
                <img className='w-[100px]' src={mastercard} alt="" />
              </div>
              <div className='pe-2'>
                <img className='w-[100px]' src={paypal} alt="" />
              </div>
            </div>
            <div className='app mb-3 payment  flex flex-wrap items-center justify-between'>
                <p className=' text-xl pe-3'>Get deliveries with FreshCart</p>
                <div className='pe-2'>
                <img className='w-[100px]' src={get} alt="" />
              </div>
              <div className='pe-2' >
                <img className='w-[100px]' src={play} alt="" />
              </div>
            </div>
        </div>
      </div>
    </footer>
  )
}
