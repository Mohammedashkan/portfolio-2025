// src/app/blog/page.tsx
import Blog from "@/components/sections/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Ashkan Portfolio",
  description: "Read my latest articles and insights on web development, programming, and technology.",
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
  }
};

export default function BlogPage() {
  return (
    <div className="pt-24">
      <Blog />
    </div>
  );
}