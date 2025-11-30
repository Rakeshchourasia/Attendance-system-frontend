import React, { useState, useEffect } from "react";
import { Search, Calendar, Download, FileText, ArrowDownToLine, Loader } from "lucide-react";

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    // Simulate fetching report data (replace with API later)
    setTimeout(() => {
      setReportData([
        { id: 1, name: "Dr. Alok Verma", host: "HOD – CSE", type: "Event Guest", date: "2025-02-12", purpose: "AI Seminar" },
        { id: 2, name: "Rahul Singh", host: "Accounts Dept", type: "One-Day", date: "2025-02-12", purpose: "Fee Payment" },
        { id: 3, name: "Priya Sharma", host: "Cafeteria", type: "Multi-Day", date: "2025-02-11", purpose: "Canteen Supply" },
        { id: 4, name: "Amit Kumar", host: "Library", type: "One-Day", date: "2025-02-11", purpose: "Library Visit" },
      ]);
      setLoading(false);
    }, 600);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 sm:p-8 font-sans text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0b1f3b] tracking-tight">Reports</h1>
          <p className="text-slate-500 mt-1 text-sm sm:text-base">
            View complete <span className="font-semibold text-[#facc15]">visitor history and logs</span>.
          </p>
        </div>
      </div>

      {/* Filters Panel */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name..."
            className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg w-full focus:border-[#0b1f3b] outline-none"
          />
        </div>

        {/* Date Filter */}
        <div className="relative w-full md:w-52">
          <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="date"
            className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg w-full focus:border-[#0b1f3b] outline-none"
          />
        </div>

        {/* Download Report */}
        <button className="py-2.5 px-5 bg-[#0b1f3b] text-white rounded-lg font-semibold shadow hover:bg-blue-900 transition flex items-center gap-2">
          <ArrowDownToLine size={18} /> Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-10 flex justify-center text-[#0b1f3b]"><Loader className="animate-spin" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase text-slate-500 tracking-wider">
                <tr>
                  <th className="px-6 py-4">Visitor</th>
                  <th className="px-6 py-4">Pass Type</th>
                  <th className="px-6 py-4">Purpose</th>
                  <th className="px-6 py-4">Host</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {reportData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 font-bold text-[#0b1f3b]">{item.name}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold border ${
                          item.type === "One-Day"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : item.type === "Multi-Day"
                            ? "bg-purple-50 text-purple-700 border-purple-200"
                            : "bg-orange-50 text-orange-700 border-orange-200"
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{item.purpose}</td>
                    <td className="px-6 py-4 text-slate-600">{item.host}</td>
                    <td className="px-6 py-4 text-slate-700 font-medium">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer Export Button */}
      <div className="flex justify-end mt-5">
        <button className="py-3 px-6 bg-white border border-slate-300 rounded-xl font-semibold flex items-center gap-2 hover:border-[#0b1f3b] hover:text-[#0b1f3b] transition">
          <FileText size={18} />
          Download Full Report
        </button>
      </div>
    </div>
  );
};

export default Reports;
