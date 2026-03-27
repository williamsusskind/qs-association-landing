import { useState } from "react";
import Wireframe from "../imports/Wireframe3";
import WaitlistPage from "./components/WaitlistPage";
import MoreInfoPage from "./components/MoreInfoPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "waitlist" | "moreinfo">("home");
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistCount, setWaitlistCount] = useState(151);

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