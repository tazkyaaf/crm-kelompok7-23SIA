import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function FAQItem({ faq, iconColor }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{
      border: "1px solid #e2e8f0",
      borderRadius: "0.5rem",
      padding: "1rem",
      transition: "all 0.2s ease",
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          fontWeight: "600",
          color: "#1a202c",
          textAlign: "left",
          padding: 0,
        }}
      >
        <span style={{ flex: 1 }}>{faq.question}</span>
        <FiChevronDown
          style={{
            transition: "transform 0.2s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            color: iconColor,
            flexShrink: 0,
            marginLeft: "0.5rem",
          }}
        />
      </button>

      {isOpen && (
        <div style={{
          marginTop: "0.75rem",
          color: "#4a5568",
          lineHeight: "1.6",
          paddingLeft: "0.5rem",
          borderLeft: `2px solid ${iconColor}`,
        }}>
          {faq.answer}
        </div>
      )}
    </div>
  );
}