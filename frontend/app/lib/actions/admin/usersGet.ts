
import apiRequest from "../../apiRequest";

///////////////////////////// GET ALL USERS /////////////////////////////////////////////////
export const getUsers = async(q:string,page: number) => {
    const regex = new RegExp(q,"i")
    const ITEM_PER_PAGE = 6;
    try{
        const queryParams = {
            params: {
              q,
              page,
            },
          };
        const res = await apiRequest.get("/admin-dashboard/user",queryParams)
        const{count , users} = res.data
         return {count,users}
    }
    catch(err){
        console.log(err)
        throw new Error("Failed to fetch products!"+ err)     
    }
}


