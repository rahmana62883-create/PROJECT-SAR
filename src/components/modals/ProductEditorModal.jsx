import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';

export const ProductEditorModal = () => {
  const { isProductEditorOpen, closeProductEditor, editingProduct, saveProduct } = useApp();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Smartphones');
  const [currentBestPrice, setCurrentBestPrice] = useState('');
  const [originalMSRP, setOriginalMSRP] = useState('');
  const [retailerName, setRetailerName] = useState('');
  const [coupon, setCoupon] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name || editingProduct.title || '');
      setCategory(editingProduct.category || 'Smartphones');
      setCurrentBestPrice(editingProduct.currentBestPrice || '');
      setOriginalMSRP(editingProduct.originalMSRP || '');
      setRetailerName(editingProduct.offers?.[0]?.retailer || 'Amazon');
      setCoupon(editingProduct.offers?.[0]?.coupon || '');
      const existingImages = editingProduct.images || [];
      setImages(existingImages);
      setImagePreview(existingImages[0] || '');
    } else {
      setName('');
      setCategory('Smartphones');
      setCurrentBestPrice('');
      setOriginalMSRP('');
      setRetailerName('Amazon');
      setCoupon('');
      setImages([]);
      setImagePreview('');
    }
    setError('');
  }, [editingProduct, isProductEditorOpen]);

  if (!isProductEditorOpen) return null;

  const handleFileChange = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Selected file is not an image.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Url = e.target.result;
      setImagePreview(base64Url);
      setImages([base64Url, ...images.filter(img => img !== base64Url)]);
      setError('');
    };
    reader.onerror = () => {
      setError('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    try {
      const bestPriceNum = parseFloat(currentBestPrice);
      if (isNaN(bestPriceNum) || bestPriceNum <= 0) {
        throw new Error('Please enter a valid best market price.');
      }

      saveProduct({
        id: editingProduct?.id,
        name,
        category,
        currentBestPrice: bestPriceNum,
        originalMSRP: parseFloat(originalMSRP) || Math.round(bestPriceNum * 1.15),
        retailerName,
        coupon,
        images: images.length ? images : [
          'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
        ]
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4 animate-fade-in"
      onClick={closeProductEditor}
      role="dialog"
      aria-modal="true"
      aria-label="Product Record Editor"
    >
      <div className="relative w-full max-w-xl bg-fc-surface border border-fc-border rounded-fc-lg shadow-fc-modal p-6 sm:p-8 max-h-[90vh] overflow-y-auto animate-scale-up" onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-fc-secondary hover:bg-fc-tertiary text-fc-text-secondary hover:text-fc-text-primary flex items-center justify-center text-xl cursor-pointer transition-colors"
          onClick={closeProductEditor}
          aria-label="Close Modal"
        >
          &times;
        </button>

        <h3 className="text-xl font-bold text-fc-text-primary tracking-tight">
          {editingProduct ? 'Edit Flagship Product Record' : 'Create New Flagship Record'}
        </h3>
        <p className="text-xs text-fc-text-secondary mt-1 mb-6 leading-relaxed">Configure specs, pricing arbitrage thresholds, and upload high-res photography.</p>

        {error && (
          <div className="p-3 mb-4 rounded-fc-sm bg-fc-danger/15 text-fc-danger text-xs font-medium border border-fc-danger/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-fc-text-secondary" htmlFor="editor-name">Product Name</label>
              <input
                id="editor-name"
                type="text"
                className="w-full px-3.5 py-2.5 rounded-fc-sm bg-fc-secondary border border-fc-border text-sm text-fc-text-primary placeholder:text-fc-text-tertiary focus:outline-none focus:border-fc-accent transition-colors"
                placeholder="e.g. Apple Watch Ultra 2 (Titanium)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-fc-text-secondary" htmlFor="editor-category">Category</label>
              <select
                id="editor-category"
                className="w-full px-3.5 py-2.5 rounded-fc-sm bg-fc-secondary border border-fc-border text-sm text-fc-text-primary focus:outline-none focus:border-fc-accent transition-colors"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Smartphones">Smartphones</option>
                <option value="Laptops">Laptops</option>
                <option value="Audio">Audio</option>
                <option value="Gaming">Gaming</option>
                <option value="Wearables">Wearables</option>
                <option value="Cameras">Cameras</option>
                <option value="Home Tech">Home Tech</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-fc-text-secondary" htmlFor="editor-price">Best Market Price ($ USD)</label>
              <input
                id="editor-price"
                type="number"
                step="0.01"
                min="1"
                className="w-full px-3.5 py-2.5 rounded-fc-sm bg-fc-secondary border border-fc-border text-sm text-fc-text-primary placeholder:text-fc-text-tertiary focus:outline-none focus:border-fc-accent transition-colors"
                placeholder="799.00"
                value={currentBestPrice}
                onChange={(e) => setCurrentBestPrice(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-fc-text-secondary" htmlFor="editor-msrp">Original MSRP ($ USD)</label>
              <input
                id="editor-msrp"
                type="number"
                step="0.01"
                min="1"
                className="w-full px-3.5 py-2.5 rounded-fc-sm bg-fc-secondary border border-fc-border text-sm text-fc-text-primary placeholder:text-fc-text-tertiary focus:outline-none focus:border-fc-accent transition-colors"
                placeholder="899.00"
                value={originalMSRP}
                onChange={(e) => setOriginalMSRP(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-fc-text-secondary" htmlFor="editor-retailer">Primary Retailer Name</label>
              <input
                id="editor-retailer"
                type="text"
                className="w-full px-3.5 py-2.5 rounded-fc-sm bg-fc-secondary border border-fc-border text-sm text-fc-text-primary placeholder:text-fc-text-tertiary focus:outline-none focus:border-fc-accent transition-colors"
                placeholder="Amazon / Best Buy / Apple"
                value={retailerName}
                onChange={(e) => setRetailerName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-fc-text-secondary" htmlFor="editor-coupon">Optional Promo / Coupon Code</label>
              <input
                id="editor-coupon"
                type="text"
                className="w-full px-3.5 py-2.5 rounded-fc-sm bg-fc-secondary border border-fc-border text-sm text-fc-text-primary placeholder:text-fc-text-tertiary focus:outline-none focus:border-fc-accent transition-colors"
                placeholder="SAVE50"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
            </div>
          </div>

          {/* Drag & Drop / Local File Upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-fc-text-secondary">Product Photography (Drag & Drop or Local File Upload to Base64)</label>
            <div
              className={`cursor-pointer border-2 border-dashed rounded-fc-md p-5 text-center transition-colors ${isDragging ? 'border-fc-accent bg-fc-accent/10' : 'border-fc-border bg-fc-secondary hover:border-fc-border-hover'}`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <div className="flex flex-col items-center gap-2.5">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-36 max-w-full rounded-fc-sm object-contain"
                  />
                  <span className="text-xs text-fc-accent font-medium">
                    Click or drag new image to replace
                  </span>
                </div>
              ) : (
                <div className="py-4">
                  <span className="text-3xl block mb-2">📷</span>
                  <span className="text-xs font-semibold text-fc-text-primary">Drag & drop image file here, or click to choose from disk</span>
                  <span className="block text-[11px] text-fc-text-tertiary mt-1">
                    Supports PNG, JPG, WebP up to 5MB (automatically converted to Base64)
                  </span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileChange(e.target.files[0]);
                  }
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-fc-border mt-2">
            <button
              type="button"
              className="py-2.5 px-4 rounded-fc-md text-xs font-semibold border border-fc-border text-fc-text-secondary hover:text-fc-text-primary hover:bg-fc-secondary transition-colors cursor-pointer"
              onClick={closeProductEditor}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2.5 px-5 rounded-fc-md text-xs font-semibold bg-fc-accent hover:bg-fc-accent-hover text-white shadow-md transition-colors cursor-pointer"
            >
              Save Product Record &rarr;
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
