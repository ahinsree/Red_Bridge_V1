"use client";

export default function ScrollToggle() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-2">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="w-10 h-10 rounded-full bg-[#1B263B] text-[#EDEAE2] flex items-center justify-center shadow-lg border border-white/10 hover:bg-[#B22030] hover:text-white transition-all duration-300 hover:scale-110 cursor-pointer"
        aria-label="Scroll to Top"
        title="Scroll to Top"
      >
        <svg
          className="w-4.5 h-4.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="19" x2="12" y2="5"></line>
          <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
      </button>

      {/* Scroll to Bottom Button */}
      <button
        onClick={scrollToBottom}
        className="w-10 h-10 rounded-full bg-[#1B263B] text-[#EDEAE2] flex items-center justify-center shadow-lg border border-white/10 hover:bg-[#B22030] hover:text-white transition-all duration-300 hover:scale-110 cursor-pointer"
        aria-label="Scroll to Bottom"
        title="Scroll to Bottom"
      >
        <svg
          className="w-4.5 h-4.5 rotate-180"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="19" x2="12" y2="5"></line>
          <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
      </button>
    </div>
  );
}
