import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const AdminCatalogPage = () => {
  const { products, openProductEditor, deleteProduct } = useApp();
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const filteredProducts = products.filter(p => {
    const q = searchFilter.toLowerCase().trim();
    const matchesQuery = !q || (p.name || p.title || '').toLowerCase().includes(q) || (p.category || '').toLowerCase().includes(q) || (p.id || '').toLowerCase().includes(q);
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-fc-border">
        <div>
          <h1 className="text-2xl font-bold text-fc-primary tracking-tight">Catalog Management</h1>
          <p className="text-xs text-fc-secondary mt-0.5">Manage inventory, pricing thresholds, and metadata.</p>
        </div>
        <button 
          className="px-4 py-2 bg-fc-accent hover:bg-fc-accent-hover text-white text-xs font-semibold rounded-fc-md transition-colors shadow-sm" 
          onClick={() => openProductEditor(null)}
        >
          + Add New Product
        </button>
      </div>

      <div className="bg-fc-surface border border-fc-border rounded-fc-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap flex-1">
            <input
              type="text"
              className="px-3 py-1.5 bg-fc-base border border-fc-border rounded-fc-md text-fc-primary text-xs placeholder:text-fc-muted focus:outline-none focus:border-fc-accent w-full sm:w-64"
              placeholder="Search by name, ID, or category..."
              value={searchFilter}
              onChange={(e) => { setSearchFilter(e.target.value); setCurrentPage(1); }}
            />
            <select
              className="px-3 py-1.5 bg-fc-base border border-fc-border rounded-fc-md text-fc-primary text-xs focus:outline-none focus:border-fc-accent"
              value={selectedCategory}
              onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="text-xs text-fc-secondary font-medium">
            Showing {filteredProducts.length} items
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-fc-border text-[11px] font-semibold uppercase tracking-wider text-fc-secondary bg-fc-base/50">
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Best Price</th>
                <th className="px-4 py-3">MSRP</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-fc-border/60">
              {currentItems.map(p => (
                <tr key={p.id} className="transition-colors hover:bg-fc-glass">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={(p.images && p.images[0]) || ''}
                        alt={p.title || p.name}
                        className="w-9 h-9 object-contain rounded-fc-md border border-fc-border bg-fc-base p-1"
                      />
                      <div>
                        <strong className="block text-xs font-bold text-fc-primary">{p.title || p.name}</strong>
                        <small className="text-[10px] text-fc-secondary font-mono">{p.id}</small>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-fc-secondary">{p.category}</td>
                  <td className="px-4 py-3.5 font-bold text-xs text-fc-accent">${(p.currentBestPrice || 0).toLocaleString()}</td>
                  <td className="px-4 py-3.5 text-xs text-fc-muted">${(p.originalMSRP || 0).toLocaleString()}</td>
                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold">
                      {p.truthScore || p.priceScore || 90}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      p.inStock !== false ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {p.inStock !== false ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        className="px-2.5 py-1 bg-fc-base border border-fc-border text-xs font-semibold text-fc-primary rounded-fc-md hover:border-fc-muted transition-colors" 
                        onClick={() => openProductEditor(p)}
                      >
                        Edit
                      </button>
                      <button 
                        className="px-2.5 py-1 bg-fc-base border border-red-500/30 text-xs font-semibold text-fc-danger rounded-fc-md hover:bg-red-500/10 transition-colors" 
                        onClick={() => { if(window.confirm('Delete product?')) deleteProduct(p.id); }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-xs text-fc-secondary">No products found matching your filters.</td>
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
    </div>
  );
};
