import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cookies } from 'next/headers'
import Header from "./header";
import AgeGate from "./ageGate"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "VnderGraphx",
    description: "Gallery Site for VnderGraphx",
};



export default async function RootLayout({ children }) {

    var cookieJar = await cookies();
    console.log(cookieJar.get("accessAge"))

    return (<html>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
            <div className="content">
                {cookieJar.get("accessAge")?.value == '2' ?

                    <>
                        <Header></Header>
                        <div className="pageContent">
                        {children}
                        </div>
                    </>
                    : <AgeGate></AgeGate>}
            </div>
        </body>
    </html>)
}