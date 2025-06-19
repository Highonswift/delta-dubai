// app/page.tsx

import Image from 'next/image';
import LeftNavbar from '@/components/LeftNavbar';
import ThinkingAnimation from '@/components/ThinkingAnimation';

export default function HomePage() {
  return (
    <main className="landing-page">
      <LeftNavbar />
      <h1 className="title">DELTA</h1>
      <h1 className="title2">DUBAI</h1>
      
      {/* This div is the parent container that MUST have a size defined in your CSS */}
      <div className="car-image">
        <Image 
          src="/images/overlay.png" 
          alt="A car with a container" 
          fill={true}
          style={{ objectFit: 'contain' }} // This ensures the image fits inside the container without being cropped
          priority={true}
        />
      </div>

      <div className="thinkanim">
        <ThinkingAnimation />
      </div>
    </main>
  );
}