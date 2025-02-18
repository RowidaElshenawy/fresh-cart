import React, { useEffect, useState } from 'react'
import styles from './StaticSlider.module.css'
import slider1 from'../../../../assets/images/slider-image-1.jpeg'
import slider2 from'../../../../assets/images/slider-image-2.jpeg'
import slider3 from'../../../../assets/images/slider-image-3.jpeg'
import static1 from'../../../../assets/images/grocery-banner-2.jpeg'
import static2 from'../../../../assets/images/grocery-banner.png'
import Slider from 'react-slick'
export default function StaticSlider() {
    const[count,setCount]=useState(0)
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      arrows:false,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
  return (
    <div className='flex flex-wrap py-10 px-3'>
      <div className="w-[100%] sm:w-8/12">
        <Slider {...settings}>
          <img src={slider2} className='h-full'  alt="" />
          <img src={slider3} className='h-full'  alt="" />
          <img src={slider1} className='h-full'  alt="" />
        </Slider>
      </div>
      <div className="pt-10 sm:p-0 sm:w-4/12 flex flex-col">
        <div className='basis-[50%]'>
          <img className={`${styles.mainSlider} h-full`} src={static1}  alt="" />
        </div>
        <div className='basis-[50%]'>
          <img className={`${styles.mainSlider} h-full`} src={static2}  alt="" />
        </div>
      </div>
    </div>
  )
}
