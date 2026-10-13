import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Breadcrumbs = ({ customItems = [] }) => {
  const location = useLocation();

  const getBreadcrumbs = () => {
    if (customItems.length) return customItems;

    const parts = location.pathname.split('/').filter(Boolean);
    const crumbs = [{ label: 'Store', path: '/' }];

    if (parts.length === 0) return []; // Don't show on home

    if (parts[0] === 'catalog') {
      crumbs.push({ label: 'Flagship Catalog', path: '/catalog' });
    } else if (parts[0] === 'product') {
      crumbs.push({ label: 'Catalog', path: '/catalog' });
      crumbs.push({ label: 'Product Intelligence', path: location.pathname });
    } else if (parts[0] === 'compare') {
      crumbs.push({ label: 'Comparison Matrix', path: '/compare' });
    } else if (parts[0] === 'wallet') {
      crumbs.push({ label: 'Cashback Wallet & Transfers', path: '/wallet' });
    } else if (parts[0] === 'account') {
      crumbs.push({ label: 'Customer Account', path: '/account' });
    } else if (parts[0] === 'admin') {
      crumbs.push({ label: 'Admin Command Center', path: '/admin' });
    }

    return crumbs;
  };

  const crumbs = getBreadcrumbs();
  if (!crumbs || crumbs.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="w-full border-b border-fc-border bg-fc-surface/80 backdrop-blur-md sticky top-16 md:top-20 z-30 px-4 sm:px-6 py-2.5 text-xs text-fc-text-secondary">
      <div className="max-w-fc-container mx-auto flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
        {crumbs.map((c, idx) => {
          const isLast = idx === crumbs.length - 1;
          return (
            <React.Fragment key={c.path + idx}>
              {idx > 0 && <span className="text-fc-text-tertiary select-none">/</span>}
              {isLast ? (
                <span className="font-medium text-fc-text-primary truncate">{c.label}</span>
              ) : (
                <Link to={c.path} className="text-fc-text-secondary hover:text-fc-accent transition-colors truncate">
                  {c.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
