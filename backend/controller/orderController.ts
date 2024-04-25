import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import Razorpay from "razorpay";
import crypto from 'crypto'

const prisma = new PrismaClient

const razorpay = new Razorpay ({
    key_id:process.env.RAZORPAY_KEY_ID as string,
    key_secret:process.env.RAZORPAY_SECRET as string
})

//////////////////////////////////// CREATE  RAZORPAY INSTANCE /////////////////////////////

export const createOrder = async(req:Request,res:Response) => {
    const {amount} = req.body
    const total = amount * 100
    const options = {
        amount:total,
        currency:"INR",
        receipt:crypto.randomBytes(10).toString("hex")
    }
    try{
       
        const order = await razorpay.orders.create(options,(error,order)=>{
            if(error){
                console.log(error)
            }
            res.status(200).json({order})
        })
      
    }
    catch(error){
      res.status(500).json(error)
    }
 
}

//////////////////////////////////// VERIFY AND CREATE ORDER /////////////////////////////

export const verifyPayment = async(req:Request,res:Response) => {
    const { razorpay_payment_id,slotTime,payment,amount,deliveryCharge,disCount,userId} = req.body
    try{
       
            const order = await prisma.order.create({
                data:{
                    slotTime,
                    payment,
                    paymentSataus:payment === "COD" ? "PENDING" : "SUCCESS",
                    amount,
                    deliveryCharge,
                    disCount,
                    userId,
                    razorpayId:razorpay_payment_id ? razorpay_payment_id : "cod"+userId,
                    orderStatus:"PENDING",
                    createdAt:new Date()
                }            
            })
            // AFTER ORDER SUCCESS 
            const deleteCart = await prisma.carts.deleteMany({
                where:{
                    userId:userId
                }
            })
            res.status(200).json(order)
    }
    catch(error){
        console.error("Error Create Order:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    finally {
        await prisma.$disconnect();
    }
  
}



//////////////////////////////// GET ALL ORDERS BY USERID /////////////////////////////////

export const getAllOrders = async(req:Request,res:Response) => {

    const {id} = req.params

    try{
            const orders = await prisma.order.findMany({
                where:{
                    userId:id
                },
                orderBy: {
                    createdAt: 'desc'
                  },
            })
            res.status(200).json(orders)
    }
    catch(error){
        console.error("Error fetch Orders:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    finally {
        await prisma.$disconnect();
    }
}