import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient

/////////////////////// CREATE FEEDBACK /////////////////////////////////
export const createFeedback = async(req:Request,res:Response) => {
    const {userId,subject,comment} = req.body
    try{
        const feedback = await prisma.feedback.create({
            data:{
                userId,
                subject,
                comment
            },
            include:{
                user:true
            }
           
        })
        res.status(200).json(feedback)
    }
    catch (error) {
        console.error("Error create feedback:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    finally {
        await prisma.$disconnect();
    }
    

}

//////////////////////////// GET ALL FEEDBACK /////////////////////
export const getAllFeedback = async(req:Request,res:Response) => {

    try{
        const feedbacks = await prisma.feedback.findMany({
            include:{
                user:true
            },
            orderBy:{
                createdAt:'desc'
            }
        })

        res.status(200).json(feedbacks)
    }
    catch (error) {
        console.error("Error fetch feedback:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    finally {
        await prisma.$disconnect();
    }
}