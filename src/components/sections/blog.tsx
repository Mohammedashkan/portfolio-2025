// src/components/sections/blog.tsx
"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "Data Science",
    date: "Sunday, Jan 14, 2023",
    description: "Harnessing dynamic data insights with advanced analytics for transformative research.",
    category: "Data Science",
    image: "/img/blog/1.jpg",
    url: "https://medium.com/@ashkan.mohammed98/data-science-roadmap-an-easy-to-learn-pathway-for-beginners-af69d4058198"
  },
  {
    id: 2,
    title: "Generative AI",
    date: "Sunday, Jan 14, 2023",
    description: "Transforming creative processes through innovative generative models and exquisite algorithms.",
    category: "AI/ML",
    image: "/img/blog/2.jpg",
    url: "https://medium.com/@ashkan.mohammed98/transforming-creative-processes-through-generative-ai-a-step-by-step-guide-1d9d410c86df"
  },
  {
    id: 3,
    title: "Machine Learning",
    date: "Sunday, Jan 14, 2023",
    description: "Empowering systems with machine learning techniques to unlock complex patterns.",
    category: "AI/ML",
    image: "/img/blog/3.jpg",
    url: "https://medium.com/@ashkan.mohammed98/machine-learning-empowering-systems-to-unlock-complex-patterns-a-step-by-step-guide-71d0222d6060"
  },
  {
    id: 4,
    title: "React Web Development",
    date: "Sunday, Jan 14, 2023",
    description: "Building dynamic web interfaces using React for modern interactive experiences.",
    category: "Web Development",
    image: "/img/blog/4.jpg",
    url: "https://medium.com/@ashkan.mohammed98/building-dynamic-web-interfaces-with-react-a-step-by-step-guide-to-modern-interactive-experiences-4f1bcafbb016"
  },
  {
    id: 5,
    title: "Quality Assurance Testing",
    date: "Sunday, Jan 14, 2023",
    description: "Ensuring software quality with rigorous testing methodologies that drive reliability.",
    category: "QA",
    image: "/img/blog/5.jpg",
    url: "/blog/quality-assurance"
  },
  {
    id: 6,
    title: "Mobile App Landing Page",
    date: "Sunday, Jan 14, 2023",
    description: "Designing sleek mobile app landing pages to captivate user interest.",
    category: "UI/UX",
    image: "/img/blog/6.jpg",
    url: "/blog/mobile-app-landing"
  }
];

const Blog = () => {
  return (
    <section id="blog" className="py-16 md:py-24">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Latest Blog Posts</h2>
          <p className="text-xl font-semibold text-primary">
            Insights & Knowledge Sharing
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-background rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {post.date}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {post.description}
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href={post.url}>Read More</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild>
            <Link href="/blog">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;