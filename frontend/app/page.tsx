"use client"
import { useDispatch, useSelector } from "react-redux";
import OfferBaner from "./component/main/banner/OfferBaner";
import TopBanner from "./component/main/banner/TopBanner";
import ShopByCategory from "./component/main/shopByCategory/ShopByCategory";
import { useEffect, useState } from "react";
import { RootState } from "./redux/store";
import apiRequest from "./lib/apiRequest";
import { loginSuccess } from "./redux/userSlice";
import WhatsApp from "./component/main/common/WhatsApp";


export default function Home() {
  const dispatch = useDispatch()
  const [loginData,setLoginData] = useState()
  const {currentUser} = useSelector((state:RootState)=> state.user)

  useEffect(()=> {
  const getUser = async() =>{
      try{
          const res = await apiRequest.get("/auth/login/success")
          setLoginData(res.data)
      }
      catch(err){
          console.log(err)
      }
  }
      getUser()
  },[dispatch])

  if(loginData && !currentUser){
      dispatch(loginSuccess(loginData))
  }

  
  return (
    <div className="h-auto w-full relative">
      <TopBanner/>
      <OfferBaner/>
      <ShopByCategory/>
    </div>
  );
}
