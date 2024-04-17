
import { revalidatePath } from "next/cache";
import apiRequest from "../../apiRequest";


export const deleteUser = async (id: string) => {
    try {
       const res = await apiRequest.delete(`/admin-dashboard/user/${id}`)
       const user = res.data
       return user
    } catch (err) {
      console.log(err);
      throw new Error("Failed to delete product!");
    }
  
   
  };