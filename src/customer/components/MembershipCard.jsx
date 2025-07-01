import { useState } from "react";
import { FaUser, FaMedal, FaCrown, FaCheck, FaRegCheckCircle, FaTimes } from "react-icons/fa";
import { FiGift, FiStar, FiCreditCard, FiCalendar } from "react-icons/fi";
import { IoIosPin, IoIosCall, IoIosMail } from "react-icons/io";

// Komponen MembershipCard
const MembershipCard = ({ title, icon, benefit, price, button, active, subtitle }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const IconMap = {
    basic: <FaUser className="w-6 h-6 mr-2" />,
    regular: <FaMedal className="w-6 h-6 mr-2" />,
    loyal: <FaCrown className="w-6 h-6 mr-2" />,
  };

  return (
    <>
      <div
        className={`relative rounded-2xl border shadow-md transition-all duration-300 transform w-full sm:w-72 md:w-80 px-6 py-8 ${
          active
            ? "bg-gradient-to-br from-[#b2d7fa] to-[#e6f1fd] border-blue-400 text-[#255d91] -mt-4 scale-[1.03] ring-1 ring-blue-200"
            : "bg-white border-gray-200 text-[#2a415e] hover:bg-gradient-to-br hover:from-[#f0f9ff] hover:to-[#e6f1fd] hover:shadow-xl hover:ring-1 hover:ring-blue-100"
        }`}
      >
        {/* Badge Populer */}
        {active && (
          <div className="animate-pulse absolute -top-3 right-4 bg-yellow-400 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            Populer
          </div>
        )}

        {/* Title */}
        <h3 className="flex items-center justify-center font-bold text-lg text-center mb-1 uppercase tracking-wide text-blue-800">
          {IconMap[icon]}
          {title}
        </h3>

        {subtitle && <p className="text-xs text-center mb-4 text-[#6c819c]">{subtitle}</p>}

        {/* Benefits */}
        <div className="mb-6 text-left text-sm">
          <span className="font-semibold block text-[#8aa4c2] mb-1">Benefit</span>
          <ul className="list-none pl-0 space-y-2">
            {benefit.map((b, i) => (
              <li key={i} className="flex items-start text-sm">
                <span className="text-blue-500 mr-2">✔</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price */}
        <p className="font-bold text-2xl text-[#263254] mb-6 text-center">
          {price}
          <span className="font-normal text-base text-gray-500"> /per month</span>
        </p>

        {/* Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className={`text-white px-6 py-2 rounded-full w-full font-semibold focus:outline-none transition ${
            active ? "bg-[#3b82f6] hover:bg-[#2563eb]" : "bg-[#4f79cf] hover:bg-[#3a5fb0]"
          }`}
        >
          {button}
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <MembershipRegistrationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedMembership={{
            type: icon,
            title: title,
            price: price,
            benefits: benefit
          }}
        />
      )}
    </>
  );
};

// Komponen MembershipRegistrationModal
const MembershipRegistrationModal = ({ isOpen, onClose, selectedMembership }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    emergencyContact: "",
    membershipType: selectedMembership?.type || "basic",
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
    agreeTerms: false,
    subscribeNewsletter: false,
  });

  const membershipOptions = {
    basic: {
      title: "BASIC MEMBER",
      monthlyFee: 0,
      setupFee: 0,
      benefits: [
        "Stempel/Poin di setiap transaksi",
        "Gratis 1x cuci setelah 10x transaksi",
        "Member card digital",
        "Notifikasi promo khusus",
      ],
      icon: <FiGift className="w-6 h-6" />,
      color: "bg-gray-100",
      iconColor: "text-gray-600",
    },
    regular: {
      title: "REGULAR MEMBER",
      monthlyFee: 3,
      setupFee: 5,
      benefits: [
        "Semua benefit Basic Member",
        "Penjemputan dan pengantaran gratis",
        "Promo khusus member regular",
        "Priority customer service",
        "Diskon 10% untuk layanan premium",
      ],
      icon: <FaMedal className="w-6 h-6" />,
      color: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    loyal: {
      title: "LOYAL MEMBER",
      monthlyFee: 6,
      setupFee: 10,
      benefits: [
        "Semua benefit Regular Member",
        "Prioritas penjemputan di jam sibuk",
        "Layanan express gratis (24 jam)",
        "Personal laundry consultant",
        "Diskon 20% untuk layanan premium",
        "Voucher gratis dry cleaning (1x/bulan)",
      ],
      icon: <FaCrown className="w-6 h-6" />,
      color: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  };

  const currentMembership = membershipOptions[formData.membershipType];
  const total = currentMembership.monthlyFee + currentMembership.setupFee;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Process registration
      console.log("Registration submitted:", formData);
      // Simulate successful registration
      const userData = {
        name: formData.fullName,
        email: formData.email,
        membershipLevel: formData.membershipType,
        membershipActive: true,
        registrationDate: new Date().toISOString(),
      };
      localStorage.setItem("user", JSON.stringify(userData));
      onClose();
      window.location.reload();
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-[#2a415e] mb-2">
          Informasi Pribadi
        </h3>
        <p className="text-[#6c819c]">
          Lengkapi data diri Anda untuk menjadi member HTM Laundry
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="fullName" className="block text-sm font-medium text-[#2a415e]">
            Nama Lengkap
          </label>
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="fullName"
              type="text"
              placeholder="Masukkan nama lengkap"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-[#2a415e]">
            Email
          </label>
          <div className="relative">
            <IoIosMail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-[#2a415e]">
            No. Telepon
          </label>
          <div className="relative">
            <IoIosCall className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="phone"
              type="tel"
              placeholder="0812xxxxxxxx"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="emergencyContact" className="block text-sm font-medium text-[#2a415e]">
            Kontak Darurat
          </label>
          <div className="relative">
            <IoIosCall className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="emergencyContact"
              type="tel"
              placeholder="0812xxxxxxxx"
              value={formData.emergencyContact}
              onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="address" className="block text-sm font-medium text-[#2a415e]">
          Alamat Lengkap
        </label>
        <div className="relative">
          <IoIosPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <textarea
            id="address"
            placeholder="Masukkan alamat lengkap untuk pickup & delivery"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-20"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-[#2a415e] mb-2">
          Pilih Jenis Membership
        </h3>
        <p className="text-[#6c819c]">
          Pilih paket membership yang sesuai dengan kebutuhan Anda
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {Object.entries(membershipOptions).map(([key, membership]) => {
          const isSelected = formData.membershipType === key;

          return (
            <div
              key={key}
              className={`cursor-pointer transition-all duration-300 p-6 rounded-xl border ${
                isSelected
                  ? "border-2 border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300 hover:shadow-md"
              }`}
              onClick={() => handleInputChange("membershipType", key)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-12 h-12 ${membership.color} rounded-lg flex items-center justify-center`}
                  >
                    {membership.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-lg font-bold text-[#2a415e]">
                        {membership.title}
                      </h4>
                      {key === "regular" && (
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                          Populer
                        </span>
                      )}
                    </div>

                    <div className="space-y-1 mb-4">
                      {membership.benefits.map((benefit, idx) => (
                        <div
                          key={idx}
                          className="flex items-center space-x-2 text-sm text-[#6c819c]"
                        >
                          <FaRegCheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-[#6c819c]">
                        {membership.setupFee > 0 &&
                          `Setup: $${membership.setupFee} + `}
                        Bulanan:{" "}
                        {membership.monthlyFee === 0
                          ? "Gratis"
                          : `$${membership.monthlyFee}/bulan`}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isSelected
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {isSelected && (
                    <FaCheck className="w-3 h-3 text-white" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-[#2a415e] mb-2">
          Pembayaran & Konfirmasi
        </h3>
        <p className="text-[#6c819c]">
          Lengkapi pembayaran untuk mengaktifkan membership Anda
        </p>
      </div>

      {/* Order Summary */}
      <div className="border-2 border-blue-100 bg-blue-50 rounded-xl p-6">
        <h4 className="text-lg font-bold text-[#2a415e] mb-4">Ringkasan Pesanan</h4>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">{currentMembership.title}</span>
            <span className="font-bold text-blue-600">
              {currentMembership.monthlyFee === 0
                ? "Gratis"
                : `$${currentMembership.monthlyFee}/bulan`}
            </span>
          </div>

          {currentMembership.setupFee > 0 && (
            <div className="flex justify-between items-center">
              <span>Setup Fee (Sekali bayar)</span>
              <span>${currentMembership.setupFee}</span>
            </div>
          )}

          <hr className="border-gray-200" />

          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total Hari Ini</span>
            <span className="text-blue-600">
              ${total === 0 ? "0 (Gratis)" : total}
            </span>
          </div>

          {currentMembership.monthlyFee > 0 && (
            <div className="text-sm text-[#6c819c]">
              Selanjutnya akan ditagih ${currentMembership.monthlyFee}/bulan
              pada tanggal yang sama
            </div>
          )}
        </div>
      </div>

      {/* Payment Method */}
      {total > 0 && (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-[#2a415e]">Metode Pembayaran</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.paymentMethod}
            onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
          >
            <option value="">Pilih metode pembayaran</option>
            <option value="credit_card">Kartu Kredit/Debit</option>
            <option value="bank_transfer">Transfer Bank</option>
            <option value="e_wallet">E-Wallet (OVO, GoPay, DANA)</option>
            <option value="cash">Bayar Tunai saat Pickup</option>
          </select>

          {formData.paymentMethod === "credit_card" && (
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-[#2a415e]">
                    Nomor Kartu
                  </label>
                  <div className="relative">
                    <FiCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-[#2a415e]">
                      Tanggal Kedaluwarsa
                    </label>
                    <input
                      id="expiryDate"
                      type="text"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="cvv" className="block text-sm font-medium text-[#2a415e]">
                      CVV
                    </label>
                    <input
                      id="cvv"
                      type="text"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange("cvv", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Terms and Conditions */}
      <div className="space-y-4">
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="agreeTerms"
            checked={formData.agreeTerms}
            onChange={(e) => handleInputChange("agreeTerms", e.target.checked)}
            className="mt-1"
          />
          <label htmlFor="agreeTerms" className="text-sm leading-relaxed">
            Saya setuju dengan{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">
              Syarat & Ketentuan
            </span>{" "}
            dan{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">
              Kebijakan Privasi
            </span>{" "}
            HTM Laundry
          </label>
        </div>

        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="subscribeNewsletter"
            checked={formData.subscribeNewsletter}
            onChange={(e) => handleInputChange("subscribeNewsletter", e.target.checked)}
            className="mt-1"
          />
          <label htmlFor="subscribeNewsletter" className="text-sm">
            Saya ingin menerima promo dan update via email
          </label>
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-end">
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          <div className="text-center mt-2">
            <h2 className="text-2xl font-bold text-[#2a415e]">
              Daftar Membership HTM Laundry
            </h2>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-4 mb-6 mt-6">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= stepNumber
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step > stepNumber ? (
                    <FaCheck className="w-3 h-3" />
                  ) : (
                    stepNumber
                  )}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`w-12 h-1 mx-2 ${
                      step > stepNumber ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={() => (step > 1 ? setStep(step - 1) : onClose())}
                className="px-6 py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50"
              >
                {step === 1 ? "Batal" : "Kembali"}
              </button>

              <button
                type="submit"
                className={`px-6 py-2 rounded-md text-white ${
                  step === 3 && !formData.agreeTerms
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={step === 3 && !formData.agreeTerms}
              >
                {step === 3 ? (
                  <div className="flex items-center space-x-2">
                    <FiCalendar className="w-4 h-4" />
                    <span>
                      {total === 0 ? "Daftar Gratis" : `Bayar $${total}`}
                    </span>
                  </div>
                ) : (
                  "Lanjutkan"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


// Ekspor komponen
export default MembershipCard;
export { MembershipRegistrationModal };