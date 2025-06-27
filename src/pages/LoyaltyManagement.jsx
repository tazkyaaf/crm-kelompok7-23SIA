import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

const LOCAL_KEY_LOYALTY = "loyalty_data";
const LOCAL_KEY_MEMBER = "loyalty_memberships";

const LoyaltyTabs = () => {
  const [activeTab, setActiveTab] = useState("loyalty");

  // ----- Membership -----
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem(LOCAL_KEY_MEMBER);
    return saved ? JSON.parse(saved) : [];
  });

  const [showMemberForm, setShowMemberForm] = useState(false);
  const [memberForm, setMemberForm] = useState({
    id: "",
    namapelanggan: "",
    email: "",
    nohp: "",
    member: "Reguler",
    harga: "",
    status: "Diproses",
    tanggalDaftar: "",
    masaBerlaku: "",
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY_MEMBER, JSON.stringify(members));
  }, [members]);

  const saveMember = () => {
    const data = { ...memberForm };
    if (!data.namapelanggan || !data.harga || !data.tanggalDaftar) {
      alert("Harap lengkapi semua data penting!");
      return;
    }
    if (!data.id) data.id = Date.now().toString();
    const updated = members.some((m) => m.id === data.id)
      ? members.map((m) => (m.id === data.id ? data : m))
      : [...members, data];
    setMembers(updated);
    setShowMemberForm(false);
    resetMemberForm();
  };

  const resetMemberForm = () => {
    setMemberForm({
      id: "",
      namapelanggan: "",
      email: "",
      nohp: "",
      member: "Reguler",
      harga: "",
      status: "Diproses",
      tanggalDaftar: "",
      masaBerlaku: "",
    });
  };

  const deleteMember = (id) => {
    if (window.confirm("Yakin ingin menghapus?"))
      setMembers(members.filter((m) => m.id !== id));
  };

  // ----- Loyalty -----
  const [loyalties, setLoyalties] = useState(() => {
    const data = localStorage.getItem(LOCAL_KEY_LOYALTY);
    return data ? JSON.parse(data) : [];
  });

  const [showLoyaltyForm, setShowLoyaltyForm] = useState(false);
  const [loyaltyForm, setLoyaltyForm] = useState({
    id: "",
    namapelanggan: "",
    levelmember: "Basic",
    jumlahpoint: "",
    voucer: "",
    riwayattukar: "",
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY_LOYALTY, JSON.stringify(loyalties));
  }, [loyalties]);

  const saveLoyalty = () => {
    const data = { ...loyaltyForm };
    if (!data.namapelanggan || !data.jumlahpoint) {
      alert("Harap isi data pelanggan dan poin!");
      return;
    }
    if (!data.id) data.id = `CS${String(loyalties.length + 1).padStart(3, "0")}`;
    const updated = loyalties.some((l) => l.id === data.id)
      ? loyalties.map((l) => (l.id === data.id ? data : l))
      : [...loyalties, data];
    setLoyalties(updated);
    setShowLoyaltyForm(false);
    resetLoyaltyForm();
  };

  const resetLoyaltyForm = () => {
    setLoyaltyForm({
      id: "",
      namapelanggan: "",
      levelmember: "Basic",
      jumlahpoint: "",
      voucer: "",
      riwayattukar: "",
    });
  };

  const deleteLoyalty = (id) => {
    if (window.confirm("Yakin ingin hapus?"))
      setLoyalties(loyalties.filter((l) => l.id !== id));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex space-x-10 border-b mb-6">
        {["loyalty", "membership"].map((tab) => (
          <button
            key={tab}
            className={`pb-2 font-semibold ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-400"
            }`}
            onClick={() => {
              setActiveTab(tab);
              setShowMemberForm(false);
              setShowLoyaltyForm(false);
            }}
          >
            {tab === "loyalty" ? "Loyalty" : "Membership"}
          </button>
        ))}
      </div>

      {activeTab === "loyalty" && (
        <div>
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold text-[#004AAD]">Loyalty Management</h2>
            <button
              onClick={() => {
                setShowLoyaltyForm(!showLoyaltyForm);
                resetLoyaltyForm();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#004AAD] text-white rounded hover:bg-blue-700"
            >
              <Plus size={18} />
              {showLoyaltyForm ? "Tutup" : "Tambah Loyalty"}
            </button>
          </div>

          {showLoyaltyForm && (
            <div className="bg-white p-4 rounded-xl shadow mb-6 grid grid-cols-2 gap-4">
              <input placeholder="Nama Pelanggan" value={loyaltyForm.namapelanggan} onChange={(e) => setLoyaltyForm({ ...loyaltyForm, namapelanggan: e.target.value })} className="border p-2 rounded" />
              <select value={loyaltyForm.levelmember} onChange={(e) => setLoyaltyForm({ ...loyaltyForm, levelmember: e.target.value })} className="border p-2 rounded">
                <option>Basic</option>
                <option>Reguler</option>
                <option>Royal</option>
              </select>
              <input placeholder="Jumlah Point" value={loyaltyForm.jumlahpoint} onChange={(e) => setLoyaltyForm({ ...loyaltyForm, jumlahpoint: e.target.value })} className="border p-2 rounded" />
              <input placeholder="Voucher" value={loyaltyForm.voucer} onChange={(e) => setLoyaltyForm({ ...loyaltyForm, voucer: e.target.value })} className="border p-2 rounded" />
              <input placeholder="Riwayat Tukar" value={loyaltyForm.riwayattukar} onChange={(e) => setLoyaltyForm({ ...loyaltyForm, riwayattukar: e.target.value })} className="border p-2 rounded col-span-2" />
              <button onClick={saveLoyalty} className="col-span-2 bg-green-600 text-white rounded py-2 hover:bg-green-700">💾 Simpan</button>
            </div>
          )}

          <table className="min-w-full table-auto text-sm bg-white shadow rounded-xl">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Nama Pelanggan</th>
                <th className="px-4 py-3">Level Member</th>
                <th className="px-4 py-3">Jumlah Point</th>
                <th className="px-4 py-3">Voucher</th>
                <th className="px-4 py-3">Riwayat Tukar</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loyalties.map((l, idx) => (
                <tr key={l.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">#CS{String(idx + 1).padStart(3, "0")}</td>
                  <td className="px-4 py-2 text-blue-700 font-medium">{l.namapelanggan}</td>
                  <td className="px-4 py-2">{l.levelmember}</td>
                  <td className="px-4 py-2">{l.jumlahpoint}</td>
                  <td className="px-4 py-2">{l.voucer || "0 Voucher"}</td>
                  <td className="px-4 py-2">{l.riwayattukar || "Belum Ada"}</td>
                  <td className="px-4 py-2 text-right space-x-2">
                    <button onClick={() => { setLoyaltyForm(l); setShowLoyaltyForm(true); }} className="text-green-600"><Pencil size={16} /></button>
                    <button onClick={() => deleteLoyalty(l.id)} className="text-red-600"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "membership" && (
        <div>
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold text-[#004AAD]">Membership</h2>
            <button
              onClick={() => {
                setShowMemberForm(!showMemberForm);
                resetMemberForm();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#004AAD] text-white rounded hover:bg-blue-700"
            >
              <Plus size={18} />
              {showMemberForm ? "Tutup" : "Tambah Member"}
            </button>
          </div>

          {showMemberForm && (
            <div className="bg-white p-4 rounded-xl shadow mb-6 grid grid-cols-2 gap-4">
              <input placeholder="Nama Pelanggan" value={memberForm.namapelanggan} onChange={(e) => setMemberForm({ ...memberForm, namapelanggan: e.target.value })} className="border p-2 rounded" />
              <input placeholder="Email" value={memberForm.email} onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })} className="border p-2 rounded" />
              <input placeholder="No. HP" value={memberForm.nohp} onChange={(e) => setMemberForm({ ...memberForm, nohp: e.target.value })} className="border p-2 rounded" />
              <select value={memberForm.member} onChange={(e) => setMemberForm({ ...memberForm, member: e.target.value })} className="border p-2 rounded">
                <option>Reguler</option>
                <option>Loyal</option>
                <option>VIP</option>
              </select>
              <input placeholder="Harga" value={memberForm.harga} onChange={(e) => setMemberForm({ ...memberForm, harga: e.target.value })} className="border p-2 rounded" />
              <select value={memberForm.status} onChange={(e) => setMemberForm({ ...memberForm, status: e.target.value })} className="border p-2 rounded">
                <option>Diproses</option>
                <option>Paid</option>
              </select>
              <input type="date" value={memberForm.tanggalDaftar} onChange={(e) => setMemberForm({ ...memberForm, tanggalDaftar: e.target.value })} className="border p-2 rounded" />
              <input type="date" value={memberForm.masaBerlaku} onChange={(e) => setMemberForm({ ...memberForm, masaBerlaku: e.target.value })} className="border p-2 rounded" />
              <button onClick={saveMember} className="col-span-2 bg-green-600 text-white rounded py-2 hover:bg-green-700">💾 Simpan</button>
            </div>
          )}

          <table className="min-w-full table-auto text-sm bg-white shadow rounded-xl">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">No HP</th>
                <th className="px-4 py-3">Member</th>
                <th className="px-4 py-3">Harga</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Tgl Daftar</th>
                <th className="px-4 py-3">Masa Berlaku</th>
                <th className="px-4 py-3 text-right">Aksi</th>
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
                  <td className={`px-4 py-2 ${m.status === "Paid" ? "text-green-600" : "text-red-500"}`}>{m.status}</td>
                  <td className="px-4 py-2">{m.tanggalDaftar}</td>
                  <td className="px-4 py-2">{m.masaBerlaku}</td>
                  <td className="px-4 py-2 text-right space-x-2">
                    <button onClick={() => { setMemberForm(m); setShowMemberForm(true); }} className="text-indigo-600"><Pencil size={16} /></button>
                    <button onClick={() => deleteMember(m.id)} className="text-red-600"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LoyaltyTabs;
