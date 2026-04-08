import { useState } from "react";
import { motion } from "motion/react";
import { useSiteConfig, useSchool } from "@/config/SiteConfigContext";

interface WaitlistPageProps {
  onBack: () => void;
  initialEmail?: string;
  onSubmitSuccess?: () => void;
}

export default function WaitlistPage({ onBack, initialEmail = "", onSubmitSuccess }: WaitlistPageProps) {
  const siteConfig = useSiteConfig();
  const school = useSchool();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: initialEmail,
    phone: "",
    school: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    school: "",
  });
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    school: false,
  });

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
      case 'school':
        if (!value.trim()) {
          return 'This field is required.';
        }
        return '';

      case 'email':
        if (!value.trim()) {
          return 'This field is required.';
        }
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return 'Must be valid email. example@yourdomain.com';
        }
        return '';

      case 'phone':
        if (!value.trim()) {
          return 'This field is required.';
        }
        const digitsOnly = value.replace(/\D/g, '');
        if (digitsOnly.length !== 10) {
          return 'Must be a phone number. 503-555-1212';
        }
        return '';

      default:
        return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submission
    const newErrors = {
      firstName: validateField('firstName', formData.firstName),
      lastName: validateField('lastName', formData.lastName),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
      school: validateField('school', formData.school),
    };

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (hasErrors) {
      setErrors(newErrors);
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        school: true,
      });
      return;
    }

    // Validate phone number
    const digitsOnly = formData.phone.replace(/\D/g, '');
    if (digitsOnly.length !== 10) {
      setErrors({
        ...errors,
        phone: `Phone number must be exactly 10 digits. You entered ${digitsOnly.length} digits.`,
      });
      setTouched({ ...touched, phone: true });
      return;
    }

    // Check for letters
    if (/[a-zA-Z]/.test(formData.phone)) {
      setErrors({
        ...errors,
        phone: "Phone number cannot contain letters.",
      });
      setTouched({ ...touched, phone: true });
      return;
    }

    setIsSubmitting(true);

    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      if (apiUrl) {
        const res = await fetch(`${apiUrl}/waitlist`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, schoolSlug: school?.slug ?? null }),
        });
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      }
      setIsSubmitted(true);
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (err) {
      console.error("Waitlist submission failed:", err);
      setErrors((prev) => ({
        ...prev,
        email: "Something went wrong. Please try again.",
      }));
      setTouched((prev) => ({ ...prev, email: true }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!feedback.trim()) return;

    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      if (apiUrl) {
        const res = await fetch(`${apiUrl}/feedback`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ feedback, email: formData.email }),
        });
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      }
      setIsFeedbackSubmitted(true);
      setTimeout(() => {
        setIsFeedbackSubmitted(false);
        setFeedback("");
      }, 3000);
    } catch (err) {
      console.error("Feedback submission failed:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear phone error when user types
    if (e.target.name === "phone") {
      setErrors({
        ...errors,
        phone: "",
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });

    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  if (isSubmitted) {
    return (
      <div className="bg-white min-h-screen w-full flex items-center justify-center px-6 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 md:py-20">
        <div className="max-w-[800px] w-full">
          {/* Header Section - Left Aligned */}
          <motion.div
            className="mb-[56px] sm:mb-[64px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h1
              className="font-['Satoshi:Medium',sans-serif] text-[40px] sm:text-[48px] md:text-[56px] text-gray-900 mb-[16px] leading-[1.2]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              Welcome, {formData.firstName}, to School Safety Reimagined
            </motion.h1>
            <motion.p
              className="font-['Satoshi:Medium',sans-serif] text-[16px] sm:text-[18px] md:text-[20px] text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              Where panic buttons are a basic necessity.
            </motion.p>
          </motion.div>

          {/* Feedback Section */}
          <motion.div
            className="mb-[32px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <label htmlFor="feedback" className="block font-['Satoshi:Medium',sans-serif] text-[16px] sm:text-[18px] text-gray-900 mb-[16px]">
              Any thoughts, questions, or feedback?
            </label>
            <motion.textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              disabled={isFeedbackSubmitted}
              className="w-full bg-gray-100 border border-gray-200 rounded-[12px] px-[20px] py-[16px] font-['Satoshi:Medium',sans-serif] text-[15px] sm:text-[16px] text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-300 focus:bg-gray-50 focus:border-brand/50 resize-none h-[140px] sm:h-[160px] disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="We'd love to hear from you..."
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              aria-label="Feedback textarea"
            />
            {isFeedbackSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 flex items-center gap-2 text-[#00c950] font-['Satoshi:Medium',sans-serif] text-[14px]"
              >
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M6 10L9 13L14 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Thank you for your feedback!
              </motion.div>
            ) : (
              <motion.button
                onClick={handleFeedbackSubmit}
                disabled={!feedback.trim()}
                className="mt-3 w-full bg-brand font-['Satoshi:Medium',sans-serif] px-[32px] py-[12px] rounded-[10px] text-brand-text text-[16px] transition-all duration-300 hover:bg-brand-hover hover:shadow-[0_0_20px_rgba(var(--brand-r),var(--brand-g),var(--brand-b),0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                whileHover={{ scale: feedback.trim() ? 1.02 : 1 }}
                whileTap={{ scale: feedback.trim() ? 0.98 : 1 }}
                aria-label="Submit feedback"
              >
                Submit Feedback
              </motion.button>
            )}
          </motion.div>

          {/* Divider */}
          <motion.div
            className="flex items-center gap-4 my-[40px] sm:my-[48px]"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          >
            <div className="flex-1 h-[1px] bg-gray-200"></div>
            <motion.span
              className="font-['Satoshi:Medium',sans-serif] text-[12px] sm:text-[13px] text-gray-400 uppercase tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              or
            </motion.span>
            <div className="flex-1 h-[1px] bg-gray-200"></div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
          >
            <p className="font-['Satoshi:Medium',sans-serif] text-[15px] sm:text-[16px] text-gray-500">
              Contact us at{' '}
              <motion.a
                href="mailto:contact.us@quicksecure.us"
                className="text-brand hover:text-brand-hover transition-colors underline decoration-brand/40 underline-offset-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                contact.us@quicksecure.us
              </motion.a>
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen w-full flex items-center justify-center px-4 py-8">
      <div className="max-w-[500px] w-full">
        {/* Back button */}
        <button
          onClick={onBack}
          aria-label="Go back to home page"
          className="flex items-center gap-[8px] text-gray-400 hover:text-gray-900 transition-colors mb-[24px] font-['Satoshi:Medium',sans-serif] text-[14px]"
        >
          <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>

        {/* Header */}
        <div className="mb-[32px]">
          <div className="bg-brand/10 inline-flex items-center justify-center px-[16px] py-[8px] rounded-[12278342px] mb-[16px]">
            <div className="font-['Satoshi:Medium',sans-serif] text-brand text-[12px]">
              {siteConfig.form.badge}
            </div>
          </div>
          <h1 className="font-['Satoshi:Medium',sans-serif] text-[32px] sm:text-[36px] text-gray-900 mb-[12px]">
            {siteConfig.form.heading}
          </h1>
          <p className="font-['Satoshi:Medium',sans-serif] text-[14px] text-gray-500">
            {siteConfig.form.subtext}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-[14px]">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block font-['Satoshi:Medium',sans-serif] text-[13px] text-gray-600 mb-[6px]">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`w-full bg-gray-100 border rounded-[10px] px-[16px] py-[10px] font-['Satoshi:Medium',sans-serif] text-[15px] text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-300 focus:bg-gray-50 ${
                touched.firstName && errors.firstName
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-200 focus:border-brand/50'
              }`}
              placeholder="Jane"
            />
            {touched.firstName && errors.firstName && (
              <div className="flex items-start gap-1 mt-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="#ef4444" strokeWidth="1.5" fill="none"/>
                  <path d="M8 4V8.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="8" cy="11" r="0.75" fill="#ef4444"/>
                </svg>
                <p className="text-red-500 text-[13px] font-['Satoshi:Medium',sans-serif]">{errors.firstName}</p>
              </div>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block font-['Satoshi:Medium',sans-serif] text-[13px] text-gray-600 mb-[6px]">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`w-full bg-gray-100 border rounded-[10px] px-[16px] py-[10px] font-['Satoshi:Medium',sans-serif] text-[15px] text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-300 focus:bg-gray-50 ${
                touched.lastName && errors.lastName
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-200 focus:border-brand/50'
              }`}
              placeholder="Smith"
            />
            {touched.lastName && errors.lastName && (
              <div className="flex items-start gap-1 mt-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="#ef4444" strokeWidth="1.5" fill="none"/>
                  <path d="M8 4V8.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="8" cy="11" r="0.75" fill="#ef4444"/>
                </svg>
                <p className="text-red-500 text-[13px] font-['Satoshi:Medium',sans-serif]">{errors.lastName}</p>
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-['Satoshi:Medium',sans-serif] text-[13px] text-gray-600 mb-[6px]">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`w-full bg-gray-100 border rounded-[10px] px-[16px] py-[10px] font-['Satoshi:Medium',sans-serif] text-[15px] text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-300 focus:bg-gray-50 ${
                touched.email && errors.email
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-200 focus:border-brand/50'
              }`}
              placeholder="jane@example.com"
            />
            {touched.email && errors.email && (
              <div className="flex items-start gap-1 mt-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="#ef4444" strokeWidth="1.5" fill="none"/>
                  <path d="M8 4V8.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="8" cy="11" r="0.75" fill="#ef4444"/>
                </svg>
                <p className="text-red-500 text-[13px] font-['Satoshi:Medium',sans-serif]">{errors.email}</p>
              </div>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block font-['Satoshi:Medium',sans-serif] text-[13px] text-gray-600 mb-[6px]">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`w-full bg-gray-100 border rounded-[10px] px-[16px] py-[10px] font-['Satoshi:Medium',sans-serif] text-[15px] text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-300 focus:bg-gray-50 ${
                touched.phone && errors.phone
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-200 focus:border-brand/50'
              }`}
              placeholder="(555) 123-4567"
            />
            {touched.phone && errors.phone && (
              <div className="flex items-start gap-1 mt-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="#ef4444" strokeWidth="1.5" fill="none"/>
                  <path d="M8 4V8.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="8" cy="11" r="0.75" fill="#ef4444"/>
                </svg>
                <p className="text-red-500 text-[13px] font-['Satoshi:Medium',sans-serif]">{errors.phone}</p>
              </div>
            )}
          </div>

          {/* School */}
          <div>
            <label htmlFor="school" className="block font-['Satoshi:Medium',sans-serif] text-[13px] text-gray-600 mb-[6px]">
              School
            </label>
            <input
              type="text"
              id="school"
              name="school"
              value={formData.school}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`w-full bg-gray-100 border rounded-[10px] px-[16px] py-[10px] font-['Satoshi:Medium',sans-serif] text-[15px] text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-300 focus:bg-gray-50 ${
                touched.school && errors.school
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-200 focus:border-brand/50'
              }`}
              placeholder="Lincoln High School"
            />
            {touched.school && errors.school && (
              <div className="flex items-start gap-1 mt-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="#ef4444" strokeWidth="1.5" fill="none"/>
                  <path d="M8 4V8.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="8" cy="11" r="0.75" fill="#ef4444"/>
                </svg>
                <p className="text-red-500 text-[13px] font-['Satoshi:Medium',sans-serif]">{errors.school}</p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand font-['Satoshi:Medium',sans-serif] px-[32px] py-[12px] rounded-[10px] text-brand-text text-[16px] transition-all duration-300 hover:bg-brand-hover hover:shadow-[0_0_20px_rgba(var(--brand-r),var(--brand-g),var(--brand-b),0.3)] hover:scale-[1.02] mt-[8px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
            aria-label="Submit request access form"
          >
            {isSubmitting ? siteConfig.form.submittingButton : siteConfig.form.submitButton}
          </button>
        </form>
      </div>
    </div>
  );
}
