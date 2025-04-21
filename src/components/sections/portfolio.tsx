// src/components/sections/portfolio.tsx
"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Portfolio = () => {
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      title: "Data Science Project",
      category: "data-science",
      description: "Python/SQL/AWS expert; Azure-certified; built automated analysis systems",
      image: "/img/portfolio/1.jpg",
      link: "https://diproject.netlify.app/", // <-- Added link property
    },
    {
      title: "Web Development",
      category: "web",
      description: "JavaScript/cloud apps (AWS/Azure); deployed secure CMS via (Setup Web in Cloud)",
      image: "/img/portfolio/2.jpg",
    },
    {
      title: "Web Development",
      category: "web",
      description: "Dynamic React task manager streamlines project workflows with intuitive drag-and-drop.",
      image: "/img/portfolio/3.jpg",
    },
    {
      title: "AI / ML Project",
      category: "ai",
      description: "Innovative crypto platform revolutionizes seamless secure transactions and decentralized finance.",
      image: "/img/portfolio/4.jpg",
    },
    {
      title: "AI / ML Project",
      category: "ai",
      description: "Intelligent Gemini tracker monitors AI trends seamlessly for optimal performance",
      image: "/img/portfolio/5.jpg",
    },
    {
      title: "QA Testing",
      category: "qa",
      description: "Proficient in automated testing (Postman, API tools) and test case execution.",
      image: "/img/portfolio/6.jpg",
    },
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <section id="portfolio" className="py-10 sm:py-14 md:py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-4">My Portfolio</h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">what I will do for you</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className="hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:text-white transition-colors duration-300"
          >
            All
          </Button>
          <Button
            variant={filter === "web" ? "default" : "outline"}
            onClick={() => setFilter("web")}
            className="hover:bg-gradient-to-r from-green-500 to-teal-500 hover:text-white transition-colors duration-300"
          >
            Web Development
          </Button>
          <Button
            variant={filter === "data-science" ? "default" : "outline"}
            onClick={() => setFilter("data-science")}
            className="hover:bg-gradient-to-r from-yellow-500 to-orange-500 hover:text-white transition-colors duration-300"
          >
            Data Science
          </Button>
          <Button
            variant={filter === "ai" ? "default" : "outline"}
            onClick={() => setFilter("ai")}
            className="hover:bg-gradient-to-r from-red-500 to-pink-500 hover:text-white transition-colors duration-300"
          >
            AI / ML
          </Button>
          <Button
            variant={filter === "qa" ? "default" : "outline"}
            onClick={() => setFilter("qa")}
            className="hover:bg-gradient-to-r from-indigo-500 to-purple-500 hover:text-white transition-colors duration-300"
          >
            QA Testing
          </Button>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg bg-background border shadow-sm transition-all hover:shadow-md hover:border-primary/50">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <Button variant="link" className="px-0" asChild>
                    <Link
                      href={project.link ? project.link : "/portfolio"}
                      target={project.link ? "_blank" : undefined}
                      rel={project.link ? "noopener noreferrer" : undefined}
                    >
                      Explore More
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;