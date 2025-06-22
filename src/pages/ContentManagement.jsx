import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';

const ContentManagement = () => {
  const [contents, setContents] = useState(() => {
    const saved = localStorage.getItem('contentList');
    return saved ? JSON.parse(saved) : [
      {
        idKonten: 'K001',
        judul: 'Promo Cuci Lipat',
        kategori: 'Banner',
        isi: 'Diskon 20% untuk layanan cuci lipat',
        gambar: '',
        tanggal: '2025-06-21'
      }
    ];
  });

  const [formData, setFormData] = useState({
    judul: '',
    kategori: '',
    isi: '',
    gambar: '',
    tanggal: ''
  });

  const [editingContent, setEditingContent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem('contentList', JSON.stringify(contents));
  }, [contents]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setFormData(prev => ({ ...prev, gambar: reader.result }));
        } else {
          alert("Gagal memuat gambar.");
        }
      };
      reader.onerror = () => {
        alert("Terjadi kesalahan saat memuat gambar.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = (content) => {
    setEditingContent({ ...content });
    setFormData({
      judul: content.judul,
      kategori: content.kategori,
      isi: content.isi,
      gambar: content.gambar,
      tanggal: content.tanggal
    });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingContent) {
      setContents(prev =>
        prev.map(c =>
          c.idKonten === editingContent.idKonten
            ? { ...c, ...formData }
            : c
        )
      );
    } else {
      const newId = `K${String(contents.length + 1).padStart(3, '0')}`;
      setContents(prev => [...prev, { ...formData, idKonten: newId }]);
    }

    handleCloseForm();
  };

  const handleDelete = () => {
    if (editingContent && window.confirm('Yakin ingin menghapus konten ini?')) {
      setContents(prev => prev.filter(c => c.idKonten !== editingContent.idKonten));
      handleCloseForm();
    }
  };

  const handleCloseForm = () => {
    setFormData({ judul: '', kategori: '', isi: '', gambar: '', tanggal: '' });
    setEditingContent(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-[#f6f8fc] p-6 text-[#2e3271]">
      <h1 className="text-xl font-semibold mb-4">Content Management</h1>

      <div className="bg-white rounded-2xl p-6 shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-medium">Daftar Konten</h2>
          <button
            onClick={() => {
              setFormData({ judul: '', kategori: '', isi: '', gambar: '', tanggal: '' });
              setEditingContent(null);
              setShowForm(true);
            }}
            className="bg-[#4c44c7] text-white px-4 py-2 rounded-full shadow hover:bg-[#3c38a5]"
          >
            + Tambah Konten
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-sm rounded-xl">
            <thead>
              <tr className="bg-[#f3f6fb] text-[#5b5f73] text-left">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Judul</th>
                <th className="py-2 px-4">Kategori</th>
                <th className="py-2 px-4">Isi</th>
                <th className="py-2 px-4">Gambar</th>
                <th className="py-2 px-4">Tanggal</th>
                <th className="py-2 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-[#3e4161]">
              {contents.map(content => (
                <tr key={content.idKonten} className="border-t hover:bg-[#f9f9fc]">
                  <td className="py-2 px-4 font-semibold">#{content.idKonten}</td>
                  <td className="py-2 px-4">{content.judul}</td>
                  <td className="py-2 px-4">{content.kategori}</td>
                  <td className="py-2 px-4">{content.isi}</td>
                  <td className="py-2 px-4">
                    {content.gambar && typeof content.gambar === 'string' ? (
                      <img src={content.gambar} alt="Preview" className="h-12 w-12 object-cover rounded-md" />
                    ) : (
                      <span className="text-gray-400 italic">Tidak ada</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {content.tanggal ? new Date(content.tanggal).toLocaleDateString('id-ID') : '-'}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleEditClick(content)}
                      className="bg-[#4c44c7] text-white px-3 py-1 rounded-full text-xs hover:bg-[#3a35a5]"
                    >
                      <FaEdit className="inline mr-1" /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingContent ? 'Edit Konten' : 'Tambah Konten'}
              </h3>
              <button onClick={handleCloseForm} className="text-2xl text-gray-400 hover:text-red-600">
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <input
                name="judul"
                placeholder="Judul"
                value={formData.judul}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2"
                required
              />
              <input
                name="kategori"
                placeholder="Kategori"
                value={formData.kategori}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2"
                required
              />
              <textarea
                name="isi"
                placeholder="Isi"
                value={formData.isi}
                onChange={handleChange}
                rows="3"
                className="border rounded-lg px-4 py-2"
                required
              />
              <input
                name="tanggal"
                type="date"
                value={formData.tanggal}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="border rounded-lg px-4 py-2"
              />
              {formData.gambar && (
                <img
                  src={formData.gambar}
                  alt="Preview"
                  className="h-32 object-cover rounded-md"
                />
              )}
              <div className="flex justify-between items-center mt-4">
                {editingContent && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="text-red-600 hover:underline text-sm"
                  >
                    🗑️ Hapus Konten
                  </button>
                )}
                <div className="flex gap-3 ml-auto">
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="border px-4 py-2 rounded text-gray-600 hover:bg-gray-100"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-[#4c44c7] text-white px-4 py-2 rounded hover:bg-[#3a35a5]"
                  >
                    {editingContent ? 'Simpan Perubahan' : 'Simpan Konten'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentManagement;
