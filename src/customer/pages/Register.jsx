import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Package } from "lucide-react";
import htmLogo from '../../assets/lgbiru.png';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) return "Semua field wajib diisi";

    if (formData.password.length < 6) return "Password minimal 6 karakter";
    if (formData.password !== formData.confirmPassword) return "Konfirmasi password tidak sama";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return "Format email tidak valid";
    return null;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      try {
        const existingUsers = JSON.parse(localStorage.getItem("customers") || "[]");
        const userExists = existingUsers.find((user) => user.email === formData.email);
        if (userExists) {
          setError("Email sudah terdaftar. Silakan gunakan email lain.");
          setIsLoading(false);
          return;
        }

        const newCustomer = {
          id: Date.now().toString(),
          ...formData,
          name: `${formData.firstName} ${formData.lastName}`,
          role: "customer",
          membershipTier: "basic",
          joinDate: new Date().toISOString(),
          totalOrders: 0,
          totalSpent: 0,
          loyaltyPoints: 0,
          totalTransactions: 0,
        };

        existingUsers.push(newCustomer);
        localStorage.setItem("customers", JSON.stringify(existingUsers));
        setSuccess("Registrasi berhasil! Anda akan dialihkan ke halaman login...");
        setTimeout(() => navigate("/login"), 2000);
      } catch (err) {
        setError("Terjadi kesalahan saat registrasi.");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-60 right-20 w-24 h-24 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-white rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-40 w-16 h-16 bg-white rounded-full animate-pulse delay-500"></div>
      </div>
<div className="w-full max-w-2xl shadow-2xl rounded-3xl bg-white/95 backdrop-blur-sm relative z-10 p-10">

      {/* <div className="w-full max-w-4xl shadow-2xl rounded-3xl bg-white/95 backdrop-blur-sm relative z-10 p-10"> */}
        {/* Branding */}
        <div className="text-center mb-2">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img
                              src={htmLogo}
                              alt="HTM Laundry Logo"
                              className="w-full h-full object-cover"
                            />
                          </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-gray-800">HTM LAUNDRY</h1>
              <p className="text-sm text-blue-600 font-medium">Premium Service</p>
            </div>
          </div>
          {/* <h2 className="text-3xl font-bold text-gray-800 mb-3">Join HTM Laundry</h2> */}
          {/* <p className="text-gray-600">Create your account and enjoy premium laundry services</p> */}
        </div>

        {/* Alerts */}
        {success && <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-4 text-sm">{success}</div>}
        {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">{error}</div>}

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
              <input name="firstName" type="text" required onChange={handleInputChange} value={formData.firstName}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl" placeholder="First name" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
              <input name="lastName" type="text" required onChange={handleInputChange} value={formData.lastName}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl" placeholder="Last name" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input name="email" type="email" required onChange={handleInputChange} value={formData.email}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl" placeholder="Email address" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
              <input name="phone" type="tel" onChange={handleInputChange} value={formData.phone}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl" placeholder="Phone number" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input name="password" type="password" required onChange={handleInputChange} value={formData.password}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl" placeholder="Password" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
              <input name="confirmPassword" type="password" required onChange={handleInputChange} value={formData.confirmPassword}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl" placeholder="Confirm password" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Address (Optional)</label>
            <input name="address" type="text" onChange={handleInputChange} value={formData.address}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl" placeholder="Address" />
          </div>

          <div className="flex items-start space-x-3">
            <input type="checkbox" required className="w-5 h-5 mt-1 border-gray-300" />
            <label className="text-gray-700">
              I agree to the <span className="text-blue-600 font-semibold">Terms of Service</span> and <span className="text-blue-600 font-semibold">Privacy Policy</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 rounded-xl shadow-lg transition-all"
          >
            {isLoading ? "Creating Account..." : "Create HTM Laundry Account"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">Already have an account?</p>
          <button onClick={() => navigate("/login")} className="text-blue-600 hover:underline font-semibold mt-2">
            Sign in to your account →
          </button>
        </div>
      </div>
    </div>
  );
}
