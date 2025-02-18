import React, { useEffect, useState } from 'react'
import styles from './Loader.module.css'
import { PacmanLoader } from 'react-spinners'
export default function Loader() {
    const[count,setCount]=useState(0)
  return (
    <div className='h-screen'>
      <div className={`${styles.loader} flex justify-center items-center fixed h-screen top-0 left-0 right-0`}>
        <PacmanLoader color="green"   />
      </div>
    </div>
  )
}
