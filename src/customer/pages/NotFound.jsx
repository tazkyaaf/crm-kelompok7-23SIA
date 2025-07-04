import { FaHome, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mt-4">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-gray-600 mt-2">
            Maaf, halaman yang Anda cari tidak ditemukan. Mungkin sudah dipindahkan atau tidak pernah ada.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center px-5 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition"
            >
              <FaArrowLeft className="mr-2" />
              Kembali
            </button>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center justify-center px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              <FaHome className="mr-2" />
              Beranda
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
