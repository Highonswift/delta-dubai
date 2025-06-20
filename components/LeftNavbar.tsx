// components/LeftNavbar.tsx
import { FiMenu } from 'react-icons/fi';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
export default function LeftNavbar() {
  return (
    <nav className="
      flex flex-row justify-between items-center 
      fixed top-0 left-0 w-full h-16 
      bg-[#070807] text-white px-4 z-50 
      lg:flex-col lg:justify-between lg:items-center 
      lg:h-screen lg:w-[90px]                   
      lg:py-[25px] lg:px-0                     
    ">
      <div className="
        text-[32px] cursor-pointer 
        transition-colors duration-300 hover:text-[#00fffb]
      ">
        <FiMenu />
      </div>
      <div className="
        hidden                                    
        lg:flex lg:flex-col lg:items-center lg:gap-5 
      ">
        <span className="
          font-bold tracking-[4px] rotate-180 
          [writing-mode:vertical-rl]
        ">
          FOLLOW
        </span>
        <div className="
          w-[2px] h-[70px] 
          bg-gradient-to-b from-transparent via-[#00fffb] to-transparent
        "></div>
      </div>
      <div className="
        flex flex-row items-center gap-6 
        lg:flex-col lg:gap-5
      ">
        <a 
          href="https://www.instagram.com/delta.dubai_/" 
          target="_blank" rel="noopener noreferrer" 
          className="
            text-xl transition-all duration-300 
            hover:text-[#00fffb] hover:scale-125
          "
        >
          <FaInstagram />
        </a>
        <a 
          href="https://www.tiktok.com/@delta_dubai" 
          target="_blank" rel="noopener noreferrer" 
          className="
            text-xl transition-all duration-300 
            hover:text-[#00fffb] hover:scale-125
          "
        >
          <FaTiktok />
        </a>
      </div>
    </nav>
  );
}