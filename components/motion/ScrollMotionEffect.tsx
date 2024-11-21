"use client";
import React, { useEffect, ReactNode } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface ScrollMotionEffectProps {
  children: ReactNode;
  effect: string;
  duration: number;
}

const ScrollMotionEffect: React.FC<ScrollMotionEffectProps> = ({
  children,
  effect,
  duration,
}) => {
  useEffect(() => {
    console.log("Initializing AOS");
    AOS.init();
    AOS.refresh();

    return () => {
      AOS.refresh();
    };
  }, []);

  return (
    <div
      data-aos={effect}
      data-aos-duration={duration}
      data-aos-delay="0"
      data-aos-once="true"
    >
      {children}
    </div>
  );
};

export default ScrollMotionEffect;
