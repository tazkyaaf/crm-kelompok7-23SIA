import React from 'react';

const ResultCard = ({ hasil }) => {
  return (
    <div className="mt-6 p-4 bg-green-100 rounded shadow">
      <h2 className="text-lg font-semibold">📌 Hasil Prediksi</h2>
      <p className="mt-2 text-gray-800">
        {hasil.hasil_prediksi
          ? `Jika pelanggan memilih ${hasil.input}, maka kemungkinan besar juga memilih ${hasil.hasil_prediksi}.`
          : "Tidak dapat memprediksi saat ini."}
      </p>
    </div>
  );
};

export default ResultCard;
