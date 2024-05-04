import { Prisma, PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient



//GET ALL CART ////////////////////////////////////////////////
export const getAllCart = async (req: Request, res: Response) => {

    try {
        let userId;
        const token = req.cookies.token;
        const session = req.cookies.session;

        if (token) {
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
            userId = decode.id;
        }
        else (
            userId = session
        )

        const carts = await prisma.carts.findMany({
            where: {
                userId: userId,
            },
        });

        res.status(200).json(carts);
    } catch (error) {
        console.error("Error fetching carts:", error);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        await prisma.$disconnect();
    }
};



//CREATE CART ITEMS /////////////////////////////////////////////////
export const postCartItems = async (req: Request, res: Response) => {
    try {
        let userId;
        const token = req.cookies.token;
        const session = req.cookies.session;

        if (token) {
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload
            userId = decode.id;
        }

        else if (session) {

            userId = session;
        }
        else {

            const sessionId = uuidv4();
            userId = sessionId;
            res.cookie('session', sessionId, { httpOnly: true });
        }
        const { id, title, price, image, quantity, total } = await req.body;

        const existingProduct = await prisma.carts.findFirst({
            where: {
                productId: id
            }
        })
        if (!existingProduct) {
            const newCartItem = await prisma.carts.create({
                data: {
                    productId: id,
                    title,
                    price,
                    image,
                    quantity,
                    total,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: userId,
                } as Prisma.cartsCreateInput
            })
            res.status(200).json(newCartItem)


        } else {
            res.status(400).json("Product already exists in the cart");
        }
    }
    catch (error) {
        console.error("Error fetching carts:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    finally {
        await prisma.$disconnect();
    }

}




//CLEAR CART///////////////////////////////////////////////////////
export const clearCart = async (req: Request, res: Response) => {
    try {

        const clearCartItems = await prisma.carts.deleteMany()
        res.status(200).json(clearCartItems)
    }
    catch (error) {
        console.error("Error fetching carts:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    finally {
        await prisma.$disconnect();
    }
}




//DELETE CART ITEM/////////////////////////////////////////////////////
export const deleteCart = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const existingProduct = await prisma.carts.findFirst(
            {
                where:
                {
                    productId: id
                }
            });
        if (!existingProduct) {
            return res.status(404).json("No items found")
        }
        const deleteItem = await prisma.carts.delete({
            where: {
                productId: existingProduct?.productId
            }
        })
        if (deleteItem) {
            res.status(200).json({ message: 'Cart item has been deleted' });
        } else {
            res.status(404).json({ message: 'Cart item not found' });
        }
    }
    catch (error) {
        console.error("Error fetching carts:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    finally {
        await prisma.$disconnect();
    }
}





//UPDATE CART//////////////////////////////////////////////////////////////
export const updateCart = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const { quantity } = req.body;

        const existingProduct = await prisma.carts.findFirst(
            {
                where:
                    {
                        productId: id
                    } as Prisma.cartsWhereUniqueInput
            });

        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        const updatedQuantity = existingProduct.quantity + quantity;
        const updatedTotal = existingProduct.price * updatedQuantity;

        const updatedProduct = await prisma.carts.update({
            where: { id: existingProduct.id } as Prisma.cartsWhereUniqueInput,
            data: { quantity: updatedQuantity, total: updatedTotal },
        });
        if (updatedProduct) {
            return res.status(200).json(updatedProduct);
        } else {
            return res.status(500).json({ message: 'Error updating product' });
        }
    }
    catch (error) {
        console.error("Error update carts:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    finally {
        await prisma.$disconnect();
    }

}


//////////////////// USER UPDATION IN CART////////////////////////////////////////////////

export const addUser = async (req: Request, res: Response) => {


    try {
        let userId
        const token = req.cookies.token
        if (token) {
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
            userId = decode.id;
            const session = req.cookies.session

            // const existCart = await prisma.carts.findMany({
            //     where: {
            //         userId:session,
            //     }
            // })

            if(!session){
                res.redirect(process.env.CLIENT_URL as string)
            }

            const updateUserInCart = await prisma.carts.updateMany({
                where: {
                    userId: session,
                },
                data: {
                    userId: userId,
                },
            });
            res.status(200).json(updateUserInCart);

        }



    }
    catch (error) {
        console.error("Error update carts:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    finally {
        await prisma.$disconnect();
    }
}



////////////////////////REMOVE EXPPIRD ITEMS FROM DB///////////////////////

export const reomoveExpired = async (req: Request, res: Response) => {
    try {
        const session = req.cookies.session
        const products = await prisma.carts.findMany({
            where: {
                userId: session,
                createdAt: {
                    lt: new Date(new Date().setDate(new Date().getDate() - 15)),
                }
            }
        })

        for (const product of products) {
            await prisma.carts.delete({
                where: {
                    id: product.id,
                },
            });
        }

        res.status(200).json({ message: "Items older than 15 days removed successfully" });

    }
    catch (error) {
        console.error("Error delete carts:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    finally {
        await prisma.$disconnect();
    }
}