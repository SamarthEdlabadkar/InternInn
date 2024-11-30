import Head from "next/head";
import GradientWrapper from "../components/GradientWrapper";
import Hero from "../components/ui/Hero";
import LogoGrid from "../components/ui/LogoGrid";
import ToolKit from "../components/ui/ToolKit";
import Footer from "../components/ui/Footer";
import { useRouter } from 'next/navigation';
import { getCookie, getCookies, setCookie, deleteCookie, hasCookie } from 'cookies-next/client';
import toast, {Toaster} from "react-hot-toast"
import React, { useState, useEffect } from 'react';

export default function Home() {
  const user = getCookie("user")
  const alert = getCookie("alert")
  console.log(alert)

  if (user != "" && user != undefined){

    useEffect(() => {
      if (alert != undefined){
        toast.success("Welcome back... " + user.split("_")[0])
      }
    })

    deleteCookie(alert)

    return (
      <>
        <Head>
          <meta name='robots' content='index' />
        </Head>
        <Hero />
        <LogoGrid />
      </>
    );
  }else{
    return (
      <>
        <Head>
          <meta name='robots' content='index' />
        </Head>
        <Hero />
        <LogoGrid />
      </>
    );
  }

}
