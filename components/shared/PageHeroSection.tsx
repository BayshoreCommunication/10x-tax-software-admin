import React from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollMotionEffect from "../motion/ScrollMotionEffect";

interface PageHeroSectionProps {
  title: string;
  description: string;
}

const PageHeroSection: React.FC<PageHeroSectionProps> = ({
  title,
  description,
}) => {
  const animationProps = {
    effect: "fade-up",
    duration: 2000, // Changed to a number, as duration is typically a number
  };

  return (
    <div className="relative w-full h-[320px] md:h-[380px]">
      <Image
        className="absolute inset-0 object-cover bg-bottom w-full h-full"
        src="/assets/about/heropagebg.jpg"
        alt="Page Hero Image"
        layout="fill"
        priority
      />

      <div className="relative flex flex-col items-center justify-center w-full h-full">
        <div className="container py-10 md:py-14">
          <ScrollMotionEffect {...animationProps}>
            <h1 className="text-[30px] md:text-[55px] font-bold text-black md:text-left text-center leading-snug md:leading-tight">
              {title}
            </h1>
          </ScrollMotionEffect>
          <ScrollMotionEffect {...animationProps}>
            <h2 className="mt-4 md:mt-6 text-base md:text-[20px] font-light text-black md:text-left text-center leading-snug max-w-[1000px]">
              {description}
            </h2>
          </ScrollMotionEffect>
        </div>
      </div>
    </div>
  );
};

export default PageHeroSection;
