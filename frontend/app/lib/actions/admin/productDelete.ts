
import { revalidatePath } from "next/cache";
import apiRequest from "../../apiRequest";


export const deleteProduct = async (id: string) => {
    try {
       const res = await apiRequest.delete(`/admin-dashboard/product/${id}`)
       revalidatePath("/dashboard/products");
    } catch (err) {
      console.log(err);
      throw new Error("Failed to delete product!");
    }
  
   
  };