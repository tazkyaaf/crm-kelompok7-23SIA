import React, { useState, useEffect } from 'react'

const ProduksiPage = () => {
  const localKey = 'produksiData'

  // Ambil data dari localStorage saat pertama kali komponen dimuat
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem(localKey)
    return saved ? JSON.parse(saved) : []
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ id: null, nota: '', konsumen: '', status: 'Antri' })

  // Simpan ke localStorage setiap kali data berubah
  useEffect(() => {
    localStorage.setItem(localKey, JSON.stringify(data))
  }, [data])

  const openModal = (item = { nota: '', konsumen: '', status: 'Antri' }) => {
    setFormData(item)
    setIsModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.id) {
      setData(data.map((item) => (item.id === formData.id ? formData : item)))
    } else {
      const newId = data.length ? Math.max(...data.map(i => i.id)) + 1 : 1
      setData([...data, { ...formData, id: newId }])
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus data ini?')) {
      setData(data.filter(item => item.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-8 font-sans text-gray-900">
      <h1 className="text-3xl font-extrabold mb-8 text-purple-700 drop-shadow-sm flex items-center gap-2">
        📋 Antrian Produksi
      </h1>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => openModal()}
          className="bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-semibold px-5 py-3 rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          + Tambah Konsumen
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between"
          >
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">No. Nota</p>
              <h2 className="text-xl font-semibold text-purple-800">{item.nota}</h2>

              <p className="text-xs text-gray-400 uppercase tracking-wide mt-4 font-semibold">Konsumen</p>
              <h3 className="text-lg font-bold text-gray-800">{item.konsumen}</h3>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <span
                className={`inline-block px-4 py-1 rounded-full text-sm font-medium
                  ${item.status === 'Antri'
                    ? 'bg-yellow-100 text-yellow-800'
                    : item.status === 'Selesai'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'}
                `}
              >
                {item.status}
              </span>
              <div className="flex gap-4">
                <button
                  onClick={() => openModal(item)}
                  className="text-purple-600 hover:text-purple-900 font-semibold transition-colors"
                >
                  ✎ Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-800 font-semibold transition-colors"
                >
                  ⊘ Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <form
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-xl max-w-lg w-full p-8 mx-4 animate-fadeIn"
          >
            <h2 className="text-2xl font-bold mb-6 text-purple-700">
              {formData.id ? 'Edit Konsumen' : 'Tambah Konsumen'}
            </h2>

            <label className="block mb-2 text-sm font-medium text-gray-700">No. Nota</label>
            <input
              type="text"
              value={formData.nota}
              onChange={(e) => setFormData({ ...formData, nota: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
              autoFocus
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">Nama Konsumen</label>
            <input
              type="text"
              value={formData.konsumen}
              onChange={(e) => setFormData({ ...formData, konsumen: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-8 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            >
              <option>Antri</option>
              <option>Sedang Diproses</option>
              <option>Selesai</option>
            </select>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
      `}</style>
    </div>
  )
}

export default ProduksiPage
