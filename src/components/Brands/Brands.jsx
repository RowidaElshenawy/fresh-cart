import React, { useEffect, useState } from 'react'
import styles from './Brands.module.css'
import axios from 'axios'
import Loader from '../Shared/Loader/Loader'
import Item from '../Shared/Item/Item'

export default function Brands() {
    const[count,setCount]=useState(0)
    const[brands,SetBrands]=useState([])
    async function getBrands(){
      try{
        let {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
        console.log(data.data)
        SetBrands(data.data)
      }catch(error){
        console.log(error)
      }
    }
    useEffect(()=>{
      getBrands()
    },[])
  return (
    <>
    {/* {brands.lenght !=0 && <div className='pt-10'>
      <h2 className='text-center pb-5 text-3xl font-semibold text-main'>All Brands</h2>
      <div className='flex flex-wrap justify-center items-center mb-10 '>
          {brands.map(brand=><div className='w-[100%] sm:w-1/2 md:w-1/3 lg:w-1/4 p-3'>
            <div className={`${styles.box} flex flex-col items-center border-2`}>
              <img src={brand.image}  alt="" />
              <h4 className='mb-3'>{brand.name}</h4>
            </div>
            </div>
          )}
      </div>
    </div>}
    {brands.length==0 && <Loader/>} */}
    {/* <h2 className='text-center pb-5 text-3xl font-semibold text-main'>All Brands</h2> */}
    {/* <div className='flex flex-wrap justify-center items-center mb-10 '>
      {brands.length !=0 && brands.map(brand=> <Item key={brand.id} brand={brand}/>)}
      {brands.length==0 && <Loader/>}
    </div> */}

<h2 className='text-center pb-5 text-3xl font-semibold text-main pt-10'>All Brands</h2>
<div className='flex flex-wrap justify-center items-center mb-10 '>
  {brands.map(brand=>{
    return<>
    {/* Modal toggle */}
    <button data-modal-target={brand._id} data-modal-toggle={brand._id} className="w-[100%] sm:w-1/2 md:w-1/3 lg:w-1/4 p-3    font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
      <Item key={brand._id} brand={brand}/>
      <h1>{brand._id}</h1>
    </button>
    {/* Main modal */}
    <div id={brand._id} tabIndex={-1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide={brand._id}>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-4 md:p-5 space-y-4">
              <Item key={brand._id} brand={brand}/> 
          </div>
          {/* Modal footer */}
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button data-modal-hide={brand._id} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Close</button>
          </div>
        </div>
      </div>
    </div>
    </>}
  )}
</div>

    </>
  )
}
