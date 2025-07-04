import { useState } from "react";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import htmLogo from '../../assets/lgbiru.png';

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    setTimeout(() => {
      if (email) {
        setSuccess(
          "Link reset password telah dikirim ke email Anda. Silakan periksa inbox dan folder spam."
        );
      } else {
        setError("Email harus diisi");
      }
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Animations */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-60 right-20 w-24 h-24 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-white rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-40 w-16 h-16 bg-white rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="w-full max-w-lg shadow-2xl border-0 rounded-3xl bg-white/95 backdrop-blur-sm relative z-10">
        <div className="p-10">
          <div className="text-center mb-10">
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
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Reset Password</h2>
            <p className="text-gray-600">
              Enter your email address and we'll send you a reset link
            </p>
          </div>

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-6 text-sm">
              {success}
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleResetPassword} className="space-y-8">
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your registered email address"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-800 placeholder:text-gray-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending Reset Link...</span>
                </div>
              ) : (
                <span>Send Reset Link</span>
              )}
            </button>
          </form>

          <div className="mt-8 mb-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Remember your password?
                </span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-4">Ready to sign in to your account?</p>
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 transition-all duration-200 font-semibold hover:underline"
            >
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
