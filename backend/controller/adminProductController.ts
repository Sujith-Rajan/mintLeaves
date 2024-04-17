import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { json } from "stream/consumers";

const prisma = new PrismaClient

///////////////////////////CREATE PRODUCT/////////////////////////////////////
export const createProduct = async(req:Request,res:Response) => {
     const {title,subCategory,stock,quantityType,price,image,desc,category} = req.body
    try {
            const existProduct = await prisma.products.findFirst({
                where:{
                    title: title
                }
            })
            if(existProduct) {
                return res.status(401).json({message:"Product Already Exist"})
            }

            const product = await prisma.products.create({
                data:{
                category,
                desc,
                image,
                price,
                quantityType,
                stock,
                subCategory,
                title,
                createdAt: new Date(),
                updatedAt: new Date(),
                },
            })
            res.status(201).json({ message: "Product created successfully", product });
    }
    catch(error){
        console.error("Error create products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    finally{
        await prisma.$disconnect();  
    }
}



////////////////////////////GET ALL PRODUCT///////////////////////////////////
export const readProduct = async(req:Request,res:Response) => {
    let { q, page } = req.query;
    const ITEMS_PER_PAGE = 6;
    q = typeof q === 'string' ? q : '';
    let pageNumber = page ? parseInt(page as string, 10) : 1;
    if (isNaN(pageNumber) || pageNumber < 1) {
      pageNumber = 1;
    }

    const regex = new RegExp(q, "i");
    try {
        const count = await prisma.products.count()
        const products = await prisma.products.findMany({
            where:{
                title:{
                    contains: q,
                    mode: 'insensitive'
                },
            },
            take: ITEMS_PER_PAGE,
            skip: ITEMS_PER_PAGE * (pageNumber - 1)
        })
        res.json({count,products})
    }
    catch(error){
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    finally{
        await prisma.$disconnect();  
    }
}

/////////////////////////////////GET SINGLE PRODUCT//////////////////////////
export const readProductById = async(req:Request,res:Response) => {
    const {id} = req.params
    try{

        const product = await prisma.products.findUnique({
            where:{
                id: id
            }
        })

        res.status(200).json({message:"Product Fetch Success",product})
    }
    catch(error){
        console.error("Error fetching products:", error);
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



//////////////////////////DELETE PRODUCT//////////////////////////////////
export const deleteProduct = async(req:Request,res:Response) => {
    const {id} = req.params
    console.log("delete id",id)
    try {
        const deleteItem = await prisma.products.delete({
            where: {
                id:id
            }
        })
        res.status(200).json({ message: "Item deleted successfully", deletedItem: deleteItem });

    }
    catch(error){
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    finally{
        await prisma.$disconnect();  
    }
}