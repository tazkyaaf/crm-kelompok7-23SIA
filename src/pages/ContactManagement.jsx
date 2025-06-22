import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const ContactManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem('contactList');
    return saved ? JSON.parse(saved) : [
      { id_customer: 'CS001', nama: 'Ginta', email: 'ginta@gmail.com', no_hp: '088212320183', tanggal_terakhir_kontak: '2025-06-20', pesan_terakhir: 'Ada diskon member?' },
      { id_customer: 'CS002', nama: 'Salsa', email: 'salsa@gmail.com', no_hp: '088245320182', tanggal_terakhir_kontak: '2025-06-20', pesan_terakhir: 'Bisa antar di jam 14:00?' },
      { id_customer: 'CS003', nama: 'Atul', email: 'atul@gmail.com', no_hp: '088245320144', tanggal_terakhir_kontak: '2025-06-20', pesan_terakhir: 'Ada diskon member?' },
      { id_customer: 'CS004', nama: 'Agus', email: 'agus@gmail.com', no_hp: '088235320132', tanggal_terakhir_kontak: '2025-06-20', pesan_terakhir: 'Bisa antar di jam 14:00?' },
      { id_customer: 'CS005', nama: 'Joko', email: 'joko@gmail.com', no_hp: '088247320186', tanggal_terakhir_kontak: '2025-06-20', pesan_terakhir: 'Ada diskon member?' }
    ];
  });

  const [formValues, setFormValues] = useState({
    nama: '', email: '', no_hp: '', tanggal_terakhir_kontak: '', pesan_terakhir: '',
  });

  useEffect(() => {
    localStorage.setItem('contactList', JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleAddContactClick = () => {
    setEditingContact(null);
    setFormValues({ nama: '', email: '', no_hp: '', tanggal_terakhir_kontak: '', pesan_terakhir: '' });
    setShowForm(true);
  };

  const handleEditContactClick = (contact) => {
    setEditingContact(contact);
    setFormValues(contact);
    setShowForm(true);
  };

  const handleDeleteContact = (id_customer) => {
    if (window.confirm('Yakin ingin menghapus kontak ini?')) {
      setContacts(prev => prev.filter(c => c.id_customer !== id_customer));
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingContact(null);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (editingContact) {
      setContacts(prev => prev.map(contact => contact.id_customer === editingContact.id_customer ? { ...contact, ...formValues } : contact));
    } else {
      const newId = `CS${String(contacts.length + 1).padStart(3, '0')}`;
      setContacts(prev => [...prev, { id_customer: newId, ...formValues }]);
    }
    handleCloseForm();
  };

  return (
    <div className="min-h-screen bg-[#f6f8fc] p-6 text-[#2e3271]">
      <h1 className="text-xl font-semibold mb-4">Contact Customer</h1>
      <div className="bg-white rounded-2xl p-6 shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-medium">Daftar Kontak</h2>
          <button onClick={handleAddContactClick} className="bg-[#4c44c7] text-white px-4 py-2 rounded-full shadow flex items-center gap-2 hover:bg-[#3c38a5]">
            <FaPlus /> Tambah Contact
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-sm rounded-xl">
            <thead>
              <tr className="text-left bg-[#f3f6fb] text-[#5b5f73]">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Nama Pelanggan</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">No.Hp</th>
                <th className="py-2 px-4">Tanggal Contact</th>
                <th className="py-2 px-4">Pesan</th>
                <th className="py-2 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-[#3e4161]">
              {contacts.map(contact => (
                <tr key={contact.id_customer} className="border-t hover:bg-[#f9f9fc]">
                  <td className="py-2 px-4 font-semibold">#{contact.id_customer}</td>
                  <td className="py-2 px-4">{contact.nama}</td>
                  <td className="py-2 px-4 text-blue-600">
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </td>
                  <td className="py-2 px-4">{contact.no_hp}</td>
                  <td className="py-2 px-4">{new Date(contact.tanggal_terakhir_kontak).toLocaleDateString('id-ID')}</td>
                  <td className="py-2 px-4">"{contact.pesan_terakhir}"</td>
                  <td className="py-2 px-4">
                    <div className="flex gap-3">
                      <button onClick={() => handleEditContactClick(contact)} className="text-blue-500 hover:text-blue-700" title="Edit">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDeleteContact(contact.id_customer)} className="text-red-500 hover:text-red-700" title="Hapus">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{editingContact ? 'Edit Kontak' : 'Tambah Kontak'}</h3>
              <button onClick={handleCloseForm} className="text-2xl text-gray-400 hover:text-red-600">&times;</button>
            </div>
            <form onSubmit={handleSubmitForm} className="grid gap-4">
              <input name="nama" placeholder="Nama" value={formValues.nama} onChange={handleChange} className="border rounded-lg px-4 py-2" required />
              <input name="email" type="email" placeholder="Email" value={formValues.email} onChange={handleChange} className="border rounded-lg px-4 py-2" required />
              <input name="no_hp" type="tel" placeholder="No. HP" value={formValues.no_hp} onChange={handleChange} className="border rounded-lg px-4 py-2" required />
              <input name="tanggal_terakhir_kontak" type="date" value={formValues.tanggal_terakhir_kontak} onChange={handleChange} className="border rounded-lg px-4 py-2" required />
              <textarea name="pesan_terakhir" rows="3" placeholder="Pesan Terakhir" value={formValues.pesan_terakhir} onChange={handleChange} className="border rounded-lg px-4 py-2" required />
              <div className="flex justify-end gap-3 mt-2">
                <button type="button" onClick={handleCloseForm} className="border px-4 py-2 rounded text-gray-600 hover:bg-gray-100">Batal</button>
                <button type="submit" className="bg-[#4c44c7] text-white px-4 py-2 rounded hover:bg-[#3a35a5]">
                  {editingContact ? 'Simpan Perubahan' : 'Simpan Kontak'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default ContactManagement;
