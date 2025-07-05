import React, { useState, useEffect } from 'react';
import { ThumbsUp, Eye, Plus } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'social_media_posts';

const SocialMediaManagement = () => {
  const [posts, setPosts] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    platform: '',
    date: '',
    description: '',
    engagement: '',
    type: 'like',
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const handleAddClick = () => {
    setFormData({
      id: '',
      platform: '',
      date: '',
      description: '',
      engagement: '',
      type: 'like',
    });
    setFormVisible(true);
  };

  const handleEdit = (id) => {
    const postToEdit = posts.find((post) => post.id === id);
    if (postToEdit) {
      setFormData(postToEdit);
      setFormVisible(true);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm(`Yakin ingin menghapus postingan ${id}?`)) {
      const updatedPosts = posts.filter((post) => post.id !== id);
      setPosts(updatedPosts);
      setFormVisible(false);
    }
  };

  
  const handleSave = () => {
    const updated = { ...formData };
    if (!updated.id) {
      updated.id = Date.now().toString();
    }

    const exists = posts.some((p) => p.id === updated.id);
    const newPosts = exists
      ? posts.map((p) => (p.id === updated.id ? updated : p))
      : [...posts, updated];

    setPosts(newPosts);
    setFormVisible(false);
    setFormData({
      id: '',
      platform: '',
      date: '',
      description: '',
      engagement: '',
      type: 'like',
    });
  };


  return (
    <div className="min-h-screen bg-[#f6f8fc] p-6 text-[#2e3271]">
      <h1 className="text-xl font-semibold mb-4">Social Media Management</h1>

      <div className="bg-white rounded-2xl p-6 shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-medium">Daftar Postingan</h2>
          <button
            onClick={handleAddClick}
            className="bg-[#4c44c7] text-white px-4 py-2 rounded-full shadow flex items-center gap-2 hover:bg-[#3c38a5]"
          >
            <Plus size={18} />
            Tambah Postingan
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm rounded-xl">
            <thead>
              <tr className="text-left bg-[#f3f6fb] text-[#5b5f73]">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Platform</th>
                <th className="py-2 px-4">Tanggal</th>
                <th className="py-2 px-4">Deskripsi</th>
                <th className="py-2 px-4">Engagement</th>
                <th className="py-2 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-[#3e4161]">
              {posts.map((post) => (
                <tr key={post.id} className="border-t hover:bg-[#f9f9fc]">
                  <td className="py-2 px-4 font-semibold">{post.id}</td>
                  <td className="py-2 px-4">{post.platform}</td>
                  <td className="py-2 px-4">{post.date}</td>
                  <td className="py-2 px-4 truncate max-w-[200px]">{post.description}</td>
                  <td className="py-2 px-4 flex items-center gap-1">
                    {post.type === 'like' && <ThumbsUp className="w-4 h-4 text-blue-500" />}
                    {post.type === 'view' && <Eye className="w-4 h-4 text-green-500" />}
                    {post.engagement}
                  </td>
                  <td className="py-2 px-4 text-right">
                    <button onClick={() => handleEdit(post.id)} className="text-green-600 hover:underline mr-2">Edit</button>
                    <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:underline">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {formVisible && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{formData.id ? 'Edit Postingan' : 'Tambah Postingan'}</h3>
              <button onClick={() => setFormVisible(false)} className="text-2xl text-gray-400 hover:text-red-600">&times;</button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="grid gap-4"
            >
              <input
                name="platform"
                placeholder="Platform (Instagram, TikTok, dll)"
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="border rounded-lg px-4 py-2"
                required
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="border rounded-lg px-4 py-2"
                required
              />
              <input
                name="engagement"
                placeholder="Engagement (ex: 2K Likes / 500 Views)"
                value={formData.engagement}
                onChange={(e) => {
                  const val = e.target.value;
                  const type = val.toLowerCase().includes('view') ? 'view' : 'like';
                  setFormData({ ...formData, engagement: val, type });
                }}
                className="border rounded-lg px-4 py-2"
                required
              />
              <textarea
                name="description"
                rows={3}
                placeholder="Deskripsi konten"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="border rounded-lg px-4 py-2"
              />
              <div className="flex justify-between mt-2">
                {formData.id && (
                  <button
                    type="button"
                    onClick={() => handleDelete(formData.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Hapus
                  </button>
                )}
                <div className="flex gap-3 ml-auto">
                  <button
                    type="button"
                    onClick={() => setFormVisible(false)}
                    className="border px-4 py-2 rounded text-gray-600 hover:bg-gray-100"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-[#4c44c7] text-white px-4 py-2 rounded hover:bg-[#3a35a5]"
                  >
                    {formData.id ? 'Simpan Perubahan' : 'Simpan'}
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

export default SocialMediaManagement;
