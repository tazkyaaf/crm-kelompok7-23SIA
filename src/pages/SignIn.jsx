import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  
  // Login form state
  const [loginData, setLoginData] = useState({ 
    email: '', 
    password: '' 
  });
  
  // Signup form state
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

    if (loginData.email && loginData.password) {
      // Simulate membership role based on email
      let userRole = selectedRole;
      if (selectedRole === 'customer') {
        if (loginData.email.includes('regular')) {
          userRole = 'member-regular';
        } else if (loginData.email.includes('loyal')) {
          userRole = 'member-loyal';
        }
      }

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify({
        email: loginData.email,
        role: userRole
      }));

      alert(`Login berhasil sebagai ${userRole}`);

      // Redirect based on role
      if (userRole === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/home');
      }
    } else {
      alert('Silakan isi email dan password');
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    if (!selectedRole) {
      setShowRoleModal(true);
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      alert('Password tidak cocok!');
      return;
    }

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify({
      name: signupData.fullName,
      email: signupData.email,
      phone: signupData.phone,
      role: selectedRole || 'customer' // Default to customer if not selected
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
        
        {/* Role Selection Button */}
        <div className="mb-4">
          <button
            onClick={() => setShowRoleModal(true)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-left flex justify-between items-center"
          >
            <span>
              {selectedRole ? (
                <span className="capitalize">{selectedRole}</span>
              ) : (
                'Pilih peran (Admin/Customer)'
              )}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Tabs Navigation */}
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

        {/* Login Form */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className="w-full border border-gray-300 rounded-md pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
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

        {/* Signup Form */}
        {activeTab === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="fullName"
                  name="fullName"
                  placeholder="Nama lengkap Anda"
                  value={signupData.fullName}
                  onChange={handleSignupChange}
                  className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="signupEmail" className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="signupEmail"
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="081234567890"
                  value={signupData.phone}
                  onChange={handleSignupChange}
                  className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="signupPassword" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="signupPassword"
                  name="password"
                  type="password"
                  placeholder="Buat password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                  className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Konfirmasi Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Konfirmasi password Anda"
                  value={signupData.confirmPassword}
                  onChange={handleSignupChange}
                  className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

      {/* Role Selection Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl">
            <h3 className="text-xl font-bold mb-6 text-[#255d91]">Pilih Peran</h3>
            
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleRoleSelect('admin')}
                className="bg-[#2473eb] text-white px-6 py-3 rounded-md hover:bg-blue-700 transition 
                         flex items-center justify-center gap-2 font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Admin
              </button>
              
              <button
                onClick={() => handleRoleSelect('customer')}
                className="bg-[#2473eb] text-white px-6 py-3 rounded-md hover:bg-blue-700 transition 
                         flex items-center justify-center gap-2 font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                Customer
              </button>
              
              <button 
                onClick={() => setShowRoleModal(false)}
                className="mt-4 text-sm text-gray-500 hover:text-blue-600 transition"
                aria-label="Close modal"
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