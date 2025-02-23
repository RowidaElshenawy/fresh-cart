import React, { useEffect} from 'react'
import styles from './Checkout.module.css'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ClipLoader } from 'react-spinners'
import { cartContext } from './../../context/CartContext';
import { useContext } from 'react';
import { useState } from 'react';
export default function Checkout() {
  const[isCallingAPI , setCallingAPI]=useState(false)
  let [apiError , setApiError]=useState(null)
  let {cashOnDelivary,onlinePayment}=useContext(cartContext)
  const[isOnline,setIsOnline]=useState(false)
  const initialValues = {
    details:'',
    phone:'',
    city:'',
  }
  const validationSchema  = Yup.object().shape({
    details:Yup.string().required('Reguired'),
    phone:Yup.string().required('Reguired'),
    city:Yup.string().required('Reguired'),
    
  })
   const shippingForm =useFormik({
    initialValues,
    validationSchema,
    onSubmit:(values)=>{
      CallPayment(values)
      console.log(values);
      
    },
   })
   async function CallPayment(values){
    console.log(isOnline);
    try{
      setCallingAPI(true)
      if(isOnline){
        let x =await onlinePayment(values)
        console.log(x);
        window.location.href=x.session.url
      }else{
        let x=await cashOnDelivary(values)
        console.log(x);
      }
      console.log(values);
      setCallingAPI(false)
    }catch(error){
      console.log(error);
      
    }
   }
return (
<form onSubmit={shippingForm.handleSubmit} className="w-[80%] my-32 mx-auto h-[350px]">
<h1 className='mb-5 text-gray-800 font-semibold text-3xl'>Shipping Info:</h1>
{apiError ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    {apiError}
    </div> :''}
<div className="relative z-0 w-full mb-5 group">
  <input value={shippingForm.values.details} onChange={shippingForm.handleChange} onBlur={shippingForm.handleBlur}  type="text" name="details" id="floating_details" className="mb-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-500 focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
  <label htmlFor="floating_details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details:</label>
  {shippingForm.errors.details && shippingForm.touched.details? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    {shippingForm.errors.details}
    </div> :''}
</div>
<div className="relative z-0 w-full mb-5 group">
  <input value={shippingForm.values.phone} onChange={shippingForm.handleChange} onBlur={shippingForm.handleBlur}  type="tel" name="phone" id="floating_phone" className="mb-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-500 focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
  <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone:</label>
  {shippingForm.errors.phone && shippingForm.touched.phone? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    {shippingForm.errors.phone}
    </div> :''}
</div>
<div className="relative z-0 w-full mb-5 group">
  <input value={shippingForm.values.city} onChange={shippingForm.handleChange} onBlur={shippingForm.handleBlur}  type="text" name="city" id="floating_city" className="mb-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-500 focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
  <label htmlFor="floating_city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">city:</label>
  {shippingForm.errors.city && shippingForm.touched.city? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    {shippingForm.errors.city}
    </div> :''}
</div>
<div className="relative z-0 w-full mb-5 group">
  <input type="checkbox" value={'online'} id="online" onChange={()=>setIsOnline(true)}/>
  <label htmlFor="online" className="mx-3">Online</label>
</div>
{isCallingAPI?<div className='bg-main  size-8 ml-auto rounded flex justify-center items-center '>
  <ClipLoader color='text-main' size={20}/>
</div>: <button type="submit" className="bg-opacity-70 block ml-auto text-white bg-main  focus:ring-4 focus:outline-none focus:ring-green-400 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main  dark:focus:ring-green-400">Pay now</button>}
</form>
)
}


