import { redirect } from "next/navigation";
import apiRequest from "../../apiRequest"




export const updateProduct = async(data: any) => {
 try{
    const  res = await apiRequest.put("/admin-dashboard/product",data)
    return res
 }
 catch(error){
    console.log(error);
    throw new Error("Failed to create product!");
 }

  
}