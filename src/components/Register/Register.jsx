import React, { useEffect, useState } from 'react'
import styles from './Register.module.css'
import { useFormik} from 'formik'
import values from './../../../node_modules/lodash-es/values';
import * as Yup from 'yup'
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
export default function Register() {
    const[count,setCount]=useState(0)
    const[isCallingAPI , setCallingAPI]=useState(false)
    let [apiError , setApiError]=useState(null)
    let navigate = useNavigate()
    const initialValues = {
      name :'tre',
      email:'',
      phone:'',
      password:'',
      rePassword:''
    }
    const validationSchema  = Yup.object().shape({
      name:Yup.string().min(3,'min lenght is 3').max(15,'max lenght is 15').required("Required"),
      email:Yup.string().email('invalid email').required('Reguired'),
      password:Yup.string().matches(new RegExp('^[A-Z][a-z0-9]{8}$'),'invalid password').required('Required'),
      rePassword:Yup.string().oneOf([Yup.ref('password')],'rePassword shoud match password').required('Required'),
      phone:Yup.string().matches(new RegExp('^01[0125][0-9]{8}$'),'invalid Phone').required('Required')
    })
     const formik =useFormik({
      initialValues,
      validationSchema,
      onSubmit:(values)=>{
        console.log(values)
        callRegister(values)
      },
     })
     async function callRegister(values){
      try{
        setCallingAPI(true)
        setApiError(null)
      let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup `, values )
      console.log(data);
      setCallingAPI(false)
      navigate("/login")
      }catch(error){
        console.log(error)
        setApiError(error.response.data.message)
        console.log(error.response.data.message);
        setCallingAPI(false)
      }
     }
     useEffect(()=>{
      document.title = "Register";
     },[])
  return (
 <form onSubmit={formik.handleSubmit} className="w-[80%] my-7 mx-auto">
  <h1 className='mb-5 text-gray-800 font-semibold text-3xl'>Register Now:</h1>
  {apiError ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {apiError}
      </div> :''}
  <div className="relative z-0 w-full mb-5 group">
    <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="name" id="floating_name" className="mb-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-500 focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
    <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name:</label>
    {formik.errors.name && formik.touched.name? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.name}
      </div> :''}
  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}  type="email" name="email" id="floating_email" className="mb-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-500 focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email:</label>
    {formik.errors.email && formik.touched.email? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.email}
      </div> :''}
  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}  type="password" name="password" id="floating_password" className="mb-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password:</label>
    {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formik.errors.password}</div> :''}
  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input value={formik.values.repassword} onChange={formik.handleChange} onBlur={formik.handleBlur}  type="password" name="rePassword" id="floating_repeat_password" className="mb-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
    <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Repassword:</label>
    {formik.errors.rePassword && formik.touched.rePassword? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.rePassword}
      </div> :''}
  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}  type="tel"  name="phone" id="floating_phone" className="mb-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
    <label htmlFor="floating_phone" className=" peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone:</label>
    {formik.errors.phone && formik.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.phone}
      </div> :''}
  </div>
  {isCallingAPI?<div className='bg-main  size-8 ml-auto rounded flex justify-center items-center '>
    <ClipLoader color='text-main' size={20}/>
  </div>: <button type="submit" className="bg-opacity-70 block ml-auto text-white bg-main  focus:ring-4 focus:outline-none focus:ring-green-400 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main  dark:focus:ring-green-400">Submit</button>}
</form>
  )
}
