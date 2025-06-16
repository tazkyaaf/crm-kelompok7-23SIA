import React, { useState, useEffect } from 'react';

const ManagementDiskon = () => {
  // Mengambil data dari localStorage jika ada, jika tidak set ke array kosong
  const getSavedPromos = () => {
    const savedPromos = localStorage.getItem('promos');
    return savedPromos ? JSON.parse(savedPromos) : [];
  };

  const [promos, setPromos] = useState(getSavedPromos);
  const [newPromo, setNewPromo] = useState({
    kode: '',
    deskripsi: '',
    diskon: '',
    akhir: ''
  });
  const [editMode, setEditMode] = useState(false); // Menandakan apakah sedang mengedit
  const [editingPromo, setEditingPromo] = useState(null); // Promo yang sedang diedit

  // Fungsi untuk menyimpan data ke localStorage setiap kali promos berubah
  const savePromosToLocalStorage = (promos) => {
    localStorage.setItem('promos', JSON.stringify(promos));
  };

  // Menambahkan promo baru
  const handleAddPromo = (e) => {
    e.preventDefault();
    const updatedPromos = [...promos, newPromo];
    setPromos(updatedPromos);
    savePromosToLocalStorage(updatedPromos);
    setNewPromo({ kode: '', deskripsi: '', diskon: '', akhir: '' });
  };

  // Mengubah input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPromo({ ...newPromo, [name]: value });
  };

  // Menghapus promo
  const handleDeletePromo = (kode) => {
    const updatedPromos = promos.filter(promo => promo.kode !== kode);
    setPromos(updatedPromos);
    savePromosToLocalStorage(updatedPromos);
  };

  // Memulai proses edit
  const handleEditPromo = (promo) => {
    setEditMode(true);
    setEditingPromo(promo);
    setNewPromo({
      kode: promo.kode,
      deskripsi: promo.deskripsi,
      diskon: promo.diskon,
      akhir: promo.akhir
    });
  };

  // Menyimpan perubahan edit promo
  const handleUpdatePromo = (e) => {
    e.preventDefault();
    const updatedPromos = promos.map((promo) =>
      promo.kode === editingPromo.kode ? newPromo : promo
    );
    setPromos(updatedPromos);
    savePromosToLocalStorage(updatedPromos);
    setEditMode(false);
    setEditingPromo(null);
    setNewPromo({ kode: '', deskripsi: '', diskon: '', akhir: '' });
  };

  return (
    <div className="management-diskon px-6 py-4 bg-blue-50 min-h-screen">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-semibold text-blue-700">Manajemen Promo Laundry</h1>
      </header>

      <div className="flex gap-8">
        {/* Daftar Promo */}
        <div className="promo-list flex-1 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Daftar Promo Aktif</h2>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-4 py-2">Kode Promo</th>
                <th className="px-4 py-2">Deskripsi</th>
                <th className="px-4 py-2">Diskon (%)</th>
                <th className="px-4 py-2">Aktif Sampai</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {promos.map((promo) => (
                <tr key={promo.kode} className="hover:bg-blue-100">
                  <td className="px-4 py-2">{promo.kode}</td>
                  <td className="px-4 py-2">{promo.deskripsi}</td>
                  <td className="px-4 py-2">{promo.diskon}%</td>
                  <td className="px-4 py-2">{promo.akhir}</td>
                  <td className="px-4 py-2 flex gap-4 justify-center items-center">
                    {/* Edit icon: tanda tambah */}
                    <span
                      onClick={() => handleEditPromo(promo)}
                      className="cursor-pointer text-yellow-500 text-2xl select-none"
                      title="Edit Promo"
                    >
                      &#43;
                    </span>

                    {/* Delete icon: tong sampah SVG */}
                    <span
                      onClick={() => handleDeletePromo(promo.kode)}
                      className="cursor-pointer text-red-500 hover:text-red-700"
                      title="Hapus Promo"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"
                        />
                      </svg>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Form Tambah/Edit Promo */}
        <div className="form-promo flex-1 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">
            {editMode ? 'Edit Promo' : 'Tambah Promo Baru'}
          </h2>
          <form onSubmit={editMode ? handleUpdatePromo : handleAddPromo}>
            <div className="mb-4">
              <label htmlFor="kode-promo" className="block text-blue-700 font-semibold">Kode Promo</label>
              <input
                type="text"
                id="kode-promo"
                name="kode"
                value={newPromo.kode}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 mt-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="deskripsi-promo" className="block text-blue-700 font-semibold">Deskripsi Promo</label>
              <textarea
                id="deskripsi-promo"
                name="deskripsi"
                value={newPromo.deskripsi}
                onChange={handleInputChange}
                rows="4"
                required
                className="w-full px-4 py-2 mt-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="diskon-promo" className="block text-blue-700 font-semibold">Diskon (%)</label>
              <input
                type="number"
                id="diskon-promo"
                name="diskon"
                value={newPromo.diskon}
                onChange={handleInputChange}
                min="1"
                max="100"
                required
                className="w-full px-4 py-2 mt-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="tanggal-akhir" className="block text-blue-700 font-semibold">Aktif Sampai</label>
              <input
                type="date"
                id="tanggal-akhir"
                name="akhir"
                value={newPromo.akhir}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 mt-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {editMode ? 'Update Promo' : 'Tambah Promo'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManagementDiskon;
