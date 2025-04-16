// src/components/sections/skills.tsx
"use client";

import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Cpu, Code, Database, Figma, TestTube, Server } from "lucide-react";

const Skills = () => {
  const technicalSkills = [
    { name: "React / Next.js", value: 90, icon: <Code className="h-5 w-5" /> },
    { name: "Node.js / Express", value: 85, icon: <Server className="h-5 w-5" /> },
    { name: "TypeScript", value: 80, icon: <Cpu className="h-5 w-5" /> },
    { name: "UI/UX Design", value: 75, icon: <Figma className="h-5 w-5" /> },
    { name: "Database Management", value: 85, icon: <Database className="h-5 w-5" /> },
    { name: "Testing & QA", value: 95, icon: <TestTube className="h-5 w-5" /> },
  ];

  return (
    <section id="skills" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">My Skills</h2>
          <p className="text-muted-foreground">Let Me Help You</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          <div>
            <h3 className="text-xl font-semibold mb-6">Technical Skills</h3>
            <div className="space-y-8">
              {technicalSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      {skill.icon}
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <span className="text-sm font-medium">{skill.value}%</span>
                  </div>
                  <Progress value={skill.value} className="h-2" />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-6">Professional Skills</h3>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-background rounded-lg border p-6 flex flex-col items-center text-center">
                <div className="relative w-24 h-24 mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold">95%</span>
                  </div>
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      className="text-muted/20 stroke-current"
                      strokeWidth="10"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-primary stroke-current"
                      strokeWidth="10"
                      strokeLinecap="round"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      strokeDasharray={2 * Math.PI * 40}
                      strokeDashoffset={2 * Math.PI * 40 * (1 - 0.95)}
                      style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
                    />
                  </svg>
                </div>
                <h4 className="font-medium mb-2">Problem Solving</h4>
                <p className="text-sm text-muted-foreground">
                  Finding solutions to complex challenges
                </p>
              </div>

              <div className="bg-background rounded-lg border p-6 flex flex-col items-center text-center">
                <div className="relative w-24 h-24 mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold">90%</span>
                  </div>
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      className="text-muted/20 stroke-current"
                      strokeWidth="10"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-primary stroke-current"
                      strokeWidth="10"
                      strokeLinecap="round"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      strokeDasharray={2 * Math.PI * 40}
                      strokeDashoffset={2 * Math.PI * 40 * (1 - 0.9)}
                      style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
                    />
                  </svg>
                </div>
                <h4 className="font-medium mb-2">Teamwork</h4>
                <p className="text-sm text-muted-foreground">
                  Collaborating effectively with others
                </p>
              </div>

              <div className="bg-background rounded-lg border p-6 flex flex-col items-center text-center">
                <div className="relative w-24 h-24 mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold">85%</span>
                  </div>
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      className="text-muted/20 stroke-current"
                      strokeWidth="10"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-primary stroke-current"
                      strokeWidth="10"
                      strokeLinecap="round"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      strokeDasharray={2 * Math.PI * 40}
                      strokeDashoffset={2 * Math.PI * 40 * (1 - 0.85)}
                      style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
                    />
                  </svg>
                </div>
                <h4 className="font-medium mb-2">Communication</h4>
                <p className="text-sm text-muted-foreground">
                  Conveying ideas clearly and effectively
                </p>
              </div>

              <div className="bg-background rounded-lg border p-6 flex flex-col items-center text-center">
                <div className="relative w-24 h-24 mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold">80%</span>
                  </div>
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      className="text-muted/20 stroke-current"
                      strokeWidth="10"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-primary stroke-current"
                      strokeWidth="10"
                      strokeLinecap="round"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      strokeDasharray={2 * Math.PI * 40}
                      strokeDashoffset={2 * Math.PI * 40 * (1 - 0.8)}
                      style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
                    />
                  </svg>
                </div>
                <h4 className="font-medium mb-2">Creativity</h4>
                <p className="text-sm text-muted-foreground">
                  Innovative approaches to design and development
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;