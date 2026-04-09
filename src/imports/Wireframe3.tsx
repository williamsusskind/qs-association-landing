import { useState, useEffect } from "react";
import imgPerspectiveIPhone17MockupSemiLeftMockuuupsStudio from "@/assets/cca38cc37e2cbb7d8cf2e107c6e308eb55e4da49.png";
import DownArrow from "./DownArrow";
import LeftArrow from "./LeftArrow";
import { useSiteConfig } from "@/config/SiteConfigContext";


function SubmitButton({ onClick }: { onClick?: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-brand relative rounded-[13421750px] shrink-0 size-[36px] cursor-pointer"
      data-name="Button"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center relative size-full">
        <div className="relative w-[18px] h-[18px] flex items-center justify-center">
          {/* Simple chevron arrow - visible when not hovering */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-100"
            style={{
              opacity: isHovered ? 0 : 1,
              transform: isHovered ? 'scale(0.8) rotate(-90deg)' : 'scale(1) rotate(-90deg)',
              color: 'var(--brand-text)'
            }}
          >
            <DownArrow />
          </div>

          {/* Full arrow with line - visible when hovering */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-100"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'scale(1) rotate(180deg)' : 'scale(0.8) rotate(180deg)',
              color: 'var(--brand-text)'
            }}
          >
            <LeftArrow />
          </div>
        </div>
      </div>
    </button>
  );
}

export default function Wireframe({ onNavigateToWaitlist, onNavigateToMoreInfo }: { onNavigateToWaitlist?: (email: string) => void; onNavigateToMoreInfo?: () => void }) {
  const siteConfig = useSiteConfig();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate relative position from center of screen
      const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
      const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = () => {
    if (onNavigateToWaitlist) {
      onNavigateToWaitlist(email);
    }
  };

  // Calculate subtle tilt values without distortion
  const tiltRotate = mousePosition.x * 3; // Gentle left/right tilt based on horizontal mouse position
  const tiltY = mousePosition.y * -3; // Gentle forward/back tilt based on vertical mouse position

  return (
    <div className="bg-white min-h-screen lg:h-screen lg:overflow-hidden overflow-x-hidden overflow-y-auto scrollbar-hide w-full flex lg:items-center lg:justify-center items-start justify-center px-4 py-20 lg:py-0" data-name="Wireframe - 3">
      {/* Association Logo - Top Left */}
      <img
        src={siteConfig.association.logoSrc}
        alt={siteConfig.association.logoAlt}
        className="fixed top-6 left-6 z-50 h-[56px] w-auto"
      />

      {/* More Info Button - Top Right */}
      <button
        onClick={onNavigateToMoreInfo}
        className="fixed top-6 right-6 z-50 font-['Satoshi:Medium',sans-serif] text-[14px] text-black/40 hover:text-black transition-colors flex items-center gap-2 group"
      >
        <span>More Info</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Main centered container with responsive max-width */}
      <div className="relative w-full max-w-[1440px] lg:min-h-[600px] flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">

        {/* Left Side - iPhone Mockup with Shadow */}
        <div className="flex-shrink-0 w-full lg:w-auto flex justify-center lg:justify-start mt-16 lg:mt-0 lg:ml-auto">
          <div
            className="relative w-[280px] sm:w-[345.656px] h-[467px] sm:h-[576px]"
            style={{
              perspective: '2000px', // Minimal perspective for subtle 3D effect
            }}
          >
            <img
              alt=""
              className="relative z-10 max-w-none object-cover pointer-events-none size-full select-none"
              src={imgPerspectiveIPhone17MockupSemiLeftMockuuupsStudio}
              style={{
                transform: `rotateZ(${tiltRotate}deg) rotateX(${tiltY}deg)`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.15s ease-out',
              }}
            />
            {/* Phone shadow */}
            <div className="absolute left-[118px] sm:left-[146px] bottom-[-48px] sm:bottom-[-60px] flex items-center justify-center w-[198px] sm:w-[244.212px] h-[46px] sm:h-[56.946px]">
              <div className="flex-none rotate-[-5.64deg]">
                <div className="h-[27px] sm:h-[33.293px] relative w-[196px] sm:w-[242.111px]">
                  <div className="absolute inset-[-150.18%_-20.65%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 342.111 133.293">
                      <g filter="url(#filter0_f_1_72)" id="Ellipse 3">
                        <ellipse cx="171.056" cy="66.6464" fill="var(--fill-0, black)" fillOpacity="0.15" rx="121.056" ry="16.6464" />
                      </g>
                      <defs>
                        <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="133.293" id="filter0_f_1_72" width="342.111" x="0" y="0">
                          <feFlood floodOpacity="0" result="BackgroundImageFix" />
                          <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                          <feGaussianBlur result="effect1_foregroundBlur_1_72" stdDeviation="25" />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Content Section */}
        <div className="flex flex-col items-start w-full lg:w-[595px] lg:mr-auto px-4 lg:px-0">

          {/* Coming Soon Badge */}
          <div className="bg-brand/10 content-stretch flex items-center justify-center px-[16px] py-[8px] rounded-[12278342px] mb-[20px] sm:mb-[28px]">
            <div className="flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-brand text-[12px] whitespace-nowrap">
              <p className="leading-[normal]">{siteConfig.home.badge}</p>
            </div>
          </div>

          {/* Main Heading */}
          <div className="flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[normal] not-italic text-[32px] sm:text-[40px] lg:text-[48px] text-gray-900 mb-[20px] sm:mb-[32px]">
            {siteConfig.home.heading.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </div>

          {/* Description */}
          <div className="flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[normal] not-italic text-[14px] sm:text-[16px] text-gray-600 mb-[20px] sm:mb-[32px]">
            <p className="mb-0">{siteConfig.home.description}</p>
          </div>

          {/* Email Input Button */}
          <div className="bg-gray-100 content-stretch flex items-center justify-between pl-[17px] pr-[3px] py-[3px] rounded-[12278342px] w-full max-w-[347px] mb-[20px] relative group hover:bg-gray-200/70 transition-colors duration-200" data-name="Button">
            <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[12278342px] group-hover:border-gray-300 transition-colors duration-200" />
            <input
              type="email"
              placeholder="jane@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-0 outline-none flex-1 font-['Satoshi:Medium',sans-serif] text-[14px] sm:text-[16px] text-gray-900 placeholder:text-gray-400 leading-[24px] cursor-text"
            />
            <SubmitButton onClick={handleSubmit} />
          </div>


        </div>

      </div>
    </div>
  );
}
