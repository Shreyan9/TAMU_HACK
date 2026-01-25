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
      router.push("/dashboard"); // change if needed
    }
  };

  const handleSeeDemo = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col w-full">
      <NavBar />

      {/* Hero gets auth-aware CTAs */}
      <Hero
        isLoading={isLoading}
        isAuthenticated={!!user}
        onGetStarted={handleGetStarted}
        onSeeDemo={handleSeeDemo}
        user={user ?? undefined} 
      />

      <HowItWorks />
      <WhyFinSight />
      <PreviewSection />

      <Footer />
    </div>
  );
}

export default Landing;
