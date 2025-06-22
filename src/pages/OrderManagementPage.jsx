import React, { useState, useEffect } from 'react';

const OrderManagementPage = () => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orderList');
    return saved ? JSON.parse(saved) : [
      {
        id: 'ORD001',
        pelanggan: 'Ginta',
        layanan: 'Reguler',
        tanggal: '2025-06-21',
        status: 'Menunggu',
        catatan: 'Ingin ambil jam 14:00',
        pembayaran: 'Tunai'
      },
      {
        id: 'ORD002',
        pelanggan: 'Salsa',
        layanan: 'Express',
        tanggal: '2025-06-21',
        status: 'Diproses',
        catatan: 'Pakai pewangi khusus',
        pembayaran: 'Transfer'
      },
      {
        id: 'ORD003',
        pelanggan: 'Atul',
        layanan: 'Cuci Lipat',
        tanggal: '2025-06-20',
        status: 'Selesai',
        catatan: '-',
        pembayaran: 'E-Wallet'
      }
    ];
  });

  const [modalOrder, setModalOrder] = useState(null);
  const [formData, setFormData] = useState({
    pelanggan: '',
    layanan: '',
    tanggal: '',
    status: 'Menunggu',
    catatan: '',
    pembayaran: ''
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem('orderList', JSON.stringify(orders));
  }, [orders]);

  const handleOpenModal = (order) => {
    setModalOrder(order);
    setFormData(order);
    setShowForm(true);
  };

  const handleCloseModal = () => {
    setModalOrder(null);
    setShowForm(false);
    setFormData({
      pelanggan: '',
      layanan: '',
      tanggal: '',
      status: 'Menunggu',
      catatan: '',
      pembayaran: ''
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus pesanan ini?')) {
      setOrders(prev => prev.filter(o => o.id !== id));
      handleCloseModal();
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (modalOrder) {
      setOrders(prev => prev.map(o => o.id === modalOrder.id ? { ...formData, id: modalOrder.id } : o));
    } else {
      const newId = `ORD${String(orders.length + 1).padStart(3, '0')}`;
      setOrders(prev => [...prev, { ...formData, id: newId }]);
    }
    handleCloseModal();
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Menunggu': return 'bg-yellow-100 text-yellow-800';
      case 'Diproses': return 'bg-blue-100 text-blue-800';
      case 'Selesai': return 'bg-green-100 text-green-800';
      case 'Dibatalkan': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8fc] p-6 text-[#2e3271]">
      <h1 className="text-xl font-semibold mb-4">Order Management</h1>

      <div className="bg-white rounded-2xl p-6 shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-medium">Daftar Pesanan</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#4c44c7] text-white px-4 py-2 rounded-full shadow flex items-center gap-2 hover:bg-[#3c38a5]"
          >
            + Tambah Pesanan
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-sm rounded-xl">
            <thead>
              <tr className="text-left bg-[#f3f6fb] text-[#5b5f73]">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Nama Pelanggan</th>
                <th className="py-2 px-4">Layanan</th>
                <th className="py-2 px-4">Tanggal</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Pembayaran</th>
                <th className="py-2 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-[#3e4161]">
              {orders.map(order => (
                <tr key={order.id} className="border-t hover:bg-[#f9f9fc]">
                  <td className="py-2 px-4 font-semibold">#{order.id}</td>
                  <td className="py-2 px-4">{order.pelanggan}</td>
                  <td className="py-2 px-4">{order.layanan}</td>
                  <td className="py-2 px-4">{new Date(order.tanggal).toLocaleDateString('id-ID')}</td>
                  <td className="py-2 px-4">
                    <span className={`px-3 py-1 text-xs rounded-full font-semibold ${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">{order.pembayaran}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleOpenModal(order)}
                      className="bg-[#4c44c7] text-white text-sm px-4 py-1 rounded-full hover:bg-[#3a35a5]"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {(showForm || modalOrder) && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{modalOrder ? 'Detail Pesanan' : 'Tambah Pesanan'}</h3>
              <button onClick={handleCloseModal} className="text-2xl text-gray-400 hover:text-red-600">&times;</button>
            </div>
            <form onSubmit={handleSubmitForm} className="grid gap-4">
              <input name="pelanggan" placeholder="Nama Pelanggan" value={formData.pelanggan} onChange={handleFormChange} className="border rounded-lg px-4 py-2" required />
              <select name="layanan" value={formData.layanan} onChange={handleFormChange} className="border rounded-lg px-4 py-2" required>
                <option value="">Pilih Layanan</option>
                <option value="Express">Express</option>
                <option value="Reguler">Reguler</option>
                <option value="Cuci Lipat">Cuci Lipat</option>
                <option value="Strika Saja">Strika Saja</option>
              </select>
              <input name="tanggal" type="date" value={formData.tanggal} onChange={handleFormChange} className="border rounded-lg px-4 py-2" required />
              <select name="status" value={formData.status} onChange={handleFormChange} className="border rounded-lg px-4 py-2" required>
                <option value="Menunggu">Menunggu</option>
                <option value="Diproses">Diproses</option>
                <option value="Selesai">Selesai</option>
                <option value="Dibatalkan">Dibatalkan</option>
              </select>
              <select name="pembayaran" value={formData.pembayaran} onChange={handleFormChange} className="border rounded-lg px-4 py-2" required>
                <option value="">Pilih Metode Pembayaran</option>
                <option value="Tunai">Tunai</option>
                <option value="Transfer">Transfer</option>
                <option value="E-Wallet">E-Wallet</option>
              </select>
              <textarea name="catatan" rows="3" placeholder="Catatan" value={formData.catatan} onChange={handleFormChange} className="border rounded-lg px-4 py-2" />

              <div className="flex justify-between mt-2">
                {modalOrder && (
                  <button type="button" onClick={() => handleDelete(modalOrder.id)} className="text-red-600 hover:text-red-800">Hapus</button>
                )}
                <div className="flex gap-3 ml-auto">
                  <button type="button" onClick={handleCloseModal} className="border px-4 py-2 rounded text-gray-600 hover:bg-gray-100">Batal</button>
                  <button type="submit" className="bg-[#4c44c7] text-white px-4 py-2 rounded hover:bg-[#3a35a5]">
                    {modalOrder ? 'Simpan Perubahan' : 'Simpan Pesanan'}
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
export default OrderManagementPage;