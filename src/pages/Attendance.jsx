import React, { useState } from 'react';
import { Search, Check, X, Clock, Shield, Calendar, UserCheck, Filter, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

// Shared animation styles
const customStyles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
`;

const Attendance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Expanded Mock Data
  const allVisitors = [
    { id: 'VP-001', name: 'Rahul Verma', role: 'Contractor', validTill: '2024-12-01', status: 'Checked In', time: '09:00 AM' },
    { id: 'VP-002', name: 'Priya Singh', role: 'Guest Lecturer', validTill: '2024-11-30', status: 'Not Present', time: '--' },
    { id: 'VP-003', name: 'Amit Kumar', role: 'Staff Parent', validTill: '2024-12-15', status: 'Checked Out', time: '02:30 PM' },
    { id: 'VP-004', name: 'Dr. S. K. Jha', role: 'Visiting Faculty', validTill: '2024-12-10', status: 'Checked In', time: '10:15 AM' },
    { id: 'VP-005', name: 'Neha Gupta', role: 'Vendor', validTill: '2024-11-28', status: 'Not Present', time: '--' },
    { id: 'VP-006', name: 'Vikram Malhotra', role: 'Alumni', validTill: '2024-12-05', status: 'Checked In', time: '11:00 AM' },
    { id: 'VP-007', name: 'Sita Reddy', role: 'Parent', validTill: '2024-12-02', status: 'Not Present', time: '--' },
    { id: 'VP-008', name: 'Arjun Das', role: 'Maintenance', validTill: '2024-12-20', status: 'Checked Out', time: '04:00 PM' },
    { id: 'VP-009', name: 'Meera Nair', role: 'Guest Lecturer', validTill: '2024-11-29', status: 'Checked In', time: '09:45 AM' },
    { id: 'VP-010', name: 'Rohan Mehta', role: 'Intern', validTill: '2024-12-30', status: 'Not Present', time: '--' },
    { id: 'VP-011', name: 'Kavita Joshi', role: 'Vendor', validTill: '2024-12-12', status: 'Checked In', time: '08:30 AM' },
    { id: 'VP-012', name: 'Suresh Raina', role: 'Contractor', validTill: '2024-12-08', status: 'Checked Out', time: '01:15 PM' },
  ];

  // Search Filter Logic
  const filteredVisitors = allVisitors.filter(visitor => 
    visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visitor.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredVisitors.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredVisitors.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 sm:p-10 font-sans text-slate-900">
      <style>{customStyles}</style>

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 opacity-0 animate-fade-in-up">
        <div className="mb-6 lg:mb-0">
          <h1 className="text-3xl font-extrabold text-[#0b1f3b] tracking-tight flex items-center gap-3">
            <Shield className="text-[#facc15]" size={32} />
            Security & Attendance
          </h1>
          <p className="text-slate-500 mt-2 font-medium ml-1">
            Track daily movement for <span className="text-[#0b1f3b] font-bold">Multi-Day Pass Holders</span>.
          </p>
        </div>

        {/* Search / Scan Bar */}
        <div className="w-full lg:w-auto relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-slate-400 group-focus-within:text-[#facc15] transition-colors duration-300" size={20} />
          </div>
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to page 1 on search
            }}
            placeholder="Scan QR or Search Visitor ID..." 
            className="w-full lg:w-96 pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 font-medium shadow-sm placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#0b1f3b] transition-all duration-300"
          />
          <div className="absolute inset-y-0 right-2 flex items-center">
            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-[#0b1f3b] transition-colors">
               <Filter size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div 
        className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden opacity-0 animate-fade-in-up flex flex-col min-h-[600px]"
        style={{ animationDelay: '200ms' }}
      >
        {/* Table Header / Toolbar */}
        <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50/50 to-white flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-[#0b1f3b] text-white text-xs font-bold rounded-full shadow-lg shadow-blue-900/20 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#facc15] rounded-full animate-pulse"></span>
                    Live Feed
                </div>
                <span className="text-sm text-slate-500 font-medium ml-2">Total Visitors: {filteredVisitors.length}</span>
            </div>
            
            <button className="text-slate-400 hover:text-[#0b1f3b] transition-colors">
                <MoreHorizontal size={20} />
            </button>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto flex-grow">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 text-xs font-bold uppercase tracking-widest border-b border-slate-100">
                <th className="px-8 py-5">Visitor Profile</th>
                <th className="px-6 py-5">Valid Until</th>
                <th className="px-6 py-5">Last Activity</th>
                <th className="px-6 py-5 text-center">Current Status</th>
                <th className="px-8 py-5 text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentRows.length > 0 ? (
                currentRows.map((visitor) => (
                  <tr 
                    key={visitor.id} 
                    className="group hover:bg-white relative transition-all duration-300 ease-out hover:shadow-lg hover:shadow-blue-900/5 hover:z-10 hover:-translate-y-0.5 border-l-4 border-transparent hover:border-l-[#facc15]"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0b1f3b] flex items-center justify-center font-mono text-xs font-bold border border-blue-100 group-hover:bg-[#0b1f3b] group-hover:text-[#facc15] group-hover:border-[#0b1f3b] transition-colors duration-300">
                          {visitor.id.split('-')[1]}
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-bold text-[#0b1f3b] group-hover:text-blue-700 transition-colors">{visitor.name}</p>
                          <p className="text-xs text-slate-500 font-medium">{visitor.role}</p>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-5">
                      <div className="flex items-center text-sm text-slate-600 font-medium">
                          <Calendar size={14} className="mr-2 text-slate-400" />
                          {visitor.validTill}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                        <div className="flex items-center text-slate-500 font-mono text-sm">
                          <Clock size={14} className="mr-2 text-slate-400" />
                          {visitor.time}
                        </div>
                    </td>

                    <td className="px-6 py-5 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${
                        visitor.status === 'Checked In' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                          : visitor.status === 'Checked Out' 
                            ? 'bg-slate-100 text-slate-500 border-slate-200'
                            : 'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                          visitor.status === 'Checked In' ? 'bg-emerald-500 animate-pulse' : 
                          visitor.status === 'Checked Out' ? 'bg-slate-400' : 'bg-amber-500'
                        }`}></span>
                        {visitor.status}
                      </span>
                    </td>

                    <td className="px-8 py-5">
                      <div className="flex justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button 
                          className="p-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:shadow-md transition-all duration-300" 
                          title="Mark Check In"
                        >
                          <Check size={18} strokeWidth={2.5} />
                        </button>

                        <button 
                          className="p-2 rounded-lg bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-500 hover:text-white hover:border-rose-500 hover:shadow-md transition-all duration-300" 
                          title="Mark Check Out"
                        >
                          <X size={18} strokeWidth={2.5} />
                        </button>

                         <button 
                          className="p-2 rounded-lg bg-slate-50 text-slate-400 border border-slate-100 hover:bg-[#0b1f3b] hover:text-white hover:border-[#0b1f3b] hover:shadow-md transition-all duration-300"
                          title="View Details"
                        >
                          <UserCheck size={18} strokeWidth={2} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-8 py-10 text-center text-slate-400">
                    No visitors found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination / Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 font-medium gap-3">
             <span>
               Showing <span className="font-bold text-[#0b1f3b]">{currentRows.length > 0 ? indexOfFirstRow + 1 : 0}</span> to <span className="font-bold text-[#0b1f3b]">{Math.min(indexOfLastRow, filteredVisitors.length)}</span> of <span className="font-bold text-[#0b1f3b]">{filteredVisitors.length}</span> active passes
             </span>
             
             <div className="flex gap-2">
                 <button 
                   onClick={handlePrevPage}
                   disabled={currentPage === 1}
                   className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#0b1f3b] hover:text-[#0b1f3b] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1 shadow-sm"
                 >
                   <ChevronLeft size={14} /> Previous
                 </button>
                 
                 <div className="flex items-center gap-1 px-2">
                   {Array.from({ length: totalPages }, (_, i) => (
                     <button
                       key={i + 1}
                       onClick={() => setCurrentPage(i + 1)}
                       className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                         currentPage === i + 1 
                           ? 'bg-[#0b1f3b] text-white shadow-md' 
                           : 'hover:bg-slate-200 text-slate-600'
                       }`}
                     >
                       {i + 1}
                     </button>
                   ))}
                 </div>

                 <button 
                   onClick={handleNextPage}
                   disabled={currentPage === totalPages}
                   className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#0b1f3b] hover:text-[#0b1f3b] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1 shadow-sm"
                 >
                   Next <ChevronRight size={14} />
                 </button>
             </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;