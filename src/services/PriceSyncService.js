// Simulates fetching live prices from an external product API.
// Replaces static data with simulated real-time fluctuations.

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const PriceSyncService = {
  /**
   * Fetches the current live price of a product.
   * In reality, this would hit an API like Rainforest (Amazon) or BestBuy API.
   * Here we simulate a slight fluctuation from the base price.
   */
  async getLivePrice(productId, basePrice) {
    await delay(600 + Math.random() * 500); // Simulate network latency

    // Simulate 70% chance price is same, 15% chance it dropped slightly, 15% chance it increased slightly
    const rand = Math.random();
    let currentPrice = basePrice;
    
    if (rand > 0.85) {
      // Price drop (1% to 5%)
      const drop = basePrice * (0.01 + Math.random() * 0.04);
      currentPrice = basePrice - drop;
    } else if (rand > 0.7) {
      // Price increase (1% to 3%)
      const increase = basePrice * (0.01 + Math.random() * 0.02);
      currentPrice = basePrice + increase;
    }

    return {
      productId,
      livePrice: parseFloat(currentPrice.toFixed(2)),
      timestamp: new Date().toISOString(),
      source: 'Verified Partner Network'
    };
  }
};
