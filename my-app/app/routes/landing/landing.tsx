"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

import NavBar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

import Hero from "./hero";
import HowItWorks from "./howwork";
import WhyFinSight from "./whyspend";
import PreviewSection from "./preview";

function Landing() {
  const router = useRouter();
  const { user, isLoading } = useUser();

  const handleGetStarted = () => {
    if (!user) {
      router.push("/auth/login");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col w-full bg-white">
      <NavBar />

      {/* Hero: single CTA — Dashboard if signed in, else redirect to sign in */}
      <Hero
        isLoading={isLoading}
        isAuthenticated={!!user}
        onGetStarted={handleGetStarted}
        user={user ?? undefined}
      />

      <HowItWorks />
      <WhyFinSight />

      <Footer />
    </div>
  );
}

export default Landing;
