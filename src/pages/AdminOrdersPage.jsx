import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const AdminOrdersPage = () => {
  const { orders, updateOrderStatus } = useApp();
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = (orders || []).filter(o => {
    const q = searchFilter.toLowerCase().trim();
    const matchesQuery = !q || 
      (o.id || '').toLowerCase().includes(q) || 
      (o.customerName || '').toLowerCase().includes(q) || 
      (o.customerEmail || '').toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentItems = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const statuses = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled', 'Refunded'];

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-fc-border">
        <h1 className="text-2xl font-bold text-fc-primary tracking-tight">Order Management</h1>
        <p className="text-xs text-fc-secondary mt-0.5">View and process customer orders.</p>
      </div>

      <div className="bg-fc-surface border border-fc-border rounded-fc-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap flex-1">
            <input
              type="text"
              className="px-3 py-1.5 bg-fc-base border border-fc-border rounded-fc-md text-fc-primary text-xs placeholder:text-fc-muted focus:outline-none focus:border-fc-accent w-full sm:w-64"
              placeholder="Search by ID, name, or email..."
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
            Showing {filteredOrders.length} orders
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-fc-border text-[11px] font-semibold uppercase tracking-wider text-fc-secondary bg-fc-base/50">
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-fc-border/60">
              {currentItems.map(o => {
                let statusClasses = 'bg-fc-base text-fc-secondary border border-fc-border';
                if (o.status === 'Delivered') statusClasses = 'bg-emerald-500/10 text-emerald-500 font-bold';
                else if (o.status === 'Pending') statusClasses = 'bg-amber-500/10 text-amber-500 font-bold';
                else if (o.status === 'Cancelled' || o.status === 'Refunded') statusClasses = 'bg-red-500/10 text-fc-danger font-bold';

                return (
                  <tr key={o.id} className="transition-colors hover:bg-fc-glass">
                    <td className="px-4 py-3.5 font-mono text-xs font-bold text-fc-primary">{o.id}</td>
                    <td className="px-4 py-3.5 text-xs text-fc-secondary">{new Date(o.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3.5">
                      <div className="text-xs font-bold text-fc-primary">{o.customerName}</div>
                      <small className="text-[10px] text-fc-muted block">{o.customerEmail}</small>
                    </td>
                    <td className="px-4 py-3.5 font-bold text-xs text-fc-primary">${parseFloat(o.total).toLocaleString()}</td>
                    <td className="px-4 py-3.5">
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full inline-block ${statusClasses}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-fc-secondary">{o.paymentStatus}</td>
                    <td className="px-4 py-3.5 text-right">
                      <button 
                        className="px-2.5 py-1 bg-fc-base border border-fc-border text-xs font-semibold text-fc-primary rounded-fc-md hover:border-fc-muted transition-colors" 
                        onClick={() => setSelectedOrder(o)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-xs text-fc-secondary">No orders found.</td>
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

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setSelectedOrder(null)}>
          <div className="bg-fc-surface border border-fc-border rounded-fc-2xl w-full max-w-lg overflow-hidden shadow-2xl p-6 space-y-5 animate-scale-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center pb-3 border-b border-fc-border">
              <h3 className="text-base font-bold text-fc-primary">Order Details: <span className="font-mono">{selectedOrder.id}</span></h3>
              <button className="text-xl leading-none text-fc-secondary hover:text-fc-primary p-1" onClick={() => setSelectedOrder(null)}>&times;</button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-fc-base border border-fc-border rounded-fc-xl p-4 text-xs">
                <div className="space-y-1">
                  <h4 className="font-bold text-fc-primary uppercase tracking-wider text-[10px] text-fc-secondary">Customer Info</h4>
                  <p className="text-fc-primary"><strong>Name:</strong> {selectedOrder.customerName}</p>
                  <p className="text-fc-secondary"><strong>Email:</strong> {selectedOrder.customerEmail}</p>
                  <p className="text-fc-secondary"><strong>Address:</strong> {selectedOrder.shippingAddress}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-fc-primary uppercase tracking-wider text-[10px] text-fc-secondary">Order Summary</h4>
                  <p className="text-fc-secondary"><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleString()}</p>
                  <p className="text-fc-primary"><strong>Product:</strong> {selectedOrder.productName}</p>
                  <p className="text-fc-secondary"><strong>Qty:</strong> {selectedOrder.quantity}</p>
                  <p className="text-fc-primary font-bold"><strong>Total:</strong> ${parseFloat(selectedOrder.total).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-fc-secondary uppercase tracking-wider mb-2">Update Status</h4>
                <div className="flex gap-2 flex-wrap">
                  {statuses.map(s => (
                    <button 
                      key={s} 
                      className={`px-3 py-1.5 rounded-fc-md text-xs font-semibold transition-all ${
                        selectedOrder.status === s 
                          ? 'bg-fc-accent text-white shadow-sm' 
                          : 'bg-fc-base border border-fc-border text-fc-secondary hover:text-fc-primary'
                      }`}
                      onClick={() => handleStatusChange(selectedOrder.id, s)}
                    >
                      Mark as {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
