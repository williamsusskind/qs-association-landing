import { useState, useEffect } from "react";
import svgPaths from "./svg-18wjhvm593";
import imgPerspectiveIPhone17MockupSemiLeftMockuuupsStudio from "@/assets/cca38cc37e2cbb7d8cf2e107c6e308eb55e4da49.png";
import DownArrow from "./DownArrow";
import LeftArrow from "./LeftArrow";
import { siteConfig } from "@/config/siteConfig";

// Avatar components
function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-white text-[15px] whitespace-nowrap">
        <p className="leading-[22.5px]">SM</p>
      </div>
    </div>
  );
}

function BackgroundShadow() {
  return (
    <div className="bg-[#fb2c36] relative rounded-full shrink-0 size-[36px] border-[2px] border-[#070b16]" data-name="Background+Shadow">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <Container1 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-white whitespace-nowrap">
        <p className="leading-[22.5px]">MJ</p>
      </div>
    </div>
  );
}

function BackgroundShadow1() {
  return (
    <div className="bg-[#00c950] relative rounded-full shrink-0 size-[36px] border-[2px] border-[#070b16]" data-name="Background+Shadow">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <Container2 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-white whitespace-nowrap">
        <p className="leading-[22.5px]">LA</p>
      </div>
    </div>
  );
}

function BackgroundShadow2() {
  return (
    <div className="bg-[#2b7fff] relative rounded-full shrink-0 size-[36px] border-[2px] border-[#070b16]" data-name="Background+Shadow">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <Container3 />
      </div>
    </div>
  );
}

// Arrow icon
function Group() {
  return (
    <div className="h-[10px] relative shrink-0 w-[13.333px]" data-name="Group">
      <div className="absolute inset-[-10%_-7.5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.3333 12">
          <g id="Group">
            <path d={svgPaths.p20377800} id="Vector" stroke="var(--stroke-0, #070B16)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function SubmitButton({ onClick }: { onClick?: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-[#d7d128] relative rounded-[13421750px] shrink-0 size-[36px] cursor-pointer" 
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
              color: '#070B16'
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
              color: '#070B16'
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
    <div className="bg-[#070b16] min-h-screen lg:h-screen lg:overflow-hidden overflow-x-hidden overflow-y-auto scrollbar-hide w-full flex lg:items-center lg:justify-center items-start justify-center px-4 py-20 lg:py-0" data-name="Wireframe - 3">
      {/* Association Logo - Top Left */}
      <img
        src={siteConfig.association.logoSrc}
        alt={siteConfig.association.logoAlt}
        className="fixed top-6 left-6 z-50 h-[40px] w-auto"
      />

      {/* More Info Button - Top Right */}
      <button
        onClick={onNavigateToMoreInfo}
        className="fixed top-6 right-6 z-50 font-['Satoshi:Medium',sans-serif] text-[14px] text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
      >
        <span>More Info</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Main centered container with responsive max-width */}
      <div className="relative w-full max-w-[1440px] lg:min-h-[600px] bg-[#070b16] flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">

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
                        <ellipse cx="171.056" cy="66.6464" fill="var(--fill-0, black)" fillOpacity="0.7" rx="121.056" ry="16.6464" />
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
          <div className="bg-[rgba(215,209,40,0.15)] content-stretch flex items-center justify-center px-[16px] py-[8px] rounded-[12278342px] mb-[20px] sm:mb-[28px]">
            <div className="flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#d7d128] text-[12px] whitespace-nowrap">
              <p className="leading-[normal]">{siteConfig.home.badge}</p>
            </div>
          </div>

          {/* Main Heading */}
          <div className="flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[normal] not-italic text-[32px] sm:text-[40px] lg:text-[48px] text-white mb-[20px] sm:mb-[32px]">
            {siteConfig.home.heading.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </div>

          {/* Description */}
          <div className="flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[normal] not-italic text-[14px] sm:text-[16px] text-white mb-[20px] sm:mb-[32px]">
            <p className="mb-0">{siteConfig.home.description}</p>
          </div>

          {/* Email Input Button */}
          <div className="backdrop-blur-[6px] bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-between pl-[17px] pr-[3px] py-[3px] rounded-[12278342px] w-full max-w-[347px] mb-[20px] relative group hover:bg-[rgba(255,255,255,0.13)] transition-colors duration-200" data-name="Button">
            <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[12278342px] group-hover:border-[rgba(255,255,255,0.3)] transition-colors duration-200" />
            <input 
              type="email" 
              placeholder="jane@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-0 outline-none flex-1 font-['Satoshi:Medium',sans-serif] text-[14px] sm:text-[16px] text-white placeholder:text-white/60 leading-[24px] cursor-text"
            />
            <SubmitButton onClick={handleSubmit} />
          </div>

          {/* Avatar Group and Text */}
          <div className="flex items-center gap-[12px]">
            <div className="content-stretch flex items-center" data-name="Container">
              <div className="w-[36px] h-[36px] -mr-[12px]">
                <BackgroundShadow />
              </div>
              <div className="w-[36px] h-[36px] -mr-[12px]">
                <BackgroundShadow1 />
              </div>
              <div className="w-[36px] h-[36px]">
                <BackgroundShadow2 />
              </div>
            </div>
            <div className="flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] not-italic text-[16px] text-white whitespace-nowrap">
              <p className="leading-[24px]">{siteConfig.home.socialProof}</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}