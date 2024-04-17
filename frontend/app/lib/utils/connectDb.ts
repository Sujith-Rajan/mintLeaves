// import mongoose from "mongoose";

// interface DBConnection {
//     isConnected?: number;
// }

// const connection: DBConnection = {};

// export const connectToDB = async () => {
//     try {
//         if (connection.isConnected) return;
//         const db = await mongoose.connect(process.env.MONGODB_URL as string);
//         console.log("dbConnect")
//         connection.isConnected = db.connections[0].readyState;
//     }
//     catch (error) {
//         let errorMessage: string | undefined;
//         if (error instanceof Error) {
//             errorMessage = error.message;
//         } else {
//             errorMessage = String(error);
//         }
//         console.log(errorMessage);
//         throw new Error(errorMessage);
//     }
// };
