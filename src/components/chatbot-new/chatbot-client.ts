// Client-side chatbot processing
export const processMessage = (message: string): string => {
  if (!message || typeof message !== 'string') {
    return "I didn't understand that. Could you please try again?";
  }
  
  const lowerMessage = message.toLowerCase();
  
  // Greeting responses
  if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey') || lowerMessage.includes('how are you')) {
    return "Hello! I'm Ashkan's virtual assistant. How can I help you learn more about Ashkan's expertise and services today?";
  } 
  // About Ashkan
  else if (lowerMessage.includes('about') || lowerMessage.includes('who is') || lowerMessage.includes('background')) {
    return "Ashkan is a skilled full-stack developer and AI/ML Developer with expertise in modern web technologies. With a strong background in both frontend and backend development, Ashkan creates seamless, user-focused digital experiences that help businesses achieve their goals. With 4+ years of experience, Ashkan has worked with clients across various industries including e-commerce, healthcare, and fintech.";
  } 
  // Contact details
  else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('reach') || lowerMessage.match(/contact\s*no/i)) {
    return "You can contact Ashkan through the following channels:\n\n• Email: bzcodepro@gmail.com\n• WhatsApp and Phone NO: +94 70 396 1120 \n• Location: Maradana, Colombo -10, SRILANKA  \n• LinkedIn: https://www.linkedin.com/in/mhmd-ashkan-a1a59019a/ \n• GitHub: https://github.com/Mohammedashkan \n\nFeel free to reach out for project inquiries, collaboration opportunities, or just to say hello!";
  }
  // Services
  else if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('provide')) {
    return "Ashkan offers a comprehensive range of development services including:\n\n• Custom web application development\n• Responsive website design and implementation\n• E-commerce solutions\n• Progressive Web Apps (PWAs)\n• API development and integration\n• Performance optimization\n• Technical consultation\n• AI/ML integration\n• Database design and optimization\n• Cloud infrastructure setup\n\nEach service is tailored to meet your specific business needs and objectives.";
  } 
  // Skills and technologies
  else if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack')) {
    return "Ashkan has expertise in a wide range of technologies:\n\n**Frontend**: React, Next.js, TypeScript, Tailwind CSS, Redux, Vue.js, Angular\n**Backend**: Node.js, Express, Python, Django, Flask, PHP, Laravel\n**Database**: MongoDB, PostgreSQL, MySQL, Redis, Firebase\n**Cloud**: AWS, Azure, Google Cloud, Vercel, Netlify\n**DevOps**: Docker, Kubernetes, CI/CD, Git, GitHub Actions\n**Mobile**: React Native, Flutter\n**AI/ML**: TensorFlow, PyTorch, scikit-learn\n\nThis diverse skill set allows Ashkan to select the perfect technology stack for each unique project.";
  }
  // Pricing information
  else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('rate') || lowerMessage.includes('budget') || lowerMessage.includes('quote')) {
    return "Ashkan offers flexible pricing models to suit different project needs:\n\n**Hourly Rate**: $30-50 USD per hour depending on project complexity\n**Fixed Price Projects**: Based on detailed requirements and scope\n**Retainer Packages**: Monthly packages starting from $1,500 for ongoing development needs\n**MVP Development**: Starting from $5,000 for basic functional prototypes\n\nEach project is unique, so Ashkan provides custom quotes after understanding your specific requirements. Discounts are available for long-term collaborations and startups. Contact Ashkan for a free consultation and detailed quote for your project!";
  }
  // Experience
  else if (lowerMessage.includes('experience') || lowerMessage.includes('work history') || lowerMessage.includes('previous work')) {
    return "Ashkan has over 4 years of professional experience in software development:\n\n**Full-Stack Developer at Ge-on Inc.** (2025-Present)\n• Leading development of enterprise web applications\n• Managing client projects from concept to deployment\n• Implementing CI/CD pipelines and best practices\n\n**Trainee Data Engineer at NODE LYNX** (2024-2025)\n• Built ETL workflows for large-scale data processing\n• Implemented monitoring systems for data infrastructure\n• Managed SQL Server databases and AWS deployments\n\n**IT Support Engineer Intern at DMS** (2021-2022)\n• Provided technical support for hardware and software systems\n• Configured Windows Server environments\n• Implemented IT security protocols\n\nAshkan has successfully delivered over 30+ projects for clients across various industries.";
  }
  // Education
  else if (lowerMessage.includes('education') || lowerMessage.includes('degree') || lowerMessage.includes('qualification') || lowerMessage.includes('study')) {
    return "Ashkan's educational background:\n\n**BEng (Hons) Software Engineering**\n• Esoft Metro Campus (2022-2024)\n• Graduated with First Class Honours\n• Specialized in web technologies and artificial intelligence\n• Final year project: AI-powered customer service platform\n\n**Advanced Certification in UI/UX Design**\n• Design Institute (2019)\n• Specialized program in user experience and interface design principles\n\n**Professional Certifications**:\n• AWS Certified Developer Associate\n• Google Cloud Professional Developer\n• MongoDB Certified Developer\n• Microsoft Certified: Azure Developer Associate\n\nAshkan continuously updates his skills through online courses and professional development.";
  }
  // Projects
  else if (lowerMessage.includes('project') || lowerMessage.includes('portfolio') || lowerMessage.includes('work sample')) {
    return "Some of Ashkan's notable projects:\n\n**E-Commerce Platform** (React, Node.js, MongoDB)\n• Built a full-featured online store with payment integration\n• Implemented real-time inventory management\n• Increased client's sales by 45%\n\n**Healthcare Management System** (Next.js, Express, PostgreSQL)\n• Developed patient management and appointment scheduling system\n• Implemented secure medical records storage\n• Reduced administrative workload by 60%\n\n**Financial Dashboard** (Vue.js, Django, Redis)\n• Created real-time data visualization platform\n• Integrated with multiple financial APIs\n• Automated reporting processes\n\n**AI-Powered Content Recommendation Engine** (Python, TensorFlow, AWS)\n• Built machine learning algorithms for content personalization\n• Increased user engagement by 35%\n\nVisit Ashkan's GitHub or portfolio website for more project examples and case studies.";
  }
  // Blog and content
  else if (lowerMessage.includes('blog') || lowerMessage.includes('article') || lowerMessage.includes('content') || lowerMessage.includes('writing')) {
    return "Ashkan regularly shares insights and knowledge through blog posts and technical articles:\n\n**Recent Blog Topics**:\n• \"Building Scalable Web Applications with Next.js and Firebase\"\n• \"Implementing Machine Learning Models in Web Applications\"\n• \"Performance Optimization Techniques for React Applications\"\n• \"Secure Authentication Patterns for Modern Web Apps\"\n• \"Database Design Best Practices for Scalable Applications\"\n\nYou can find these articles on Ashkan's personal blog, Medium profile, and LinkedIn. Ashkan also contributes to open-source projects and technical communities, sharing knowledge and best practices with fellow developers.";
  }
  // Process
  else if (lowerMessage.includes('process') || lowerMessage.includes('workflow') || lowerMessage.includes('approach') || lowerMessage.includes('methodology')) {
    return "Ashkan follows a structured development process to ensure project success:\n\n1. **Discovery & Planning**\n• In-depth requirements gathering\n• Technology stack selection\n• Project scope definition\n• Timeline and milestone planning\n\n2. **Design & Prototyping**\n• UI/UX design\n• Interactive prototypes\n• Client feedback and revisions\n\n3. **Development**\n• Agile development methodology\n• Regular progress updates\n• Continuous integration\n• Code quality assurance\n\n4. **Testing & QA**\n• Comprehensive testing\n• Performance optimization\n• Security audits\n• Cross-browser/device compatibility\n\n5. **Deployment & Support**\n• Smooth production deployment\n• Knowledge transfer\n• Documentation\n• Ongoing maintenance options\n\nThis methodical approach ensures high-quality deliverables that meet client expectations.";
  }
  // Testimonials
  else if (lowerMessage.includes('testimonial') || lowerMessage.includes('review') || lowerMessage.includes('feedback') || lowerMessage.includes('client say')) {
    return "What clients say about working with Ashkan:\n\n**Sarah T., E-commerce Startup Founder**\n\"Ashkan transformed our business with an exceptional e-commerce platform. His technical expertise and attention to detail exceeded our expectations. Our sales increased by 45% within three months of launch!\"\n\n**David L., Healthcare Provider**\n\"Working with Ashkan was a pleasure. He understood our complex requirements and delivered a system that streamlined our operations significantly. His communication was clear and timely throughout the project.\"\n\n**Michael R., Financial Services**\n\"Ashkan's work on our dashboard application was outstanding. He navigated complex data integration challenges with ease and delivered a product that has become essential to our daily operations.\"\n\n**Jennifer K., Marketing Agency**\n\"We've worked with many developers, but Ashkan stands out for his problem-solving abilities and commitment to quality. He's now our go-to developer for all web projects.\"";
  }
  // Default response
  else {
    return "Thank you for your message! I'd be happy to tell you more about Ashkan's development services, portfolio, or process. Feel free to ask about specific projects, technologies, pricing, education, or how Ashkan can help with your business needs.";
  }
};