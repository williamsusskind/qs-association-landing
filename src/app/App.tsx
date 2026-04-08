import { useState } from "react";
import Wireframe from "../imports/Wireframe3";
import WaitlistPage from "./components/WaitlistPage";
import MoreInfoPage from "./components/MoreInfoPage";
import { resolveSchoolFromPath } from "../config/resolveConfig";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "waitlist" | "moreinfo">("home");
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistCount, setWaitlistCount] = useState(151);

  // If URL looks like /s/something but no matching school, show 404
  const pathname = window.location.pathname;
  const isSchoolUrl = /^\/s\/[^/]+/.test(pathname);
  if (isSchoolUrl && !resolveSchoolFromPath(pathname)) {
    return (
      <div className="bg-white min-h-screen w-full flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-['Satoshi:Medium',sans-serif] text-[48px] text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="font-['Satoshi:Medium',sans-serif] text-[16px] text-gray-500">
            This school page doesn't exist or may have been removed.
          </p>
        </div>
      </div>
    );
  }

  if (currentPage === "moreinfo") {
    return <MoreInfoPage 
      onBack={() => setCurrentPage("home")} 
      onSignUp={() => setCurrentPage("waitlist")}
    />;
  }

  if (currentPage === "waitlist") {
    return <WaitlistPage 
      onBack={() => setCurrentPage("home")} 
      initialEmail={waitlistEmail}
      onSubmitSuccess={() => setWaitlistCount(prev => prev + 1)}
    />;
  }

  return (
    <Wireframe 
      onNavigateToWaitlist={(email: string) => {
        setWaitlistEmail(email);
        setCurrentPage("waitlist");
      }}
      onNavigateToMoreInfo={() => setCurrentPage("moreinfo")}
    />
  );
}