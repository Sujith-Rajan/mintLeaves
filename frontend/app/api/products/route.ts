import { connectToDB } from "@/app/lib/utils/connectDb"
import { Product } from "@/app/lib/models/Product"
import { NextRequest, NextResponse } from "next/server"

export const GET = async(req:NextRequest) => {
    const {searchParams} = new URL (req.url)
    let category: string = searchParams.get("category") || '';
   
    try{
        connectToDB()
      
        let products;
        if(category){
            const regex = new RegExp(category, 'i');
            products = await Product.find({category: regex})
        }
        else{
            products = await Product.find()
        }
        
        
        return new NextResponse(JSON.stringify(products))
    
    }
    catch(error){
        console.log(error)
        return NextResponse.json(error)
    }
}