import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaBox } from "react-icons/fa";
import htmLogo from '../../assets/lgbiru.png';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      if (email === "admin@htmlaundry.com" && password === "admin123") {
        const user = {
          id: "1",
          name: "Admin HTM Laundry",
          email,
          role: "admin",
        };
        localStorage.setItem("user", JSON.stringify(user));
        if (rememberMe) localStorage.setItem("rememberLogin", "true");
        navigate("/home");
        setIsLoading(false);
        return;
      }

      const demoCustomers = [
        {
          id: "cust1",
          name: "Sarah Martinez",
          email: "sarah@example.com",
          password: "customer123",
          role: "customer",
          membershipTier: "regular",
          loyaltyPoints: 250,
          totalTransactions: 8,
          totalSpent: 320000,
        },
        {
          id: "cust2",
          name: "Ahmad Rahman",
          email: "ahmad@example.com",
          password: "customer123",
          role: "customer",
          membershipTier: "loyal",
          loyaltyPoints: 450,
          totalTransactions: 15,
          totalSpent: 580000,
        },
      ];

      const demoCustomer = demoCustomers.find(
        (c) => c.email === email && c.password === password
      );

      if (demoCustomer) {
        localStorage.setItem("user", JSON.stringify(demoCustomer));
        if (rememberMe) localStorage.setItem("rememberLogin", "true");
        navigate("/membership");
        setIsLoading(false);
        return;
      }

      try {
        const customers = JSON.parse(localStorage.getItem("customers") || "[]");
        const customer = customers.find(
          (c) => c.email === email && c.password === password
        );

        if (customer) {
          localStorage.setItem("user", JSON.stringify(customer));
          if (rememberMe) localStorage.setItem("rememberLogin", "true");
          navigate("/membership");
        } else {
          setError("Email atau password salah.");
        }
      } catch (err) {
        setError("Terjadi kesalahan saat memproses login.");
      }

      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Dekorasi */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-60 right-20 w-24 h-24 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-white rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-40 w-16 h-16 bg-white rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="w-full max-w-md bg-white shadow-lg rounded-3xl p-8 relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
                                        <img
                                          src={htmLogo}
                                          alt="HTM Laundry Logo"
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">HTM LAUNDRY</h1>
              <p className="text-sm text-blue-600 font-medium">Premium Service</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <Link to="/resetPassword" className="text-blue-600 hover:underline text-sm">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline font-medium"
          >
            Register now
          </button>
        </div>

        {/* Keterangan Akun Demo */}
        <div className="mt-8 text-sm text-gray-500 text-center">
          <p className="font-semibold mb-1">Demo Accounts:</p>
          <div className="space-y-1">
            <p>
              <span className="font-medium text-gray-700">Admin</span> →{" "}
              <span className="text-blue-600">admin@htmlaundry.com</span> /{" "}
              <span className="text-blue-600">admin123</span>
            </p>
            <p>
              <span className="font-medium text-gray-700">Customer Regular</span> →{" "}
              <span className="text-blue-600">sarah@example.com</span> /{" "}
              <span className="text-blue-600">customer123</span>
            </p>
            <p>
              <span className="font-medium text-gray-700">Customer Loyal</span> →{" "}
              <span className="text-blue-600">ahmad@example.com</span> /{" "}
              <span className="text-blue-600">customer123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
