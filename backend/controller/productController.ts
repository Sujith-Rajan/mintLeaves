import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

const prisma = new PrismaClient

//GET ALL PRODUCT 
export const getAllProduct = async (req:Request,res:Response) => {
     
    try{
        let products
        products = await prisma.products.findMany()
        res.status(200).json(products);
        
    }
    catch(error){
        console.error("Error fetching products:", error);
         res.status(500).json({ error: "Internal Server Error" });
    }
    finally {
        await prisma.$disconnect();
    }
}

//GET ALL PRODUCT BY CATEGORY
export const getAllProductByCategory = async(req:Request,res:Response) => {
    const {category} = req.params
    const catSearch = category.toLowerCase();
    try{
        const products = await prisma.products.findMany({where: {
            category: {
                contains: catSearch,
                mode:'insensitive'
            },
          },
        })
        res.status(200).json(products);
    }
    catch(error){
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    finally {
        await prisma.$disconnect();
    }
}

//GET PRODUCT BY ID
export const getProductById =async(req:Request,res:Response) => {
    const {id} = req.params
    try{
        const product = await prisma.products.findUnique({
            where: {
              id: id as string
            },
          })

          if (!product) {
            return res.status(404).json({ error: 'Product not found' });
          }
          res.status(200).json(product);
    }
    catch(error){
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    finally {
        await prisma.$disconnect();
    }
}


//SEARCH PRODUTS
export const searchProducts = async(req:Request,res:Response)=>{
   
    const {searchQuery} = req.params
   
    try{
        let products;
        if(!searchQuery){
            return
        }
    if (searchQuery && searchQuery.trim() !== '') {
         products = await prisma.products.findMany({where: {
            title: {
                contains: searchQuery,
                mode:'insensitive'
            },
          },
          select: {
            id: true,
            title: true,
            image: true
          }
        })
    }
        res.status(200).json(products);
    }
    catch(error){
        console.error("Error search products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    finally {
        await prisma.$disconnect();
    }
}