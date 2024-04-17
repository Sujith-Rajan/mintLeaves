import apiRequest from "../../apiRequest";


export const addProduct = async(data: any) => {
  
 try{
    const res = await apiRequest.post('/admin-dashboard/product',data)
    const product = res.data
    return product
 }
 catch(error){
    console.log(error);
    throw new Error("Failed to create product!");
 }
 
  
}