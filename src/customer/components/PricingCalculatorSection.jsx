import { useState } from "react";
import { FaCalculator, FaTshirt, FaInfoCircle } from "react-icons/fa";
import { IoShirtOutline } from "react-icons/io5";
// import { GiLaundryMachine } from "react-icons/gi";

export default function PricingCalculatorSection() {
  const [weight, setWeight] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const serviceTypes = [
    { value: "express", label: "Express", price: 12000 },
    { value: "regular", label: "Regular", price: 7000 },
    { value: "cuci-lipat", label: "Cuci Lipat", price: 5000 },
    { value: "setrika", label: "Setrika Saja", price: 4000 },
  ];


  const calculatePrice = () => {
    const selectedService = serviceTypes.find((s) => s.value === serviceType);
    if (selectedService && weight) {
      const total = selectedService.price * parseFloat(weight);
      setTotalPrice(total);
    }
  };

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
            <FaCalculator style={{ 
              width: "1rem", 
              height: "1rem", 
              marginRight: "0.5rem",
              color: "#3b82f6" 
            }} />
            Kalkulator Harga
          </div>


          <h2 style={{ 
            fontSize: "2.25rem", 
            fontWeight: "bold", 
            color: "#1a202c", 
            marginBottom: "1.5rem",
            lineHeight: "1.2"
          }}>
            Hitung Estimasi
            <span style={{ display: "block", color: "#3b82f6" }}>Biaya Laundry</span>
          </h2>

          <p style={{ 
            fontSize: "1.125rem",
            color: "#718096",
            lineHeight: "1.75"
          }}>
            Gunakan kalkulator ini untuk mengetahui perkiraan biaya laundry
            sesuai dengan jenis layanan dan berat pakaian Anda.
          </p>
        </div>

        {/* Calculator */}
        <div style={{ maxWidth: "42rem", margin: "0 auto" }}>
          <div style={{ 
            border: "none", 
            borderRadius: "0.5rem", 
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)", 
            backgroundColor: "white",
            overflow: "hidden"
          }}>
            <div style={{ 
              padding: "2rem", 
              textAlign: "center", 
              borderBottom: "1px solid #e2e8f0"
            }}>
              <h3 style={{ 
                fontSize: "1.5rem", 
                fontWeight: "bold", 
                color: "#1a202c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem"
              }}>
                <IoShirtOutline style={{ 
                  width: "1.5rem", 
                  height: "1.5rem", 
                  color: "#3b82f6" 
                }} />
                Kalkulator Harga Laundry
              </h3>
            </div>
            <div style={{ padding: "2rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {/* Service Type */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label style={{ 
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#1a202c"
                  }}>
                    Jenis Layanan
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    style={{ 
                      height: "3rem",
                      padding: "0 1rem",
                      border: "1px solid #e2e8f0",
                      borderRadius: "0.375rem",
                      outline: "none",
                      fontSize: "0.875rem",
                      color: "#1a202c",
                      backgroundColor: "white",
                      cursor: "pointer"
                    }}
                  >
                    <option value="">Pilih jenis layanan</option>
                    {serviceTypes.map((service) => (
                      <option key={service.value} value={service.value}>
                        {service.label} - Rp.{service.price.toLocaleString()}/Kg
                      </option>
                    ))}
                  </select>
                </div>

                {/* Weight */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label style={{ 
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#1a202c"
                  }}>
                    Berat Pakaian (Kg)
                  </label>
                  <input
                    type="number"
                    placeholder="Masukkan berat dalam kilogram"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    style={{ 
                      height: "3rem",
                      padding: "0 1rem",
                      border: "1px solid #e2e8f0",
                      borderRadius: "0.375rem",
                      outline: "none",
                      fontSize: "0.875rem",
                      color: "#1a202c",
                      backgroundColor: "white"
                    }}
                    step="0.5"
                    min="0.5"
                  />
                </div>

                {/* Calculate Button */}
                <button
                  onClick={calculatePrice}
                  disabled={!serviceType || !weight}
                  style={{ 
                    height: "3rem",
                    backgroundColor: "#3b82f6",
                    color: "white",
                    fontWeight: "600",
                    borderRadius: "0.375rem",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    opacity: (!serviceType || !weight) ? 0.7 : 1,
                    pointerEvents: (!serviceType || !weight) ? "none" : "auto",
                    transition: "all 0.2s ease"
                  }}
                >
                  <FaCalculator style={{ width: "1rem", height: "1rem" }} />
                  Hitung Total Biaya
                </button>

                {/* Result */}
                {totalPrice > 0 && (
                  <div style={{ 
                    backgroundColor: "#e1f0ff",
                    borderRadius: "0.5rem",
                    padding: "1.5rem",
                    textAlign: "center"
                  }}>
                    <h3 style={{ 
                      fontSize: "1.125rem",
                      fontWeight: "600",
                      color: "#1a202c",
                      marginBottom: "0.5rem"
                    }}>
                      Estimasi Total Biaya
                    </h3>
                    <div style={{ 
                      fontSize: "1.875rem",
                      fontWeight: "bold",
                      color: "#3b82f6",
                      marginBottom: "0.5rem"
                    }}>
                      Rp.{totalPrice.toLocaleString()}
                    </div>
                    <p style={{ 
                      fontSize: "0.75rem",
                      color: "#718096"
                    }}>
                      *Harga dapat berubah tergantung kondisi pakaian dan lokasi
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div style={{ 
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
          marginTop: "3rem",
          maxWidth: "56rem",
          marginLeft: "auto",
          marginRight: "auto"
        }}>
          <div style={{ 
            textAlign: "center", 
            padding: "1.5rem", 
            backgroundColor: "#f7fafc",
            borderRadius: "0.5rem"
          }}>
            <div style={{ 
              width: "3rem", 
              height: "3rem", 
              backgroundColor: "#10b981",
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
              color: "white",
              fontWeight: "bold"
            }}>
              1
            </div>
            <h4 style={{ 
              fontWeight: "600",
              color: "#1a202c",
              marginBottom: "0.5rem"
            }}>
              Minimum Order
            </h4>
            <p style={{ 
              fontSize: "0.875rem",
              color: "#718096"
            }}>
              2 Kg per transaksi
            </p>
          </div>

          <div style={{ 
            textAlign: "center", 
            padding: "1.5rem", 
            backgroundColor: "#f7fafc",
            borderRadius: "0.5rem"
          }}>
            <div style={{ 
              width: "3rem", 
              height: "3rem", 
              backgroundColor: "#10b981",
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
              color: "white",
              fontWeight: "bold"
            }}>
              2
            </div>
            <h4 style={{ 
              fontWeight: "600",
              color: "#1a202c",
              marginBottom: "0.5rem"
            }}>
              Gratis Antar Jemput
            </h4>
            <p style={{ 
              fontSize: "0.875rem",
              color: "#718096"
            }}>
              Untuk member Regular & Loyal
            </p>
          </div>

          <div style={{ 
            textAlign: "center", 
            padding: "1.5rem", 
            backgroundColor: "#f7fafc",
            borderRadius: "0.5rem"
          }}>
            <div style={{ 
              width: "3rem", 
              height: "3rem", 
              backgroundColor: "#10b981",
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
              color: "white",
              fontWeight: "bold"
            }}>
              3
            </div>
            <h4 style={{ 
              fontWeight: "600",
              color: "#1a202c",
              marginBottom: "0.5rem"
            }}>
              Express 1 Hari
            </h4>
            <p style={{ 
              fontSize: "0.875rem",
              color: "#718096"
            }}>
              Selesai dalam 24 jam
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}