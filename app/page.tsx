// app/page.tsx
import Image from 'next/image';
import LeftNavbar from '@/components/LeftNavbar';
import ThinkingAnimation from '@/components/ThinkingAnimation';
export default function HomePage() {
  return (
    <main className="
      relative h-screen w-full flex flex-col items-center justify-center gap-12
      p-4 lg:p-0 lg:gap-0 lg:block overflow-hidden
    ">
      <Image
        src="/images/bgimg3.png"
        alt="A beautiful descriptive background"
        fill
        priority
        sizes="100vw"
        className="object-cover -z-10"
      />
      <LeftNavbar />
      <div className="
        text-center 
        lg:text-left lg:absolute lg:top-[20%] lg:left-[10%]
      ">
        <h1 className="
          font-Boldfont text-white text-[15vw] leading-none
          lg:text-[10vw]
          animate-slide-in-fast
        ">
          DELTA
        </h1>
        <h1 className="
          font-Boldfont text-[#00fffb] text-[15vw] leading-none
          lg:text-[10vw]
          animate-slide-in-slow
        ">
          DUBAI
        </h1>
      </div>
      <div className="
        w-full
        lg:absolute lg:bottom-[7.5%] lg:left-[22.5%] lg:w-[500px] lg:-translate-x-1/2
        animate-fade-in-slow
      ">
        <ThinkingAnimation />
      </div>
    </main>
  );
}