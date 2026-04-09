import { useState } from "react";
import { useSiteConfig, useSchool } from "@/config/SiteConfigContext";
import type { SchoolEntry } from "@/config/schools";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Is the panic button really free?",
    answer: "Yes. The panic button is 100% free forever. There are no setup costs, no contracts, and no credit card required. This is the free version of our panic button. A paid version exists with additional features, but the free version includes everything needed for real emergency response."
  },
  {
    question: "What happens when someone presses the panic button?",
    answer: "Emergency dispatch is instantly notified through our direct integration with RapidSOS. Dispatch receives the staff member's name, exact location, time, and school details and begins responding immediately. The app then guides the user through clear next steps if there's time to provide more information."
  },
  {
    question: "Who gets notified during an emergency?",
    answer: "Police and emergency dispatch are notified automatically. At the same time, internal alerts notify administrators and designated staff. Notifications are fully configurable by the school and can override Do Not Disturb using critical alerts when needed."
  },
  {
    question: "How fast are alerts sent?",
    answer: "Alerts are instant, typically within 0–3 seconds, depending on the school's network connection."
  },
  {
    question: "How is this different from other panic button apps?",
    answer: "QuickSecure is direct-to-dispatch, built specifically for K–12 schools, and designed for high-stress situations. Instead of just sending an alert, the app walks staff through guided emergency workflows so they know exactly what to do next even under pressure."
  },
  {
    question: "What's included in the free version?",
    answer: "The free version includes: Direct-to-dispatch emergency alerts, Lockdown, fire, medical, and admin workflows, Campus status visibility, Admin dashboard, Drill support (manual setup), and Unlimited users, alerts, and campuses. There are no usage caps."
  },
  {
    question: "Can we upgrade later if we want more features?",
    answer: "Yes. Upgrading is completely optional. Schools can add advanced tools like floor-plan mapping, mass notifications, SOP management, ticketing, camera integrations, and more through QuickSecure's broader platform, but the free panic button works independently and forever."
  }
];

function FAQAccordion({ question, answer, isOpen, onToggle }: FAQItem & { isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={onToggle}
        className="w-full text-left py-8 flex items-center justify-between gap-4 group hover:opacity-80 transition-opacity"
      >
        <span className="font-['Satoshi:Medium',sans-serif] text-[16px] sm:text-[18px] text-gray-900">
          {question}
        </span>
        <div
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-200"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 9L12 15L18 9" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen ? '500px' : '0',
          opacity: isOpen ? 1 : 0
        }}
      >
        <div className="pb-8 pr-8 font-['Satoshi:Medium',sans-serif] text-[14px] sm:text-[15px] text-gray-500 leading-[26px]">
          {answer}
        </div>
      </div>
    </div>
  );
}

function PartnerNoteCard({ school }: { school: SchoolEntry }) {
  const note = school.partnerNote
    ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  const name = school.partnerName ?? "Partner Representative";
  const title = school.partnerTitle ?? school.name;

  return (
    <div>
      {school.partnerPhotoSrc && (
        <div className="w-[80px] h-[80px] rounded-full overflow-hidden mb-6 grayscale">
          <img
            src={school.partnerPhotoSrc}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="font-['Satoshi:Medium',sans-serif] text-[15px] sm:text-[16px] text-gray-600 leading-[28px] space-y-5">
        {note.split("\n\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
        <p className="text-[14px] sm:text-[15px] italic text-gray-400 pt-6">
          — {name}<br />
          {title}
        </p>
      </div>
    </div>
  );
}

function FounderNoteCard() {
  return (
    <div>
      <div className="font-['Satoshi:Medium',sans-serif] text-[15px] sm:text-[16px] text-gray-600 leading-[28px] space-y-5">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p className="text-[14px] sm:text-[15px] italic text-gray-400 pt-6">
          — William Susskind<br />
          CTO, QuickSecure
        </p>
      </div>
    </div>
  );
}

export default function MoreInfoPage({ onBack, onSignUp }: { onBack: () => void; onSignUp: () => void }) {
  const siteConfig = useSiteConfig();
  const school = useSchool();
  const isAssociation = school?.type === "association";
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-white min-h-screen w-full px-4 py-12 sm:py-16">
      <div className="max-w-[700px] mx-auto">

        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-16 sm:mb-20 text-gray-400 hover:text-gray-900 transition-colors group"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-['Satoshi:Medium',sans-serif] text-[14px]">Back to Home</span>
        </button>
      </div>

      {/* Mission Section */}
      <div className={`mx-auto ${isAssociation ? 'max-w-[950px]' : 'max-w-[700px]'} mb-24 sm:mb-32 px-4`}>
        <h1 className="font-['Satoshi:Medium',sans-serif] text-[32px] sm:text-[44px] text-gray-900 mb-10 sm:mb-12 leading-[1.2]">
          Our Mission
        </h1>

        {isAssociation && school ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            <PartnerNoteCard school={school} />
            <FounderNoteCard />
          </div>
        ) : (
          <FounderNoteCard />
        )}
      </div>

      <div className="max-w-[700px] mx-auto px-4">
        {/* FAQ Section */}
        <div className="mb-20">
          <h2 className="font-['Satoshi:Medium',sans-serif] text-[24px] sm:text-[28px] text-gray-900 mb-10">
            Frequently Asked Questions
          </h2>
          <div className="border-t border-gray-100">
            {faqs.map((faq, index) => (
              <FAQAccordion key={index} question={faq.question} answer={faq.answer} isOpen={openIndex === index} onToggle={() => setOpenIndex(openIndex === index ? null : index)} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="pt-16 border-t border-gray-100">
          <div className="bg-brand/5 p-10 sm:p-12 rounded-[20px] border border-brand/20 text-center">
            <h3 className="font-['Satoshi:Medium',sans-serif] text-[22px] sm:text-[26px] text-gray-900 mb-3">
              Ready to get started?
            </h3>
            <p className="font-['Satoshi:Medium',sans-serif] text-[14px] sm:text-[15px] text-gray-500 mb-8">
              {siteConfig.moreInfo.ctaSubtext}
            </p>
            <button
              onClick={onSignUp}
              className="bg-brand text-brand-text font-['Satoshi:Medium',sans-serif] text-[15px] px-10 py-4 rounded-[12278342px] hover:bg-brand-hover transition-all hover:scale-105"
            >
              {siteConfig.moreInfo.ctaButton}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
