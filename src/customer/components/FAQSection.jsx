import {
  FaQuestionCircle,
  FaClock,
  FaMapMarkerAlt,
  FaCreditCard,
} from "react-icons/fa";
import FAQItem from "./FAQItem";

export default function FAQSection() {
  const faqCategories = [
    {
      icon: FaQuestionCircle,
      title: "Umum",
      iconBg: "#3b82f6",
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
          answer: "Kami memberikan kompensasi sesuai nilai pakaian. Setiap item diasuransikan dan kami bertanggung jawab penuh atas kerusakan yang terjadi karena kelalaian kami.",
        },
      ],
    },
    {
      icon: FaMapMarkerAlt,
      title: "Pickup & Delivery",
      iconBg: "#3b82f6",
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
      iconBg: "#3b82f6",
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
      iconBg: "#3b82f6",
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
            marginBottom: "1.5rem",
          }}>
            <FaQuestionCircle style={{
              width: "1rem",
              height: "1rem",
              marginRight: "0.5rem",
              color: "#3b82f6",
            }} />
            FAQ
          </div>

          <h2 style={{
            fontSize: "2.25rem",
            fontWeight: "bold",
            color: "#1a202c",
            marginBottom: "1.5rem",
            lineHeight: "1.2",
          }}>
            Pertanyaan yang
            <span style={{ display: "block", color: "#3b82f6" }}>Sering Ditanyakan</span>
          </h2>
        </div>

        {/* FAQ Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "2rem",
          maxWidth: "72rem",
          margin: "0 auto",
        }}>
          {faqCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div key={index} style={{
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                backgroundColor: "white",
                overflow: "hidden",
              }}>
                <div style={{ padding: "2rem" }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "1.5rem",
                  }}>
                    <div style={{
                      width: "3rem",
                      height: "3rem",
                      backgroundColor: category.iconBg,
                      borderRadius: "0.75rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      boxShadow: `0 4px 6px -1px ${category.iconBg}33`,
                    }}>
                      <IconComponent style={{ width: "1.5rem", height: "1.5rem" }} />
                    </div>
                    <h3 style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      color: "#1a202c",
                    }}>{category.title}</h3>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {category.faqs.map((faq, i) => (
                      <FAQItem key={i} faq={faq} iconColor={category.iconBg} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}