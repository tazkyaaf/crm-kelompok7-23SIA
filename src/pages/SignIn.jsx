import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleLoginChange = (e) => {
    setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignupChange = (e) => {
    setSignupData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setShowRoleModal(false);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!selectedRole) {
      setShowRoleModal(true);
      return;
    }

    const { email, password } = loginData;

    if (!email || !password) {
      alert('Silakan isi email dan password');
      return;
    }

    let userRole = selectedRole;

    // Admin redirect langsung
    if (userRole === 'admin') {
      localStorage.setItem("user", JSON.stringify({ email, role: userRole }));
      alert(`Login berhasil sebagai ${userRole}`);
      navigate('/admin/dashboard');
      return;
    }

    // Deteksi role tambahan untuk customer
    if (userRole === 'customer') {
      if (email.includes('regular')) {
        userRole = 'member-regular';
      } else if (email.includes('loyal')) {
        userRole = 'member-loyal';
      }
    }

    localStorage.setItem("user", JSON.stringify({ email, role: userRole }));
    alert(`Login berhasil sebagai ${userRole}`);
    navigate('/home');
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    if (!selectedRole) {
      setShowRoleModal(true);
      return;
    }

    const { password, confirmPassword } = signupData;

    if (password !== confirmPassword) {
      alert('Password tidak cocok!');
      return;
    }

    localStorage.setItem("user", JSON.stringify({
      name: signupData.fullName,
      email: signupData.email,
      phone: signupData.phone,
      role: selectedRole || 'customer'
    }));

    alert('Pendaftaran berhasil!');
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
          {selectedRole === 'admin' ? 'Admin Portal' : 'Customer Portal'}
        </h2>

        <div className="mb-4">
          <button
            onClick={() => setShowRoleModal(true)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-left flex justify-between items-center"
          >
            <span>{selectedRole ? selectedRole.toUpperCase() : 'Pilih peran (Admin/Customer)'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="flex border-b mb-4">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'login' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'signup' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('signup')}
          >
            Daftar
          </button>
        </div>

        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  className="w-full border pl-10 pr-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className="w-full border pl-10 pr-10 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition"
            >
              Masuk
            </button>
          </form>
        )}

        {activeTab === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="fullName"
                  name="fullName"
                  value={signupData.fullName}
                  onChange={handleSignupChange}
                  placeholder="Nama lengkap Anda"
                  className="w-full border pl-10 pr-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="signupEmail" className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="signupEmail"
                  name="email"
                  type="email"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  placeholder="email@example.com"
                  className="w-full border pl-10 pr-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={signupData.phone}
                  onChange={handleSignupChange}
                  placeholder="081234567890"
                  className="w-full border pl-10 pr-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="signupPassword" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="signupPassword"
                  name="password"
                  type="password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                  placeholder="Buat password"
                  className="w-full border pl-10 pr-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Konfirmasi Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={signupData.confirmPassword}
                  onChange={handleSignupChange}
                  placeholder="Konfirmasi password"
                  className="w-full border pl-10 pr-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition"
            >
              Daftar
            </button>
          </form>
        )}
      </div>

      {/* Modal Pilih Peran */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl">
            <h3 className="text-xl font-bold mb-6 text-[#255d91]">Pilih Peran</h3>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleRoleSelect('admin')}
                className="bg-[#2473eb] text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
              >
                Admin
              </button>
              <button
                onClick={() => handleRoleSelect('customer')}
                className="bg-[#2473eb] text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
              >
                Customer
              </button>
              <button
                onClick={() => setShowRoleModal(false)}
                className="mt-4 text-sm text-gray-500 hover:text-blue-600 transition"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
