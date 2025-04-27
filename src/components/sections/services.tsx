// src/components/sections/services.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Code, Database, Bot, TestTube } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Services = () => {
  const services = [
    {
      title: "Data Science Development",
      description: "Leverage expertise in Python, SQL, and AWS to transform raw data into actionable insights. Proficient in data infrastructure management, cloud-based solutions (AWS, Azure), and large-scale dataset processing. ",
      icon: <Database className="h-10 w-10 text-primary" />,
      pdf: "/img/Data-Science.pdf",
    },
    {
      title: "Web Development",
      description: "Skilled in deploying cloud-optimized web applications with security protocols and scalability. Proficient in JavaScript, Linux administration, and cloud platforms (AWS, Azure). Experience in configuring network infrastructure (CISCO, Firewall) and headless CMS integration. ",
      icon: <Code className="h-10 w-10 text-primary" />,
      pdf: "/img/Web Development.pdf",
    },
    {
      title: "AI / ML App Development",
      description: "Develop custom AI agents using Python, AWS, and ERP systems. Certified in CISSP for ethical AI governance and risk assessment. Implemented automated tracking systems (General AI Pro Tracker) and cloud-based AI solutions. ",
      icon: <Bot className="h-10 w-10 text-primary" />,
      pdf: "/img/AI-and-ML.pdf",
    },
    {
      title: "QA Automation",
      description: "Proficient in automated testing (Postman, API tools) and test case execution. Certified in CISSP for security-driven testing protocols. Experience in shift-left methodologies, network troubleshooting, and documentation. Collaborated on software QA projects (RW-EU-ASSCOUR) with a focus on system integration and data flow validation.",
      icon: <TestTube className="h-10 w-10 text-primary" />,
      pdf: "/img/QA-Automation.pdf",
    },
  ];

  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">My Services</h2>
          <p className="text-muted-foreground">what I will do for you</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="px-0" asChild>
                    <a href={service.pdf} download>
                      Read More
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-lg p-8 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="flex items-center gap-4">
            <Image 
              src="/img/mine.png" 
              alt="Profile Image" 
              width={60} 
              height={60} 
              className="rounded-full"
              style={{ height: 'auto' }} // Add this line to maintain aspect ratio
            />
            <div>
              <h3 className="text-xl font-bold mb-2">Have a Project On Your Mind</h3>
              <p className="text-muted-foreground">
                Let&apos;s collaborate to bring your ideas to life
              </p>
            </div>
          </div>
          <Button 
            size="lg" 
            className="hover:bg-gradient-to-r hover:from-[#9968FF] hover:via-[#FF6CB2] hover:to-[#FFAF56] hover:text-white hover:border-transparent transition-colors"
            asChild
          >
            <Link href="/contact">Contact Me</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;