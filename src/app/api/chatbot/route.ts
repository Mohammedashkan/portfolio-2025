import { NextResponse } from 'next/server';

// Remove the dynamic export since it's incompatible with static exports
// export const dynamic = 'force-dynamic';

// For static sites, we need to handle this differently
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;
    
    console.log('Received message:', message);
    
    // Enhanced response logic with more professional answers
    let response = '';
    
    if (!message || typeof message !== 'string') {
      response = "I didn't understand that. Could you please try again?";
    } else {
      const lowerMessage = message.toLowerCase();
      
      // Greeting responses
      if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
        response = "Hello! I'm Ashkan's virtual assistant. How can I help you learn more about Ashkan's expertise and services today?";
      } 
      // About Ashkan
      else if (lowerMessage.includes('about') || lowerMessage.includes('who is') || lowerMessage.includes('background')) {
        response = "Ashkan is a skilled full-stack developer  and AI/ML Developer with expertise in modern web technologies. With a strong background in both frontend and backend development, Ashkan creates seamless, user-focused digital experiences that help businesses achieve their goals. Ashkan combines technical excellence with creative problem-solving to deliver solutions that exceed client expectations.";
      } 
      // Services
      else if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('provide')) {
        response = "Ashkan offers a comprehensive range of development services including:\n\n• Custom web application development\n• Responsive website design and implementation\n• E-commerce solutions\n• Progressive Web Apps (PWAs)\n• API development and integration\n• Performance optimization\n• Technical consultation\n\nEach service is tailored to meet your specific business needs and objectives.";
      } 
      // Skills and technologies
      else if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack')) {
        response = "Ashkan has expertise in a wide range of technologies:\n\n**Frontend**: React, Next.js, TypeScript, Tailwind CSS, Redux\n**Backend**: Node.js, Express, Python, Django\n**Database**: MongoDB, PostgreSQL, MySQL\n**Cloud**: AWS, Azure, Google Cloud\n**DevOps**: Docker, CI/CD, Git\n\nThis diverse skill set allows Ashkan to select the perfect technology stack for each unique project.";
      } 
      // Portfolio/Projects
      else if (lowerMessage.includes('portfolio') || lowerMessage.includes('project') || lowerMessage.includes('work')) {
        response = "Ashkan's portfolio includes several successful projects:\n\n1. **E-commerce Platform** - A full-featured online store with payment integration and inventory management\n\n2. **Healthcare Dashboard** - A real-time analytics platform for healthcare providers\n\n3. **FinTech Mobile App** - A cross-platform financial services application\n\n4. **AI-Powered Content Management System** - A smart CMS with automated content optimization\n\nEach project demonstrates Ashkan's commitment to quality, performance, and user experience. Would you like more details about any specific project?";
      } 
      // Process
      else if (lowerMessage.includes('process') || lowerMessage.includes('approach') || lowerMessage.includes('methodology')) {
        response = "Ashkan follows a structured development process:\n\n1. **Discovery** - Understanding your business goals and requirements\n2. **Planning** - Creating a detailed roadmap and technical specifications\n3. **Design** - Developing wireframes and visual designs\n4. **Development** - Building the solution with regular client feedback\n5. **Testing** - Ensuring quality and performance\n6. **Deployment** - Launching your solution\n7. **Support** - Providing ongoing maintenance and updates\n\nThis approach ensures transparent communication and successful project delivery.";
      } 
      // Contact information
      else if (lowerMessage.includes('contact') || lowerMessage.includes('hire') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
        response = "I'd be happy to connect you with Ashkan! You can:\n\n• Email directly at bzcodepro@gmail.com\n• WhatsApp Contact NO - +94 70 396 1120 \n• Location: Maradana, Colombo -10, SRILANKA \n• Fill out the contact form on this website\n• Schedule a free consultation call\n\nAshkan typically responds within 24 hours and is currently available for new projects starting next month.";
      } 
      // Pricing
      else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('rate') || lowerMessage.includes('budget')) {
        response = "Ashkan offers flexible pricing models to suit different project needs:\n\n• **Project-based** - Fixed price based on project scope\n• **Hourly rate** - For ongoing development and maintenance\n• **Retainer** - Monthly packages for continuous support\n\nEach project is unique, so Ashkan provides custom quotes after understanding your specific requirements. Would you like to discuss your project to get a tailored estimate?";
      } 
      // Timeline
      else if (lowerMessage.includes('timeline') || lowerMessage.includes('deadline') || lowerMessage.includes('how long') || lowerMessage.includes('when')) {
        response = "Project timelines vary based on complexity and scope. Typically:\n\n• Small websites: 2-4 weeks\n• Medium web applications: 1-3 months\n• Complex platforms: 3-6 months\n\nAshkan is committed to meeting agreed deadlines while maintaining high quality standards. For your specific project, Ashkan can provide a detailed timeline after the initial consultation.";
      }
      // Testimonials
      else if (lowerMessage.includes('testimonial') || lowerMessage.includes('review') || lowerMessage.includes('client') || lowerMessage.includes('feedback')) {
        response = "Ashkan has received excellent feedback from clients:\n\n\"Ashkan delivered our e-commerce platform ahead of schedule and exceeded our expectations. The attention to detail and technical expertise were impressive.\" - Sarah J., CEO\n\n\"Working with Ashkan was a pleasure. The communication was clear, and the final product was exactly what we needed.\" - Michael T., Marketing Director\n\n\"The web application Ashkan built has significantly improved our business operations and received positive feedback from our users.\" - David L., Product Manager";
      }
      // Default response
      else {
        response = "Thank you for your message! I'd be happy to tell you more about Ashkan's development services, portfolio, or process. Feel free to ask about specific projects, technologies, or how Ashkan can help with your business needs.";
      }
    }
    
    console.log('Sending response:', response);
    
    return NextResponse.json({ message: response });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { message: 'An error occurred while processing your request. Please try again later.' },
      { status: 500 }
    );
  }
}