import React, { useEffect, useState } from 'react'
import styles from './PopularCategories.module.css'
import axios from 'axios'
import Slider from 'react-slick'
export default function PopularCategories() {
    const[count,setCount]=useState(0)
    const [categories,setCategories]=useState([])
    async function getCategories(){
      try{
        const {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        console.log(data.data)
        setCategories(data.data)
      }catch(error){
        console.log(error)
      }
      
    }
    useEffect(()=>{
      getCategories()
    },[])
    const settings = {
      dots: true,
      infinite: true,
      arrows:false,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 400,
          settings: {
            slidesToShow: 1,
          }
        }]
    };
  return (
    <div className='py-10 px-3'>
      <h2 className='text-3xl mb-5'>Shop Popular Categories</h2>
      <Slider {...settings}>
        {categories.map(category=><div>
          <img className={styles.categoryImage} src={category.image} alt="" />
          <h4 className='py-5 text-center'>{category.name}</h4>
        </div>)}
      </Slider>
    </div>
  )
}
