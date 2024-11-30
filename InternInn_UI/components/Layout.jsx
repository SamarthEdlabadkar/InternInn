import Head from "next/head"
import Footer from "./ui/Footer"
import Navbar from "./ui/Navbar"
import Navbar_L from "./ui/Navbar_loggedin";
import { useLayoutEffect, useState } from 'react';

import { getCookie, getCookies, setCookie, deleteCookie, hasCookie } from 'cookies-next/client';


const Layout = ({ children }) => {
    const user = getCookie("user")
    const [layoutType, setLayoutType] = useState('default');

    useLayoutEffect(() => {
        const determineLayout = () => {
            if (user != "" && user != undefined){
                setLayoutType("loggedin")
            }else{
                setLayoutType("default")
            }
        }

        determineLayout()
    }) 

    return (
        <>
            <Head>
                <title>InternInn</title>
                <meta name='description' content='' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                {/* <link rel='icon' href='/favicon.ico' /> */}
            </Head>
            {layoutType === 'default' && (
                <Navbar>{children}</Navbar>
            )}
            {layoutType === 'loggedin' && (
                <Navbar_L>{children}</Navbar_L>
            )}
            <main>{children}</main>
            <Footer />
        </>
    )

}

export default Layout