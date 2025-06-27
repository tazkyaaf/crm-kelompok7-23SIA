import React, { useState, useEffect } from 'react';
import { ThumbsUp, Eye, Pencil, Trash2, Plus } from 'lucide-react';

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

  // Simpan ke localStorage saat posts berubah
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
    }
  };

  const handleSave = () => {
    let updatedPost = { ...formData };

    if (!updatedPost.id) {
      updatedPost.id = Date.now().toString(); // Auto-ID jika kosong
    }

    // Cek apakah update atau tambah
    const updatedPosts = posts.some((p) => p.id === updatedPost.id)
      ? posts.map((p) => (p.id === updatedPost.id ? updatedPost : p))
      : [...posts, updatedPost];

    setPosts(updatedPosts);
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
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">📱 Social Media Management</h1>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          <Plus size={18} />
          Tambah Postingan
        </button>
      </div>

      {formVisible && (
        <div className="bg-white p-4 rounded shadow space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <input
              className="border p-2 rounded"
              placeholder="ID (opsional)"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            />
            <input
              className="border p-2 rounded"
              placeholder="Platform (Instagram, TikTok, dll)"
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            />
            <input
              type="date"
              className="border p-2 rounded"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
            <input
              className="border p-2 rounded"
              placeholder="Engagement (ex: 2K Likes / 500 Views)"
              value={formData.engagement}
              onChange={(e) => {
                const val = e.target.value;
                const type = val.toLowerCase().includes('view') ? 'view' : 'like';
                setFormData({ ...formData, engagement: val, type });
              }}
            />
          </div>
          <textarea
            className="w-full border p-2 rounded"
            rows={3}
            placeholder="Deskripsi konten"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Simpan
            </button>
            <button
              onClick={() => setFormVisible(false)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Header Table */}
      <div className="grid grid-cols-6 gap-4 px-4 py-2 bg-gray-100 text-sm font-semibold text-gray-600 rounded-t">
        <div>ID</div>
        <div>Platform</div>
        <div>Tanggal</div>
        <div>Deskripsi</div>
        <div>Engagement</div>
        <div className="text-right">Aksi</div>
      </div>

      {/* Data List */}
      {posts.map((post) => (
        <div
          key={post.id}
          className="grid grid-cols-6 gap-4 px-4 py-3 bg-white border-b items-center text-sm"
        >
          <div>{post.id}</div>
          <div>{post.platform}</div>
          <div>{post.date}</div>
          <div className="truncate">{post.description}</div>
          <div className="flex items-center gap-1">
            {post.type === 'like' && <ThumbsUp className="w-4 h-4 text-blue-500" />}
            {post.type === 'view' && <Eye className="w-4 h-4 text-green-500" />}
            {post.engagement}
          </div>
          <div className="flex justify-end space-x-2">
            <button onClick={() => handleEdit(post.id)} className="text-green-600 hover:underline">
              Edit
            </button>
            <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:underline">
              Hapus
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SocialMediaManagement;
