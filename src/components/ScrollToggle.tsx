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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-3">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
        style={{
          background: "rgba(255, 255, 255, 0.22)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1.5px solid rgba(178, 32, 48, 0.35)",
          color: "#B22030",
          boxShadow: "0 4px 18px rgba(0, 0, 0, 0.04)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#B22030";
          e.currentTarget.style.borderColor = "#B22030";
          e.currentTarget.style.color = "#FFFFFF";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(178, 32, 48, 0.25)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.22)";
          e.currentTarget.style.borderColor = "rgba(178, 32, 48, 0.35)";
          e.currentTarget.style.color = "#B22030";
          e.currentTarget.style.boxShadow = "0 4px 18px rgba(0, 0, 0, 0.04)";
        }}
        aria-label="Scroll to Top"
        title="Scroll to Top"
      >
        <svg
          className="w-5 h-5"
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
        className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
        style={{
          background: "rgba(255, 255, 255, 0.22)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1.5px solid rgba(178, 32, 48, 0.35)",
          color: "#B22030",
          boxShadow: "0 4px 18px rgba(0, 0, 0, 0.04)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#B22030";
          e.currentTarget.style.borderColor = "#B22030";
          e.currentTarget.style.color = "#FFFFFF";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(178, 32, 48, 0.25)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.22)";
          e.currentTarget.style.borderColor = "rgba(178, 32, 48, 0.35)";
          e.currentTarget.style.color = "#B22030";
          e.currentTarget.style.boxShadow = "0 4px 18px rgba(0, 0, 0, 0.04)";
        }}
        aria-label="Scroll to Bottom"
        title="Scroll to Bottom"
      >
        <svg
          className="w-5 h-5 rotate-180"
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
