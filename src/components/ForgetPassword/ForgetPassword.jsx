import React, { useEffect, useState } from 'react'
import styles from './ForgetPassword.module.css'
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { ClipLoader } from 'react-spinners';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export default function ForgetPassword() {
  const [count, setCount] = useState(0)
  const [isCallingAPI, setCallingAPI] = useState(false)
  let [apiError, setApiError] = useState(null)
  const [values, setValues] = useState(null)
  let navigate = useNavigate()
  const initialValues = {
    email: '',
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('invalid email').required('Required'),
  })
  const ForgetPasswordForm = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values)
      CallForgetPassword(values)
      setValues(values)
    },
  })
  async function CallForgetPassword(values) {
    console.log(values.email)
    try {
      setCallingAPI(true)
      setApiError(null)
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, { email: values.email })
      console.log(data);
      setCallingAPI(false)
      if (data.statusMsg = 'success') {
        navigate("/verifycode")
      }
    } catch (error) {
      console.log(error)
      setApiError(error.response.data.message)
      console.log(error.response.data.message);
      setCallingAPI(false)
    }
  }

 
  useEffect(() => {
    document.title = "Forget Password";
  }, [])
  return (
    <form onSubmit={ForgetPasswordForm.handleSubmit} className="w-[80%] my-7 mx-auto h-[350px]">
      <h1 className='mb-5 text-gray-800 font-semibold text-3xl'>Forget Your Password?</h1>
      {apiError ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {apiError}
      </div> : ''}
       <div className="relative z-0 w-full mb-5 group">
        <input value={ForgetPasswordForm.values.email} onChange={ForgetPasswordForm.handleChange} onBlur={ForgetPasswordForm.handleBlur} type="email" name="email" id="floating_email" className="mb-2 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main-500 focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email:</label>
        {ForgetPasswordForm.errors.email && ForgetPasswordForm.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {ForgetPasswordForm.errors.email}
        </div> : ''}
      </div>
      {isCallingAPI ? <div className='bg-main  size-8 ml-auto rounded flex justify-center items-center '>
        <ClipLoader color='text-main' size={20} />
      </div> : <div><button type="submit" className="bg-opacity-70 block ml-auto text-white bg-main  focus:ring-4 focus:outline-none focus:ring-green-400 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main  dark:focus:ring-green-400">Recover Password</button> </div>}
    </form>
  )
}
