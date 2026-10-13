import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, ChevronRight, ShoppingBag, Heart, Scale } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { isInWatchlist, toggleWatchlist, addToCompare, compareList } = useApp();

  if (!product) return null;

  const isWish = isInWatchlist(product.id);
  const isCompared = compareList.includes(product.id);
  const bestPrice = product.currentBestPrice || product.stores?.[0]?.price || product.price || 0;
  const msrp = product.originalMSRP || product.volatilityTrajectory?.msrp || product.msrp || Math.round(bestPrice * 1.15);
  const savings = Math.max(0, msrp - bestPrice);
  const savingsPercent = Math.round((savings / msrp) * 100);
  const truthScore = product.truthScore || product.priceScore || 91;
  const bestStore = product.stores?.[0]?.name || product.stores?.[0]?.storeName || 'Amazon.in Prime';
  const cashbackAmount = Math.max(1, Math.round(bestPrice * 0.01));

  const primaryImage = (product.images && product.images[0]) || product.image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80';

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className="w-full rounded-28 bg-canvas p-7 flex flex-col justify-between border border-hairline/40 transition-transform duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden shadow-apple-card group"
      onClick={handleCardClick}
    >
      <div>
        {/* Top Card Badges */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper font-micro text-micro font-medium text-primary shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-link-blue"></span>
            <span className="truncate max-w-[130px]">{bestStore}</span>
          </span>

          <div className="flex items-center gap-2">
            <span className="font-micro text-micro font-semibold px-2.5 py-1 rounded-full bg-surface-variant text-primary">
              Truth {truthScore}
            </span>
            <button
              type="button"
              className={`w-7 h-7 rounded-full bg-paper flex items-center justify-center transition-colors shadow-sm ${
                isWish ? 'text-ember fill-ember' : 'text-secondary hover:text-ember'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                toggleWatchlist(product.id);
              }}
              title={isWish ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              <Heart size={13} className={isWish ? 'fill-current' : ''} />
            </button>
          </div>
        </div>

        {/* Hardware Image Presentation */}
        <div className="my-6 h-48 w-full flex items-center justify-center p-4 bg-paper rounded-28 border border-hairline/30 relative">
          <img loading="lazy"
            src={primaryImage}
            alt={product.name || product.title}
            className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80';
            }}
          />
          {product.isTrending && (
            <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full font-micro text-micro font-bold bg-canvas text-ember uppercase tracking-wider">
              Trending
            </span>
          )}
        </div>

        {/* Title & Category & Specs */}
        <div className="font-micro text-micro text-secondary font-medium uppercase tracking-wider">
          {product.category || 'Luxury Flagship'}
        </div>
        <h3 className="font-subheading text-lg font-semibold text-primary mt-1 tracking-tight leading-snug line-clamp-1 group-hover:text-electric-blue transition-colors">
          {product.name || product.title}
        </h3>
        <p className="font-caption text-caption text-secondary mt-1 line-clamp-2">
          {product.description || 'Pristine industrial design with optimized thermal architecture and real-time floor validation.'}
        </p>
      </div>

      {/* Price & Financial Matrix (White Under-Plate) */}
      <div className="mt-8 pt-6 bg-paper -mx-7 -mb-7 p-7 rounded-b-28 border-t border-hairline/40">
        <div className="flex items-baseline justify-between">
          <div>
            {savings > 0 && (
              <span className="font-micro text-micro text-secondary line-through mr-2">
                {formatPrice(msrp)}
              </span>
            )}
            <span className="font-subheading text-subheading text-primary font-bold">
              {formatPrice(bestPrice)}
            </span>
          </div>
          {savingsPercent > 0 && (
            <span className="font-micro text-micro font-semibold text-ember px-2 py-0.5 rounded-full bg-canvas">
              -{savingsPercent}% Spread
            </span>
          )}
        </div>

        {/* Parity & Cashback Line */}
        <div className="mt-3 flex items-center justify-between text-secondary font-micro text-micro">
          <span className="flex items-center gap-1 text-secondary">
            <CheckCircle2 size={13} className="text-electric-blue" />
            Instant Node Parity Match
          </span>
          <span className="font-semibold text-primary">+1% Cashback ({formatPrice(cashbackAmount)})</span>
        </div>

        {/* Action Controls */}
        <div className="mt-5 pt-4 flex items-center justify-between border-t border-hairline/30">
          <button
            type="button"
            className="font-caption text-caption text-link-blue hover:underline flex items-center gap-1 font-medium cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product.id}`);
            }}
          >
            <span>Inspect Intelligence Dossier</span>
            <ChevronRight size={15} />
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isCompared
                  ? 'bg-electric-blue text-paper'
                  : 'bg-canvas text-secondary hover:text-primary hover:bg-surface-variant'
              }`}
              title={isCompared ? 'In Comparison Matrix' : 'Add to Comparison Matrix'}
              onClick={(e) => {
                e.stopPropagation();
                addToCompare(product.id);
              }}
            >
              <Scale size={14} />
            </button>

            <button
              type="button"
              className="w-8 h-8 rounded-full bg-canvas flex items-center justify-center text-primary hover:bg-electric-blue hover:text-paper transition-colors cursor-pointer"
              title="Quick Buy"
              onClick={(e) => {
                e.stopPropagation();
                const storeUrl = product.stores?.[0]?.url || product.affiliateUrl || '#';
                if (storeUrl !== '#') window.open(storeUrl, '_blank');
              }}
            >
              <ShoppingBag size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
