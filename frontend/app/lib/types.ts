export interface User {
    id: string;
    fullname: string;
    email: string;
    phone: string;
    avatar?: string;
    address?: string;
    role: string;
}

export interface Order {
    id:string;
    slotTime:string;      
    payment:string;      
    paymentSataus:string;   
    amount:number;         
    deliveryCharge:number; 
    disCount:number;                   
    userId:string;          
    razorpayId:string;    
    orderStatus:string;
    createdAt:string   

}


 interface Product {
    id: string;
    productId?:string;
    title: string;
    image: string;
    price: number;
    userId?:string;
  
  }
  
  export interface CartProduct extends Product {
    quantity: number;
    total: number;
  }
  