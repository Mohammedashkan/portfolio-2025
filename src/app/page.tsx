// src/app/page.tsx
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Services from "@/components/sections/services";
import Portfolio from "@/components/sections/portfolio";
import Blog from "@/components/sections/blog";
import Skills from "@/components/sections/skills";
import Contact from "@/components/sections/contact";
import ChatbotButton from "@/components/chatbot/chatbot-button";


export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Blog />
      <Skills />
      <Contact />
      <ChatbotButton />
    </main>
  );
}