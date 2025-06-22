import React, { useState } from "react";

const InvoicingPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const allTransactions = [
    { desc: "Membership", id: "#12548796", status: "Open", phone: "1234 ****", date: "28 Jan, 12.30 AM", amount: "- $2,500" },
    { desc: "Express Order", id: "#12548796", status: "Open", phone: "1234 ****", date: "25 Jan, 10.40 PM", amount: "+$750" },
    { desc: "Membership", id: "#12548796", status: "Paid", phone: "1234 ****", date: "20 Jan, 10.40 PM", amount: "+$150" },
    { desc: "Reguler Order", id: "#12548796", status: "Paid", phone: "1234 ****", date: "15 Jan, 03.29 PM", amount: "+$1050" },
    { desc: "Reguler Order", id: "#12548796", status: "Paid", phone: "1234 ****", date: "14 Jan, 10.40 PM", amount: "+$840" },
  ];

  const incomeTransactions = [
    { desc: "Express Order", id: "#12548796", status: "Open", phone: "1234 ****", date: "25 Jan, 10.40 PM", amount: "+$750" },
    { desc: "Membership", id: "#12548796", status: "Paid", phone: "1234 ****", date: "20 Jan, 10.40 PM", amount: "+$150" },
  ];

  const expenseTransactions = [
    { desc: "Membership", id: "#12548796", status: "Open", phone: "1234 ****", date: "28 Jan, 12.30 AM", amount: "- $2,500" },
  ];

  const tabs = {
    all: allTransactions,
    income: incomeTransactions,
    expense: expenseTransactions,
  };

  const transactionsPerPage = 3;
  const transactions = tabs[activeTab];
  const pageCount = Math.ceil(transactions.length / transactionsPerPage);
  const paginated = transactions.slice((currentPage - 1) * transactionsPerPage, currentPage * transactionsPerPage);

  const handleDownload = (tx) => {
    const blob = new Blob([
      `Transaction Receipt:\n\nDescription: ${tx.desc}\nID: ${tx.id}\nStatus: ${tx.status}\nPhone: ${tx.phone}\nDate: ${tx.date}\nAmount: ${tx.amount}`
    ], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${tx.desc.replace(/\s+/g, '_')}_receipt.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Invoicing</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: "Draft Invoice", value: 13, bg: "bg-yellow-100", text: "text-yellow-600" },
          { title: "Open Invoice", value: 8, bg: "bg-blue-100", text: "text-blue-600" },
          { title: "Paid Invoice", value: 120, bg: "bg-pink-100", text: "text-pink-600" },
          { title: "Total Revenue", value: "$5,600", bg: "bg-teal-100", text: "text-teal-600" },
        ].map((item, i) => (
          <div key={i} className={`rounded-xl shadow p-4 ${item.bg} ${item.text} text-center`}>
            <p className="text-sm font-semibold">{item.title}</p>
            <h2 className="text-2xl font-bold">{item.value}</h2>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="font-semibold text-lg mb-4">Recent Transactions</h2>
        <div className="flex gap-4 mb-4 text-sm">
          <button onClick={() => { setActiveTab("all"); setCurrentPage(1); }} className={`${activeTab === 'all' ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : 'text-gray-500'}`}>All Transactions</button>
          <button onClick={() => { setActiveTab("income"); setCurrentPage(1); }} className={`${activeTab === 'income' ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : 'text-gray-500'}`}>Income</button>
          <button onClick={() => { setActiveTab("expense"); setCurrentPage(1); }} className={`${activeTab === 'expense' ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : 'text-gray-500'}`}>Expense</button>
        </div>

        <div className="overflow-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="p-2 font-semibold">Description</th>
                <th className="p-2 font-semibold">Transaction ID</th>
                <th className="p-2 font-semibold">Status</th>
                <th className="p-2 font-semibold">No.Hp</th>
                <th className="p-2 font-semibold">Date</th>
                <th className="p-2 font-semibold">Amount</th>
                <th className="p-2 font-semibold">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((tx, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-2">{tx.desc}</td>
                  <td className="p-2">{tx.id}</td>
                  <td className="p-2">{tx.status}</td>
                  <td className="p-2">{tx.phone}</td>
                  <td className="p-2">{tx.date}</td>
                  <td className={`p-2 font-semibold ${tx.amount.includes("-") ? "text-red-500" : "text-green-600"}`}>{tx.amount}</td>
                  <td className="p-2">
                    <button onClick={() => handleDownload(tx)} className="text-blue-600 font-semibold border border-blue-600 rounded px-2 py-1">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-end gap-2 text-sm">
          <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}>&lt; Previous</button>
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'text-blue-600'}`}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => setCurrentPage(p => Math.min(p + 1, pageCount))}>Next &gt;</button>
        </div>
      </div>
    </div>
  );
};

export default InvoicingPage;
