
import apiRequest from "../../apiRequest";


export const getProducts = async(q:string,page: number) => {
    const regex = new RegExp(q,"i")
    const ITEM_PER_PAGE = 6;
    try{
        const queryParams = {
            params: {
              q,
              page,
            },
          };
        const res = await apiRequest.get("/admin-dashboard/product",queryParams)
        const{count , products} = res.data
         return {count,products}
    }
    catch(err){
        console.log(err)
        throw new Error("Failed to fetch products!"+ err)     
    }
}


