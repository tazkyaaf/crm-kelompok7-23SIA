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
    <div className="management-diskon min-h-screen bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 py-8 px-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white">Manajemen Promo Laundry</h1>
        <p className="text-lg text-gray-200">Kelola semua promo dengan mudah dan efisien</p>
      </header>

      <div className="flex gap-8">
        {/* Daftar Promo */}
        <div className="promo-list flex-1 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6">Daftar Promo Aktif</h2>
          {promos.length === 0 ? (
            <p className="text-center text-lg text-gray-500">Belum ada promo yang tersedia</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {promos.map((promo) => (
                <div key={promo.kode} className="card bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
                  <h3 className="text-xl font-semibold text-blue-600">{promo.kode}</h3>
                  <p className="text-gray-700 mt-2">{promo.deskripsi}</p>
                  <p className="text-blue-500 font-semibold mt-4">Diskon: {promo.diskon}%</p>
                  <p className="text-gray-600 mt-2">Aktif Sampai: {promo.akhir}</p>
                  <div className="mt-4 flex gap-4 justify-center">
                    {/* Edit icon */}
                    <span
                      onClick={() => handleEditPromo(promo)}
                      className="cursor-pointer text-yellow-500 hover:text-yellow-700 text-2xl transition-all duration-300"
                      title="Edit Promo"
                    >
                      <i className="fas fa-edit"></i>
                    </span>

                    {/* Delete icon */}
                    <span
                      onClick={() => handleDeletePromo(promo.kode)}
                      className="cursor-pointer text-red-500 hover:text-red-700 text-2xl transition-all duration-300"
                      title="Hapus Promo"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form Tambah/Edit Promo */}
        <div className="form-promo flex-1 bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6">
            {editMode ? 'Edit Promo' : 'Tambah Promo Baru'}
          </h2>
          <form onSubmit={editMode ? handleUpdatePromo : handleAddPromo}>
            <div className="mb-6">
              <label htmlFor="kode-promo" className="block text-blue-700 font-semibold">Kode Promo</label>
              <input
                type="text"
                id="kode-promo"
                name="kode"
                value={newPromo.kode}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 mt-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="deskripsi-promo" className="block text-blue-700 font-semibold">Deskripsi Promo</label>
              <textarea
                id="deskripsi-promo"
                name="deskripsi"
                value={newPromo.deskripsi}
                onChange={handleInputChange}
                rows="4"
                required
                className="w-full px-4 py-3 mt-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              ></textarea>
            </div>

            <div className="mb-6">
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
                className="w-full px-4 py-3 mt-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="tanggal-akhir" className="block text-blue-700 font-semibold">Aktif Sampai</label>
              <input
                type="date"
                id="tanggal-akhir"
                name="akhir"
                value={newPromo.akhir}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 mt-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
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
