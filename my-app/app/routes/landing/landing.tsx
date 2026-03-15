"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import NavBar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

import Hero from "./hero";
import HowItWorks from "./howwork";
import WhyFinSight from "./whyspend";

function Landing() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoading = status === "loading";

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
