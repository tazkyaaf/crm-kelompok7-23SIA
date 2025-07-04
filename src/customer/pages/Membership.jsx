import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  FaCheck, 
  FaStar, 
  FaCrown, 
  FaUsers, 
  FaGift, 
  FaBolt, 
  FaShieldAlt,
  FaHeart,
  FaChevronRight,
  FaCoins,
  FaTrophy,
  FaCalendarAlt,
  FaBox,
  FaClock,
  FaChartLine,
  FaHandSparkles,

} from "react-icons/fa";

const Membership = () => {
  const [user, setUser] = useState(null);
  const [selectedReward, setSelectedReward] = useState(null);
  const navigate = useNavigate();

  // Mock transaction history
  const mockTransactions = [
    {
      id: "TXN001",
      date: "2024-01-15",
      service: "Regular Laundry",
      amount: 35000,
      pointsEarned: 35,
    },
    {
      id: "TXN002",
      date: "2024-01-20",
      service: "Express Laundry",
      amount: 48000,
      pointsEarned: 48,
    },
    {
      id: "TXN003",
      date: "2024-01-25",
      service: "Dry Cleaning",
      amount: 75000,
      pointsEarned: 75,
    },
    {
      id: "TXN004",
      date: "2024-02-01",
      service: "Regular Laundry",
      amount: 42000,
      pointsEarned: 42,
    },
  ];

  // Available rewards
  const availableRewards = [
    {
      id: "reward1",
      title: "Gratis 1x Cuci Regular",
      description: "Voucher gratis cuci regular maksimal 3kg",
      pointsRequired: 100,
      icon: FaBox,
      category: "Layanan",
      available: true,
    },
    {
      id: "reward2",
      title: "Diskon 20% Express",
      description: "Potongan 20% untuk layanan express laundry",
      pointsRequired: 150,
      icon: FaBolt,
      category: "Diskon",
      available: true,
    },
    {
      id: "reward3",
      title: "Gratis Pickup & Delivery",
      description: "Gratis antar jemput untuk 5x transaksi",
      pointsRequired: 200,
      icon: FaGift,
      category: "Layanan",
      available: true,
    },
    {
      id: "reward4",
      title: "Upgrade ke Express Gratis",
      description: "Upgrade gratis dari regular ke express",
      pointsRequired: 250,
      icon: FaStar,
      category: "Premium",
      available: false,
    },
    {
      id: "reward5",
      title: "Voucher Dry Cleaning 50%",
      description: "Potongan 50% untuk layanan dry cleaning",
      pointsRequired: 300,
      icon: FaHandSparkles,
      category: "Premium",
      available: true,
    },
  ];

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");
      if (storedUser && storedUser.role === "customer") {
        // Calculate points based on transactions and membership tier
        const totalPoints = mockTransactions.reduce(
          (sum, txn) => sum + txn.pointsEarned,
          0,
        );
        const bonusMultiplier =
          storedUser.membershipTier === "loyal"
            ? 1.5
            : storedUser.membershipTier === "regular"
              ? 1.2
              : 1;

        const finalPoints = Math.floor(totalPoints * bonusMultiplier);

        storedUser.loyaltyPoints = finalPoints;
        storedUser.totalTransactions = mockTransactions.length;
        storedUser.totalSpent = mockTransactions.reduce(
          (sum, txn) => sum + txn.amount,
          0,
        );
      }
      setUser(storedUser);
    } catch (e) {
      setUser(null);
    }
  }, []);

  const handleClaimReward = (rewardId) => {
    const reward = availableRewards.find((r) => r.id === rewardId);
    if (!reward || !user || !reward.available) return;

    if (user.loyaltyPoints && user.loyaltyPoints >= reward.pointsRequired) {
      // Deduct points
      const updatedUser = {
        ...user,
        loyaltyPoints: user.loyaltyPoints - reward.pointsRequired,
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Update customer data
      try {
        const customers = JSON.parse(localStorage.getItem("customers") || "[]");
        const customerIndex = customers.findIndex((c) => c.id === user.id);
        if (customerIndex !== -1) {
          customers[customerIndex].loyaltyPoints = updatedUser.loyaltyPoints;
          localStorage.setItem("customers", JSON.stringify(customers));
        }
      } catch (e) {
        console.error("Error updating customer data:", e);
      }

      alert(
        `Selamat! Anda berhasil menukar ${reward.title}. Poin Anda dikurangi ${reward.pointsRequired}.`,
      );
    } else {
      alert("Poin Anda tidak mencukupi untuk menukar reward ini.");
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleUpgrade = (tierId) => {
    if (!user) {
      navigate("/register");
      return;
    }

    // Simulate membership upgrade
    const updatedUser = { ...user, membershipTier: tierId };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);

    // Update customer data if exists
    try {
      const customers = JSON.parse(localStorage.getItem("customers") || "[]");
      const customerIndex = customers.findIndex((c) => c.id === user.id);
      if (customerIndex !== -1) {
        customers[customerIndex].membershipTier = tierId;
        localStorage.setItem("customers", JSON.stringify(customers));
      }
    } catch (e) {
      console.error("Error updating customer data:", e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-blue-100 via-blue-200 to-blue-50 text-blue-900 py-16 overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center mb-4 bg-white/20 text-blue-900 border border-white/30 px-3 py-1 rounded-full text-sm">
            <FaCrown className="w-4 h-4 mr-2" />
            Membership Eksklusif
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Membership</h1>
          <p className="text-lg text-blue-900/80 max-w-2xl mx-auto">
            Pantau status pesanan laundry anda secara real-time.
          </p>
        </div>
      </div>

      {/* Membership Status Section - Only show for logged in customers */}
      {user && user.role === "customer" && (
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Status Membership Anda
            </h2>
          </div>

          <div className="max-w-2xl mx-auto border-0 shadow-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-3xl overflow-hidden mb-8">
            <div className="p-8 text-center">
              <div className="mb-6">
                <h3 className="text-3xl font-bold mb-2">
                  {(user.membershipTier || "basic").toUpperCase()}
                </h3>
                <p className="text-white/80">
                  Nikmati Semua benefit dari paket membership Anda
                </p>
              </div>
              <div className="bg-white/20 rounded-xl p-4 mb-6">
                <p className="text-sm text-white/80 mb-1">Bergabung Sejak:</p>
                <p className="text-lg font-semibold">
                  {new Date().toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reward Vouchers Section - Only show for logged in customers */}
      {user && user.role === "customer" && (
        <div className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {availableRewards.slice(0, 4).map((reward) => {
              const IconComponent = reward.icon;
              const canClaim =
                (user.loyaltyPoints || 0) >= reward.pointsRequired &&
                reward.available;

              return (
                <div
                  key={reward.id}
                  className="border-0 shadow-lg rounded-2xl overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium">Layanan</span>
                      </div>
                      {canClaim && (
                        <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          Bisa Klaim
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-white">
                    <h3 className="font-bold text-gray-800 mb-2">
                      {reward.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {reward.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <FaCoins className="w-4 h-4 text-yellow-500" />
                        <span className="font-bold text-gray-800">
                          {reward.pointsRequired} Poin
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleClaimReward(reward.id)}
                      disabled={!canClaim}
                      className={`w-full flex items-center justify-center py-2 px-4 rounded-md ${
                        canClaim
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <FaGift className="w-4 h-4 mr-2" />
                      Klaim Reward
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Points History Section - Only show for logged in customers */}
      {user && user.role === "customer" && (
        <div className="container mx-auto px-4 pb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Riwayat Poin
            </h2>
            <p className="text-gray-600">
              Lihat Bagaimana anda mendapatkan poin dari setiap transaksi
            </p>
          </div>

          <div className="max-w-3xl mx-auto border-0 shadow-lg rounded-2xl bg-white">
            <div className="p-6">
              <div className="space-y-4">
                {mockTransactions.map((transaction) => {
                  const pointsWithBonus =
                    user.membershipTier === "loyal"
                      ? Math.floor(transaction.pointsEarned * 1.5)
                      : user.membershipTier === "regular"
                        ? Math.floor(transaction.pointsEarned * 1.2)
                        : transaction.pointsEarned;

                  return (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FaBox className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {transaction.service}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {new Date(transaction.date).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              },
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-800">
                          {formatCurrency(transaction.amount)}
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaCoins className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-medium text-green-600">
                            +{pointsWithBonus} poin
                          </span>
                          <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Bonus Loyal
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Points Overview */}
      <div className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center mb-4 bg-blue-100 text-blue-600 px-4 py-2 rounded-full">
              <FaCoins className="w-4 h-4 mr-2" />
              Loyalty Program
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Poin & Rewards Anda
            </h2>
            <p className="text-gray-600 text-lg">
              Kumpulkan poin setiap transaksi dan tukar dengan reward menarik
            </p>
          </div>

          {/* Points Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl">
              <div className="p-6 text-center">
                <FaCoins className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h3 className="text-2xl font-bold mb-1">
                  {user?.loyaltyPoints || 300}
                </h3>
                <p className="text-blue-100">Total Poin</p>
              </div>
            </div>

            <div className="border-0 shadow-lg bg-white rounded-xl">
              <div className="p-6 text-center">
                <FaTrophy className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
                <h3 className="text-2xl font-bold mb-1 text-gray-800 capitalize">
                  {user?.membershipTier || "loyal"}
                </h3>
                <p className="text-gray-600">Status Member</p>
              </div>
            </div>

            <div className="border-0 shadow-lg bg-white rounded-xl">
              <div className="p-6 text-center">
                <FaBox className="w-12 h-12 mx-auto mb-4 text-green-500" />
                <h3 className="text-2xl font-bold mb-1 text-gray-800">
                  {user?.totalTransactions || 4}
                </h3>
                <p className="text-gray-600">Total Transaksi</p>
              </div>
            </div>

            <div className="border-0 shadow-lg bg-white rounded-xl">
              <div className="p-6 text-center">
                <FaChartLine className="w-12 h-12 mx-auto mb-4 text-purple-500" />
                <h3 className="text-2xl font-bold mb-1 text-gray-800">
                  {user?.totalSpent
                    ? new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(user.totalSpent)
                    : "Rp 200.000"}
                </h3>
                <p className="text-gray-600">Total Belanja</p>
              </div>
            </div>
          </div>

          {/* Point Earning Rules */}
          <div className="border-0 shadow-lg mb-12 bg-white rounded-xl">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold flex items-center">
                <FaStar className="w-5 h-5 mr-2 text-yellow-500" />
                Cara Mendapatkan Poin
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaBox className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Setiap Transaksi
                  </h3>
                  <p className="text-gray-600 text-sm">
                    1 Poin per Rp 1.000 yang dibelanjakan
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCrown className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Bonus Member Regular
                  </h3>
                  <p className="text-gray-600 text-sm">
                    +20% poin untuk setiap transaksi
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaHandSparkles className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Bonus Member Loyal
                  </h3>
                  <p className="text-gray-600 text-sm">
                    +50% poin untuk setiap transaksi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action for Non-Customers */}
      {(!user || user.role !== "customer") && (
        <div className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Ingin Melihat Poin & Rewards Anda?
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Daftar sebagai customer untuk mengakses sistem loyalty points dan
              dapatkan reward menarik!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md flex items-center justify-center">
                  <FaUsers className="w-5 h-5 mr-2" />
                  Daftar Sebagai Customer
                </button>
              </Link>
              <Link to="/login">
                <button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-md">
                  Login Customer
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Membership;