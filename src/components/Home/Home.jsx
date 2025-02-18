import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import RecentProducts from './component/RecentProducts/RecentProducts'
import PopularCategories from './component/PopularCategories/PopularCategories'
import StaticSlider from './component/StaticSlider/StaticSlider'
export default function Home() {
    const[count,setCount]=useState(0)
  return (
    <div>
      <StaticSlider/>
      <PopularCategories/>
      <RecentProducts/>
    </div>
  )
}
