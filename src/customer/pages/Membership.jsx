import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MembershipCard from "../components/MembershipCard";
import { ArrowLeft } from "lucide-react";
import { FaUser, FaCrown, FaStar, FaShippingFast, FaTshirt, FaFire, FaCheck } from "react-icons/fa";

export default function Membership() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");
      if (storedUser) {
        setUser(storedUser);
      } else {
        navigate("/");
      }
    } catch (e) {
      console.error("Invalid user in localStorage");
      navigate("/");
    }
  }, [navigate]);

  const membershipCards = [
    {
      title: "BASIC MEMBER",
      icon: <FaUser className="text-blue-500 text-4xl" />,
      benefit: [
        "Stempel/Poin di setiap transaksi",
        "Gratis 1x cuci setelah 10x transaksi",
        "Member card digital",
        "Notifikasi promo khusus"
      ],
      price: "GRATIS",
      button: "Daftar Sekarang",
      active: user?.membershipLevel === "basic",
    },
    {
      title: "REGULAR MEMBER",
      icon: <FaStar className="text-green-500 text-4xl" />,
      benefit: [
        "Semua benefit Basic Member",
        "Penjemputan dan pengantaran gratis",
        "Promo khusus member regular",
        "Priority customer service",
        "Diskon 10% untuk layanan premium"
      ],
      price: "Rp 50.000/bulan",
      button: user?.membershipLevel === "regular" ? "Paket Aktif" : "Upgrade Sekarang",
      active: user?.membershipLevel === "regular",
    },
    {
      title: "LOYAL MEMBER",
      icon: <FaCrown className="text-yellow-500 text-4xl" />,
      benefit: [
        "Semua benefit Regular Member",
        "Prioritas penjemputan di jam sibuk",
        "Layanan express gratis (24 jam)",
        "Personal laundry consultant",
        "Diskon 20% untuk layanan premium",
        "Voucher gratis dry cleaning (1x/bulan)"
      ],
      price: "Rp 100.000/bulan",
      button: user?.membershipLevel === "loyal" ? "Paket Aktif" : "Upgrade Sekarang",
      active: user?.membershipLevel === "loyal",
    }
  ];

  const laundryServices = [
    {
      name: "Express",
      icon: <FaShippingFast className="text-red-500 text-2xl" />,
      description: "Cuci cepat dengan hasil maksimal",
      priceBasic: "Rp 12.000/kg",
      priceRegular: "Rp 10.800/kg (10% off)",
      priceLoyal: "Rp 9.600/kg (20% off)",
      processingTime: "4-6 jam",
      features: [
        "Cuci dan setrika kilat",
        "Pengerjaan prioritas",
        "Pengantaran express"
      ]
    },
    {
      name: "Reguler",
      icon: <FaTshirt className="text-blue-500 text-2xl" />,
      description: "Cuci standar dengan kualitas terjamin",
      priceBasic: "Rp 7.000/kg",
      priceRegular: "Rp 6.300/kg (10% off)",
      priceLoyal: "Rp 5.600/kg (20% off)",
      processingTime: "24 jam",
      features: [
        "Cuci bersih menyeluruh",
        "Setrika rapi",
        "Pengantaran reguler"
      ]
    },
    {
      name: "Cuci Kering Lipat",
      icon: <FaTshirt className="text-green-500 text-2xl" />,
      description: "Cuci kering dengan hasil rapi terlipat",
      priceBasic: "Rp 5.000/kg",
      priceRegular: "Rp 4.500/kg (10% off)",
      priceLoyal: "Rp 4.000/kg (20% off)",
      processingTime: "24 jam",
      features: [
        "Tanpa setrika",
        "Lipatan rapi",
        "Dikemas dalam plastik"
      ]
    },
    {
      name: "Setrika Saja",
      icon: <FaFire className="text-orange-500 text-2xl" />,
      description: "Hanya setrika tanpa cuci",
      priceBasic: "Rp 4.000/kg",
      priceRegular: "Rp 3.600/kg (10% off)",
      priceLoyal: "Rp 3.200/kg (20% off)",
      processingTime: "6 jam",
      features: [
        "Setrika profesional",
        "Tanpa cuci",
        "Bebas bau dan kusut"
      ]
    }
  ];

  const handleMembershipSelect = (title) => {
    const level = title.toLowerCase().split(" ")[0];
    if (level !== user?.membershipLevel) {
      const updatedUser = { ...user, membershipLevel: level };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      alert(`Berhasil upgrade ke membership ${title}!`);
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4 mb-6">
            {/* <button
              onClick={handleBackToHome}
              className="flex items-center text-blue-600 hover:bg-blue-100 px-4 py-2 rounded"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </button> */}
          </div>

          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Paket Membership
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pilih paket membership yang sesuai dengan kebutuhan laundry Anda
            </p>
          </div>
        </div>
      </section>

      {/* Membership Plans */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8">
            {membershipCards.map((card, index) => (
              <MembershipCard
                key={index}
                title={card.title}
                icon={card.icon}
                benefit={card.benefit}
                price={card.price}
                button={card.button}
                active={card.active}
                onClick={() => handleMembershipSelect(card.title)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#1a2b49] mb-10">Layanan Kami</h2>
          
          <div className="mb-12 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaCheck className="text-green-500 mr-2" /> Gratis 1x Cuci Setelah 10x Transaksi
            </h3>
            <p className="text-gray-600 mb-4">
              Khusus untuk member Basic, dapatkan 1x cuci gratis setelah melakukan 10x transaksi.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Syarat dan Ketentuan:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Minimal 5kg per transaksi</li>
                  <li>Berlaku untuk layanan reguler</li>
                  <li>Tidak bisa digabung dengan promo lain</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Cara Klaim:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Tunjukkan kartu member digital</li>
                  <li>Transaksi ke-10 harus sudah selesai</li>
                  <li>Klaim dalam 30 hari setelah transaksi ke-10</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {laundryServices.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-center mb-2">{service.name}</h3>
                <p className="text-gray-600 text-center mb-4">{service.description}</p>
                
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="flex justify-between font-medium">
                      <span>Basic:</span>
                      <span>{service.priceBasic}</span>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded">
                    <div className="flex justify-between text-blue-600 font-medium">
                      <span>Regular:</span>
                      <span>{service.priceRegular}</span>
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded">
                    <div className="flex justify-between text-yellow-600 font-medium">
                      <span>Loyal:</span>
                      <span>{service.priceLoyal}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-semibold mb-2">Fitur:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-between mt-4 pt-4 border-t">
                    <span className="font-medium">Waktu:</span>
                    <span className="font-semibold">{service.processingTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Membership Status */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Status Membership Anda
            </h3>
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <div className="flex items-center justify-center gap-3 text-lg font-semibold text-blue-600 mb-2">
                {user.membershipLevel === "basic" && <FaUser className="text-xl" />}
                {user.membershipLevel === "regular" && <FaStar className="text-xl" />}
                {user.membershipLevel === "loyal" && <FaCrown className="text-xl" />}
                <span>{user.membershipLevel?.toUpperCase()} MEMBER</span>
              </div>
              <p className="text-gray-600 mb-4">
                Nikmati semua benefit dari paket membership {user.membershipLevel} Anda.
              </p>
              <div className="bg-white p-3 rounded">
                <p className="text-sm">
                  Bergabung sejak: {new Date().toLocaleDateString('id-ID')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}