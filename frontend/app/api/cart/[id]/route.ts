import { Cart } from "@/app/lib/models/Cart"
import { connectToDB } from "@/app/lib/utils/connectDb"
import { NextRequest, NextResponse } from "next/server"


export const DELETE = async(req:NextRequest,{params}:{params:{id:string}}) => {

    const {id} = params;
    
    try{
        connectToDB()
        await Cart.deleteOne({productId:id});
        return new NextResponse(JSON.stringify("Product has been deleted!"),{status: 200})
    }
    catch(error){
        console.log(error)
        return new NextResponse(JSON.stringify({message:"Something went wrong"}),{status:500})
    }
}


export const PUT = async(req:NextRequest,{params}:{params:{id:string}}) => {
    const {id} = params;
    try{
        connectToDB()
        const {quantity} = await req.json()
       
        const existingProduct = await Cart.findOne({productId: id});
        if (existingProduct) {
            const updatedQuantity = existingProduct.quantity + quantity;
            const updatedTotal = existingProduct.price * updatedQuantity;
            const updatedProduct = await Cart.findOneAndUpdate(
                {productId: id},
                {quantity: updatedQuantity, total: updatedTotal},
                {new: true}
            );

            if (updatedProduct) {
                return new NextResponse(JSON.stringify(updatedProduct), {status: 200});
            } else {
                return new NextResponse(JSON.stringify({message: "Error updating product"}), {status: 500});
            }
        }
       
    }
    catch(error){
        console.log(error)
        return new NextResponse(JSON.stringify({message:"Something went wrong"}),{status:500})
    }
}