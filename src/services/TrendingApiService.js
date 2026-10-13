import FC from '../data/mockData';

const LIVE_API_URL = 'https://dummyjson.com/products?limit=10';

/**
 * Fetches live trending products from DummyJSON.
 * If the network request fails, or is rate-limited, it gracefully falls back
 * to a local selection of mock products.
 */
export const fetchTrendingProducts = async () => {
  try {
    const response = await fetch(LIVE_API_URL);
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    const data = await response.json();
    
    // Map DummyJSON response to our application's product schema
    return data.products.map(p => ({
      id: `live-${p.id}`,
      name: p.title,
      title: p.title,
      brand: p.brand || 'Generic',
      category: p.category,
      sku: p.sku || `LIVE-${p.id}`,
      rating: parseFloat(p.rating),
      reviewsCount: p.reviews?.length || Math.floor(Math.random() * 500) + 50,
      popularityScore: Math.floor(Math.random() * 20) + 80, // High popularity for trending
      isTrending: true,
      discountPercentage: p.discountPercentage || 0,
      featured: true,
      inStock: p.stock > 0,
      images: [p.thumbnail, ...(p.images || [])],
      color: 'Default',
      colors: ['Default'],
      description: p.description,
      pros: ['Great value', 'Live product data'],
      cons: ['Limited specs from API'],
      truthScore: Math.floor(Math.random() * 15) + 85,
      specs: {
        'Weight': p.weight ? `${p.weight}g` : 'N/A',
        'Dimensions': p.dimensions ? `${p.dimensions.width}x${p.dimensions.height}x${p.dimensions.depth} cm` : 'N/A',
        'Warranty': p.warrantyInformation || 'Standard',
        'Shipping': p.shippingInformation || 'Standard'
      },
      stores: [
        {
          name: 'DummyJSON Store',
          logoText: 'DJ',
          badge: 'LIVE DATA',
          price: p.price,
          stock: p.availabilityStatus || 'In Stock',
          shipping: p.shippingInformation || 'Free',
          deliveryDays: 3,
          sellerScore: 98
        }
      ],
      priceHistory: [],
      originalMSRP: Math.round(p.price / (1 - (p.discountPercentage || 0) / 100)),
      currentBestPrice: p.price,
      lastUpdated: new Date().toISOString(),
      dataSource: 'Live API'
    }));
  } catch (error) {
    console.warn('Live API fetch failed, falling back to local demo trending data:', error);
    
    // Fallback: Pick 10 random "trending" products from local mock data
    const localProducts = FC.defaultProducts || [];
    const trendingLocal = localProducts.filter(p => p.isTrending || p.popularityScore > 90);
    
    // Shuffle and pick 10
    const shuffled = [...(trendingLocal.length > 10 ? trendingLocal : localProducts)].sort(() => 0.5 - Math.random());
    
    return shuffled.slice(0, 10).map(p => ({
      ...p,
      dataSource: 'Demo fallback' // Flag to indicate it's local
    }));
  }
};
