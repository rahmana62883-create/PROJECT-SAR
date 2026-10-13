import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const AdminCustomersPage = () => {
  const { customers } = useApp();
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = (customers || []).filter(c => {
    const q = searchFilter.toLowerCase().trim();
    const matchesQuery = !q || 
      (c.name || '').toLowerCase().includes(q) || 
      (c.email || '').toLowerCase().includes(q) || 
      (c.id || '').toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const currentItems = filteredCustomers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const statuses = ['Active', 'Inactive'];

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-fc-border">
        <h1 className="text-2xl font-bold text-fc-primary tracking-tight">Customer CRM</h1>
        <p className="text-xs text-fc-secondary mt-0.5">Manage user profiles and spending history.</p>
      </div>

      <div className="bg-fc-surface border border-fc-border rounded-fc-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap flex-1">
            <input
              type="text"
              className="px-3 py-1.5 bg-fc-base border border-fc-border rounded-fc-md text-fc-primary text-xs placeholder:text-fc-muted focus:outline-none focus:border-fc-accent w-full sm:w-64"
              placeholder="Search by name, email, or ID..."
              value={searchFilter}
              onChange={(e) => { setSearchFilter(e.target.value); setCurrentPage(1); }}
            />
            <select
              className="px-3 py-1.5 bg-fc-base border border-fc-border rounded-fc-md text-fc-primary text-xs focus:outline-none focus:border-fc-accent"
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="All">All Statuses</option>
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="text-xs text-fc-secondary font-medium">
            Showing {filteredCustomers.length} customers
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-fc-border text-[11px] font-semibold uppercase tracking-wider text-fc-secondary bg-fc-base/50">
                <th className="px-4 py-3">Customer Name</th>
                <th className="px-4 py-3">Email / Phone</th>
                <th className="px-4 py-3">Join Date</th>
                <th className="px-4 py-3">Orders</th>
                <th className="px-4 py-3">Total Spend</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-fc-border/60">
              {currentItems.map(c => (
                <tr key={c.id} className="transition-colors hover:bg-fc-glass">
                  <td className="px-4 py-3.5">
                    <div><strong className="block text-xs font-bold text-fc-primary">{c.name}</strong></div>
                    <small className="text-[10px] text-fc-muted font-mono">{c.id}</small>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="text-xs text-fc-primary">{c.email}</div>
                    <small className="text-[10px] text-fc-muted">{c.phone}</small>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-fc-secondary">{new Date(c.joinDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3.5 text-xs font-semibold text-fc-primary">{c.ordersCount}</td>
                  <td className="px-4 py-3.5 font-bold text-xs text-fc-accent">${parseFloat(c.totalSpend).toLocaleString()}</td>
                  <td className="px-4 py-3.5">
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                      c.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-fc-base border border-fc-border text-fc-secondary'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button 
                      className="px-2.5 py-1 bg-fc-base border border-fc-border text-xs font-semibold text-fc-primary rounded-fc-md hover:border-fc-muted transition-colors" 
                      onClick={() => setSelectedCustomer(c)}
                    >
                      Profile
                    </button>
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-xs text-fc-secondary">No customers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t border-fc-border/60 text-xs">
            <button 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(p => p - 1)}
              className="px-3 py-1.5 border border-fc-border rounded-fc-md text-fc-secondary hover:text-fc-primary disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <span className="text-fc-secondary font-medium">Page {currentPage} of {totalPages}</span>
            <button 
              disabled={currentPage === totalPages} 
              onClick={() => setCurrentPage(p => p + 1)}
              className="px-3 py-1.5 border border-fc-border rounded-fc-md text-fc-secondary hover:text-fc-primary disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Customer Profile Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setSelectedCustomer(null)}>
          <div className="bg-fc-surface border border-fc-border rounded-fc-2xl w-full max-w-lg overflow-hidden shadow-2xl p-6 space-y-5 animate-scale-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center pb-3 border-b border-fc-border">
              <h3 className="text-base font-bold text-fc-primary">Customer Profile</h3>
              <button className="text-xl leading-none text-fc-secondary hover:text-fc-primary p-1" onClick={() => setSelectedCustomer(null)}>&times;</button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-fc-base border border-fc-border rounded-fc-xl p-4">
                <div className="w-16 h-16 rounded-full bg-fc-surface border border-fc-border flex items-center justify-center text-2xl text-fc-secondary shrink-0">
                  👤
                </div>
                <div className="space-y-0.5 text-xs">
                  <h2 className="text-base font-bold text-fc-primary">{selectedCustomer.name}</h2>
                  <p className="text-fc-secondary"><strong>ID:</strong> {selectedCustomer.id}</p>
                  <p className="text-fc-secondary"><strong>Email:</strong> {selectedCustomer.email}</p>
                  <p className="text-fc-secondary"><strong>Phone:</strong> {selectedCustomer.phone}</p>
                  <p className="text-fc-secondary"><strong>Location:</strong> {selectedCustomer.location}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-fc-base border border-fc-border rounded-fc-xl p-3 text-center space-y-1">
                  <span className="block text-[10px] font-bold text-fc-secondary uppercase tracking-wider">Total Spend</span>
                  <span className="text-sm font-extrabold text-fc-primary block">${parseFloat(selectedCustomer.totalSpend).toLocaleString()}</span>
                </div>
                <div className="bg-fc-base border border-fc-border rounded-fc-xl p-3 text-center space-y-1">
                  <span className="block text-[10px] font-bold text-fc-secondary uppercase tracking-wider">Orders</span>
                  <span className="text-sm font-extrabold text-fc-primary block">{selectedCustomer.ordersCount}</span>
                </div>
                <div className="bg-fc-base border border-fc-border rounded-fc-xl p-3 text-center space-y-1">
                  <span className="block text-[10px] font-bold text-fc-secondary uppercase tracking-wider">Status</span>
                  <span className={`text-sm font-extrabold block ${selectedCustomer.status === 'Active' ? 'text-emerald-500' : 'text-fc-secondary'}`}>
                    {selectedCustomer.status}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button 
                  className="px-4 py-2 border border-fc-border rounded-fc-md text-xs font-semibold text-fc-secondary hover:text-fc-primary transition-colors" 
                  onClick={() => setSelectedCustomer(null)}
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-fc-accent hover:bg-fc-accent-hover text-white text-xs font-semibold rounded-fc-md transition-colors">
                  Contact Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
