import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css'
import { cartContext } from '../../context/CartContext'
import { tokenContext } from './../../context/tokenContext';
import { ClockLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
export default function Cart() {
    const[count,setCount]=useState(0)
    const{cartDetails , removeProduct,updateCount}=useContext(cartContext)
    useEffect(()=>{
      console.log(cartDetails);
      document.title="Cart"
      
    },[cartDetails])
    async function deleteProduct(id){
     let data= await removeProduct(id)
     console.log(data);
    }
    async function updateItems(id,count){
      let data = await updateCount(id,count)
      console.log(data);
      
    }
  return (
    <>
    {cartDetails ? cartDetails?.data?.products?.length==0 ? <h1 className='h-screen pt-10 text-2xl '>Empty Cart</h1> :
     <div className='py-6'>
      <div className='my-7 sm:flex sm:justify-between text-2xl sm:3xl'>
        <h2 className=' mb-3 sm:mb-0'>Total Product Number : <span className='text-main'>{cartDetails.numOfCartItems}</span></h2>
        <h2 className=''>Total Price : <span className='text-main'>${cartDetails.data.totalCartPrice}</span></h2>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className='hidden m:contents'>
              <th scope="col" className="px-16 py-3">
                <span>Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody >
            {cartDetails.data.products.map(product =>  <tr className="flex flex-col md:table-row bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-2 ">
                <img src={product.product.imageCover} className=" md:w-80 max-w-full max-h-full" alt="Apple Watch" />
              </td>
              <td className="text-center md:text-left px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {product.product.title}
              </td>
              <td className=" px-6 py-4">
                <div className="flex items-center justify-center">
                  <button onClick={()=>updateItems(product.product._id , product.count-1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                    </svg>
                  </button>
                  <div>
                    {product.count}
                  </div>
                  <button onClick={()=>updateItems(product.product._id , product.count+1)}  className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
              </td>
              <td className="text-center md:text-left px-6 py-4 font-semibold text-gray-900 dark:text-white">
                ${product.price}
              </td>
              <td className="text-center md:text-left px-6 py-4">
                <span onClick={()=>{deleteProduct(product.product._id)}} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</span>
              </td>
            </tr>)}
           
          </tbody>
        </table>
      </div>
      <Link to={'/checkout'} className='bg-main text-white text-lg p-3 my-4 rounded-md inline-block'>CheckOut</Link>
    </div> : <div className='h-screen py-10 flex justify-center'><ClockLoader color="green" /></div>}
   
    </>
  )
}
