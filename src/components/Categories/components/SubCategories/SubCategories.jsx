import React, { useEffect, useState } from 'react'
import styles from './SubCategories.module.css'
import axios from 'axios'
export default function SubCategories(props) {
    const[count,setCount]=useState(0)
    const[SubCategory,setSubCategory]=useState([])
    let{name,_id}= props.cate
    console.log(name , _id)
    async function getsubCategories(){
      try{
        let{data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories`)
        console.log(data.data)
        console.log(data.data.category)
        let res =data.data.filter(ele =>ele.category == _id)
        console.log(res)
        setSubCategory(res)
      }catch(error){
        console.log(error.response.data.message)
      }
    }
    useEffect(()=>{
      getsubCategories()
    },[_id])
  return (
    <>
    {_id && <div>
      <h3 className='text-center text-main text-3xl font-semibold'>{`${name} subcategories`}</h3>
      <div className='flex flex-wrap py-10'>
        {SubCategory.map(sub=><div className='box w-[100%] sm:w-1/2 md:w-1/3  border-2 py-3 px-5 mb-2 mx-3 sm:mx-0'>
          <h4 className='text-center font-bold'>{sub.name}</h4>
        </div>)}
      </div>
    </div>}
    
    </>
    
  )
}
