import type { Metadata } from "next";
import {Noto_Sans} from "next/font/google";
import "./globals.css";
import Navbar from "./component/main/navbar/Navbar";
import Footer from "./component/main/footer/Footer";
import ReduxProvider from "./redux/ReduxProvider";
import ReduxManage from "./redux/ReduxManage";



const inter = Noto_Sans({ subsets: ["latin"],weight:'500'});

export const metadata: Metadata = {
  title: "Mint Leaves",
  description: "Mint Leaves online  grocery store",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 

  
{
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ReduxManage>
        <Navbar/>
        {children}
        <Footer/>
        </ReduxManage>
        </ReduxProvider>
      </body>
    </html>
  );
}
