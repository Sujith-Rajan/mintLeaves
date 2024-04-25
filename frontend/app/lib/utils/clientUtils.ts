export const navLink = [
    {
        title:"About Us",
        links:["About","News & Blog"]
    },
    {
        title:"Help",
        links:["Help","Returns","Track Orders","Contact Us ","Feedback"]
    },
    {
        title:"Services",
        links:["Shipping & Delivery","Payment","Free Delivery"]
    },

]


export const shopByCategory = [
    {
       id:1,
       image:"/shopByCategory/veg.png",
       url:"/products/vegetables",
       cat:"Vegetables"
    },
    {
       id:2,
       image:"/shopByCategory/fruits.png",
       url:"/products/fruits",
       cat:"Fruits"
    },
    {
       id:3,
       image:"/shopByCategory/bakery.png",
       url:"/products/bakery",
       cat:"Bakery"
    },
    {
       id:4,
       image:"/shopByCategory/households.png",
       url:"/products/households",
       cat:"Households"

    },
    {
       id:5,
       image:"/shopByCategory/pcare.png",
       url:"/products/personalcare",
       cat:"Personalcare"
    },
    {
       id:6,
       image:"/shopByCategory/groceries.png",
       url:"/products/groceries",
       cat:"Groceries"
    },
    {
       id:7,
       image:"/shopByCategory/beverages.png",
       url:"/products/beverages",
       cat:"Beverages"
    },
    {
       id:7,
       image:"/shopByCategory/ready2cook.png",
       url:"/products/readytocook",
       cat:"Readytocook"
    },
]

import { FaDribbble, FaFacebook, FaInstagram, 
    FaLinkedin, FaPinterest, FaYoutube } from 'react-icons/fa'


export const icons = [
    {
        url:"/",
        icon:FaDribbble,
    },
    {
        url:"/",
        icon:FaFacebook,
    },
    {
        url:"/",
        icon:FaInstagram,
    },
    {
        url:"/",
        icon:FaLinkedin,
    },
    {
        url:"/",
        icon:FaPinterest,
    },
    {
        url:"/",
        icon:FaYoutube,
    },
]



export const topBanners = [
    {
        id:1,
        image:"/topBanner/banner1.jpg"
    },
    {
        id:2,
        image:"/topBanner/banner2.jpg"
    },
    {
        id:3,
        image:"/topBanner/banner3.jpg"
    },
    {
        id:4,
        image:"/topBanner/banner4.jpg"
    },
]

import { ImAddressBook, ImProfile } from 'react-icons/im'
import { MdDashboardCustomize } from 'react-icons/md'
import { TbTruckDelivery } from 'react-icons/tb'

export const userProfile =[
    {
        title:"My Dashboard",
        url:"/profile/dashboard",
        icon: MdDashboardCustomize,
    },
    {
        title:"My Profile",
        url:"/profile/my_profile",
        icon: ImProfile,
    },
    {
        title:"My Address",
        url:"/profile/address",
        icon: ImAddressBook,
    },
    {
        title:"My Orders",
        url:"/profile/orders",
        icon: TbTruckDelivery,
    },
]