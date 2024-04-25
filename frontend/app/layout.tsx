import type { Metadata } from "next";
import {Noto_Sans} from "next/font/google";
import "./globals.css";
import Navbar from "./component/main/navbar/Navbar";
import Footer from "./component/main/footer/Footer";
import ReduxProvider from "./redux/ReduxProvider";
import ReduxManage from "./redux/ReduxManage";
import Script from "next/script";
import WhatsApp from "./component/main/common/WhatsApp";



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
    <>
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ReduxManage>
        <Navbar/>
        <WhatsApp/>
        {children}
        <Footer/>
        </ReduxManage>
        </ReduxProvider>
      </body>
    </html>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"/>
      </>
  );
}
