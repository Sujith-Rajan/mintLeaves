import { connectToDB } from "@/app/lib/utils/connectDb"
import { NextRequest, NextResponse } from "next/server"
import { Cart } from "@/app/lib/models/Cart"



export const POST = async (req: NextRequest) => {
  
    try {
        connectToDB();
        const {_id,title,price,image,quantity,total} = await req.json();
       
        const existProduct = await Cart.findOne({productId:_id})
        if(!existProduct){
            const cart = await Cart.create({productId:_id,title,price,image,quantity,total});
            return new NextResponse(JSON.stringify(cart));
        }
       
        return new NextResponse(JSON.stringify({ message: "Product already exists in the cart" }));
       
    } catch (error) {
        console.log("Error in POST:", error);
        return new NextResponse(JSON.stringify({ error: "Error creating cart" }), { status: 500 })
    }
}


export const GET = async(req:NextRequest) => {
 
    try{
        connectToDB()
        const carts = await Cart.find()
        return new NextResponse(JSON.stringify(carts))
    }
    catch(error){
        console.log(error)
        return NextResponse.json(error)
    }
}



export const DELETE = async(req:NextRequest) => {
    try{
        connectToDB()
        await Cart.deleteMany()
    }
    catch(error){
        console.log(error)
        return NextResponse.json(error)
    }
}

