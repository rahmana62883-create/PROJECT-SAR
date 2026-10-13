// ============================================================================
// FLASHCOMPARE AI — AUTHENTIC INDIAN VEGETABLE & SABZI MOCK DATASET
// 50 High-Demand Indian Vegetables across Mandis, Quick-Commerce & Supermarkets
// Platforms: Blinkit, Zepto, Swiggy Instamart, BigBasket (Tata), JioMart/Reliance Fresh, Local Mandi
// All prices in Indian Rupees (₹ INR) with standard Indian retail units (kg, g, bunch, pcs)
// ============================================================================

export const indiaVegetablesMockData = [
  // --------------------------------------------------------------------------
  // 1. DAILY STAPLES (Aloo, Pyaz, Tamatar, Mirch, Adrak, Lehsun)
  // --------------------------------------------------------------------------
  {
    id: "aloo-potato-jyoti-new-crop",
    title: "Fresh Jyoti Potato (Pahadi Aloo) - 1 kg",
    brand: "Farm Fresh Direct",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-ALOO-01",
    rating: 4.8,
    reviewsCount: 4210,
    featured: true,
    inStock: true,
    chipset: "Origin: Agra & Punjab Mandi Cluster",
    material: "Grade-A Medium-to-Large Oval Tubers, Low Moisture",
    images: [
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Golden Russet",
    colors: ["1 kg Pack", "2 kg Saver Mesh", "5 kg Family Sack"],
    description: "Hand-picked, earth-cleaned Jyoti potatoes from trusted North Indian farms. Firm skin, creamy texture, and balanced starch content ideal for everyday Jeera Aloo, Aloo Paratha, Samosas, and rich curry gravies.",
    truthScore: 97,
    truthScoreBreakdown: { freshness: 98, farmTraceability: 96, priceFairness: 99, weightAccuracy: 97 },
    specs: {
      "Pack Size / Unit": "1 kg (± 25g net weight)",
      "Variety": "Jyoti / Pahadi Golden Potato",
      "Source Region": "Agra (Uttar Pradesh) & Jalandhar (Punjab)",
      "Shelf Life": "10–14 days in well-ventilated cool storage",
      "Pesticide Test": "Zero harmful residue • FSSAI Grade-A",
      "Culinary Best For": "Dum Aloo, Aloo Gobi, Parathas, French Fries, Samosa Filling"
    },
    currentBestPrice: 34.00,
    originalMSRP: 45.00,
    stores: [
      {
        name: "Blinkit (10-Min)",
        price: 34.00,
        originalPrice: 45.00,
        savings: 11.00,
        status: "In Stock (9-12 min delivery)",
        shipping: "Free delivery on orders > ₹99",
        isBestPrice: true,
        offer: "₹10 Instant with Simpl / UPI",
        coupon: { code: "SABZI10", discount: 10, type: "flat", desc: "₹10 flat discount on veggies" }
      },
      {
        name: "Zepto",
        price: 36.00,
        originalPrice: 45.00,
        savings: 9.00,
        status: "In Stock (10 min delivery)",
        shipping: "₹15 handling / Free with Zepto Pass",
        isBestPrice: false,
        offer: "Zepto Super Saver 5% extra off"
      },
      {
        name: "Swiggy Instamart",
        price: 37.00,
        originalPrice: 48.00,
        savings: 11.00,
        status: "In Stock (12-15 min delivery)",
        shipping: "Free with Swiggy One",
        isBestPrice: false,
        offer: "₹15 cashback on ₹199 cart"
      },
      {
        name: "BigBasket (Fresho)",
        price: 35.00,
        originalPrice: 46.00,
        savings: 11.00,
        status: "In Stock (Next-Day Morning Slot)",
        shipping: "Free over ₹199 with BB Star",
        isBestPrice: false,
        offer: "5% Tata NeuCoins Back"
      },
      {
        name: "Reliance Smart Bazaar / JioMart",
        price: 38.00,
        originalPrice: 45.00,
        savings: 7.00,
        status: "In Stock",
        shipping: "Store pickup or standard delivery",
        isBestPrice: false,
        offer: "Bank offer with SBI Cards"
      },
      {
        name: "Local Mandi Floor",
        price: 35.00,
        originalPrice: 40.00,
        savings: 5.00,
        status: "Physical Mandi Rate",
        shipping: "Cash & Carry",
        isBestPrice: false,
        offer: "Wholesale Mandi Parity"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 38.00 },
      { date: "2026-03-10", price: 36.00 },
      { date: "2026-03-21", price: 34.00 }
    ],
    reviewBreakdown: { 5: 88, 4: 10, 3: 2, 2: 0, 1: 0 }
  },
  {
    id: "pyaz-onion-nashik-red",
    title: "Nashik Red Onion (Kanda / Pyaz) - 1 kg",
    brand: "Fresho Direct Mandi",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-PYAZ-02",
    rating: 4.7,
    reviewsCount: 5120,
    featured: true,
    inStock: true,
    chipset: "Origin: Lasalgaon / Nashik Mandi, Maharashtra",
    material: "Crisp Multi-Layered Red Bulbs, Sharp Pungency",
    images: [
      "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Deep Ruby Red",
    colors: ["1 kg Pack", "2 kg Mesh Bag", "5 kg Bag"],
    description: "Famous Lasalgaon Nashik red onions known across India for their intense aroma, natural sweetness upon caramelizing, and rich pinkish-red rings. Essential baseline foundation for Indian curries, tadkas, biryanis, and street-style kachumber.",
    truthScore: 96,
    truthScoreBreakdown: { freshness: 97, farmTraceability: 98, priceFairness: 95, weightAccuracy: 96 },
    specs: {
      "Pack Size / Unit": "1 kg (Medium 45mm+ size)",
      "Variety": "Nashik Garwa Red Onion",
      "Source Region": "Lasalgaon Mandi, Nashik (Maharashtra)",
      "Shelf Life": "12–15 days in dry ventilated basket",
      "Moisture Level": "Well-cured outer skin, high dry matter",
      "Culinary Best For": "Biryani Birista, Onion Bhaji, Curry Paste Base, Raw Kachumber Salad"
    },
    currentBestPrice: 42.00,
    originalMSRP: 55.00,
    stores: [
      {
        name: "Zepto",
        price: 42.00,
        originalPrice: 55.00,
        savings: 13.00,
        status: "In Stock (10 min delivery)",
        shipping: "Free with Zepto Pass",
        isBestPrice: true,
        offer: "₹15 off on first grocery order",
        coupon: { code: "ZEPTOVEG", discount: 15, type: "flat", desc: "₹15 off on fresh produce" }
      },
      {
        name: "Blinkit (10-Min)",
        price: 44.00,
        originalPrice: 55.00,
        savings: 11.00,
        status: "In Stock (10 min)",
        shipping: "Standard delivery",
        isBestPrice: false,
        offer: "Blinkit Cash 5% Back"
      },
      {
        name: "Swiggy Instamart",
        price: 45.00,
        originalPrice: 58.00,
        savings: 13.00,
        status: "In Stock (15 min)",
        shipping: "Free with Swiggy One",
        isBestPrice: false,
        offer: "Instant bank discount"
      },
      {
        name: "BigBasket (Fresho)",
        price: 43.00,
        originalPrice: 54.00,
        savings: 11.00,
        status: "In Stock",
        shipping: "BB Star Free Delivery",
        isBestPrice: false,
        offer: "Tata NeuCoins 5%"
      },
      {
        name: "Reliance Smart Bazaar / JioMart",
        price: 46.00,
        originalPrice: 56.00,
        savings: 10.00,
        status: "In Stock",
        shipping: "Next Day Delivery",
        isBestPrice: false,
        offer: "Smart Bazaar Weekend Offer"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 48.00 },
      { date: "2026-03-12", price: 45.00 },
      { date: "2026-03-21", price: 42.00 }
    ],
    reviewBreakdown: { 5: 86, 4: 11, 3: 2, 2: 1, 1: 0 }
  },
  {
    id: "tamatar-tomato-hybrid-desi",
    title: "Fresh Desi & Hybrid Red Tomatoes (Tamatar) - 1 kg",
    brand: "Kissan Pride Hydro-Farms",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-TOM-03",
    rating: 4.8,
    reviewsCount: 3890,
    featured: true,
    inStock: true,
    chipset: "Origin: Kolar (Karnataka) & Madanapalle (AP)",
    material: "Firm, Vine-Ripened, Juicy Red Skin, High Lycopene",
    images: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546470427-0d4db154ceb7?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Vine Ripe Crimson Red",
    colors: ["1 kg Pack", "2 kg Saver Pack", "500g Trial"],
    description: "Plump, sun-ripened Indian tomatoes sourced daily from premier tomato belts. Perfect balance of natural tanginess and sweet pulp. Creates smooth gravies, tangy Rasam, Tomato Chutney, Makhani sauces, and crunchy fresh salads.",
    truthScore: 98,
    truthScoreBreakdown: { freshness: 99, farmTraceability: 97, priceFairness: 98, weightAccuracy: 97 },
    specs: {
      "Pack Size / Unit": "1 kg (approx 10–12 tomatoes)",
      "Type": "Hybrid Round & Desi semi-sour blend",
      "Source Region": "Kolar (Karnataka) & Solan (Himachal)",
      "Shelf Life": "5–7 days at room temp, 10 days refrigerated",
      "Quality Standard": "Graded sorting, no bruises or cracks",
      "Culinary Best For": "Paneer Butter Masala, Tomato Rasam, Sev Tamatar, Chutneys"
    },
    currentBestPrice: 28.00,
    originalMSRP: 40.00,
    stores: [
      {
        name: "Blinkit (10-Min)",
        price: 28.00,
        originalPrice: 40.00,
        savings: 12.00,
        status: "In Stock (10 min)",
        shipping: "Free over ₹99",
        isBestPrice: true,
        offer: "Instant ₹10 coupon on fresh produce",
        coupon: { code: "FRESH10", discount: 10, type: "flat", desc: "₹10 off on vegetables" }
      },
      {
        name: "BigBasket (Fresho)",
        price: 29.00,
        originalPrice: 38.00,
        savings: 9.00,
        status: "In Stock (Morning Slot)",
        shipping: "Free with BB Star",
        isBestPrice: false,
        offer: "Tata NeuCoins Back"
      },
      {
        name: "Zepto",
        price: 30.00,
        originalPrice: 40.00,
        savings: 10.00,
        status: "In Stock (10 min)",
        shipping: "Standard Zepto pass",
        isBestPrice: false,
        offer: "Zepto Cash Back"
      },
      {
        name: "Swiggy Instamart",
        price: 32.00,
        originalPrice: 42.00,
        savings: 10.00,
        status: "In Stock (12 min)",
        shipping: "Free with Swiggy One",
        isBestPrice: false,
        offer: "Extra 10% on Axis Bank"
      },
      {
        name: "Reliance Smart Bazaar / JioMart",
        price: 30.00,
        originalPrice: 38.00,
        savings: 8.00,
        status: "In Stock",
        shipping: "Standard",
        isBestPrice: false,
        offer: "Mandi Price Match"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 34.00 },
      { date: "2026-03-12", price: 30.00 },
      { date: "2026-03-21", price: 28.00 }
    ],
    reviewBreakdown: { 5: 90, 4: 8, 3: 2, 2: 0, 1: 0 }
  },
  {
    id: "bhindi-lady-finger-okra",
    title: "Fresh Green Tender Bhindi (Lady Finger / Okra) - 500g",
    brand: "Fresho Organic Mandi",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-BHIN-04",
    rating: 4.8,
    reviewsCount: 2680,
    featured: true,
    inStock: true,
    chipset: "Origin: Gujarat & Maharashtra Green Belts",
    material: "Tender, Snap-Crisp Green Pods, Fiber-Rich",
    images: [
      "https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Vibrant Emerald Green",
    colors: ["500g Pack", "1 kg Saver Pack", "250g Quick Cook"],
    description: "Tender, hand-sorted baby okra that snaps easily at the tip without fibrous stringiness. Washed and sorted for zero blemishes. Ideal for making crispy Kurkuri Bhindi, Bharwan Masala Bhindi, and North Indian style Bhindi Do Pyaza.",
    truthScore: 97,
    truthScoreBreakdown: { freshness: 98, farmTraceability: 96, priceFairness: 97, weightAccuracy: 98 },
    specs: {
      "Pack Size / Unit": "500g (Approx 35–45 pods)",
      "Tenderness": "High (tip snaps cleanly)",
      "Source Region": "Navsari (Gujarat) & Pune (Maharashtra)",
      "Shelf Life": "4–5 days in refrigerator crisper",
      "Culinary Best For": "Kurkuri Bhindi, Bhindi Masala, Dahi Bhindi, Sambar"
    },
    currentBestPrice: 35.00,
    originalMSRP: 48.00,
    stores: [
      {
        name: "Blinkit (10-Min)",
        price: 35.00,
        originalPrice: 48.00,
        savings: 13.00,
        status: "In Stock (10 min)",
        shipping: "Free over ₹99",
        isBestPrice: true,
        offer: "₹10 instant discount"
      },
      {
        name: "Zepto",
        price: 38.00,
        originalPrice: 50.00,
        savings: 12.00,
        status: "In Stock (10 min)",
        shipping: "Free with Zepto Pass",
        isBestPrice: false,
        offer: "Daily Fresh Guarantee"
      },
      {
        name: "BigBasket (Fresho)",
        price: 36.00,
        originalPrice: 46.00,
        savings: 10.00,
        status: "In Stock",
        shipping: "Morning delivery",
        isBestPrice: false,
        offer: "Tata Neu 5% coins"
      },
      {
        name: "Swiggy Instamart",
        price: 39.00,
        originalPrice: 52.00,
        savings: 13.00,
        status: "In Stock",
        shipping: "Swiggy One Free",
        isBestPrice: false,
        offer: "10% cashback"
      }
    ],
    priceHistory: [
      { date: "2026-03-05", price: 42.00 },
      { date: "2026-03-15", price: 38.00 },
      { date: "2026-03-21", price: 35.00 }
    ],
    reviewBreakdown: { 5: 89, 4: 9, 3: 2, 2: 0, 1: 0 }
  },
  {
    id: "hari-mirch-green-chilli-desi",
    title: "Fresh Green Chilli (Spicy Kolhapuri Hari Mirch) - 200g",
    brand: "Desi Farms Spices",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-MIRCH-05",
    rating: 4.9,
    reviewsCount: 3190,
    featured: false,
    inStock: true,
    chipset: "Origin: Kolhapur & Guntur Farm Direct",
    material: "Crisp Slender Green Chillies, Pungent High Scoville",
    images: [
      "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Deep Glossy Green",
    colors: ["200g Pack", "100g Trial", "500g Bulk"],
    description: "Sharp, pungent Indian green chillies with genuine fiery kick and fresh grassy aroma. Sourced from Kolhapur & Guntur farm networks. Perfect for tempering dals, preparing spicy Thecha, Mirchi Bajji, and everyday curry tadka.",
    truthScore: 98,
    truthScoreBreakdown: { freshness: 99, farmTraceability: 98, priceFairness: 97, weightAccuracy: 98 },
    specs: {
      "Pack Size / Unit": "200g (Approx 40–50 chillies)",
      "Variety": "G4 / Kolhapuri Dark Green",
      "Heat Level": "Medium to High (Scoville 30,000–50,000 SHU)",
      "Shelf Life": "10–14 days in dry refrigerated container",
      "Culinary Best For": "Mirchi Ka Kutta, Kolhapuri Thecha, Dal Tadka, Green Chutney"
    },
    currentBestPrice: 18.00,
    originalMSRP: 26.00,
    stores: [
      {
        name: "Zepto",
        price: 18.00,
        originalPrice: 26.00,
        savings: 8.00,
        status: "In Stock (10 min)",
        shipping: "Free with Zepto Pass",
        isBestPrice: true,
        offer: "Fresh harvest guarantee"
      },
      {
        name: "Blinkit (10-Min)",
        price: 19.00,
        originalPrice: 26.00,
        savings: 7.00,
        status: "In Stock (10 min)",
        shipping: "Free over ₹99",
        isBestPrice: false,
        offer: "Quick cart add"
      },
      {
        name: "BigBasket (Fresho)",
        price: 20.00,
        originalPrice: 28.00,
        savings: 8.00,
        status: "In Stock",
        shipping: "BB Star Free",
        isBestPrice: false,
        offer: "5% Tata NeuCoins"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 22.00 },
      { date: "2026-03-14", price: 20.00 },
      { date: "2026-03-21", price: 18.00 }
    ],
    reviewBreakdown: { 5: 92, 4: 7, 3: 1, 2: 0, 1: 0 }
  },
  {
    id: "adrak-fresh-ginger-desi",
    title: "Organic Desi Ginger (Adrak / Sonth Root) - 250g",
    brand: "Himalayan Agro Organics",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-ADR-06",
    rating: 4.8,
    reviewsCount: 2940,
    featured: false,
    inStock: true,
    chipset: "Origin: Wayanad (Kerala) & Himachal Foothills",
    material: "Thick Rhizomes, Low Fiber, High Zingy Oleoresin",
    images: [
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Earthy Tan & Pale Gold",
    colors: ["250g Pack", "500g Saver", "100g Trial"],
    description: "Premium washed Indian ginger rhizomes with thin skin, crisp juicy flesh, and zesty aroma. Essential for morning Adrak Chai, Ginger-Garlic paste, Ayurvedic Kadha, and rich Mughlai gravies.",
    truthScore: 97,
    truthScoreBreakdown: { freshness: 98, farmTraceability: 96, priceFairness: 97, weightAccuracy: 97 },
    specs: {
      "Pack Size / Unit": "250g washed & sorted rhizomes",
      "Moisture": "Juicy, freshly harvested",
      "Fiber Content": "Low stringiness, easy grating",
      "Shelf Life": "3 weeks refrigerated in breathable bag",
      "Culinary Best For": "Adrak Chai, Ginger-Garlic Paste, Kadha, Chutney, Curries"
    },
    currentBestPrice: 38.00,
    originalMSRP: 50.00,
    stores: [
      {
        name: "Blinkit (10-Min)",
        price: 38.00,
        originalPrice: 50.00,
        savings: 12.00,
        status: "In Stock (10 min)",
        shipping: "Free over ₹99",
        isBestPrice: true,
        offer: "Daily essential rebate"
      },
      {
        name: "BigBasket (Fresho)",
        price: 39.00,
        originalPrice: 52.00,
        savings: 13.00,
        status: "In Stock",
        shipping: "Morning Slot",
        isBestPrice: false,
        offer: "Tata NeuCoins Back"
      },
      {
        name: "Zepto",
        price: 42.00,
        originalPrice: 55.00,
        savings: 13.00,
        status: "In Stock",
        shipping: "Zepto Pass",
        isBestPrice: false,
        offer: "Fast 10-min drop"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 45.00 },
      { date: "2026-03-12", price: 40.00 },
      { date: "2026-03-21", price: 38.00 }
    ],
    reviewBreakdown: { 5: 91, 4: 8, 3: 1, 2: 0, 1: 0 }
  },
  {
    id: "lehsun-garlic-ooty-desi",
    title: "Fresh Ooty Desi Garlic (Lehsun Cloves) - 250g",
    brand: "Pure Origin Mandi",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-LEH-07",
    rating: 4.7,
    reviewsCount: 3410,
    featured: false,
    inStock: true,
    chipset: "Origin: Ooty / Nilgiris & Mandsaur Mandi",
    material: "Tight Paper Skin, Large Fat Cloves, High Allicin",
    images: [
      "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Silky White & Purple Streaks",
    colors: ["250g Pack", "500g Value Pack", "1 kg Sack"],
    description: "Large, easy-to-peel garlic bulbs with robust pungency and rich allicin therapeutic value. Sourced from high-altitude Nilgiri farms and Madhya Pradesh garlic belts. Delivers bold garlicky depth to Lasooni Dal, Garlic Naan, and pickles.",
    truthScore: 96,
    truthScoreBreakdown: { freshness: 97, farmTraceability: 96, priceFairness: 95, weightAccuracy: 96 },
    specs: {
      "Pack Size / Unit": "250g whole bulbs",
      "Variety": "Ooty High-Altitude / Mandsaur Desi",
      "Peel Ease": "Tight yet easily separable cloves",
      "Shelf Life": "3–4 weeks in open airy basket",
      "Culinary Best For": "Lasooni Palak, Dal Tadka, Garlic Naan, Chili Garlic Oil"
    },
    currentBestPrice: 65.00,
    originalMSRP: 85.00,
    stores: [
      {
        name: "BigBasket (Fresho)",
        price: 65.00,
        originalPrice: 85.00,
        savings: 20.00,
        status: "In Stock (Morning Slot)",
        shipping: "Free with BB Star",
        isBestPrice: true,
        offer: "5% Tata NeuCoins"
      },
      {
        name: "Blinkit (10-Min)",
        price: 68.00,
        originalPrice: 88.00,
        savings: 20.00,
        status: "In Stock (10 min)",
        shipping: "Standard",
        isBestPrice: false,
        offer: "Instant dispatch"
      },
      {
        name: "Zepto",
        price: 70.00,
        originalPrice: 90.00,
        savings: 20.00,
        status: "In Stock (10 min)",
        shipping: "Zepto Pass",
        isBestPrice: false,
        offer: "Save with combo"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 78.00 },
      { date: "2026-03-12", price: 70.00 },
      { date: "2026-03-21", price: 65.00 }
    ],
    reviewBreakdown: { 5: 87, 4: 10, 3: 2, 2: 1, 1: 0 }
  },

  // --------------------------------------------------------------------------
  // 2. GREEN LEAFY SABZI & HERBS (Palak, Methi, Dhaniya, Pudina, Kadhi Patta)
  // --------------------------------------------------------------------------
  {
    id: "palak-spinach-desi-hydroponic",
    title: "Fresh Hydroponic & Desi Palak (Spinach) - 250g Bunch",
    brand: "Urban Greens India",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-PAL-08",
    rating: 4.9,
    reviewsCount: 3820,
    featured: true,
    inStock: true,
    chipset: "Origin: Hydroponic Peri-Urban Farms",
    material: "Tender Baby Spinach Leaves, Soil-Free Cleaned, Iron-Rich",
    images: [
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Deep Forest Green",
    colors: ["250g Bunch", "500g Double Bunch", "1 kg Bulk"],
    description: "Farm-harvested early morning spinach leaves, root-trimmed and pre-washed in ozonated water. Packed with dietary iron, folate, and calcium. Perfectly suited for smooth Palak Paneer, Aloo Palak, Dal Palak, and morning green smoothies.",
    truthScore: 99,
    truthScoreBreakdown: { freshness: 100, farmTraceability: 98, priceFairness: 99, weightAccuracy: 99 },
    specs: {
      "Pack Size / Unit": "250g bunch (Root trimmed)",
      "Cleanliness": "Hydroponically rinsed, mud-free",
      "Nutrient Profile": "High Iron, Vitamin A & K",
      "Shelf Life": "3–4 days in refrigerator paper wrap",
      "Culinary Best For": "Palak Paneer, Palak Poori, Dal Palak, Palak Pakoda"
    },
    currentBestPrice: 18.00,
    originalMSRP: 28.00,
    stores: [
      {
        name: "Blinkit (10-Min)",
        price: 18.00,
        originalPrice: 28.00,
        savings: 10.00,
        status: "In Stock (10 min)",
        shipping: "Free over ₹99",
        isBestPrice: true,
        offer: "Daily Greens Flash Deal"
      },
      {
        name: "Zepto",
        price: 20.00,
        originalPrice: 30.00,
        savings: 10.00,
        status: "In Stock (10 min)",
        shipping: "Zepto Pass",
        isBestPrice: false,
        offer: "Farm Fresh 10-min"
      },
      {
        name: "BigBasket (Fresho)",
        price: 19.00,
        originalPrice: 26.00,
        savings: 7.00,
        status: "In Stock",
        shipping: "BB Star Free",
        isBestPrice: false,
        offer: "Tata NeuCoins"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 24.00 },
      { date: "2026-03-10", price: 20.00 },
      { date: "2026-03-21", price: 18.00 }
    ],
    reviewBreakdown: { 5: 93, 4: 6, 3: 1, 2: 0, 1: 0 }
  },
  {
    id: "methi-fenugreek-greens",
    title: "Fresh Desi Kasuri Methi (Fenugreek Leaves) - 250g Bunch",
    brand: "Farm Fresh Greenery",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-MET-09",
    rating: 4.8,
    reviewsCount: 2210,
    featured: false,
    inStock: true,
    chipset: "Origin: Rajasthan & Haryana Greens Belt",
    material: "Small Tender Fragrant Leaves, Characteristic Pleasant Bitterness",
    images: [
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Soft Matte Green",
    colors: ["250g Bunch", "500g Value Pack"],
    description: "Authentic Indian small-leaf fenugreek greens renowned for their warm herbal bitterness and tempting aroma. Excellent for diabetic dietary health. Ideal for Methi Thepla, Aloo Methi, Methi Malai Matar, and Methi Paratha.",
    truthScore: 97,
    truthScoreBreakdown: { freshness: 98, farmTraceability: 96, priceFairness: 97, weightAccuracy: 97 },
    specs: {
      "Pack Size / Unit": "250g freshly bound bunch",
      "Variety": "Desi Choti Methi",
      "Aroma": "Intense authentic fenugreek perfume",
      "Shelf Life": "3 days refrigerated",
      "Culinary Best For": "Gujarati Thepla, Aloo Methi Sabzi, Methi Malai Paneer"
    },
    currentBestPrice: 22.00,
    originalMSRP: 32.00,
    stores: [
      {
        name: "Zepto",
        price: 22.00,
        originalPrice: 32.00,
        savings: 10.00,
        status: "In Stock (10 min)",
        shipping: "Free with Zepto Pass",
        isBestPrice: true,
        offer: "Fresh morning batch"
      },
      {
        name: "Blinkit (10-Min)",
        price: 24.00,
        originalPrice: 35.00,
        savings: 11.00,
        status: "In Stock",
        shipping: "Free over ₹99",
        isBestPrice: false,
        offer: "Quick delivery"
      },
      {
        name: "BigBasket (Fresho)",
        price: 23.00,
        originalPrice: 30.00,
        savings: 7.00,
        status: "In Stock",
        shipping: "Next morning",
        isBestPrice: false,
        offer: "Tata NeuCoins"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 28.00 },
      { date: "2026-03-14", price: 25.00 },
      { date: "2026-03-21", price: 22.00 }
    ],
    reviewBreakdown: { 5: 89, 4: 9, 3: 2, 2: 0, 1: 0 }
  },
  {
    id: "dhaniya-coriander-fresh-cilantro",
    title: "Fresh Fragrant Dhaniya (Coriander Leaves) - 100g Bunch",
    brand: "Kitchen Herbals",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-DHA-10",
    rating: 4.9,
    reviewsCount: 4890,
    featured: false,
    inStock: true,
    chipset: "Origin: Local Peri-Urban Organic Plots",
    material: "Crisp Stems, Feathered Leaves, Essential Herb Aroma",
    images: [
      "https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Bright Leafy Green",
    colors: ["100g Bunch", "250g Family Pack"],
    description: "The indispensable heartbeat of Indian cooking. Hand-harvested fresh coriander leaves with tender edible stems that burst with zesty fragrance upon chopping. Essential for spicy green chutney, dal garnishing, and bhel puri.",
    truthScore: 98,
    truthScoreBreakdown: { freshness: 99, farmTraceability: 98, priceFairness: 98, weightAccuracy: 98 },
    specs: {
      "Pack Size / Unit": "100g tied bunch",
      "Stems": "Tender and flavorful",
      "Shelf Life": "5 days refrigerated in paper towel wrap",
      "Culinary Best For": "Mint-Coriander Chutney, Sabzi Garnish, Raita, Chaat"
    },
    currentBestPrice: 12.00,
    originalMSRP: 18.00,
    stores: [
      {
        name: "Blinkit (10-Min)",
        price: 12.00,
        originalPrice: 18.00,
        savings: 6.00,
        status: "In Stock (10 min)",
        shipping: "Free over ₹99",
        isBestPrice: true,
        offer: "Daily Herb Add-on"
      },
      {
        name: "Zepto",
        price: 14.00,
        originalPrice: 20.00,
        savings: 6.00,
        status: "In Stock (10 min)",
        shipping: "Zepto Pass",
        isBestPrice: false,
        offer: "Fast delivery"
      },
      {
        name: "Swiggy Instamart",
        price: 15.00,
        originalPrice: 22.00,
        savings: 7.00,
        status: "In Stock",
        shipping: "Swiggy One",
        isBestPrice: false,
        offer: "Instamart deal"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 15.00 },
      { date: "2026-03-12", price: 13.00 },
      { date: "2026-03-21", price: 12.00 }
    ],
    reviewBreakdown: { 5: 94, 4: 5, 3: 1, 2: 0, 1: 0 }
  },
  {
    id: "pudina-mint-leaves-desi",
    title: "Fresh Desi Pudina (Mint Leaves) - 100g Bunch",
    brand: "Herbal Farm Direct",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-PUD-11",
    rating: 4.8,
    reviewsCount: 2190,
    featured: false,
    inStock: true,
    chipset: "Origin: Hydroponic Cool-Climate Greenhouses",
    material: "Cool Menthol Aroma, Velvety Leaves, High Essential Oils",
    images: [
      "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Lush Emerald",
    colors: ["100g Bunch", "200g Pack"],
    description: "Refreshing desi spearmint leaves packed with crisp cooling menthol notes. Sourced fresh to preserve natural volatile oils. Essential for Hyderabad Biryani garnishing, Pani Puri spicy water, Raita, and virgin Mojitos.",
    truthScore: 97,
    truthScoreBreakdown: { freshness: 98, farmTraceability: 96, priceFairness: 97, weightAccuracy: 97 },
    specs: {
      "Pack Size / Unit": "100g bunch",
      "Menthol Strength": "High crisp aromatics",
      "Shelf Life": "4–6 days chilled",
      "Culinary Best For": "Pani Puri Ka Tikha Paani, Pudina Raita, Biryani Dum, Mojito"
    },
    currentBestPrice: 14.00,
    originalMSRP: 20.00,
    stores: [
      {
        name: "Zepto",
        price: 14.00,
        originalPrice: 20.00,
        savings: 6.00,
        status: "In Stock (10 min)",
        shipping: "Free with Zepto Pass",
        isBestPrice: true,
        offer: "Instant cooling greens"
      },
      {
        name: "Blinkit (10-Min)",
        price: 15.00,
        originalPrice: 22.00,
        savings: 7.00,
        status: "In Stock",
        shipping: "Standard",
        isBestPrice: false,
        offer: "Morning fresh"
      },
      {
        name: "BigBasket (Fresho)",
        price: 15.00,
        originalPrice: 20.00,
        savings: 5.00,
        status: "In Stock",
        shipping: "Morning slot",
        isBestPrice: false,
        offer: "Tata NeuCoins"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 18.00 },
      { date: "2026-03-12", price: 16.00 },
      { date: "2026-03-21", price: 14.00 }
    ],
    reviewBreakdown: { 5: 90, 4: 8, 3: 2, 2: 0, 1: 0 }
  },
  {
    id: "kadhi-patta-curry-leaves",
    title: "Fresh Aromatic Kadhi Patta (Curry Leaves) - 50g Bunch",
    brand: "South Garden Farms",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-KAD-12",
    rating: 4.9,
    reviewsCount: 2750,
    featured: false,
    inStock: true,
    chipset: "Origin: Tamil Nadu & Coastal Karnataka Farms",
    material: "Glossy Dark Green Leaves, Signature Citrus-Herbal Perfume",
    images: [
      "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Glossy Forest Green",
    colors: ["50g Bunch", "100g Double Bunch"],
    description: "Directly harvested sweet neem leaves (Kadhi Patta) offering the quintessential signature tadka aroma that defines South Indian and Gujarati cuisine. Adds unmistakable depth when crackled with mustard seeds in hot ghee.",
    truthScore: 98,
    truthScoreBreakdown: { freshness: 99, farmTraceability: 98, priceFairness: 98, weightAccuracy: 98 },
    specs: {
      "Pack Size / Unit": "50g fresh sprigs",
      "Aroma Profile": "Authentic South Indian tadka perfume",
      "Shelf Life": "10 days refrigerated",
      "Culinary Best For": "Sambar, Kadhi, Poha, Coconut Chutney Tadka, Rasam"
    },
    currentBestPrice: 10.00,
    originalMSRP: 16.00,
    stores: [
      {
        name: "Blinkit (10-Min)",
        price: 10.00,
        originalPrice: 16.00,
        savings: 6.00,
        status: "In Stock (10 min)",
        shipping: "Free over ₹99",
        isBestPrice: true,
        offer: "Essential tadka saver"
      },
      {
        name: "Zepto",
        price: 11.00,
        originalPrice: 18.00,
        savings: 7.00,
        status: "In Stock",
        shipping: "Zepto Pass",
        isBestPrice: false,
        offer: "Fresh batch"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 12.00 },
      { date: "2026-03-21", price: 10.00 }
    ],
    reviewBreakdown: { 5: 93, 4: 6, 3: 1, 2: 0, 1: 0 }
  },

  // --------------------------------------------------------------------------
  // 3. GOURDS & SQUASH (Lauki, Karela, Torai, Tinda, Parwal, Kundru, Kaddu)
  // --------------------------------------------------------------------------
  {
    id: "lauki-bottle-gourd-ghiya",
    title: "Tender Green Lauki (Bottle Gourd / Ghiya / Doodhi) - 1 pc (~1 kg)",
    brand: "Fresho Organic Greens",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-LAU-13",
    rating: 4.8,
    reviewsCount: 2310,
    featured: true,
    inStock: true,
    chipset: "Origin: Punjab & UP Riverbed Mandis",
    material: "Light Pale Green, Thin Edible Skin, Tender Seeds",
    images: [
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Pale Jade Green",
    colors: ["1 pc (~1 kg)", "500g Cut Halves"],
    description: "Young, tender bottle gourd with pale green exterior and succulent, soft interior. Naturally cooling and rich in water content. Excellent for healthy Lauki Chana Dal, Lauki Ka Halwa, Kofta curry, and morning detox juice.",
    truthScore: 97,
    truthScoreBreakdown: { freshness: 98, farmTraceability: 96, priceFairness: 97, weightAccuracy: 97 },
    specs: {
      "Pack Size / Unit": "1 pc (800g – 1.1 kg)",
      "Seed Maturity": "Very soft, non-woody seeds",
      "Hydration": "96% natural water content",
      "Shelf Life": "5–7 days refrigerated",
      "Culinary Best For": "Lauki Chana Dal, Lauki Kofta Curry, Ghiya Halwa, Detox Juice"
    },
    currentBestPrice: 32.00,
    originalMSRP: 45.00,
    stores: [
      {
        name: "BigBasket (Fresho)",
        price: 32.00,
        originalPrice: 45.00,
        savings: 13.00,
        status: "In Stock (Morning Slot)",
        shipping: "Free with BB Star",
        isBestPrice: true,
        offer: "5% Tata NeuCoins Back"
      },
      {
        name: "Blinkit (10-Min)",
        price: 34.00,
        originalPrice: 46.00,
        savings: 12.00,
        status: "In Stock (10 min)",
        shipping: "Free over ₹99",
        isBestPrice: false,
        offer: "10-min delivery"
      },
      {
        name: "Zepto",
        price: 35.00,
        originalPrice: 48.00,
        savings: 13.00,
        status: "In Stock",
        shipping: "Zepto Pass",
        isBestPrice: false,
        offer: "Fresh produce guaranteed"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 38.00 },
      { date: "2026-03-14", price: 35.00 },
      { date: "2026-03-21", price: 32.00 }
    ],
    reviewBreakdown: { 5: 88, 4: 10, 3: 2, 2: 0, 1: 0 }
  },
  {
    id: "karela-bitter-gourd-desi",
    title: "Fresh Desi Small Karela (Bitter Gourd) - 500g",
    brand: "Nature Harvest Mandi",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-KAR-14",
    rating: 4.7,
    reviewsCount: 1980,
    featured: false,
    inStock: true,
    chipset: "Origin: Maharashtra & MP Organic Farms",
    material: "Dark Green Ridged Skin, Crisp Flesh, Diabetic-Friendly",
    images: [
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Deep Forest Green",
    colors: ["500g Pack", "1 kg Value Pack"],
    description: "Fresh, bumpy-textured Indian bitter gourds packed with Charantin and polypeptide-p for blood sugar management. Hand-picked when tender to avoid hard reddish seeds. Perfect for Bharwan Karela, Crispy Karela Chips, and Karela Pyaaz Sabzi.",
    truthScore: 96,
    truthScoreBreakdown: { freshness: 97, farmTraceability: 96, priceFairness: 95, weightAccuracy: 97 },
    specs: {
      "Pack Size / Unit": "500g (Approx 6–8 small gourds)",
      "Variety": "Desi Chota Karela",
      "Health Benefits": "Rich in antioxidants and blood sugar balancing nutrients",
      "Shelf Life": "7–10 days in refrigerator",
      "Culinary Best For": "Bharwan Masala Karela, Karela Stir Fry with Onions, Karela Juice"
    },
    currentBestPrice: 34.00,
    originalMSRP: 46.00,
    stores: [
      {
        name: "Blinkit (10-Min)",
        price: 34.00,
        originalPrice: 46.00,
        savings: 12.00,
        status: "In Stock (10 min)",
        shipping: "Free over ₹99",
        isBestPrice: true,
        offer: "Daily health greens"
      },
      {
        name: "Zepto",
        price: 36.00,
        originalPrice: 48.00,
        savings: 12.00,
        status: "In Stock",
        shipping: "Zepto Pass",
        isBestPrice: false,
        offer: "Quick delivery"
      },
      {
        name: "BigBasket (Fresho)",
        price: 35.00,
        originalPrice: 45.00,
        savings: 10.00,
        status: "In Stock",
        shipping: "BB Star Free",
        isBestPrice: false,
        offer: "Tata NeuCoins"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 40.00 },
      { date: "2026-03-12", price: 36.00 },
      { date: "2026-03-21", price: 34.00 }
    ],
    reviewBreakdown: { 5: 87, 4: 10, 3: 2, 2: 1, 1: 0 }
  },
  {
    id: "torai-ridge-gourd-turiya",
    title: "Fresh Green Torai (Ridge Gourd / Turiya) - 500g",
    brand: "Fresho Direct Mandi",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-TOR-15",
    rating: 4.7,
    reviewsCount: 1640,
    featured: false,
    inStock: true,
    chipset: "Origin: Gujarat & MP Vegetable Belts",
    material: "Deep Angular Ridges, Sponge-Soft Sweet Flesh",
    images: [
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Vibrant Sage Green",
    colors: ["500g Pack", "1 kg Pack"],
    description: "Slender, deep-ridged Indian gourds known as Turai or Turiya. High in dietary fiber and exceptionally easy to digest. Makes delectable homestyle Turai Moong Dal, Turai Masala, and traditional Gujarati Turiya Patra nu Shaak.",
    truthScore: 96,
    truthScoreBreakdown: { freshness: 97, farmTraceability: 95, priceFairness: 96, weightAccuracy: 96 },
    specs: {
      "Pack Size / Unit": "500g (3–4 slender gourds)",
      "Texture": "Tender flesh, sweet mild flavor",
      "Digestibility": "Very light on the stomach, high fiber",
      "Shelf Life": "4–6 days refrigerated",
      "Culinary Best For": "Turai Chana Dal, Turiya Sambharo, Masala Torai"
    },
    currentBestPrice: 36.00,
    originalMSRP: 48.00,
    stores: [
      {
        name: "Zepto",
        price: 36.00,
        originalPrice: 48.00,
        savings: 12.00,
        status: "In Stock (10 min)",
        shipping: "Free with Zepto Pass",
        isBestPrice: true,
        offer: "Fresh morning cut"
      },
      {
        name: "Blinkit (10-Min)",
        price: 38.00,
        originalPrice: 50.00,
        savings: 12.00,
        status: "In Stock",
        shipping: "Standard",
        isBestPrice: false,
        offer: "Quick 10-min"
      },
      {
        name: "BigBasket (Fresho)",
        price: 37.00,
        originalPrice: 47.00,
        savings: 10.00,
        status: "In Stock",
        shipping: "Next day",
        isBestPrice: false,
        offer: "Tata NeuCoins"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 42.00 },
      { date: "2026-03-12", price: 38.00 },
      { date: "2026-03-21", price: 36.00 }
    ],
    reviewBreakdown: { 5: 86, 4: 11, 3: 2, 2: 1, 1: 0 }
  },
  {
    id: "parwal-pointed-gourd-fresh",
    title: "Fresh Green Parwal (Pointed Gourd / Potol) - 500g",
    brand: "Eastern Farm Fresh",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-PAR-16",
    rating: 4.8,
    reviewsCount: 1890,
    featured: false,
    inStock: true,
    chipset: "Origin: Bihar, Bengal & Eastern UP Mandis",
    material: "Striped Green Outer Skin, Firm Crunchy Flesh",
    images: [
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Dual Striped Emerald",
    colors: ["500g Pack", "1 kg Pack"],
    description: "Classic pointed gourd beloved in North & East Indian households. Naturally crisp texture that holds up brilliantly when stuffed with spiced paneer or roasted with cumin and coriander. Essential for Aloo Parwal Sabzi, Potol Posto, and Bharwan Parwal.",
    truthScore: 97,
    truthScoreBreakdown: { freshness: 98, farmTraceability: 96, priceFairness: 97, weightAccuracy: 97 },
    specs: {
      "Pack Size / Unit": "500g (Approx 12–16 gourds)",
      "Variety": "Desi Striped Parwal",
      "Shelf Life": "5–7 days refrigerated",
      "Culinary Best For": "Aloo Parwal Rasedar, Potol Posto (Bengali style), Bharwan Parwal"
    },
    currentBestPrice: 44.00,
    originalMSRP: 58.00,
    stores: [
      {
        name: "Blinkit (10-Min)",
        price: 44.00,
        originalPrice: 58.00,
        savings: 14.00,
        status: "In Stock (10 min)",
        shipping: "Free over ₹99",
        isBestPrice: true,
        offer: "Eastern specialties discount"
      },
      {
        name: "Zepto",
        price: 47.00,
        originalPrice: 60.00,
        savings: 13.00,
        status: "In Stock",
        shipping: "Zepto Pass",
        isBestPrice: false,
        offer: "Fresh morning drop"
      },
      {
        name: "BigBasket (Fresho)",
        price: 45.00,
        originalPrice: 56.00,
        savings: 11.00,
        status: "In Stock",
        shipping: "BB Star",
        isBestPrice: false,
        offer: "5% Tata NeuCoins"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 50.00 },
      { date: "2026-03-15", price: 46.00 },
      { date: "2026-03-21", price: 44.00 }
    ],
    reviewBreakdown: { 5: 89, 4: 9, 3: 2, 2: 0, 1: 0 }
  },
  {
    id: "kaddu-yellow-pumpkin-sitaphal",
    title: "Fresh Yellow Kaddu (Pumpkin / Sitaphal / Kashiphal) - 500g Cut",
    brand: "Desi Khet Produce",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-KAD-17",
    rating: 4.8,
    reviewsCount: 1530,
    featured: false,
    inStock: true,
    chipset: "Origin: UP & MP Organic Farms",
    material: "Rich Orange Flesh, Sweet Earthy Aroma, High Beta-Carotene",
    images: [
      "https://images.unsplash.com/photo-1506917728037-b6fb01c42857?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Golden Sunset Orange",
    colors: ["500g Cut Slice", "1 kg Cut", "Whole Mini Pumpkin"],
    description: "Sweet, vitamin A-rich yellow pumpkin pre-cut and deseeded for effortless kitchen prep. Sourced from organic agro clusters. Famous for authentic Halwai-style Khatta Meetha Kaddu, Sambhar, and comforting pumpkin soups.",
    truthScore: 97,
    truthScoreBreakdown: { freshness: 98, farmTraceability: 97, priceFairness: 98, weightAccuracy: 97 },
    specs: {
      "Pack Size / Unit": "500g clean cut slice (cling wrapped)",
      "Nutrient Profile": "Very high Vitamin A, Beta-Carotene & Potassium",
      "Shelf Life": "5 days refrigerated in film wrap",
      "Culinary Best For": "Khatta Meetha Kaddu (Puri Wale Aloo Kaddu), South Indian Sambhar"
    },
    currentBestPrice: 24.00,
    originalMSRP: 34.00,
    stores: [
      {
        name: "BigBasket (Fresho)",
        price: 24.00,
        originalPrice: 34.00,
        savings: 10.00,
        status: "In Stock (Morning Slot)",
        shipping: "Free with BB Star",
        isBestPrice: true,
        offer: "Tata NeuCoins 5%"
      },
      {
        name: "Blinkit (10-Min)",
        price: 26.00,
        originalPrice: 36.00,
        savings: 10.00,
        status: "In Stock",
        shipping: "Standard",
        isBestPrice: false,
        offer: "Quick delivery"
      },
      {
        name: "Zepto",
        price: 27.00,
        originalPrice: 38.00,
        savings: 11.00,
        status: "In Stock",
        shipping: "Zepto Pass",
        isBestPrice: false,
        offer: "Fresh slice"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 28.00 },
      { date: "2026-03-21", price: 24.00 }
    ],
    reviewBreakdown: { 5: 88, 4: 10, 3: 2, 2: 0, 1: 0 }
  },
  {
    id: "kundru-tindora-ivy-gourd",
    title: "Fresh Crisp Kundru (Tindora / Dondakaya / Ivy Gourd) - 500g",
    brand: "Fresho Agro Fresh",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-KUN-18",
    rating: 4.8,
    reviewsCount: 1420,
    featured: false,
    inStock: true,
    chipset: "Origin: Andhra, Telangana & Maharashtra Farms",
    material: "Crunchy Small Oval Pods, Pale Green Flesh",
    images: [
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Mottled Light Green",
    colors: ["500g Pack", "1 kg Pack"],
    description: "Crisp, miniature gourds packed with natural fiber and crunchy bite. Beloved in South India as Dondakaya and in Maharashtra/Gujarat as Tindora. Delicious when sliced round and pan-roasted with peanuts, mustard, and curry leaves.",
    truthScore: 96,
    truthScoreBreakdown: { freshness: 97, farmTraceability: 96, priceFairness: 97, weightAccuracy: 96 },
    specs: {
      "Pack Size / Unit": "500g",
      "Variety": "Desi Small Kundru",
      "Shelf Life": "7 days in refrigerator",
      "Culinary Best For": "Dondakaya Fry, Kundru Ki Sabzi, Tindora Sambharo"
    },
    currentBestPrice: 30.00,
    originalMSRP: 42.00,
    stores: [
      {
        name: "Zepto",
        price: 30.00,
        originalPrice: 42.00,
        savings: 12.00,
        status: "In Stock (10 min)",
        shipping: "Zepto Pass",
        isBestPrice: true,
        offer: "Daily crunchy fresh"
      },
      {
        name: "Blinkit (10-Min)",
        price: 32.00,
        originalPrice: 44.00,
        savings: 12.00,
        status: "In Stock",
        shipping: "Standard",
        isBestPrice: false,
        offer: "Fast dispatch"
      },
      {
        name: "BigBasket (Fresho)",
        price: 31.00,
        originalPrice: 40.00,
        savings: 9.00,
        status: "In Stock",
        shipping: "BB Star",
        isBestPrice: false,
        offer: "Tata NeuCoins"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 36.00 },
      { date: "2026-03-21", price: 30.00 }
    ],
    reviewBreakdown: { 5: 89, 4: 9, 3: 2, 2: 0, 1: 0 }
  },

  // --------------------------------------------------------------------------
  // 4. CRUCIFEROUS & SOLANACEOUS (Phool Gobhi, Patta Gobhi, Baingan, Capsicum)
  // --------------------------------------------------------------------------
  {
    id: "phool-gobhi-cauliflower-fresh",
    title: "Fresh Snow White Cauliflower (Phool Gobhi) - 1 pc (~600g-800g)",
    brand: "Punjab Khet Direct",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-CAUL-19",
    rating: 4.8,
    reviewsCount: 3640,
    featured: true,
    inStock: true,
    chipset: "Origin: Punjab & Himachal Farm Valleys",
    material: "Dense Snowy White Curd, Crisp Surrounding Green Leaves",
    images: [
      "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Snow White Curd",
    colors: ["1 Medium Head (~700g)", "2 Heads Pack"],
    description: "Pristine white cauliflower heads harvested at dawn from fertile northern soil. Tight florets with no discoloration. Essential for making homestyle Aloo Gobi, Gobi Paratha, Gobi Manchurian, and festive Mughlai Gobi Musallam.",
    truthScore: 98,
    truthScoreBreakdown: { freshness: 99, farmTraceability: 98, priceFairness: 98, weightAccuracy: 98 },
    specs: {
      "Pack Size / Unit": "1 piece (600g to 800g)",
      "Floret Density": "Firm, tightly packed, insect-checked",
      "Shelf Life": "5–7 days refrigerated",
      "Culinary Best For": "Aloo Gobi, Gobi Ke Parathe, Gobi Manchurian, Mixed Vegetable"
    },
    currentBestPrice: 32.00,
    originalMSRP: 45.00,
    stores: [
      {
        name: "Blinkit (10-Min)",
        price: 32.00,
        originalPrice: 45.00,
        savings: 13.00,
        status: "In Stock (10 min)",
        shipping: "Free over ₹99",
        isBestPrice: true,
        offer: "Daily vegetable savings"
      },
      {
        name: "Zepto",
        price: 34.00,
        originalPrice: 46.00,
        savings: 12.00,
        status: "In Stock",
        shipping: "Zepto Pass",
        isBestPrice: false,
        offer: "Fresh head"
      },
      {
        name: "BigBasket (Fresho)",
        price: 33.00,
        originalPrice: 44.00,
        savings: 11.00,
        status: "In Stock",
        shipping: "BB Star",
        isBestPrice: false,
        offer: "Tata NeuCoins"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 38.00 },
      { date: "2026-03-12", price: 35.00 },
      { date: "2026-03-21", price: 32.00 }
    ],
    reviewBreakdown: { 5: 90, 4: 8, 3: 2, 2: 0, 1: 0 }
  },
  {
    id: "patta-gobhi-cabbage-green",
    title: "Fresh Crisp Green Cabbage (Patta Gobhi / Band Gobhi) - 1 pc (~500g)",
    brand: "Ooty High Farms",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-CAB-20",
    rating: 4.7,
    reviewsCount: 2410,
    featured: false,
    inStock: true,
    chipset: "Origin: Ooty (Tamil Nadu) & Nashik Hills",
    material: "Tight Concentric Leaves, Sweet Crunchy Texture",
    images: [
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Crisp Mint Green",
    colors: ["1 pc (~500g)", "1 kg Pack"],
    description: "Compact, heavy-for-its-size green cabbage with sweet, crunchy leaves. Grown in cool mountain climates for maximum freshness. Perfect for Indian Cabbage Sambharo, Vegetable Momos, Chowmein, and everyday Patta Gobhi Matar Sabzi.",
    truthScore: 96,
    truthScoreBreakdown: { freshness: 97, farmTraceability: 96, priceFairness: 97, weightAccuracy: 96 },
    specs: {
      "Pack Size / Unit": "1 whole cabbage (~500g)",
      "Crunch Index": "High crispness, sweet tender inner heart",
      "Shelf Life": "10–14 days in refrigerator",
      "Culinary Best For": "Patta Gobhi Matar, Street-style Chowmein, Veg Momos, Sambharo"
    },
    currentBestPrice: 22.00,
    originalMSRP: 32.00,
    stores: [
      {
        name: "BigBasket (Fresho)",
        price: 22.00,
        originalPrice: 32.00,
        savings: 10.00,
        status: "In Stock",
        shipping: "Free with BB Star",
        isBestPrice: true,
        offer: "5% Tata NeuCoins"
      },
      {
        name: "Blinkit (10-Min)",
        price: 24.00,
        originalPrice: 34.00,
        savings: 10.00,
        status: "In Stock (10 min)",
        shipping: "Standard",
        isBestPrice: false,
        offer: "Daily essential"
      },
      {
        name: "Zepto",
        price: 25.00,
        originalPrice: 35.00,
        savings: 10.00,
        status: "In Stock",
        shipping: "Zepto Pass",
        isBestPrice: false,
        offer: "Fast dispatch"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 26.00 },
      { date: "2026-03-21", price: 22.00 }
    ],
    reviewBreakdown: { 5: 87, 4: 10, 3: 2, 2: 1, 1: 0 }
  },
  {
    id: "baingan-bharta-eggplant-purple",
    title: "Large Purple Bharta Baingan (Eggplant / Brinjal) - 500g (1-2 pcs)",
    brand: "Desi Khet Fresh",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-BAI-21",
    rating: 4.8,
    reviewsCount: 2560,
    featured: true,
    inStock: true,
    chipset: "Origin: UP, Bihar & MP Soil Belts",
    material: "Glossy Purple-Black Skin, Meaty Flesh, Low Seed Density",
    images: [
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Glossy Midnight Purple",
    colors: ["500g Pack (1-2 pcs)", "1 kg Pack"],
    description: "Plump, glossy round eggplants specially cultivated with sparse seed pockets and meaty flesh for direct flame roasting. Yields a rich, smoky pulp essential for Punjabi Baingan Bharta, Baingan Ka Chokha (Litti Chokha), and roasted eggplant dips.",
    truthScore: 97,
    truthScoreBreakdown: { freshness: 98, farmTraceability: 96, priceFairness: 97, weightAccuracy: 97 },
    specs: {
      "Pack Size / Unit": "500g (1 large or 2 medium eggplants)",
      "Seed Count": "Low seeds, tender pulp",
      "Roast Quality": "High skin charred aroma on gas flame",
      "Shelf Life": "5 days refrigerated",
      "Culinary Best For": "Punjabi Baingan Ka Bharta, Bihari Baingan Chokha for Litti"
    },
    currentBestPrice: 28.00,
    originalMSRP: 38.00,
    stores: [
      {
        name: "Blinkit (10-Min)",
        price: 28.00,
        originalPrice: 38.00,
        savings: 10.00,
        status: "In Stock (10 min)",
        shipping: "Free over ₹99",
        isBestPrice: true,
        offer: "Daily vegetable savings"
      },
      {
        name: "Zepto",
        price: 30.00,
        originalPrice: 40.00,
        savings: 10.00,
        status: "In Stock",
        shipping: "Zepto Pass",
        isBestPrice: false,
        offer: "Fresh morning drop"
      },
      {
        name: "BigBasket (Fresho)",
        price: 29.00,
        originalPrice: 36.00,
        savings: 7.00,
        status: "In Stock",
        shipping: "BB Star",
        isBestPrice: false,
        offer: "Tata NeuCoins"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 32.00 },
      { date: "2026-03-21", price: 28.00 }
    ],
    reviewBreakdown: { 5: 90, 4: 8, 3: 2, 2: 0, 1: 0 }
  },
  {
    id: "choti-baingan-small-brinjal-purple",
    title: "Small Round Baby Baingan (Gutti Vankaya / Choti Brinjal) - 500g",
    brand: "South Green Mandis",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-BAI-22",
    rating: 4.7,
    reviewsCount: 1870,
    featured: false,
    inStock: true,
    chipset: "Origin: Andhra, Karnataka & Maharashtra Farms",
    material: "Tender Miniature Brinjals, Green Calyx, Soft Seeds",
    images: [
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Deep Royal Violet",
    colors: ["500g Pack", "1 kg Pack"],
    description: "Tender baby eggplants perfect for four-way criss-cross slit stuffing. Hand-picked young so seeds remain soft and melt into rich gravy. Famous across India for Hyderabadi Bagara Baingan, Andhra Gutti Vankaya, and Maharashtrian Vangi Bhaat.",
    truthScore: 96,
    truthScoreBreakdown: { freshness: 97, farmTraceability: 96, priceFairness: 96, weightAccuracy: 96 },
    specs: {
      "Pack Size / Unit": "500g (Approx 8–12 small brinjals)",
      "Variety": "Baby Purple Round",
      "Shelf Life": "5–6 days refrigerated",
      "Culinary Best For": "Gutti Vankaya Kura, Bagara Baingan, Bharwa Baingan, Vangi Bhaat"
    },
    currentBestPrice: 26.00,
    originalMSRP: 36.00,
    stores: [
      {
        name: "Zepto",
        price: 26.00,
        originalPrice: 36.00,
        savings: 10.00,
        status: "In Stock (10 min)",
        shipping: "Free with Zepto Pass",
        isBestPrice: true,
        offer: "Daily fresh veggies"
      },
      {
        name: "Blinkit (10-Min)",
        price: 28.00,
        originalPrice: 38.00,
        savings: 10.00,
        status: "In Stock",
        shipping: "Standard",
        isBestPrice: false,
        offer: "Fast 10-min"
      },
      {
        name: "BigBasket (Fresho)",
        price: 27.00,
        originalPrice: 35.00,
        savings: 8.00,
        status: "In Stock",
        shipping: "BB Star",
        isBestPrice: false,
        offer: "Tata NeuCoins"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 30.00 },
      { date: "2026-03-21", price: 26.00 }
    ],
    reviewBreakdown: { 5: 88, 4: 10, 3: 2, 2: 0, 1: 0 }
  },
  {
    id: "shimla-mirch-green-capsicum",
    title: "Fresh Green Shimla Mirch (Capsicum / Bell Pepper) - 500g",
    brand: "Polyhouse Fresh",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-CAP-23",
    rating: 4.8,
    reviewsCount: 3120,
    featured: true,
    inStock: true,
    chipset: "Origin: Himachal & Bengaluru Polyhouses",
    material: "Thick Walled, Glossy Skin, Mild Sweet Crunch",
    images: [
      "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Glossy Emerald Green",
    colors: ["500g Pack (3-4 pcs)", "1 kg Pack", "250g Pack"],
    description: "Thick-walled, crisp green capsicums grown in climate-controlled polyhouses to maintain intense crunch and aromatic sweetness. Adds essential bite and color to Kadai Paneer, Schezwan Fried Rice, Stuffed Capsicum, and Pav Bhaji.",
    truthScore: 98,
    truthScoreBreakdown: { freshness: 99, farmTraceability: 98, priceFairness: 97, weightAccuracy: 98 },
    specs: {
      "Pack Size / Unit": "500g (Approx 3–4 medium bell peppers)",
      "Texture": "Thick-walled, high juiciness",
      "Shelf Life": "7–10 days in crisper tray",
      "Culinary Best For": "Kadai Paneer, Capsicum Besan Sabzi, Pav Bhaji Tadka, Pizza"
    },
    currentBestPrice: 40.00,
    originalMSRP: 56.00,
    stores: [
      {
        name: "Blinkit (10-Min)",
        price: 40.00,
        originalPrice: 56.00,
        savings: 16.00,
        status: "In Stock (10 min)",
        shipping: "Free over ₹99",
        isBestPrice: true,
        offer: "Fresh Polyhouse guarantee"
      },
      {
        name: "Zepto",
        price: 42.00,
        originalPrice: 58.00,
        savings: 16.00,
        status: "In Stock",
        shipping: "Zepto Pass",
        isBestPrice: false,
        offer: "10-min drop"
      },
      {
        name: "BigBasket (Fresho)",
        price: 41.00,
        originalPrice: 54.00,
        savings: 13.00,
        status: "In Stock",
        shipping: "BB Star",
        isBestPrice: false,
        offer: "Tata NeuCoins"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 46.00 },
      { date: "2026-03-12", price: 42.00 },
      { date: "2026-03-21", price: 40.00 }
    ],
    reviewBreakdown: { 5: 91, 4: 8, 3: 1, 2: 0, 1: 0 }
  },

  // --------------------------------------------------------------------------
  // 5. PODS, BEANS & PEAS (Green Matar, French Beans, Gwar, Sem, Drumstick)
  // --------------------------------------------------------------------------
  {
    id: "matar-green-peas-fresh-shelled",
    title: "Fresh Sweet Green Matar (Peas / Chhilke Wale) - 1 kg Pods",
    brand: "Himachal Valley Greens",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-MAT-24",
    rating: 4.9,
    reviewsCount: 3950,
    featured: true,
    inStock: true,
    chipset: "Origin: Himachal Hills & Jabalpur Pea Belt",
    material: "Plump Full Pods, Naturally Sweet Green Pearls",
    images: [
      "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Bright Pea Green",
    colors: ["1 kg Whole Pods", "500g Shelled Fresh", "2 kg Family Pack"],
    description: "Tender, naturally sweet green peas harvested from high-altitude hill farms. Bursting with sweet moisture and delicate texture. Essential for authentic Matar Paneer, Aloo Matar, Gajar Matar, Nimona (UP pea curry), and Pea Pulao.",
    truthScore: 98,
    truthScoreBreakdown: { freshness: 99, farmTraceability: 98, priceFairness: 98, weightAccuracy: 98 },
    specs: {
      "Pack Size / Unit": "1 kg pods (yields ~400g sweet peas)",
      "Sweetness Rating": "Naturally sweet, non-starchy",
      "Shelf Life": "5–6 days in refrigerator pod intact",
      "Culinary Best For": "Matar Paneer, UP Matar Nimona, Gajar Matar Sabzi, Matar Pulao"
    },
    currentBestPrice: 48.00,
    originalMSRP: 65.00,
    stores: [
      {
        name: "Blinkit (10-Min)",
        price: 48.00,
        originalPrice: 65.00,
        savings: 17.00,
        status: "In Stock (10 min)",
        shipping: "Free over ₹99",
        isBestPrice: true,
        offer: "Daily Fresh Pea Offer"
      },
      {
        name: "Zepto",
        price: 50.00,
        originalPrice: 68.00,
        savings: 18.00,
        status: "In Stock",
        shipping: "Zepto Pass",
        isBestPrice: false,
        offer: "Sweet harvest"
      },
      {
        name: "BigBasket (Fresho)",
        price: 49.00,
        originalPrice: 64.00,
        savings: 15.00,
        status: "In Stock",
        shipping: "BB Star",
        isBestPrice: false,
        offer: "Tata NeuCoins"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 55.00 },
      { date: "2026-03-12", price: 50.00 },
      { date: "2026-03-21", price: 48.00 }
    ],
    reviewBreakdown: { 5: 92, 4: 7, 3: 1, 2: 0, 1: 0 }
  },
  {
    id: "french-beans-tender-stringless",
    title: "Tender Green French Beans (Pharasbi / Haricot) - 250g",
    brand: "Ooty High Produce",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-BEA-25",
    rating: 4.8,
    reviewsCount: 2180,
    featured: false,
    inStock: true,
    chipset: "Origin: Nilgiri Hills & Pune Farms",
    material: "Stringless, Slender, Crisp Snap Texture",
    images: [
      "https://images.unsplash.com/photo-1550989460-0adc9f6e5223?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Vibrant Leaf Green",
    colors: ["250g Pack", "500g Value Pack"],
    description: "Young, tender stringless French beans that snap cleanly when bent. Grown in cool mountain slopes to guarantee sweet succulence without fibrous threads. Essential for South Indian Poriyal, Veg Fried Rice, and Gujarati Sambharo.",
    truthScore: 97,
    truthScoreBreakdown: { freshness: 98, farmTraceability: 97, priceFairness: 97, weightAccuracy: 97 },
    specs: {
      "Pack Size / Unit": "250g",
      "Fiber Texture": "Stringless, snap-tender",
      "Shelf Life": "5–7 days refrigerated",
      "Culinary Best For": "Beans Carrot Poriyal, Veg Fried Rice, Aloo Beans Sabzi"
    },
    currentBestPrice: 26.00,
    originalMSRP: 38.00,
    stores: [
      {
        name: "Zepto",
        price: 26.00,
        originalPrice: 38.00,
        savings: 12.00,
        status: "In Stock (10 min)",
        shipping: "Free with Zepto Pass",
        isBestPrice: true,
        offer: "Daily fresh greens"
      },
      {
        name: "Blinkit (10-Min)",
        price: 28.00,
        originalPrice: 40.00,
        savings: 12.00,
        status: "In Stock",
        shipping: "Standard",
        isBestPrice: false,
        offer: "Quick delivery"
      },
      {
        name: "BigBasket (Fresho)",
        price: 27.00,
        originalPrice: 36.00,
        savings: 9.00,
        status: "In Stock",
        shipping: "BB Star",
        isBestPrice: false,
        offer: "Tata NeuCoins"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 32.00 },
      { date: "2026-03-21", price: 26.00 }
    ],
    reviewBreakdown: { 5: 90, 4: 8, 3: 2, 2: 0, 1: 0 }
  },
  {
    id: "gwar-phali-cluster-beans",
    title: "Fresh Tender Gwar Phali (Cluster Beans) - 250g",
    brand: "Rajasthan Agro Organics",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-GWA-26",
    rating: 4.7,
    reviewsCount: 1390,
    featured: false,
    inStock: true,
    chipset: "Origin: Rajasthan & Gujarat Semiarid Belts",
    material: "Young Tender Clusters, High Dietary Fiber",
    images: [
      "https://images.unsplash.com/photo-1550989460-0adc9f6e5223?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Muted Olive Green",
    colors: ["250g Pack", "500g Pack"],
    description: "Young cluster beans bursting with natural guar gum fiber and robust rustic flavor. Excellent for gut health and blood sugar regulation. Famous for Rajasthani Gwar Phali Dhokli, Gwar Ki Sabzi with Ajwain, and Gujarati Sambharo.",
    truthScore: 96,
    truthScoreBreakdown: { freshness: 97, farmTraceability: 96, priceFairness: 96, weightAccuracy: 96 },
    specs: {
      "Pack Size / Unit": "250g",
      "Tenderness": "Young pods, minimal string",
      "Shelf Life": "5 days refrigerated",
      "Culinary Best For": "Gwar Phali Ki Sabzi with Heeng & Ajwain, Rajasthani Dhokli"
    },
    currentBestPrice: 22.00,
    originalMSRP: 32.00,
    stores: [
      {
        name: "BigBasket (Fresho)",
        price: 22.00,
        originalPrice: 32.00,
        savings: 10.00,
        status: "In Stock",
        shipping: "Free with BB Star",
        isBestPrice: true,
        offer: "Tata NeuCoins"
      },
      {
        name: "Blinkit (10-Min)",
        price: 24.00,
        originalPrice: 34.00,
        savings: 10.00,
        status: "In Stock",
        shipping: "Standard",
        isBestPrice: false,
        offer: "Quick dispatch"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 26.00 },
      { date: "2026-03-21", price: 22.00 }
    ],
    reviewBreakdown: { 5: 87, 4: 10, 3: 2, 2: 1, 1: 0 }
  },
  {
    id: "drumstick-moringa-sahjan-pods",
    title: "Fresh Moringa Drumstick (Sahjan Phali / Murungakkai) - 250g (3-4 pcs)",
    brand: "Tamil Nadu Farm Direct",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-DRU-27",
    rating: 4.8,
    reviewsCount: 2140,
    featured: true,
    inStock: true,
    chipset: "Origin: Dindigul & Theni (Tamil Nadu)",
    material: "Fleshy Long Pods, Tender Green Skin, Rich in Nutrients",
    images: [
      "https://images.unsplash.com/photo-1550989460-0adc9f6e5223?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Deep Forest Green",
    colors: ["250g Pack (3-4 pcs)", "500g Pack (6-8 pcs)"],
    description: "Tender, pulpy Moringa drumsticks (Murungakkai) revered across South India for imparting unmistakable fragrant depth to traditional Sambar. Packed with calcium, iron, and vitamin C. Ideal for Sambar, Drumstick Curry, and Avial.",
    truthScore: 97,
    truthScoreBreakdown: { freshness: 98, farmTraceability: 97, priceFairness: 97, weightAccuracy: 97 },
    specs: {
      "Pack Size / Unit": "250g (3–4 full length pods, approx 14-16 inches)",
      "Pulp Content": "High fleshy interior pulp",
      "Shelf Life": "5–7 days in refrigerator",
      "Culinary Best For": "Madras Sambar, Murungakkai Poriyal, Drumstick Potato Curry, Avial"
    },
    currentBestPrice: 25.00,
    originalMSRP: 38.00,
    stores: [
      {
        name: "Blinkit (10-Min)",
        price: 25.00,
        originalPrice: 38.00,
        savings: 13.00,
        status: "In Stock (10 min)",
        shipping: "Free over ₹99",
        isBestPrice: true,
        offer: "South Indian staples discount"
      },
      {
        name: "Zepto",
        price: 28.00,
        originalPrice: 40.00,
        savings: 12.00,
        status: "In Stock",
        shipping: "Zepto Pass",
        isBestPrice: false,
        offer: "Fresh morning delivery"
      },
      {
        name: "BigBasket (Fresho)",
        price: 26.00,
        originalPrice: 36.00,
        savings: 10.00,
        status: "In Stock",
        shipping: "BB Star",
        isBestPrice: false,
        offer: "Tata NeuCoins"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 30.00 },
      { date: "2026-03-21", price: 25.00 }
    ],
    reviewBreakdown: { 5: 90, 4: 8, 3: 2, 2: 0, 1: 0 }
  },

  // --------------------------------------------------------------------------
  // 6. ROOT VEGETABLES (Gajar, Mooli, Chukandar, Arbi, Suran)
  // --------------------------------------------------------------------------
  {
    id: "gajar-carrot-delhi-red",
    title: "Fresh Delhi Red & Orange Carrots (Gajar) - 500g",
    brand: "Haryana Farms Best",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-GAJ-28",
    rating: 4.8,
    reviewsCount: 3410,
    featured: true,
    inStock: true,
    chipset: "Origin: Punjab & Haryana Carrot Belts",
    material: "Sweet Crimson-Red Core, Juicy Crunchy Flesh",
    images: [
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Ruby Red & Bright Amber",
    colors: ["500g Pack", "1 kg Saver Pack", "2 kg Halwa Pack"],
    description: "Sweet, juicy Indian red carrots celebrated for making world-famous winter Gajar Ka Halwa. Extra juicy with minimal woody core. Equally delicious in fresh winter salads, Aloo Gajar Matar, and mixed vegetable pickles.",
    truthScore: 98,
    truthScoreBreakdown: { freshness: 99, farmTraceability: 98, priceFairness: 98, weightAccuracy: 98 },
    specs: {
      "Pack Size / Unit": "500g (Approx 4–6 roots)",
      "Variety": "Desi Delhi Red Carrot",
      "Juiciness Rating": "Very high natural sweetness",
      "Shelf Life": "7–10 days refrigerated",
      "Culinary Best For": "Gajar Ka Halwa, Gajar Matar Sabzi, Fresh Carrot-Beet Juice, Pickles"
    },
    currentBestPrice: 28.00,
    originalMSRP: 40.00,
    stores: [
      {
        name: "Blinkit (10-Min)",
        price: 28.00,
        originalPrice: 40.00,
        savings: 12.00,
        status: "In Stock (10 min)",
        shipping: "Free over ₹99",
        isBestPrice: true,
        offer: "Halwa special fresh carrots"
      },
      {
        name: "Zepto",
        price: 30.00,
        originalPrice: 42.00,
        savings: 12.00,
        status: "In Stock",
        shipping: "Zepto Pass",
        isBestPrice: false,
        offer: "10-min delivery"
      },
      {
        name: "BigBasket (Fresho)",
        price: 29.00,
        originalPrice: 38.00,
        savings: 9.00,
        status: "In Stock",
        shipping: "BB Star",
        isBestPrice: false,
        offer: "Tata NeuCoins"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 34.00 },
      { date: "2026-03-21", price: 28.00 }
    ],
    reviewBreakdown: { 5: 91, 4: 7, 3: 2, 2: 0, 1: 0 }
  },
  {
    id: "mooli-white-radish-crisp",
    title: "Fresh White Desi Mooli (Radish) with Greens - 500g (2-3 roots)",
    brand: "Farm Fresh Roots",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-MOO-29",
    rating: 4.7,
    reviewsCount: 1820,
    featured: false,
    inStock: true,
    chipset: "Origin: Punjab & Western UP Mandis",
    material: "Pungent White Roots with Fresh Tender Edible Greens",
    images: [
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Snow White Root with Emerald Leaves",
    colors: ["500g (2-3 roots)", "1 kg Pack"],
    description: "Crisp, pungent white Indian radish complete with fresh tender radish leaves (Mooli Ke Patte). Perfect for grating into winter Mooli Ke Parathe, making spicy Mooli Bhurji with the greens, and serving as a digestive salad alongside dal chawal.",
    truthScore: 96,
    truthScoreBreakdown: { freshness: 97, farmTraceability: 96, priceFairness: 97, weightAccuracy: 96 },
    specs: {
      "Pack Size / Unit": "500g (2–3 whole radishes with leafy greens)",
      "Pungency": "Medium-sharp authentic radish zing",
      "Edible Greens": "Yes, tender fresh leaves included",
      "Shelf Life": "5–7 days refrigerated",
      "Culinary Best For": "Mooli Ke Parathe, Mooli Patta Bhurji, Digestive Salad with Lemon"
    },
    currentBestPrice: 20.00,
    originalMSRP: 30.00,
    stores: [
      {
        name: "Zepto",
        price: 20.00,
        originalPrice: 30.00,
        savings: 10.00,
        status: "In Stock (10 min)",
        shipping: "Free with Zepto Pass",
        isBestPrice: true,
        offer: "Fresh morning harvest"
      },
      {
        name: "Blinkit (10-Min)",
        price: 22.00,
        originalPrice: 32.00,
        savings: 10.00,
        status: "In Stock",
        shipping: "Standard",
        isBestPrice: false,
        offer: "Quick dispatch"
      },
      {
        name: "BigBasket (Fresho)",
        price: 21.00,
        originalPrice: 28.00,
        savings: 7.00,
        status: "In Stock",
        shipping: "BB Star",
        isBestPrice: false,
        offer: "Tata NeuCoins"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 25.00 },
      { date: "2026-03-21", price: 20.00 }
    ],
    reviewBreakdown: { 5: 88, 4: 9, 3: 2, 2: 1, 1: 0 }
  },
  {
    id: "chukandar-beetroot-desi-blood-red",
    title: "Fresh Blood-Red Chukandar (Beetroot) - 500g",
    brand: "Ooty Organics",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-CHU-30",
    rating: 4.8,
    reviewsCount: 2290,
    featured: false,
    inStock: true,
    chipset: "Origin: Ooty & Nilgiri Organic Terraces",
    material: "Firm Globular Roots, Deep Betalain Crimson Pulp, High Nitrates",
    images: [
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Deep Ruby Crimson",
    colors: ["500g Pack (3-4 roots)", "1 kg Pack"],
    description: "Earth-sweet, vibrant ruby-red beetroots grown in mineral-rich Nilgiri soil. Packed with dietary nitrates, iron, and stamina-boosting betalains. Ideal for Beetroot Poriyal, Beetroot Raita, healthy morning detox juices, and crunchy salads.",
    truthScore: 98,
    truthScoreBreakdown: { freshness: 99, farmTraceability: 98, priceFairness: 97, weightAccuracy: 98 },
    specs: {
      "Pack Size / Unit": "500g (Approx 3–4 medium roots)",
      "Pigment Density": "Rich deep crimson, high juice content",
      "Shelf Life": "12–15 days refrigerated",
      "Culinary Best For": "Beetroot Poriyal, Pink Beetroot Raita, ABC Detox Juice (Apple-Beet-Carrot)"
    },
    currentBestPrice: 25.00,
    originalMSRP: 38.00,
    stores: [
      {
        name: "BigBasket (Fresho)",
        price: 25.00,
        originalPrice: 38.00,
        savings: 13.00,
        status: "In Stock (Morning Slot)",
        shipping: "Free with BB Star",
        isBestPrice: true,
        offer: "Tata NeuCoins 5%"
      },
      {
        name: "Blinkit (10-Min)",
        price: 26.00,
        originalPrice: 38.00,
        savings: 12.00,
        status: "In Stock (10 min)",
        shipping: "Free over ₹99",
        isBestPrice: false,
        offer: "Daily healthy greens"
      },
      {
        name: "Zepto",
        price: 27.00,
        originalPrice: 40.00,
        savings: 13.00,
        status: "In Stock",
        shipping: "Zepto Pass",
        isBestPrice: false,
        offer: "10-min drop"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 30.00 },
      { date: "2026-03-21", price: 25.00 }
    ],
    reviewBreakdown: { 5: 90, 4: 8, 3: 2, 2: 0, 1: 0 }
  },
  {
    id: "arbi-colocasia-taro-root",
    title: "Clean Farm Desi Arbi (Colocasia / Taro Root / Ghuiya) - 500g",
    brand: "Desi Khet Produce",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-ARB-31",
    rating: 4.7,
    reviewsCount: 1610,
    featured: false,
    inStock: true,
    chipset: "Origin: UP & Bihar Agro Belt",
    material: "Washed Dry Tubers, Low Itchiness, Rich Starch",
    images: [
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Rough Earthy Brown",
    colors: ["500g Pack", "1 kg Pack"],
    description: "Hard, firm taro roots thoroughly washed to eliminate excess soil. Deliciously nutty and creamy once boiled and pan-roasted with carom seeds (ajwain). Celebrated for Kurkuri Sukhi Arbi, Arbi Masala Gravy, and Arbi Roast.",
    truthScore: 96,
    truthScoreBreakdown: { freshness: 97, farmTraceability: 96, priceFairness: 96, weightAccuracy: 96 },
    specs: {
      "Pack Size / Unit": "500g (Approx 8–10 pieces)",
      "Preparation": "Cleaned of excess soil, firm tubers",
      "Shelf Life": "10–14 days in dry basket",
      "Culinary Best For": "Kurkuri Ajwaini Arbi, Dahi Wali Arbi Gravy, Arbi Roast"
    },
    currentBestPrice: 36.00,
    originalMSRP: 50.00,
    stores: [
      {
        name: "Zepto",
        price: 36.00,
        originalPrice: 50.00,
        savings: 14.00,
        status: "In Stock (10 min)",
        shipping: "Free with Zepto Pass",
        isBestPrice: true,
        offer: "Daily fresh roots"
      },
      {
        name: "Blinkit (10-Min)",
        price: 38.00,
        originalPrice: 52.00,
        savings: 14.00,
        status: "In Stock",
        shipping: "Standard",
        isBestPrice: false,
        offer: "Quick dispatch"
      },
      {
        name: "BigBasket (Fresho)",
        price: 37.00,
        originalPrice: 48.00,
        savings: 11.00,
        status: "In Stock",
        shipping: "BB Star",
        isBestPrice: false,
        offer: "Tata NeuCoins"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 42.00 },
      { date: "2026-03-21", price: 36.00 }
    ],
    reviewBreakdown: { 5: 87, 4: 10, 3: 2, 2: 1, 1: 0 }
  },

  // --------------------------------------------------------------------------
  // 7. SPECIALTY, SALAD & SEASONAL (Mushroom, Sweet Corn, Raw Banana, Kairi, Lemon)
  // --------------------------------------------------------------------------
  {
    id: "mushroom-white-button-fresh",
    title: "Fresh Grade-A White Button Mushrooms - 200g Punnet",
    brand: "Himalayan Fungi Farm",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-MUS-32",
    rating: 4.9,
    reviewsCount: 4120,
    featured: true,
    inStock: true,
    chipset: "Origin: Ooty & Solan Controlled Mushroom Farms",
    material: "Pristine Snow-White Closed Caps, High Protein",
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Ivory Snow White",
    colors: ["200g Punnet", "400g Double Punnet"],
    description: "Plump, closed-cap white button mushrooms grown in hyper-hygienic temperature-regulated facilities. Packed with plant protein, vitamin D, and umami depth. Ideal for Kadai Mushroom, Matar Mushroom, Mushroom Do Pyaza, and creamy pasta.",
    truthScore: 98,
    truthScoreBreakdown: { freshness: 99, farmTraceability: 98, priceFairness: 97, weightAccuracy: 98 },
    specs: {
      "Pack Size / Unit": "200g breathable vented punnet",
      "Cap Condition": "Firm, unopened veil, spot-free",
      "Protein Content": "High plant-based protein & selenium",
      "Shelf Life": "4–5 days refrigerated",
      "Culinary Best For": "Matar Mushroom, Kadai Mushroom, Garlic Butter Sauté, Pizza"
    },
    currentBestPrice: 42.00,
    originalMSRP: 60.00,
    stores: [
      {
        name: "Blinkit (10-Min)",
        price: 42.00,
        originalPrice: 60.00,
        savings: 18.00,
        status: "In Stock (10 min)",
        shipping: "Free over ₹99",
        isBestPrice: true,
        offer: "Flash fresh punnet deal"
      },
      {
        name: "Zepto",
        price: 45.00,
        originalPrice: 62.00,
        savings: 17.00,
        status: "In Stock",
        shipping: "Zepto Pass",
        isBestPrice: false,
        offer: "10-min delivery"
      },
      {
        name: "BigBasket (Fresho)",
        price: 44.00,
        originalPrice: 58.00,
        savings: 14.00,
        status: "In Stock",
        shipping: "BB Star",
        isBestPrice: false,
        offer: "Tata NeuCoins"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 50.00 },
      { date: "2026-03-12", price: 45.00 },
      { date: "2026-03-21", price: 42.00 }
    ],
    reviewBreakdown: { 5: 93, 4: 6, 3: 1, 2: 0, 1: 0 }
  },
  {
    id: "nimbu-lemon-kagzi-juicy",
    title: "Fresh Juicy Kagzi Lemon (Nimbu) - 4 pcs (~200g)",
    brand: "Citrus Grove Mandi",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-NIM-33",
    rating: 4.8,
    reviewsCount: 3950,
    featured: false,
    inStock: true,
    chipset: "Origin: Nagpur & Solapur Citrus Orchards",
    material: "Paper-Thin Skin, Heavy Juice Content, Bright Citrus Tang",
    images: [
      "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Vibrant Canary Yellow",
    colors: ["4 pcs Pack (~200g)", "10 pcs Value Bag", "500g Bulk"],
    description: "Famous Kagzi variety Indian lemons with thin, pliable skin that squeezes effortlessly to release maximum tangy juice. High vitamin C booster. Essential for morning warm lemon water, Shikanji, Dal seasoning, and refreshing salad dressings.",
    truthScore: 98,
    truthScoreBreakdown: { freshness: 99, farmTraceability: 98, priceFairness: 98, weightAccuracy: 98 },
    specs: {
      "Pack Size / Unit": "4 lemons (~200g net)",
      "Variety": "Nagpur Thin-Skin Kagzi Nimbu",
      "Juice Content": "High, minimal seeds",
      "Shelf Life": "2 weeks refrigerated",
      "Culinary Best For": "Nimbu Pani / Shikanji, Dal Tadka Finishing, Poha Squeeze, Salads"
    },
    currentBestPrice: 18.00,
    originalMSRP: 30.00,
    stores: [
      {
        name: "Blinkit (10-Min)",
        price: 18.00,
        originalPrice: 30.00,
        savings: 12.00,
        status: "In Stock (10 min)",
        shipping: "Free over ₹99",
        isBestPrice: true,
        offer: "Daily citrus add-on"
      },
      {
        name: "Zepto",
        price: 20.00,
        originalPrice: 32.00,
        savings: 12.00,
        status: "In Stock",
        shipping: "Zepto Pass",
        isBestPrice: false,
        offer: "Fresh juice batch"
      },
      {
        name: "BigBasket (Fresho)",
        price: 19.00,
        originalPrice: 28.00,
        savings: 9.00,
        status: "In Stock",
        shipping: "BB Star",
        isBestPrice: false,
        offer: "Tata NeuCoins"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 24.00 },
      { date: "2026-03-12", price: 20.00 },
      { date: "2026-03-21", price: 18.00 }
    ],
    reviewBreakdown: { 5: 91, 4: 7, 3: 2, 2: 0, 1: 0 }
  },
  {
    id: "sweet-corn-american-cobs",
    title: "Fresh Sweet Corn on the Cob (Bhutta) - 2 pcs",
    brand: "Golden Grain Farms",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-COR-34",
    rating: 4.8,
    reviewsCount: 2310,
    featured: false,
    inStock: true,
    chipset: "Origin: Karnataka & Maharashtra Corn Belts",
    material: "Plump Juicy Golden Kernels, Natural High Sweetness",
    images: [
      "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Sunny Golden Yellow",
    colors: ["2 pcs Husks On", "4 pcs Family Pack", "250g Shelled Kernels"],
    description: "Tender American-variety sweet corn cobs with tight green outer husks that keep the kernels juicy and plump. Can be boiled, char-roasted street-style with butter, chilli and lime, or tossed into sweet corn chaat and soups.",
    truthScore: 97,
    truthScoreBreakdown: { freshness: 98, farmTraceability: 97, priceFairness: 97, weightAccuracy: 97 },
    specs: {
      "Pack Size / Unit": "2 full cobs with protective husks",
      "Sweetness Rating": "Naturally sweet milky kernels",
      "Shelf Life": "5–6 days refrigerated",
      "Culinary Best For": "Buttered Sweet Corn Chaat, Street Bhutta with Lemon & Masala, Corn Soup"
    },
    currentBestPrice: 30.00,
    originalMSRP: 45.00,
    stores: [
      {
        name: "Zepto",
        price: 30.00,
        originalPrice: 45.00,
        savings: 15.00,
        status: "In Stock (10 min)",
        shipping: "Free with Zepto Pass",
        isBestPrice: true,
        offer: "Street snack fresh"
      },
      {
        name: "Blinkit (10-Min)",
        price: 32.00,
        originalPrice: 46.00,
        savings: 14.00,
        status: "In Stock",
        shipping: "Standard",
        isBestPrice: false,
        offer: "Quick dispatch"
      },
      {
        name: "BigBasket (Fresho)",
        price: 32.00,
        originalPrice: 44.00,
        savings: 12.00,
        status: "In Stock",
        shipping: "BB Star",
        isBestPrice: false,
        offer: "Tata NeuCoins"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 36.00 },
      { date: "2026-03-21", price: 30.00 }
    ],
    reviewBreakdown: { 5: 89, 4: 9, 3: 2, 2: 0, 1: 0 }
  },
  {
    id: "kaccha-kela-raw-green-banana",
    title: "Raw Green Cooking Banana (Kaccha Kela / Plantain) - 3 pcs (~500g)",
    brand: "Kerala Plantation Direct",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-KEL-35",
    rating: 4.7,
    reviewsCount: 1520,
    featured: false,
    inStock: true,
    chipset: "Origin: Wayanad (Kerala) & Jalgaon (Maharashtra)",
    material: "Firm Green Starch-Rich Flesh, Potassium & Resistant Starch",
    images: [
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Deep Forest Green",
    colors: ["3 pcs (~500g)", "6 pcs Pack (~1 kg)"],
    description: "Unripe green plantains packed with prebiotic resistant starch. Does not disintegrate when boiled or fried. Beloved in South India for making hot crispy Raw Banana Chips (Upperi), Kalan, Kofta curries, and fasting (Vrat) cutlets.",
    truthScore: 97,
    truthScoreBreakdown: { freshness: 98, farmTraceability: 96, priceFairness: 97, weightAccuracy: 97 },
    specs: {
      "Pack Size / Unit": "3 bananas (~500g)",
      "Maturity": "100% unripe cooking grade",
      "Shelf Life": "7 days at room temp",
      "Culinary Best For": "Kerala Banana Chips (Upperi), Kacche Kele Ki Sabzi, Kofta Curry, Vrat Tikki"
    },
    currentBestPrice: 28.00,
    originalMSRP: 40.00,
    stores: [
      {
        name: "BigBasket (Fresho)",
        price: 28.00,
        originalPrice: 40.00,
        savings: 12.00,
        status: "In Stock (Morning Slot)",
        shipping: "Free with BB Star",
        isBestPrice: true,
        offer: "5% Tata NeuCoins"
      },
      {
        name: "Blinkit (10-Min)",
        price: 30.00,
        originalPrice: 42.00,
        savings: 12.00,
        status: "In Stock",
        shipping: "Standard",
        isBestPrice: false,
        offer: "Quick dispatch"
      },
      {
        name: "Zepto",
        price: 32.00,
        originalPrice: 44.00,
        savings: 12.00,
        status: "In Stock",
        shipping: "Zepto Pass",
        isBestPrice: false,
        offer: "10-min delivery"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 34.00 },
      { date: "2026-03-21", price: 28.00 }
    ],
    reviewBreakdown: { 5: 88, 4: 10, 3: 2, 2: 0, 1: 0 }
  },
  {
    id: "kaccha-aam-raw-mango-kairi",
    title: "Fresh Green Raw Mango (Kairi / Kaccha Aam) - 500g (2-3 pcs)",
    brand: "Konkan Mango Groves",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-AAM-36",
    rating: 4.9,
    reviewsCount: 2890,
    featured: true,
    inStock: true,
    chipset: "Origin: Ratnagiri (Maharashtra) & Chittoor (AP)",
    material: "Tart Crunchy Pulp, High Vitamin C, Authentic Tang",
    images: [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Emerald Green with Pale White Pulp",
    colors: ["500g Pack (2-3 pcs)", "1 kg Pack", "2 kg Pickle Pack"],
    description: "Crisp, intensely sour raw green mangoes (Kairi) hand-plucked before ripening. Packed with heat-beating electrolytes and vitamin C. Ideal for summer Aam Panna, raw mango mint chutney, Kairi Dal, and instant mango pickle.",
    truthScore: 98,
    truthScoreBreakdown: { freshness: 99, farmTraceability: 98, priceFairness: 97, weightAccuracy: 98 },
    specs: {
      "Pack Size / Unit": "500g (2–3 firm mangoes)",
      "Sourness Index": "High pleasant tanginess",
      "Shelf Life": "10–14 days refrigerated",
      "Culinary Best For": "Summer Aam Panna, Kairi Chutney, Mamidikaya Pappu (Mango Dal), Pickles"
    },
    currentBestPrice: 35.00,
    originalMSRP: 50.00,
    stores: [
      {
        name: "Blinkit (10-Min)",
        price: 35.00,
        originalPrice: 50.00,
        savings: 15.00,
        status: "In Stock (10 min)",
        shipping: "Free over ₹99",
        isBestPrice: true,
        offer: "Summer cooler special"
      },
      {
        name: "Zepto",
        price: 38.00,
        originalPrice: 52.00,
        savings: 14.00,
        status: "In Stock",
        shipping: "Zepto Pass",
        isBestPrice: false,
        offer: "Fresh morning batch"
      },
      {
        name: "BigBasket (Fresho)",
        price: 36.00,
        originalPrice: 48.00,
        savings: 12.00,
        status: "In Stock",
        shipping: "BB Star",
        isBestPrice: false,
        offer: "Tata NeuCoins"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 42.00 },
      { date: "2026-03-21", price: 35.00 }
    ],
    reviewBreakdown: { 5: 93, 4: 6, 3: 1, 2: 0, 1: 0 }
  },
  {
    id: "kachi-haldi-fresh-raw-turmeric",
    title: "Organic Fresh Raw Turmeric (Kachi Haldi Rhizomes) - 250g",
    brand: "Lakadong Agro Organics",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-HAL-37",
    rating: 4.9,
    reviewsCount: 1940,
    featured: false,
    inStock: true,
    chipset: "Origin: Lakadong (Meghalaya) & Erode (Tamil Nadu)",
    material: "Deep Orange-Gold Flesh, High 7%+ Curcumin, Anti-Inflammatory",
    images: [
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Golden Ochre & Saffron Orange",
    colors: ["250g Pack", "500g Pack"],
    description: "Potent, freshly dug raw turmeric roots with dazzling deep orange flesh. Contains superior natural curcumin concentration. Famous for winter Rajasthani Haldi Ki Sabzi, Ayurvedic Golden Turmeric Milk, and medicinal Kadhas.",
    truthScore: 99,
    truthScoreBreakdown: { freshness: 100, farmTraceability: 99, priceFairness: 98, weightAccuracy: 99 },
    specs: {
      "Pack Size / Unit": "250g washed roots",
      "Curcumin Level": "7.5%+ (Superior therapeutic grade)",
      "Shelf Life": "3 weeks in refrigerator",
      "Culinary Best For": "Rajasthani Kachi Haldi Ki Sabzi with Ghee, Golden Milk, Pickles"
    },
    currentBestPrice: 28.00,
    originalMSRP: 42.00,
    stores: [
      {
        name: "Zepto",
        price: 28.00,
        originalPrice: 42.00,
        savings: 14.00,
        status: "In Stock (10 min)",
        shipping: "Free with Zepto Pass",
        isBestPrice: true,
        offer: "Immunity booster roots"
      },
      {
        name: "Blinkit (10-Min)",
        price: 30.00,
        originalPrice: 44.00,
        savings: 14.00,
        status: "In Stock",
        shipping: "Standard",
        isBestPrice: false,
        offer: "Quick dispatch"
      },
      {
        name: "BigBasket (Fresho)",
        price: 29.00,
        originalPrice: 40.00,
        savings: 11.00,
        status: "In Stock",
        shipping: "BB Star",
        isBestPrice: false,
        offer: "Tata NeuCoins"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 35.00 },
      { date: "2026-03-21", price: 28.00 }
    ],
    reviewBreakdown: { 5: 94, 4: 5, 3: 1, 2: 0, 1: 0 }
  },
  {
    id: "broccoli-hydroponic-crown-fresh",
    title: "Fresh Hydroponic Green Broccoli Crown - 1 pc (~350g-450g)",
    brand: "Ooty High Greens",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-BRO-38",
    rating: 4.8,
    reviewsCount: 2780,
    featured: false,
    inStock: true,
    chipset: "Origin: Ooty & Kodaikanal Hydroponic Units",
    material: "Tight Dark Green Buds, Tender Stalk, Sulforaphane Rich",
    images: [
      "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Deep Pine Green",
    colors: ["1 Crown (~400g)", "2 Crowns Pack"],
    description: "Compact, dark green broccoli crown grown under pesticide-free hydroponic mist systems in Ooty. Packed with sulforaphane, vitamin C, and fiber. Superb for stir-fries, creamy broccoli soup, healthy salads, and pasta bakes.",
    truthScore: 98,
    truthScoreBreakdown: { freshness: 99, farmTraceability: 98, priceFairness: 97, weightAccuracy: 98 },
    specs: {
      "Pack Size / Unit": "1 crown (~350g to 450g)",
      "Floret Tightness": "Very tight, no yellowing",
      "Shelf Life": "6–8 days refrigerated in film wrap",
      "Culinary Best For": "Garlic Butter Broccoli Stir Fry, Broccoli Almond Soup, Pasta, Salads"
    },
    currentBestPrice: 45.00,
    originalMSRP: 70.00,
    stores: [
      {
        name: "Blinkit (10-Min)",
        price: 45.00,
        originalPrice: 70.00,
        savings: 25.00,
        status: "In Stock (10 min)",
        shipping: "Free over ₹99",
        isBestPrice: true,
        offer: "Daily super greens discount"
      },
      {
        name: "Zepto",
        price: 48.00,
        originalPrice: 72.00,
        savings: 24.00,
        status: "In Stock",
        shipping: "Zepto Pass",
        isBestPrice: false,
        offer: "10-min delivery"
      },
      {
        name: "BigBasket (Fresho)",
        price: 46.00,
        originalPrice: 68.00,
        savings: 22.00,
        status: "In Stock",
        shipping: "BB Star",
        isBestPrice: false,
        offer: "Tata NeuCoins"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 55.00 },
      { date: "2026-03-21", price: 45.00 }
    ],
    reviewBreakdown: { 5: 91, 4: 8, 3: 1, 2: 0, 1: 0 }
  },
  {
    id: "lettuce-iceberg-crispy-salad",
    title: "Fresh Crisp Iceberg & Romaine Lettuce Head - 1 pc (~300g)",
    brand: "Hydro Salad Greens",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-LET-39",
    rating: 4.7,
    reviewsCount: 1740,
    featured: false,
    inStock: true,
    chipset: "Origin: Hydroponic Peri-Urban Greenhouses",
    material: "Crisp Aqueous Leaves, Mild Sweet Finish",
    images: [
      "https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Pale Crisp Celadon",
    colors: ["1 Head (~300g)", "Twin Pack"],
    description: "Ultra-crisp iceberg lettuce heads grown in soil-free hydro basins. Delivered chilled to preserve maximum crunchy snap and hydrating sweetness. Essential for fresh Caesar salads, burger toppings, and wrap fillings.",
    truthScore: 97,
    truthScoreBreakdown: { freshness: 98, farmTraceability: 97, priceFairness: 96, weightAccuracy: 97 },
    specs: {
      "Pack Size / Unit": "1 compact head (~300g)",
      "Farming Mode": "100% Soil-free Hydroponic",
      "Shelf Life": "5–7 days refrigerated",
      "Culinary Best For": "Burgers, Caesar Salads, Crunchy Frankie Wraps, Tacos"
    },
    currentBestPrice: 35.00,
    originalMSRP: 55.00,
    stores: [
      {
        name: "Zepto",
        price: 35.00,
        originalPrice: 55.00,
        savings: 20.00,
        status: "In Stock (10 min)",
        shipping: "Free with Zepto Pass",
        isBestPrice: true,
        offer: "Salad bar special"
      },
      {
        name: "Blinkit (10-Min)",
        price: 38.00,
        originalPrice: 58.00,
        savings: 20.00,
        status: "In Stock",
        shipping: "Standard",
        isBestPrice: false,
        offer: "Quick dispatch"
      },
      {
        name: "BigBasket (Fresho)",
        price: 36.00,
        originalPrice: 52.00,
        savings: 16.00,
        status: "In Stock",
        shipping: "BB Star",
        isBestPrice: false,
        offer: "Tata NeuCoins"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 42.00 },
      { date: "2026-03-21", price: 35.00 }
    ],
    reviewBreakdown: { 5: 89, 4: 9, 3: 2, 2: 0, 1: 0 }
  },
  {
    id: "kamal-kakdi-lotus-stem-bheen",
    title: "Fresh Water Lotus Stem (Kamal Kakdi / Bheen / Nadru) - 250g",
    brand: "Kashmir Agro Greens",
    category: "Fresh Vegetables & Sabzi",
    sku: "VEG-IND-LOT-40",
    rating: 4.8,
    reviewsCount: 1380,
    featured: false,
    inStock: true,
    chipset: "Origin: Dal Lake (Kashmir) & Haryana Wetlands",
    material: "Hollow Honeycomb Cross-Section, Crunchy Water Chest-Nut Texture",
    images: [
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Ivory Buff with Honeycomb Holes",
    colors: ["250g Pack", "500g Value Pack"],
    description: "Prized Kashmiri Nadru (lotus stems) with iconic multi-hole honeycomb cross-sections and signature crunchy bite. Absorbs rich gravies while retaining crisp crunch. Celebrated for Kashmiri Nadru Yakhni, Kamal Kakdi Kofta, and crispy chips.",
    truthScore: 97,
    truthScoreBreakdown: { freshness: 98, farmTraceability: 96, priceFairness: 97, weightAccuracy: 97 },
    specs: {
      "Pack Size / Unit": "250g peeled & trimmed stems",
      "Structure": "Clean honeycomb tubes, soil-washed",
      "Shelf Life": "5 days refrigerated in moist wrap",
      "Culinary Best For": "Kashmiri Nadru Yakhni, Kamal Kakdi Sabzi, Crispy Lotus Stem Fries"
    },
    currentBestPrice: 45.00,
    originalMSRP: 65.00,
    stores: [
      {
        name: "Blinkit (10-Min)",
        price: 45.00,
        originalPrice: 65.00,
        savings: 20.00,
        status: "In Stock (10 min)",
        shipping: "Free over ₹99",
        isBestPrice: true,
        offer: "Kashmiri specialty savings"
      },
      {
        name: "BigBasket (Fresho)",
        price: 48.00,
        originalPrice: 68.00,
        savings: 20.00,
        status: "In Stock",
        shipping: "BB Star",
        isBestPrice: false,
        offer: "Tata NeuCoins"
      },
      {
        name: "Zepto",
        price: 50.00,
        originalPrice: 70.00,
        savings: 20.00,
        status: "In Stock",
        shipping: "Zepto Pass",
        isBestPrice: false,
        offer: "Fresh morning drop"
      }
    ],
    priceHistory: [
      { date: "2026-03-01", price: 55.00 },
      { date: "2026-03-21", price: 45.00 }
    ],
    reviewBreakdown: { 5: 90, 4: 8, 3: 2, 2: 0, 1: 0 }
  }
];
