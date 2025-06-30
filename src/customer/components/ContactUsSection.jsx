import React, { useState } from "react";
import { User, Mail, Phone, MessageSquare, ChevronDown, Send } from "react-feather";

const ContactUsSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
    localStorage.setItem('contactFormData', JSON.stringify(formData));
    setIsSubmitted(true);
    
    setTimeout(() => {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section style={{ padding: "5rem 0", backgroundColor: "white" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "42rem", margin: "0 auto 4rem" }}>
          <h2 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#1a202c", marginBottom: "1rem" }}>
            Contact Us
          </h2>
          <p style={{ fontSize: "1.125rem", color: "#718096" }}>
            Get in touch with us for any questions about our laundry services
          </p>
        </div>

        {/* Contact Form */}
        <div style={{ maxWidth: "42rem", margin: "0 auto" }}>
          <div style={{ 
            border: "none", 
            borderRadius: "0.5rem", 
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            backgroundColor: "white"
          }}>
            <div style={{ padding: "2rem" }}>
              {isSubmitted && (
                <div style={{
                  padding: "1rem",
                  backgroundColor: "#d1fae5",
                  color: "#065f46",
                  borderRadius: "0.375rem",
                  marginBottom: "1.5rem",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem"
                }}>
                  <Send size={18} />
                  <span>Pesan Anda telah terkirim! Terima kasih.</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1.5rem" }}>
                {/* Name and Email Row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                  <div style={{ position: "relative" }}>
                    <User 
                      size={20} 
                      style={{
                        position: "absolute",
                        left: "1rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#a0aec0"
                      }} 
                    />
                    <input
                      name="fullName"
                      placeholder="Full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      style={{
                        paddingLeft: "3rem",
                        height: "3rem",
                        width: "100%",
                        border: "1px solid #e2e8f0",
                        borderRadius: "0.375rem",
                        fontSize: "1rem",
                        outline: "none",
                        transition: "all 0.2s ease",
                        ':focus': {
                          borderColor: "#3b82f6",
                          boxShadow: "0 0 0 1px #3b82f6"
                        }
                      }}
                    />
                  </div>
                  <div style={{ position: "relative" }}>
                    <Mail 
                      size={20} 
                      style={{
                        position: "absolute",
                        left: "1rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#a0aec0"
                      }} 
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      style={{
                        paddingLeft: "3rem",
                        height: "3rem",
                        width: "100%",
                        border: "1px solid #e2e8f0",
                        borderRadius: "0.375rem",
                        fontSize: "1rem",
                        outline: "none",
                        transition: "all 0.2s ease",
                        ':focus': {
                          borderColor: "#3b82f6",
                          boxShadow: "0 0 0 1px #3b82f6"
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Phone and Subject Row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                  <div style={{ position: "relative" }}>
                    <Phone 
                      size={20} 
                      style={{
                        position: "absolute",
                        left: "1rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#a0aec0"
                      }} 
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      style={{
                        paddingLeft: "3rem",
                        height: "3rem",
                        width: "100%",
                        border: "1px solid #e2e8f0",
                        borderRadius: "0.375rem",
                        fontSize: "1rem",
                        outline: "none",
                        transition: "all 0.2s ease",
                        ':focus': {
                          borderColor: "#3b82f6",
                          boxShadow: "0 0 0 1px #3b82f6"
                        }
                      }}
                    />
                  </div>
                  <div style={{ position: "relative" }}>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      style={{
                        paddingLeft: "3rem",
                        height: "3rem",
                        width: "100%",
                        border: "1px solid #e2e8f0",
                        borderRadius: "0.375rem",
                        fontSize: "1rem",
                        outline: "none",
                        transition: "all 0.2s ease",
                        appearance: "none",
                        backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                        backgroundSize: "1em",
                        ':focus': {
                          borderColor: "#3b82f6",
                          boxShadow: "0 0 0 1px #3b82f6"
                        }
                      }}
                    >
                      <option value="" disabled>Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="pickup">Pickup & Delivery</option>
                      <option value="membership">Membership</option>
                      <option value="complaint">Complaint</option>
                      <option value="other">Other</option>
                    </select>
                    <MessageSquare 
                      size={20} 
                      style={{
                        position: "absolute",
                        left: "1rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#a0aec0",
                        pointerEvents: "none"
                      }} 
                    />
                  </div>
                </div>

               {/* Message */}
<div style={{ position: "relative" }}>
  <MessageSquare 
    size={20} 
    style={{
      position: "absolute",
      left: "1rem",
      top: "1rem",
      color: "#a0aec0"
    }} 
  />
  <textarea
    name="message"
    placeholder="Masukkan Pesan"
    value={formData.message}
    onChange={handleInputChange}
    required
    style={{
      paddingLeft: "3rem",
      minHeight: "8rem",
      width: "100%",
      border: "1px solid #e2e8f0",
      borderRadius: "0.375rem",
      fontSize: "1rem",
      resize: "none",
      padding: "1rem",
      outline: "none",
      transition: "all 0.2s ease",
      textIndent: "30px", // Tambahkan ini untuk menggeser teks placeholder
      ':focus': {
        borderColor: "#3b82f6",
        boxShadow: "0 0 0 1px #3b82f6"
      }
    }}
  />
</div>

                {/* Submit Button */}
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    height: "3rem",
                    backgroundColor: "#3b82f6",
                    color: "white",
                    fontWeight: "600",
                    borderRadius: "0.5rem",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    ':hover': {
                      backgroundColor: "#2563eb"
                    }
                  }}
                >
                  <Send size={18} />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;