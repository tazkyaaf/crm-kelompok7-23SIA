import { useState } from "react";
import { 
  FaQuestionCircle, 
  FaClock, 
  FaMapMarkerAlt, 
  FaCreditCard,
  FaWhatsapp,
  FaPhoneAlt 
} from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";


export default function FAQSection() {
  const faqCategories = [
    {
      icon: FaQuestionCircle,
      title: "Umum",
      iconBg: "#3b82f6", // Blue
      faqs: [
        {
          question: "Berapa lama proses pencucian?",
          answer: "Untuk layanan regular, pakaian akan selesai dalam 2-3 hari kerja. Untuk layanan express, pakaian selesai dalam 24 jam.",
        },
        {
          question: "Apakah pakaian saya aman?",
          answer: "Ya, kami memberikan garansi keamanan 100%. Setiap pakaian diberi label dan dicatat dengan sistem tracking yang detail.",
        },
        {
          question: "Bagaimana jika pakaian rusak atau hilang?",
          answer: "Kami memberikan kompensasi sesuai dengan nilai pakaian. Setiap item diasuransikan dan kami bertanggung jawab penuh atas kerusakan yang terjadi karena kelalaian kami.",
        },
      ],
    },
    {
      icon: FaMapMarkerAlt,
      title: "Pickup & Delivery",
      iconBg: "#10b981", // Green
      faqs: [
        {
          question: "Daerah mana saja yang dilayani pickup?",
          answer: "Kami melayani Daerah riau dan sekitarnya. Untuk area di luar Bandung, akan dikenakan biaya tambahan sesuai jarak.",
        },
        {
          question: "Apakah ada biaya pickup dan delivery?",
          answer: "Untuk member Regular dan Loyal, pickup dan delivery gratis. Untuk non-member, dikenakan biaya Rp.5.000 untuk sekali antar-jemput.",
        },
        {
          question: "Bagaimana cara menjadwalkan pickup?",
          answer: "Anda bisa menjadwalkan pickup melalui WhatsApp, atau telepon. Tim kami akan datang sesuai jadwal yang disepakati.",
        },
      ],
    },
    {
      icon: FaCreditCard,
      title: "Pembayaran",
      iconBg: "#8b5cf6", // Purple
      faqs: [
        {
          question: "Metode pembayaran apa saja yang tersedia?",
          answer: "Kami menerima cash, transfer bank, e-wallet (OVO, GoPay, DANA), dan kartu kredit/debit.",
        },
        {
          question: "Kapan pembayaran dilakukan?",
          answer: "Pembayaran dapat dilakukan saat pickup atau saat delivery. Untuk member bulanan, pembayaran dilakukan di awal bulan.",
        },
        {
          question: "Apakah ada diskon untuk pelanggan baru?",
          answer: "Ya! Pelanggan baru mendapat diskon 20% untuk 3 transaksi pertama. Syarat dan ketentuan berlaku.",
        },
      ],
    },
    {
      icon: FaClock,
      title: "Jam Operasional",
      iconBg: "#f59e0b", // Orange
      faqs: [
        {
          question: "Jam berapa saja layanan pickup tersedia?",
          answer: "Pickup tersedia setiap hari dari jam 07:00 - 20:00. Untuk pickup di luar jam tersebut, silakan hubungi customer service.",
        },
        {
          question: "Apakah buka di hari libur?",
          answer: "Ya, kami buka setiap hari termasuk weekend dan hari libur. Namun untuk hari besar tertentu, layanan mungkin terbatas.",
        },
        {
          question: "Berapa lama customer service online?",
          answer: "Customer service kami online 24/7 melalui WhatsApp dan chat online. Untuk telepon, tersedia dari jam 08:00 - 22:00.",
        },
      ],
    },
  ];

  return (
    <section style={{ padding: "5rem 0", backgroundColor: "white" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "48rem", margin: "0 auto 4rem" }}>
          <div style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            padding: "0.5rem 1rem", 
            backgroundColor: "#e1f0ff", 
            borderRadius: "9999px", 
            color: "#3b82f6", 
            fontSize: "0.875rem", 
            fontWeight: "500", 
            marginBottom: "1.5rem" 
          }}>
            <FaQuestionCircle style={{ 
              width: "1rem", 
              height: "1rem", 
              marginRight: "0.5rem",
              color: "#3b82f6" 
            }} />
            FAQ
          </div>

          <h2 style={{ 
            fontSize: "2.25rem", 
            fontWeight: "bold", 
            color: "#1a202c", 
            marginBottom: "1.5rem",
            lineHeight: "1.2"
          }}>
            Pertanyaan yang
            <span style={{ display: "block", color: "#3b82f6" }}>Sering Ditanyakan</span>
          </h2>
        </div>

        {/* FAQ Categories - 2 cards per row */}
        <div style={{ 
           display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "2rem", 
          maxWidth: "72rem", 
          margin: "0 auto" 
        }}>
          {faqCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <div key={categoryIndex} style={{ 
                border: "none", 
                borderRadius: "0.5rem", 
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", 
                backgroundColor: "white",
                overflow: "hidden",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                ':hover': {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                }
              }}>
                <div style={{ padding: "2rem" }}>
                  {/* Category Header with colorful icon */}
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                    <div style={{ 
                      width: "3rem", 
                      height: "3rem", 
                      backgroundColor: category.iconBg, 
                      borderRadius: "0.75rem", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      color: "white",
                      boxShadow: `0 4px 6px -1px ${category.iconBg}33`
                    }}>
                      <IconComponent style={{ 
                        width: "1.5rem", 
                        height: "1.5rem", 
                      }} />
                    </div>
                    <h3 style={{ 
                      fontSize: "1.25rem", 
                      fontWeight: "bold", 
                      color: "#1a202c" 
                    }}>
                      {category.title}
                    </h3>
                  </div>

                  {/* FAQ Items */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {category.faqs.map((faq, faqIndex) => {
                      const [isOpen, setIsOpen] = useState(false);
                      return (
                        <div key={faqIndex} style={{
                          border: "1px solid #e2e8f0",
                          borderRadius: "0.5rem",
                          padding: "1rem",
                          transition: "all 0.2s ease",
                          ':hover': {
                            borderColor: category.iconBg
                          }
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
                              padding: 0
                            }}
                          >
                            <span style={{ flex: 1 }}>{faq.question}</span>
                            <FiChevronDown style={{ 
                              transition: "transform 0.2s ease",
                              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                              color: category.iconBg,
                              flexShrink: 0,
                              marginLeft: "0.5rem"
                            }} />
                          </button>
                          
                          {isOpen && (
                            <div style={{
                              marginTop: "0.75rem",
                              color: "#4a5568",
                              lineHeight: "1.6",
                              paddingLeft: "0.5rem",
                              borderLeft: `2px solid ${category.iconBg}`
                            }}>
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

       {/* Contact CTA with icons */}
<div style={{ textAlign: "center", marginTop: "4rem" }}>
  <div style={{ 
    background: "linear-gradient(to right, #3b82f6, #10b981)",
    borderRadius: "1rem",
    padding: "2rem",
    color: "white",
    maxWidth: "42rem",
    margin: "0 auto",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
  }}>
    <h3 style={{ 
      fontSize: "1.5rem", 
      fontWeight: "bold", 
      marginBottom: "1rem" 
    }}>
      Masih Ada Pertanyaan Lain?
    </h3>
    <p style={{ 
      marginBottom: "1.5rem", 
      opacity: "0.9" 
    }}>
      Tim customer service kami siap membantu Anda 24/7.
    </p>
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      gap: "1rem", 
      justifyContent: "center",
      '@media (min-width: 640px)': {
        flexDirection: "row"
      }
    }}>
      <button 
        onClick={() => window.open('https://wa.me/6281234567890', '_blank')}
        style={{ 
          backgroundColor: "white", 
          color: "#3b82f6", 
          fontWeight: "600", 
          padding: "0.75rem 2rem", 
          borderRadius: "0.5rem", 
          border: "none",
          cursor: "pointer",
          transition: "all 0.2s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          ':hover': {
            backgroundColor: "#f9fafb",
            transform: "translateY(-2px)"
          }
        }}
      >
        <FaWhatsapp style={{ fontSize: "1.25rem" }} />
        Chat WhatsApp
      </button>
      <button 
        onClick={() => window.location.href = 'tel:+6281234567890'}
        style={{ 
          border: "2px solid white", 
          color: "white", 
          fontWeight: "600", 
          padding: "0.75rem 2rem", 
          borderRadius: "0.5rem", 
          backgroundColor: "transparent",
          cursor: "pointer",
          transition: "all 0.2s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          ':hover': {
            backgroundColor: "white",
            color: "#3b82f6",
            transform: "translateY(-2px)"
          }
        }}
      >
        <FaPhoneAlt style={{ fontSize: "1.1rem" }} />
        Telepon Kami
      </button>
    </div>
  </div>
</div>

      </div>
    </section>
  );
}