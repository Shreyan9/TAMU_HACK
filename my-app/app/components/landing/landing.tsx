"use client";

import { useRouter } from "next/navigation";
import Footer from '../footer/footer';
import NavBar from '../navbar/navbar';
import { CreditCard } from 'lucide-react';
import HowItWorks from "./howwork";
import WhySpendWrapped from "./whyspend";
import Hero from "./hero";
import PreviewSection from "./preview";

function Landing () {
  const router = useRouter();
  return (
    <>
      <div className='flex flex-col w-full'>
        <NavBar/>
        <Hero/>
        <HowItWorks/>
        <WhySpendWrapped/>
        <PreviewSection/>
        <Footer/>
      </div>      
    </>
  )
}

export default Landing;