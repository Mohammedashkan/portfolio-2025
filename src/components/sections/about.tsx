// src/components/sections/about.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import Link from "next/link";
import React from 'react'

const About = () => {
  const achievements = [
    {
      title: "User Experience Design - UI / UX",
      description: "Delight the user and make it work.",
    },
    {
      title: "Web & User Interface Design - Development",
      description: "Website, Web Experience, ...",
    },
    {
      title: "Interaction Design - Animation",
      description: "I Like to move it move it",
    },
    {
      title: "Web Design Award",
      description: "Award for creativity and user experience.",
    },
    {
      title: "Code and Development Award",
      description: "Exceptional coding skills and development techniques",
    },
    {
      title: "Hackathons and Coding Competitions",
      description: "Participating in hackathons and coding.",
    },
    {
      title: "Online Courses and Bootcamps",
      description: "Delight the user and make it work.",
    },
    {
      title: "Internships and Work Experience",
      description: "Website, Web Experience, ...",
    },
    {
      title: "Beng(Hons) Software Engineer",
      description: "I Like try to my Best",
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="text-xl font-semibold text-primary">
            4 Year&apos;s Experience on Full-Stack Developer
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-muted-foreground">
              Hi, my name is Ashkan I&apos;m a Creative / Full Stack Developer from
              Sri Lanka. Over the years I developed a skill set in various
              technologies and frameworks, including React, React JS, Node JS /
              Express and TypeScript. Where I really value clean and readable
              code. Also, I&apos;m passionate about UX / UI. And last but not least, I
              am the proud father of two boys. I enjoy playing sports and I&apos;m a
              little bit of a geek now and then!
            </p>

            <Tabs defaultValue="achievements" className="w-full">
              <TabsList className="grid w-full grid-cols-3 p-[1px] rounded-lg">
                <TabsTrigger 
                  value="achievements"
                  className="data-[state=active]:bg-white data-[state=active]:text-black hover:bg-[#FF6B6B] hover:text-white transition-colors"
                >
                  Achievements
                </TabsTrigger>
                <TabsTrigger 
                  value="experience"
                  className="data-[state=active]:bg-white data-[state=active]:text-black hover:bg-[#4ECDC4] hover:text-white transition-colors"
                >
                  Experience
                </TabsTrigger>
                <TabsTrigger 
                  value="education"
                  className="data-[state=active]:bg-white data-[state=active]:text-black hover:bg-[#45B7D1] hover:text-white transition-colors"
                >
                  Education
                </TabsTrigger>
              </TabsList>
              <TabsContent value="achievements" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {achievements.slice(0, 6).map((achievement, index) => (
                    <div
                      key={index}
                      className="bg-background rounded-lg p-4 border shadow-sm"
                    >
                      <h3 className="font-medium mb-2">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="experience" className="mt-6">
                <div className="space-y-4">
                  <div className="bg-background rounded-lg p-4 border shadow-sm">
                    <h3 className="font-medium mb-1">
                       Full-Stack Developer
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Ge-on Inc. | 2025 - Present
                    </p>
                    <p className="text-sm">
                      Leading the development of enterprise web applications using
                      React, Node.js, and TypeScript.
                    </p>
                  </div>
                  
                  <div className="bg-background rounded-lg p-4 border shadow-sm">
                    <h3 className="font-medium mb-1">
                      Trainee Data Engineer
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      NODE LYNX | June 2024 - January 2025
                    </p>
                    <p className="text-sm">
                      Built and maintained ETL workflows using Python and specialized data processing tools to cleanse and transform large-scale datasets. Implemented monitoring systems for data infrastructure to ensure continuous operation. Managed SQL Server databases and assisted with AWS cloud-based infrastructure deployment.
                    </p>
                  </div>               
                  
                  <div className="bg-background rounded-lg p-4 border shadow-sm">
                    <h3 className="font-medium mb-1">
                      IT Support Engineer Intern
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      DMS | Jun 2021 - Sep 2022
                    </p>
                    <p className="text-sm">
                      Provided comprehensive technical support for hardware, software, and network systems. Configured and maintained Windows Server environments while troubleshooting network connectivity issues. Managed user accounts and access controls with implementation of IT security protocols.
                    </p>
                  </div>
                  
                  <div className="bg-background rounded-lg p-4 border shadow-sm">
                    <h3 className="font-medium mb-1">
                      QA Bootcamp Participant
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      99X (SLASSCOM) | Jun 2023
                    </p>
                    <p className="text-sm">
                      Participated in developing test plans and executing test cases for software quality assurance processes. Conducted automated testing on web and mobile applications using industry-standard tools. Utilized API testing tools like Postman to verify system integration and data flow.
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="education" className="mt-6">
                <div className="space-y-4">
                  <div className="bg-background rounded-lg p-4 border shadow-sm">
                    <h3 className="font-medium mb-1">
                      BEng (Hons) Software Engineering
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Esoft Metro Campus | 2022 - 2024
                    </p>
                    <p className="text-sm">
                      Graduated with First Class Honours. Specialized in web
                      technologies and artificial intelligence.
                    </p>
                  </div>
                  <div className="bg-background rounded-lg p-4 border shadow-sm">
                    <h3 className="font-medium mb-1">
                      Advanced Certification in UI/UX Design
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Design Institute | 2019
                    </p>
                    <p className="text-sm">
                      Completed a specialized program in user experience and
                      interface design principles.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">Hire Me</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="hover:bg-gradient-to-r hover:from-[#9968FF] hover:via-[#FF6CB2] hover:to-[#FFAF56] hover:text-white hover:border-transparent transition-colors"
                asChild
              >
                <Link href="/img/Ashkan_Resume.pdf" download>Download CV</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {achievements.slice(0, 4).map((achievement, index) => (
              <div
                key={index}
                className="bg-background rounded-lg p-6 border shadow-sm transition-all hover:shadow-md hover:border-primary/50"
              >
                <h3 className="font-medium mb-2">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
