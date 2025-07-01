import React, { useState, useEffect } from "react";

const LOCAL_KEY_LOYALTY = "loyalty_data";
const LOCAL_KEY_MEMBER = "loyalty_memberships";

const LoyaltyTabs = () => {
  const [activeTab, setActiveTab] = useState("loyalty");

  // --- Loyalty ---
  const [loyalties, setLoyalties] = useState(() => {
    const data = localStorage.getItem(LOCAL_KEY_LOYALTY);
    return data ? JSON.parse(data) : [];
  });

  const [loyaltyForm, setLoyaltyForm] = useState({
    id: "",
    namapelanggan: "",
    levelmember: "Basic",
    jumlahpoint: "",
    voucer: "",
    riwayattukar: ""
  });

  const [editingLoyalty, setEditingLoyalty] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // --- Membership ---
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem(LOCAL_KEY_MEMBER);
    return saved ? JSON.parse(saved) : [];
  });

  const [memberForm, setMemberForm] = useState({
    id: "",
    namapelanggan: "",
    email: "",
    nohp: "",
    member: "Reguler",
    harga: "",
    status: "Diproses",
    tanggalDaftar: "",
    masaBerlaku: ""
  });

  const [editingMember, setEditingMember] = useState(null);
  const [showMemberForm, setShowMemberForm] = useState(false);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY_LOYALTY, JSON.stringify(loyalties));
  }, [loyalties]);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY_MEMBER, JSON.stringify(members));
  }, [members]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (activeTab === "loyalty") {
      setLoyaltyForm((prev) => ({ ...prev, [name]: value }));
    } else {
      setMemberForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (activeTab === "loyalty") {
      if (!loyaltyForm.namapelanggan || !loyaltyForm.jumlahpoint) {
        alert("Harap isi data pelanggan dan poin!");
        return;
      }
      if (editingLoyalty) {
        setLoyalties((prev) =>
          prev.map((item) =>
            item.id === editingLoyalty.id ? { ...loyaltyForm, id: editingLoyalty.id } : item
          )
        );
      } else {
        const newId = `CS${String(loyalties.length + 1).padStart(3, "0")}`;
        setLoyalties((prev) => [...prev, { ...loyaltyForm, id: newId }]);
      }
      handleCloseForm();
    } else {
      if (!memberForm.namapelanggan || !memberForm.harga || !memberForm.tanggalDaftar) {
        alert("Harap lengkapi semua data penting!");
        return;
      }
      if (editingMember) {
        setMembers((prev) =>
          prev.map((m) => (m.id === editingMember.id ? { ...memberForm, id: editingMember.id } : m))
        );
      } else {
        const newId = Date.now().toString();
        setMembers((prev) => [...prev, { ...memberForm, id: newId }]);
      }
      handleCloseForm();
    }
  };

  const handleEdit = (item) => {
    if (activeTab === "loyalty") {
      setEditingLoyalty(item);
      setLoyaltyForm(item);
    } else {
      setEditingMember(item);
      setMemberForm(item);
    }
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus?")) {
      if (activeTab === "loyalty") {
        setLoyalties((prev) => prev.filter((item) => item.id !== id));
      } else {
        setMembers((prev) => prev.filter((m) => m.id !== id));
      }
      handleCloseForm();
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingLoyalty(null);
    setEditingMember(null);
    setLoyaltyForm({ id: "", namapelanggan: "", levelmember: "Basic", jumlahpoint: "", voucer: "", riwayattukar: "" });
    setMemberForm({ id: "", namapelanggan: "", email: "", nohp: "", member: "Reguler", harga: "", status: "Diproses", tanggalDaftar: "", masaBerlaku: "" });
  };

  const getStatusClass = (level) => {
    switch (level) {
      case "Basic": return "bg-gray-100 text-gray-700";
      case "Reguler": return "bg-blue-100 text-blue-700";
      case "Royal": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex space-x-10 border-b mb-6">
        {['loyalty', 'membership'].map(tab => (
          <button
            key={tab}
            className={`pb-2 font-semibold ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'loyalty' ? 'Loyalty' : 'Membership'}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-semibold">
            {activeTab === 'loyalty' ? 'Loyalty Management' : 'Membership Management'}
          </h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700"
          >
            + Tambah {activeTab === 'loyalty' ? 'Loyalty' : 'Member'}
          </button>
        </div>

        <div className="overflow-x-auto">
          {activeTab === 'loyalty' ? (
            <table className="min-w-full bg-white text-sm rounded-xl">
              <thead>
                <tr className="text-left bg-gray-100 text-gray-700">
                  <th className="py-2 px-4">ID</th>
                  <th className="py-2 px-4">Nama</th>
                  <th className="py-2 px-4">Level</th>
                  <th className="py-2 px-4">Point</th>
                  <th className="py-2 px-4">Voucher</th>
                  <th className="py-2 px-4">Riwayat</th>
                  <th className="py-2 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loyalties.map((l) => (
                  <tr key={l.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2 font-semibold">#{l.id}</td>
                    <td className="px-4 py-2">{l.namapelanggan}</td>
                    <td className="px-4 py-2">
                      <span className={`px-3 py-1 text-xs rounded-full font-semibold ${getStatusClass(l.levelmember)}`}>{l.levelmember}</span>
                    </td>
                    <td className="px-4 py-2">{l.jumlahpoint}</td>
                    <td className="px-4 py-2">{l.voucer || "-"}</td>
                    <td className="px-4 py-2">{l.riwayattukar || "-"}</td>
                    <td className="px-4 py-2 text-right space-x-2">
                      <button onClick={() => handleEdit(l)} className="text-indigo-600">Edit</button>
                      <button onClick={() => handleDelete(l.id)} className="text-red-600">Hapus</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="min-w-full bg-white text-sm rounded-xl">
              <thead>
                <tr className="text-left bg-gray-100 text-gray-700">
                  <th className="py-2 px-4">Nama</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">No HP</th>
                  <th className="py-2 px-4">Member</th>
                  <th className="py-2 px-4">Harga</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Tgl Daftar</th>
                  <th className="py-2 px-4">Masa Berlaku</th>
                  <th className="py-2 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
                  <tr key={m.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{m.namapelanggan}</td>
                    <td className="px-4 py-2">{m.email}</td>
                    <td className="px-4 py-2">{m.nohp}</td>
                    <td className="px-4 py-2">{m.member}</td>
                    <td className="px-4 py-2">Rp. {Number(m.harga || 0).toLocaleString()}</td>
                    <td className="px-4 py-2 text-sm font-semibold {m.status === 'Paid' ? 'text-green-600' : 'text-red-600'}">{m.status}</td>
                    <td className="px-4 py-2">{m.tanggalDaftar}</td>
                    <td className="px-4 py-2">{m.masaBerlaku}</td>
                    <td className="px-4 py-2 text-right space-x-2">
                      <button onClick={() => handleEdit(m)} className="text-indigo-600">Edit</button>
                      <button onClick={() => handleDelete(m.id)} className="text-red-600">Hapus</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {activeTab === 'loyalty'
                  ? editingLoyalty ? 'Edit Loyalty' : 'Tambah Loyalty'
                  : editingMember ? 'Edit Member' : 'Tambah Member'}
              </h3>
              <button onClick={handleCloseForm} className="text-2xl text-gray-400 hover:text-red-600">&times;</button>
            </div>
            <form onSubmit={handleSubmitForm} className="grid gap-4">
              {activeTab === 'loyalty' ? (
                <>
                  <input name="namapelanggan" placeholder="Nama Pelanggan" value={loyaltyForm.namapelanggan} onChange={handleFormChange} className="border rounded-lg px-4 py-2" required />
                  <select name="levelmember" value={loyaltyForm.levelmember} onChange={handleFormChange} className="border rounded-lg px-4 py-2" required>
                    <option>Basic</option>
                    <option>Reguler</option>
                    <option>Royal</option>
                  </select>
                  <input name="jumlahpoint" placeholder="Jumlah Point" value={loyaltyForm.jumlahpoint} onChange={handleFormChange} className="border rounded-lg px-4 py-2" required />
                  <input name="voucer" placeholder="Voucher" value={loyaltyForm.voucer} onChange={handleFormChange} className="border rounded-lg px-4 py-2" />
                  <textarea name="riwayattukar" rows="3" placeholder="Riwayat Tukar" value={loyaltyForm.riwayattukar} onChange={handleFormChange} className="border rounded-lg px-4 py-2" />
                </>
              ) : (
                <>
                  <input name="namapelanggan" placeholder="Nama Pelanggan" value={memberForm.namapelanggan} onChange={handleFormChange} className="border rounded-lg px-4 py-2" required />
                  <input name="email" placeholder="Email" value={memberForm.email} onChange={handleFormChange} className="border rounded-lg px-4 py-2" />
                  <input name="nohp" placeholder="No HP" value={memberForm.nohp} onChange={handleFormChange} className="border rounded-lg px-4 py-2" />
                  <select name="member" value={memberForm.member} onChange={handleFormChange} className="border rounded-lg px-4 py-2">
                    <option>Reguler</option>
                    <option>Loyal</option>
                    <option>VIP</option>
                  </select>
                  <input name="harga" placeholder="Harga" value={memberForm.harga} onChange={handleFormChange} className="border rounded-lg px-4 py-2" required />
                  <select name="status" value={memberForm.status} onChange={handleFormChange} className="border rounded-lg px-4 py-2">
                    <option>Diproses</option>
                    <option>Paid</option>
                  </select>
                  <input type="date" name="tanggalDaftar" value={memberForm.tanggalDaftar} onChange={handleFormChange} className="border rounded-lg px-4 py-2" required />
                  <input type="date" name="masaBerlaku" value={memberForm.masaBerlaku} onChange={handleFormChange} className="border rounded-lg px-4 py-2" />
                </>
              )}

              <div className="flex justify-between mt-2">
                {(editingLoyalty || editingMember) && (
                  <button type="button" onClick={() => handleDelete(activeTab === 'loyalty' ? editingLoyalty.id : editingMember.id)} className="text-red-600 hover:text-red-800">Hapus</button>
                )}
                <div className="flex gap-3 ml-auto">
                  <button type="button" onClick={handleCloseForm} className="border px-4 py-2 rounded text-gray-600 hover:bg-gray-100">Batal</button>
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    {editingLoyalty || editingMember ? 'Simpan Perubahan' : 'Simpan'}
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

export default LoyaltyTabs;