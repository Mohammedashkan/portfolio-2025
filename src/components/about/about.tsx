import Image from 'next/image';

<Image 
  src="/img/mine.png" 
  alt="Ashkan's profile" 
  width={300} 
  height={300} 
  style={{ width: 'auto', height: 'auto' }}
  className="rounded-full object-cover shadow-md" // Ensure only one className attribute
/>