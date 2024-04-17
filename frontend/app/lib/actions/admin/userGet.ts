import apiRequest from "../../apiRequest"

export const getUser = async(id:string) => {
    try{
        const res = await apiRequest.get(`/admin-dashboard/user/${id}`)
        const user = res.data.user
        return user
    }
    catch(err){
      console.log(err)
      throw new Error("Failed to fetch products!"+ err)     
  }
  }