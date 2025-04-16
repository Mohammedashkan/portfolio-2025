// src/components/sections/hero.tsx
"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
// Either remove the unused imports and variables:
// Remove this line if not used:
// import { useEffect } from "react";

// Or if you need them but aren't using them yet, disable the ESLint rule for that line:
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect } from "react";
import { useRef } from "react";

const Hero = () => {
// Remove unused ref since it's not being utilized anywhere in the component

  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-info"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Hi I&apos;m Ashkan
            </h1>
            <div className="text-animate mb-6">
              <h2>Full-Stack Developer</h2>
              <h2>IT Support Engineer</h2>
              <h2>QA (Automation) Engineer</h2>
            </div>
            <p className="mb-8 max-w-lg text-gray-600 dark:text-gray-300">
              Innovative software engineer passionate about crafting tomorrow&apos;s tech landscape. Dedicated to creating digital experiences that transcend expectations, I specialize in building solutions that pave the way for a more connected and advanced future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">Hire Me Now!</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="hover:bg-gradient-to-r hover:from-[#9968FF] hover:via-[#FF6CB2] hover:to-[#FFAF56] hover:text-white hover:border-transparent transition-colors"
                asChild
              >
                {/* Keep only one Link component */}
                <Link href="/img/Ashkan_Resume.pdf" download>Download CV</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 hero-image-container">
              <Image
                src="/img/hero-p.png"
                alt="Ashkan - Full Stack Developer"
                width={500}
                height={500}
                className="w-full max-w-md mx-auto"
                priority
              />
              <div className="rotate-text">
                <div className="text">
                  {`I'm a Full-stack Developer QA Tester And I'm a Designer`.split('').map((char, index) => (
                    <b 
                      key={index} 
                      style={{ transform: `rotate(${index * 6.3}deg)` }}
                    >
                      {char}
                    </b>
                  ))}
                </div>
                <span><i></i></span>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;