// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Navigation = ({
//   onLoginClick,
//   onMembershipClick,
//   onContactClick
// }) => {
//   const [user, setUser] = useState(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     try {
//       const storedUser = JSON.parse(localStorage.getItem("user") || "null");
//       setUser(storedUser);
//     } catch (e) {
//       console.error("Invalid user in localStorage");
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     window.location.reload();
//   };

//   const handleHomeClick = () => {
//     navigate("/");
//   };

//   const handleServiceClick = () => {
//     navigate("/service");
//   };

//   const handleOrdersClick = () => {
//     navigate("/orders");
//   };

//   const navItems = [
//     { label: "Home", onClick: handleHomeClick },
//     { label: "Service", onClick: handleServiceClick },
//     { label: "Orders", onClick: handleOrdersClick },
//     { label: "Membership", onClick: onMembershipClick },
//     { label: "Contact us", onClick: onContactClick },
//   ];

//   // Custom Button component
//   const Button = ({ children, onClick, className = "", variant = "default" }) => {
//     const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors";
//     const variantClasses = {
//       default: "bg-blue-600 text-white hover:bg-blue-700",
//       outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
//       ghost: "hover:bg-gray-100"
//     };
    
//     return (
//       <button
//         onClick={onClick}
//         className={`${baseClasses} ${variantClasses[variant]} ${className}`}
//       >
//         {children}
//       </button>
//     );
//   };

//   // Custom Dropdown components
//   const DropdownMenu = ({ trigger, children }) => {
//     const [isOpen, setIsOpen] = useState(false);
    
//     return (
//       <div className="relative">
//         <div onClick={() => setIsOpen(!isOpen)}>
//           {trigger}
//         </div>
//         {isOpen && (
//           <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
//             {children}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const DropdownMenuItem = ({ children, onClick }) => {
//     return (
//       <div
//         onClick={() => {
//           onClick();
//           setIsMenuOpen(false);
//         }}
//         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center"
//       >
//         {children}
//       </div>
//     );
//   };

//   // SVG Icons
//   const UserIcon = () => (
//     <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//       <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
//       <circle cx="12" cy="7" r="4" />
//     </svg>
//   );

//   const LogOutIcon = () => (
//     <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//       <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//       <polyline points="16 17 21 12 16 7" />
//       <line x1="21" y1="12" x2="9" y2="12" />
//     </svg>
//   );

//   const MenuIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//       <line x1="3" y1="12" x2="21" y2="12" />
//       <line x1="3" y1="6" x2="21" y2="6" />
//       <line x1="3" y1="18" x2="21" y2="18" />
//     </svg>
//   );

//   const CloseIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//       <line x1="18" y1="6" x2="6" y2="18" />
//       <line x1="6" y1="6" x2="18" y2="18" />
//     </svg>
//   );

//   return (
//     <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//               <div className="w-4 h-4 bg-white rounded-sm"></div>
//             </div>
//             <span className="text-xl font-bold text-gray-800">
//               HTM LAUNDRY
//             </span>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navItems.map((item) => (
//               <button
//                 key={item.label}
//                 onClick={item.onClick}
//                 className="text-gray-800 hover:text-blue-600 font-medium transition-colors"
//               >
//                 {item.label}
//               </button>
//             ))}

//             {/* User Authentication */}
//             {user ? (
//               <DropdownMenu
//                 trigger={
//                   <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
//                     <UserIcon />
//                     {user.name}
//                   </Button>
//                 }
//               >
//                 <DropdownMenuItem onClick={onMembershipClick}>
//                   <UserIcon />
//                   Membership
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={handleLogout}>
//                   <LogOutIcon />
//                   Logout
//                 </DropdownMenuItem>
//               </DropdownMenu>
//             ) : (
//               <Button
//                 onClick={onLoginClick}
//                 className="bg-blue-600 hover:bg-blue-700 text-white"
//               >
//                 Login
//               </Button>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <Button
//               variant="ghost"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//             >
//               {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden border-t border-gray-200 py-4">
//             <div className="flex flex-col space-y-4">
//               {navItems.map((item) => (
//                 <button
//                   key={item.label}
//                   onClick={() => {
//                     item.onClick();
//                     setIsMenuOpen(false);
//                   }}
//                   className="text-gray-800 hover:text-blue-600 font-medium text-left"
//                 >
//                   {item.label}
//                 </button>
//               ))}

//               {user ? (
//                 <div className="pt-4 border-t border-gray-200 space-y-2">
//                   <div className="text-sm text-gray-500">
//                     Logged in as {user.name}
//                   </div>
//                   <Button
//                     onClick={onMembershipClick}
//                     variant="outline"
//                     className="w-full border-blue-600 text-blue-600"
//                   >
//                     Membership
//                   </Button>
//                   <Button
//                     onClick={handleLogout}
//                     variant="outline"
//                     className="w-full"
//                   >
//                     Logout
//                   </Button>
//                 </div>
//               ) : (
//                 <Button
//                   onClick={() => {
//                     onLoginClick();
//                     setIsMenuOpen(false);
//                   }}
//                   className="bg-blue-600 hover:bg-blue-700 text-white w-full"
//                 >
//                   Login
//                 </Button>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navigation;