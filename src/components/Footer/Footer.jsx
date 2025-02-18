import React, { useEffect, useState } from 'react'
import styles from './Footer.module.css'
export default function Footer() {
    const[count,setCount]=useState(0)
  return (
    <footer className='bg-[rgba(242,242,242)]  p-6'>
      <div className="container ">
        <h2 className='text-2xl text-[#212529]'>Get The Fresh Cart App</h2>
        <p className='text-[#6d767e] font-light mb-4'>We will send you a link , open it on your phone to download the app.</p>
        <div className='flex mb-5'>
          <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block grow me-3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
          <button className='text-white bg-main rounded-md p-3'>Share app link</button>
        </div>
        <div className="partner flex justify-between border-y-2 py-6 px-3">
            <div className="payment">
              <p>Payment Partners</p>
            </div>
            <div className='app'>
                <p>Get deliveries with FreshCart</p>
            </div>
        </div>
      </div>
    </footer>
  )
}
