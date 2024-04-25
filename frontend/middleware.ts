import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken'


export async function middleware(request: NextRequest) {
    const tokenCookie  = request.cookies.get('token')?.value
    
    if (tokenCookie) {
        const decode = jwt.decode(tokenCookie) as JwtPayload
        const role= decode?.role
        if (role === "USER") {
            if (["/login"].includes(request.nextUrl.pathname)) {
              return NextResponse.redirect(new URL("/", request.url));
            }
            else if(["/dashboard"].some(path => request.nextUrl.pathname.startsWith(path))){
                return NextResponse.redirect(new URL("/", request.url));
            }
           
          } else if (role === "ADMIN") {
              if (["/login"].includes(request.nextUrl.pathname)) {
                return NextResponse.redirect(new URL("/", request.url));
              }
          }

    }else if(!tokenCookie){
        if(["/dashboard"].some(path => request.nextUrl.pathname.startsWith(path))){
            return NextResponse.redirect(new URL("/", request.url));
        } 
        else if(["/checkout"].some(path => request.nextUrl.pathname.startsWith(path))){
            return NextResponse.redirect(new URL("/login", request.url));
        }
        else if(["/profile"].some(path => request.nextUrl.pathname.startsWith(path))){
            return NextResponse.redirect(new URL("/login", request.url));
        }
        else if(["/paymentSucess"].some(path => request.nextUrl.pathname.startsWith(path))){
            return NextResponse.redirect(new URL("/", request.url));
        }
    }
   
    
}
