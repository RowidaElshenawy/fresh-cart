import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import Products from './components/Products/Products'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import NotFound from './components/NotFound/NotFound'
import { tokenContext } from './context/tokenContext'
import AuthView from './components/AuthView/AuthView'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import ProductDetails from './components/ProductDetails/ProductDetails';
import Cart from './components/Cart/Cart'
import { ToastContainer } from 'react-toastify'
import Checkout from './components/Checkout/Checkout';
import AllOrders from './components/AllOrders/AllOrders';
import WishList from './components/WishList/WishList'
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import VerifyCode from './components/VerifyCode/VerifyCode'
import NewPassword from './components/NewPassword/NewPassword'
function App() {
  const [count, setCount] = useState(0)
  let{setToken}=useContext(tokenContext)
  useEffect(()=>{
    if(localStorage.getItem("userToken")){
      setToken(localStorage.getItem("userToken"))
    }
  },[])
 
  const routes = createBrowserRouter([
    {path:"" , element: <Layout/> , children:[
    {index:true, element:<ProtectedRoutes><Home/></ProtectedRoutes> },
    {path:"categories",element :<ProtectedRoutes><Categories/></ProtectedRoutes> },
    {path:"brands",element :<ProtectedRoutes><Brands/></ProtectedRoutes>},
    {path:"products",element :<ProtectedRoutes><Products/></ProtectedRoutes>},
    {path:"login",element :<AuthView><Login/></AuthView>},
    {path:"register",element :<AuthView><Register/></AuthView>},
    {path:"cart",element :<ProtectedRoutes><Cart/></ProtectedRoutes>},
    {path:"productDetails/:id/:categoryId",element :<ProtectedRoutes><ProductDetails/></ProtectedRoutes>},
    {path:"checkout",element :<ProtectedRoutes><Checkout/></ProtectedRoutes>},
    {path:"allorders",element :<ProtectedRoutes><AllOrders/></ProtectedRoutes>},
    {path:"wishlist",element :<ProtectedRoutes><WishList/></ProtectedRoutes>},
    {path:"forgetpassword",element :<AuthView><ForgetPassword/></AuthView>},
    {path:"verifycode",element :<AuthView><VerifyCode/></AuthView>},
    {path:"newpassword",element :<AuthView><NewPassword/></AuthView>},
    {path:"*",element :< NotFound/>},
  ]}
 ])
  return (
    <>
      <RouterProvider router={routes}>

      </RouterProvider>
      <ToastContainer />
    </>
  )
}

export default App
