"use client";

import { useRouter } from "next/navigation";
import Footer from '../../components/footer/footer';
import NavBar from '../../components/navbar/navbar';
import { CreditCard } from 'lucide-react';
import HowItWorks from "../../components/landing/howwork";
import WhySpendWrapped from "../../components/landing/whyspend";
import Hero from "../../components/landing/hero";
import PreviewSection from "../../components/landing/preview";

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