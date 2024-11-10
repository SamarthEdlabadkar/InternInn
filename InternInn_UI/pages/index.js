import Head from "next/head";
import GradientWrapper from "../components/GradientWrapper";
import CTA from "../components/ui/CTA";
import Features from "../components/ui/Features";
import FooterCTA from "../components/ui/FooterCTA";
import Hero from "../components/ui/Hero";
import LogoGrid from "../components/ui/LogoGrid";
import Testimonials from "../components/ui/Testimonials";
import ToolKit from "../components/ui/ToolKit";
import Footer from "../components/ui/Footer";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();

  const {query} = router

  const logined = false

  // try{
  //   const { full_name, year, age, phone, email} = router.query;
  //   logined = true
  // }catch(e){
  //   console.log(e)
  // }

  // if (logined == true){
  //   console.log(full_name)
  // }

  console.log(query)

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
