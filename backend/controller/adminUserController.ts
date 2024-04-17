import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient


////////////////////////////GET ALL USERS///////////////////////////////////
export const readUser = async(req:Request,res:Response) => {
    let { q, page } = req.query;
    const ITEMS_PER_PAGE = 6;
    q = typeof q === 'string' ? q : '';
    let pageNumber = page ? parseInt(page as string, 10) : 1;
    if (isNaN(pageNumber) || pageNumber < 1) {
      pageNumber = 1;
    }

    const regex = new RegExp(q, "i");
    try {
        const count = await prisma.user.count()
        const users = await prisma.user.findMany({
            where:{
                fullname:{
                    contains: q,
                    mode: 'insensitive'
                },
            },
            take: ITEMS_PER_PAGE,
            skip: ITEMS_PER_PAGE * (pageNumber - 1)
        })
        res.json({count,users})
    }
    catch(error){
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    finally{
        await prisma.$disconnect();  
    }
}

/////////////////////////////////GET SINGLE USER//////////////////////////
export const readUserById = async(req:Request,res:Response) => {
    const {id} = req.params
    try{

        const user = await prisma.user.findUnique({
            where:{
                id: id
            }
        })

        res.status(200).json({message:"user Fetch Success",user})
    }
    catch(error){
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    finally{
        await prisma.$disconnect();  
    }
}


////////////////////////////UPDATE PRODUCT///////////////////////////////////
export const updateProduct = async(req:Request,res:Response) => {
        const {id} = req.body
        const {title,category, price, stock,subCategory,quantityType,desc,image} = req.body
    try {
        const updateProduct = await prisma.products.update({
            where: {
                id:id
            },
            data: {
               title,
               category,
               price: parseInt(price),
               stock: parseInt(stock),
               subCategory,
               quantityType,
               desc,
               image,
            }
        })

        res.status(200).json({message:"update success",updateProduct})
    }
    catch(error){
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    finally{
        await prisma.$disconnect();  
    }
}



//////////////////////////DELETE USER//////////////////////////////////
export const deleteUser = async(req:Request,res:Response) => {
    const {id} = req.params
 
    try {
        const deleteUser= await prisma.user.delete({
            where: {
                id:id
            }
        })
        res.status(200).json({ message: "Item deleted successfully", deletedUser: deleteUser });

    }
    catch(error){
        console.error("Error Delete User:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    finally{
        await prisma.$disconnect();  
    }
}