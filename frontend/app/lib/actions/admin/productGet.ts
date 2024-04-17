import apiRequest from "../../apiRequest"

export const getProduct = async(id:string) => {
    try{
        const res = await apiRequest.get(`/admin-dashboard/product/${id}`)
        const product = res.data.product
        return product
    }
    catch(err){
      console.log(err)
      throw new Error("Failed to fetch products!"+ err)     
  }
  }