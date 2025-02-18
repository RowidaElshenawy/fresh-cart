import React, { useEffect, useState } from 'react'
import styles from './Categories.module.css'
import axios from 'axios'
import Loader from '../Shared/Loader/Loader'
import Item from '../Shared/Item/Item'
import SubCategories from './components/SubCategories/SubCategories'
export default function Categories() {
    const[count,setCount]=useState(0)
    let[categories,setCategories]=useState([])
    let[cate,setCategory]=useState({})
    async function getCategory(){
      try{
        let {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        console.log(data.data)
        setCategories(data.data)
      }catch(error){
        console.log(error)
      }
    }
    useEffect(()=>{
      getCategory()
    },[cate])
  return (
    <>
      <div className={ `${styles.cardCategory} flex flex-wrap  mb-10 py-10` }>
            {categories.length !=0 && categories.map(brand=> <div onClick={()=>setCategory(brand)} className='w-[100%] sm:w-1/2 md:w-1/3 lg:w-1/4 p-3'><Item key={brand.id} brand={brand}/></div>)}
            {categories.length==0 && <Loader/>}
      </div>
      <SubCategories cate={cate}/>
    </>
  )
}
