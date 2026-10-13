import { indiaProductsAtoZ } from './indiaProductsAtoZ.js';
import { indiaVegetablesMockData } from './indiaVegetablesMockData.js';

const FC = {};
// ==========================================================================
// FLASHCOMPARE AI — COMPREHENSIVE MOCK DATA ARCHITECTURE
// Featuring 300+ Curated Products (Electronics A-Z + Fresh Indian Vegetables),
// Multi-Store Telemetry, Initial Bank Accounts, Users, and Demo Reset
// ==========================================================================

FC.defaultProducts = [
  ...indiaVegetablesMockData,
  ...indiaProductsAtoZ,
  {
    id: "iphone-15-pro-max",
    title: "Apple iPhone 15 Pro Max (256GB, Titanium)",
    brand: "Apple",
    category: "Smartphones",
    sku: "MU793LL/A",
    rating: 4.8,
    reviewsCount: 3840,
    featured: true,
    inStock: true,
    chipset: "A17 Pro (3nm)",
    material: "Grade 5 Titanium & Ceramic Shield",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBGkUtpqoYZqdBOTo4gBiQz-91MDCPccAW2ml96ZGGXkZer_viuzClUqAt05wmCUg6tnp6myP34RTGb1Y-7SDPdQULwea0Nxu7kUY14NQbRum2uop-iHLMaiDpVy_u6dtg2q3BKTI76wvcqB-SksXEYLSrsRU91rLm8mJEgOYd4PHr5Aah2mrNHgHrLji9na855wlSxDUJr6YjwWa7Fv8P1abkrJniZsz3saAB3uQmXaC7ZAkszpcs",
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Natural Titanium",
    colors: ["Natural Titanium", "Black Titanium", "White Titanium", "Blue Titanium"],
    description: "The definitive iPhone crafted with aerospace-grade titanium, the groundbreaking A17 Pro gaming chip, a customizable Action button, and Apple's longest optical zoom on an iPhone (5x tetraprism).",
    truthScore: 89,
    truthScoreBreakdown: {
      buildQuality: 95,
      performance: 98,
      reliability: 91,
      value: 72
    },
    specs: {
      "Display": "6.7-inch Super Retina XDR OLED, 120Hz ProMotion, 2000 nits peak",
      "Processor": "Apple A17 Pro (6-core CPU, 6-core GPU with HW Ray Tracing)",
      "Camera": "48MP Main (f/1.78) + 12MP Ultra Wide + 12MP 5x Tetraprism Telephoto",
      "Battery": "4,441 mAh (Up to 29 hours video playback, 8-9h active screen)",
      "Weight & Build": "221g, Grade 5 Titanium frame, Ceramic Shield front glass",
      "Connectivity": "USB-C 3.2 (10Gbps transfer), Wi-Fi 6E, 5G Sub-6 & mmWave",
      "Warranty": "1-Year Apple Limited Warranty, AppleCare+ Eligible"
    },
    stores: [
      {
        name: "Amazon Prime",
        logoText: "a",
        price: 1199.00,
        coupon: { code: "IPHONE50", discount: 50, type: "flat", desc: "$50 off with Prime Card" },
        stock: "In Stock",
        shipping: "Free One-Day Delivery",
        shippingCost: 0,
        taxRate: 0.0825,
        cashbackRate: 0.01,
        tradeInCredit: 0,
        sellerScore: 99,
        returnDays: 30,
        deliveryDays: 1,
        badge: "BEST ARBITRAGE",
        link: "#"
      },
      {
        name: "Best Buy",
        logoText: "BB",
        price: 1199.99,
        coupon: { code: "BB-GIFTCARD", discount: 100, type: "giftcard", desc: "Free $100 Store Gift Card" },
        stock: "In Stock",
        shipping: "Free Store Pickup in 1 Hr",
        shippingCost: 0,
        taxRate: 0.0825,
        cashbackRate: 0.01,
        tradeInCredit: 0,
        sellerScore: 98,
        returnDays: 15,
        deliveryDays: 1,
        badge: "BUNDLE PICK",
        link: "#"
      },
      {
        name: "Walmart",
        logoText: "W+",
        price: 1189.00,
        coupon: null,
        stock: "Low Stock",
        shipping: "2-Day Standard Ground",
        shippingCost: 0,
        taxRate: 0.0825,
        cashbackRate: 0.01,
        tradeInCredit: 0,
        sellerScore: 95,
        returnDays: 30,
        deliveryDays: 2,
        badge: "DIRECT FLOOR",
        link: "#"
      },
      {
        name: "eBay Refurbished",
        logoText: "eb",
        price: 1145.00,
        coupon: { code: "REFURB20", discount: 20, type: "flat", desc: "Extra $20 off certified refurbished" },
        stock: "In Stock",
        shipping: "Express Insured",
        shippingCost: 5.99,
        taxRate: 0.0825,
        cashbackRate: 0.01,
        tradeInCredit: 0,
        sellerScore: 97,
        returnDays: 30,
        deliveryDays: 3,
        badge: "REFURB GRADE A+",
        link: "#"
      },
      {
        name: "Target",
        logoText: "T",
        price: 1199.99,
        coupon: null,
        stock: "In Stock",
        shipping: "Free 2-Day Shipping",
        shippingCost: 0,
        taxRate: 0.0825,
        cashbackRate: 0.01,
        tradeInCredit: 0,
        sellerScore: 96,
        returnDays: 90,
        deliveryDays: 2,
        badge: "EXTENDED RETURN",
        link: "#"
      }
    ],
    priceHistory: [
      { month: "Jul", price: 1250.00 },
      { month: "Aug", price: 1235.00 },
      { month: "Sep", price: 1199.00 },
      { month: "Oct", price: 1189.00 },
      { month: "Nov", price: 1165.00 },
      { month: "Dec Live", price: 1149.00 }
    ],
    volatilityTrajectory: {
      allTimeLow: 1099.00,
      msrp: 1199.00,
      currentBest: 1149.00,
      dipTargetDate: "Dec 14",
      seasonalDipDelta: -50.00,
      points: [
        { label: "Jul", price: 1250 },
        { label: "Aug", price: 1230 },
        { label: "Sep", price: 1199 },
        { label: "Oct", price: 1185 },
        { label: "Nov", price: 1160 },
        { label: "Dec", price: 1149 }
      ]
    },
    reviewsConsensus: {
      youtube: {
        sentiment: "94% Positive",
        label: "Tech Creator Index",
        summary: "Synthesis of 142 long-form benchmarks including MKBHD, Dave2D, and Mrwhosetheboss. Universal praise for the 19g lighter titanium frame, crisp 5x tetraprism optical zoom, and A17 Pro compute efficiency.",
        videoCount: 142,
        metrics: [
          { name: "Camera 5x Tetraprism", score: "98% Praise", pct: 98 },
          { name: "Titanium Weight Balance", score: "92% Praise", pct: 92 }
        ],
        quote: "The reduced 19g weight shift radically transforms hand fatigue over long usage."
      },
      reddit: {
        sentiment: "88% Approval",
        label: "Community Pulse",
        summary: "Aggregated across 389 threads and 4,120 verified owner comments in r/apple and r/iPhone. Users love USB-C versatility, action button shortcuts, and solid battery life under iOS 17.2.",
        threadCount: 389,
        metrics: [
          { name: "Battery Real-World (Day 2)", score: "89% Satisfaction", pct: 89 },
          { name: "Action Button Utility", score: "74% Mixed/Utility", pct: 74 }
        ],
        quote: "USB-C transfer speeds resolve workflow bottlenecks when recording 4K ProRes directly to SSD."
      },
      experts: {
        sentiment: "99.1 Index",
        label: "Lab Metrology",
        summary: "Geekbench 6, DxOMark Audio/Display, and thermal dissipation sustained throttling tests confirm top-tier CPU compute/watt metric on the market.",
        articleCount: 45,
        metrics: [
          { name: "DxOMark Display Luminance", score: "2,000 Nits Peak Verified", pct: 96 },
          { name: "Thermal Throttling Threshold", score: "Post-iOS 17.0.3 Nominal", pct: 91 }
        ],
        quote: "Verdict: Top tier CPU compute/watt metric with industry-leading color accuracy."
      }
    },
    pros: [
      "Grade 5 Titanium frame is noticeably lighter (19g reduction)",
      "Outstanding 5x tetraprism optical zoom lens (120mm)",
      "Industry-leading battery life (easily 1.5 - 2 days)",
      "USB-C port supports 10Gbps ProRes transfer speeds"
    ],
    cons: [
      "Extremely high base price with costly storage upgrades",
      "Slow charging speeds limited to 20W-27W peak",
      "Can get warm during prolonged AAA ray-tracing gaming"
    ]
  },
  {
    id: "galaxy-s24-ultra",
    title: "Samsung Galaxy S24 Ultra (512GB, Titanium Gray)",
    brand: "Samsung",
    category: "Smartphones",
    sku: "SM-S928UZKEXAA",
    rating: 4.8,
    reviewsCount: 2940,
    featured: true,
    inStock: true,
    chipset: "Snapdragon 8 Gen 3 for Galaxy",
    material: "Titanium Armor & Corning Gorilla Armor Glass",
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Titanium Gray",
    colors: ["Titanium Gray", "Titanium Black", "Titanium Violet", "Titanium Yellow"],
    description: "Samsung's ultimate flagship featuring flat 6.8\" Dynamic AMOLED 2X with anti-reflective Gorilla Armor, integrated S Pen stylus, Galaxy AI live translation and Circle to Search, and 200MP camera system.",
    truthScore: 92,
    truthScoreBreakdown: {
      buildQuality: 94,
      performance: 97,
      reliability: 93,
      value: 84
    },
    specs: {
      "Display": "6.8-inch QHD+ Dynamic AMOLED 2X, 1-120Hz, 2600 nits, Anti-Reflective",
      "Processor": "Qualcomm Snapdragon 8 Gen 3 for Galaxy (4nm)",
      "Camera": "200MP Main + 50MP 5x Periscope + 10MP 3x Telephoto + 12MP Ultra-Wide",
      "Battery": "5,000 mAh, 45W Fast Charging (65% in 30 min), 15W Wireless",
      "Stylus": "Embedded Bluetooth S Pen (2.8ms latency)",
      "Software Support": "7 Full Years of Android OS & Security Upgrades"
    },
    stores: [
      {
        name: "Samsung Direct",
        logoText: "S",
        price: 1299.99,
        coupon: { code: "S24SAVE100", discount: 100, type: "flat", desc: "Instant $100 checkout voucher" },
        stock: "In Stock",
        shipping: "Free Expedited Delivery",
        shippingCost: 0,
        taxRate: 0.0825,
        cashbackRate: 0.015,
        tradeInCredit: 0,
        sellerScore: 99,
        returnDays: 15,
        deliveryDays: 1,
        badge: "OFFICIAL STORE",
        link: "#"
      },
      {
        name: "Amazon Prime",
        logoText: "a",
        price: 1199.99,
        coupon: null,
        stock: "In Stock",
        shipping: "Free One-Day Delivery",
        shippingCost: 0,
        taxRate: 0.0825,
        cashbackRate: 0.01,
        tradeInCredit: 0,
        sellerScore: 99,
        returnDays: 30,
        deliveryDays: 1,
        badge: "BEST ARBITRAGE",
        link: "#"
      },
      {
        name: "Best Buy",
        logoText: "BB",
        price: 1249.99,
        coupon: { code: "BBS24GIFT", discount: 50, type: "giftcard", desc: "$50 Best Buy gift card" },
        stock: "In Stock",
        shipping: "Free Store Pickup",
        shippingCost: 0,
        taxRate: 0.0825,
        cashbackRate: 0.01,
        tradeInCredit: 0,
        sellerScore: 98,
        returnDays: 15,
        deliveryDays: 1,
        badge: "PICKUP READY",
        link: "#"
      }
    ],
    priceHistory: [
      { month: "Jul", price: 1419.00 },
      { month: "Aug", price: 1379.00 },
      { month: "Sep", price: 1299.00 },
      { month: "Oct", price: 1249.00 },
      { month: "Nov", price: 1199.00 },
      { month: "Dec Live", price: 1199.99 }
    ],
    volatilityTrajectory: {
      allTimeLow: 1199.99,
      msrp: 1419.99,
      currentBest: 1199.99,
      dipTargetDate: "All-Time Best",
      seasonalDipDelta: -220.00,
      points: [
        { label: "Jul", price: 1419 },
        { label: "Aug", price: 1379 },
        { label: "Sep", price: 1299 },
        { label: "Oct", price: 1249 },
        { label: "Nov", price: 1199 },
        { label: "Dec", price: 1200 }
      ]
    },
    reviewsConsensus: {
      youtube: {
        sentiment: "96% Positive",
        label: "Tech Creator Index",
        summary: "Universal praise for the Gorilla Armor anti-reflective glass which slashes outdoor glare by 75%. Snapdragon 8 Gen 3 yields flawless gaming frame rates.",
        videoCount: 168,
        metrics: [
          { name: "Gorilla Armor Glare Reduction", score: "99% Praise", pct: 99 },
          { name: "Camera Zoom Versatility", score: "95% Praise", pct: 95 }
        ],
        quote: "The flat screen and anti-reflective glass make every other phone look like a mirror."
      },
      reddit: {
        sentiment: "92% Approval",
        label: "Community Pulse",
        summary: "r/GalaxyS24 users celebrate 7 years of OS updates and excellent battery endurance averaging 8+ hours screen-on-time.",
        threadCount: 420,
        metrics: [
          { name: "Battery Endurance", score: "94% Satisfaction", pct: 94 },
          { name: "S Pen Utility", score: "88% Praise", pct: 88 }
        ],
        quote: "Circle to Search and live call translations are surprisingly practical everyday tools."
      },
      experts: {
        sentiment: "98.8 Index",
        label: "Lab Metrology",
        summary: "DisplayMate awards S24 Ultra Best Smartphone Display grade with 2,600 nits peak luminance and zero PWM flicker fatigue.",
        articleCount: 48,
        metrics: [
          { name: "Peak Luminance Tested", score: "2,580 Nits Verified", pct: 98 },
          { name: "CPU Single/Multi Core", score: "2,290 / 7,140 Peak", pct: 96 }
        ],
        quote: "The most versatile and durable productivity pocket computer ever built."
      }
    },
    pros: [
      "Gorilla Armor glass cuts reflections dramatically better than any competitor",
      "7 full years of guaranteed OS and security upgrades",
      "Integrated S Pen stylus included in the titanium frame",
      "Unrivaled 200MP camera resolution and 5x/10x digital zoom clarity"
    ],
    cons: [
      "Substantial 232g weight and squared off corners can dig into smaller palms",
      "High launch pricing for 512GB tier",
      "Some Galaxy AI features require continuous cloud connectivity"
    ]
  },
  {
    id: "sony-wh-1000xm5",
    title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    brand: "Sony",
    category: "Audio",
    sku: "WH1000XM5/S",
    rating: 4.8,
    reviewsCount: 4120,
    featured: true,
    inStock: true,
    chipset: "Integrated Processor V1 + HD QN1",
    material: "Soft-Fit Synthetic Leather & Recycled ABS",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBzyaS_KkL49mW6wxCdkBQeniN9gHeybyW_qNCCmn4mLAElCWNLru2HvtNAiwbh7i6rYde-gS8UIE41q0fMyPkAb7V413boogQvj0onMpcpFi765Cq-02G1599hxEdKNAZ1jSs9i0u6DqdsBRCWzbSMfU79MdQkHcGpxeYV9oUj7wDZ8YhgSGN2RCXaaJ2dRqaj3qWDukr1dLivBoQdPZrghqnUd0tsX8GCKI9W767gY-A_kEMXJao",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Silver",
    colors: ["Silver", "Black", "Midnight Blue"],
    description: "Industry-standard active noise canceling headphones featuring dual-chip V1 and QN1 acoustic processing, 8 precision microphones, LDAC high-res audio streaming, and up to 30 hours of continuous playback.",
    truthScore: 92,
    truthScoreBreakdown: {
      buildQuality: 88,
      performance: 96,
      reliability: 95,
      value: 89
    },
    specs: {
      "Type": "Over-ear, Closed-back Dynamic Headphones",
      "Drivers": "30mm precision-engineered carbon fiber composite dome",
      "Noise Cancellation": "Dual Processors (V1 + QN1) with 8 ambient beamforming mics",
      "Battery Life": "Up to 30 hours (ANC On), 38 hours (ANC Off), 3-min quick charge = 3h",
      "Connectivity": "Bluetooth 5.2, Multipoint Dual Device, 3.5mm analog audio jack",
      "Codecs": "LDAC, AAC, SBC with DSEE Extreme AI upscaling",
      "Weight & Build": "250g, ultra-lightweight soft fit leather headband"
    },
    stores: [
      {
        name: "Amazon Prime",
        logoText: "a",
        price: 328.00,
        coupon: { code: "SONYSAVE", discount: 30, type: "flat", desc: "$30 instant coupon applied at checkout" },
        stock: "In Stock",
        shipping: "Free Prime One-Day",
        shippingCost: 0,
        taxRate: 0.0825,
        cashbackRate: 0.01,
        tradeInCredit: 0,
        sellerScore: 99,
        returnDays: 30,
        deliveryDays: 1,
        badge: "OPTIMAL VALUE NODE",
        link: "#"
      },
      {
        name: "Best Buy",
        logoText: "BB",
        price: 329.99,
        coupon: null,
        stock: "In Stock",
        shipping: "Free 1-Day Shipping",
        shippingCost: 0,
        taxRate: 0.0825,
        cashbackRate: 0.01,
        tradeInCredit: 0,
        sellerScore: 98,
        returnDays: 15,
        deliveryDays: 1,
        badge: "STORE PICKUP READY",
        link: "#"
      },
      {
        name: "Walmart",
        logoText: "W+",
        price: 326.00,
        coupon: null,
        stock: "Low Stock",
        shipping: "Free 2-Day Standard",
        shippingCost: 0,
        taxRate: 0.0825,
        cashbackRate: 0.01,
        tradeInCredit: 0,
        sellerScore: 95,
        returnDays: 30,
        deliveryDays: 2,
        badge: "LOW FLOOR",
        link: "#"
      }
    ],
    priceHistory: [
      { month: "Jul", price: 398.00 },
      { month: "Aug", price: 379.00 },
      { month: "Sep", price: 348.00 },
      { month: "Oct", price: 328.00 },
      { month: "Nov", price: 328.00 },
      { month: "Dec Live", price: 298.00 }
    ],
    volatilityTrajectory: {
      allTimeLow: 298.00,
      msrp: 399.99,
      currentBest: 298.00,
      dipTargetDate: "All-Time Best",
      seasonalDipDelta: -101.99,
      points: [
        { label: "Jul", price: 398 },
        { label: "Aug", price: 375 },
        { label: "Sep", price: 348 },
        { label: "Oct", price: 328 },
        { label: "Nov", price: 328 },
        { label: "Dec", price: 298 }
      ]
    },
    reviewsConsensus: {
      youtube: {
        sentiment: "97% Positive",
        label: "Tech Creator Index",
        summary: "Universal acclaim from audiophile and consumer reviewers for having the quietest ANC background floor and crispest beamforming voice microphone.",
        videoCount: 98,
        metrics: [
          { name: "Active Noise Cancellation", score: "99% Praise", pct: 99 },
          { name: "Microphone Call Isolation", score: "94% Praise", pct: 94 }
        ],
        quote: "The ANC floor is black velvet; office chatter and engine drone simply vanish."
      },
      reddit: {
        sentiment: "91% Approval",
        label: "Community Pulse",
        summary: "r/headphones community rates it high for comfort during commutes. Notice that non-folding design requires using the included protective case.",
        threadCount: 212,
        metrics: [
          { name: "Comfort for 2+ Hours", score: "88% Satisfaction", pct: 88 },
          { name: "App EQ Customizability", score: "96% Praise", pct: 96 }
        ],
        quote: "LDAC streaming paired with Sony Headphones app custom EQ sounds breathtaking."
      },
      experts: {
        sentiment: "98.4 Index",
        label: "Lab Metrology",
        summary: "Audio labs rank the XM5 as the gold standard for high-frequency attenuation and battery longevity.",
        articleCount: 32,
        metrics: [
          { name: "Attenuation Peak (1kHz)", score: "-32dB Verified", pct: 98 },
          { name: "Harmonic Distortion (THD)", score: "<0.1% Lab Verified", pct: 95 }
        ],
        quote: "Yields an unrivaled synthetic truth ratio across acoustics, ANC silicon, and 30-hour battery life."
      }
    },
    pros: [
      "Industry-leading Active Noise Cancellation (ANC)",
      "Stellar 4-mic beamforming quality for voice calls",
      "Ultra-lightweight 250g body with soft-fit leather",
      "Impressive 30-hour battery life with 3-minute fast charge"
    ],
    cons: [
      "Does not fold down into headband like older XM4",
      "Headband padding is slightly narrow for very large heads",
      "MSRP of $399 is a premium price tier"
    ]
  },
  {
    id: "airpods-max",
    title: "Apple AirPods Max (USB-C, Space Black)",
    brand: "Apple",
    category: "Audio",
    sku: "MXJ93AM/A",
    rating: 4.7,
    reviewsCount: 1890,
    featured: false,
    inStock: true,
    chipset: "Apple H1 Headphone Chip (each ear cup)",
    material: "Anodized Aluminum Ear Cups & Stainless Steel Mesh",
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Space Black",
    colors: ["Space Black", "Starlight", "Midnight", "Purple", "Orange"],
    description: "Computational acoustic masterclass featuring an Apple-designed dynamic driver, Personalized Spatial Audio with dynamic head tracking, luxury aluminum construction, and now modernized with USB-C.",
    truthScore: 88,
    truthScoreBreakdown: {
      buildQuality: 98,
      performance: 94,
      reliability: 90,
      value: 70
    },
    specs: {
      "Acoustics": "Apple-designed 40mm dynamic driver, Dual neodymium ring magnet motor",
      "Processing": "Apple H1 headphone chip in each ear cup with 10 audio cores",
      "Noise Control": "Pro-level Active Noise Cancellation and Transparency mode",
      "Spatial Audio": "Personalized Spatial Audio with dynamic head tracking",
      "Charging": "USB-C charging connector (5 mins charge = 1.5 hours playback)",
      "Battery": "Up to 20 hours listening with ANC or Transparency enabled",
      "Weight": "384.8g"
    },
    stores: [
      {
        name: "Amazon",
        logoText: "a",
        price: 499.00,
        coupon: { code: "APPLEAUDIO20", discount: 20, type: "flat", desc: "Limited time $20 clip coupon" },
        stock: "In Stock",
        shipping: "Free Prime Delivery",
        shippingCost: 0,
        taxRate: 0.0825,
        cashbackRate: 0.01,
        tradeInCredit: 0,
        sellerScore: 99,
        returnDays: 30,
        deliveryDays: 1,
        badge: "BEST ARBITRAGE",
        link: "#"
      },
      {
        name: "Best Buy",
        logoText: "BB",
        price: 549.99,
        coupon: null,
        stock: "In Stock",
        shipping: "Free Delivery",
        shippingCost: 0,
        taxRate: 0.0825,
        cashbackRate: 0.01,
        tradeInCredit: 0,
        sellerScore: 98,
        returnDays: 15,
        deliveryDays: 1,
        badge: "APPLE AUTHORIZED",
        link: "#"
      }
    ],
    priceHistory: [
      { month: "Jul", price: 549.00 },
      { month: "Aug", price: 549.00 },
      { month: "Sep", price: 529.00 },
      { month: "Oct", price: 519.00 },
      { month: "Nov", price: 499.00 },
      { month: "Dec Live", price: 479.00 }
    ],
    volatilityTrajectory: {
      allTimeLow: 479.00,
      msrp: 549.99,
      currentBest: 479.00,
      dipTargetDate: "Dec Live",
      seasonalDipDelta: -70.99,
      points: [
        { label: "Jul", price: 549 },
        { label: "Aug", price: 549 },
        { label: "Sep", price: 529 },
        { label: "Oct", price: 519 },
        { label: "Nov", price: 499 },
        { label: "Dec", price: 479 }
      ]
    },
    reviewsConsensus: {
      youtube: {
        sentiment: "92% Positive",
        label: "Tech Creator Index",
        summary: "Reviewers emphasize the unmatched transparency mode that sounds identical to wearing no headphones at all. Physical digital crown is praised over finicky touch swipes.",
        videoCount: 84,
        metrics: [
          { name: "Transparency Mode Realism", score: "100% Industry Best", pct: 100 },
          { name: "Aluminum Build Finish", score: "98% Luxury", pct: 98 }
        ],
        quote: "Transparency mode remains wizardry; no other headphone sounds this natural."
      },
      reddit: {
        sentiment: "84% Approval",
        label: "Community Pulse",
        summary: "r/airpods users love ecosystem integration with Apple devices. Some criticize the 385g weight and Smart Case.",
        threadCount: 290,
        metrics: [
          { name: "Apple Device Handoff", score: "99% Seamless", pct: 99 },
          { name: "Long-Session Headband Weight", score: "72% Noticeable", pct: 72 }
        ],
        quote: "Switching from Mac to iPhone to Apple TV effortlessly is why you buy these."
      },
      experts: {
        sentiment: "94.5 Index",
        label: "Lab Metrology",
        summary: "Acoustic analyzers praise neutral tuning and extremely low harmonic distortion across all frequencies.",
        articleCount: 26,
        metrics: [
          { name: "Bass Extension to 20Hz", score: "Reference Flat", pct: 95 },
          { name: "Head Tracking Latency", score: "<10ms Imperceptible", pct: 98 }
        ],
        quote: "Precision aluminum chassis minimizes unwanted mechanical resonances."
      }
    },
    pros: [
      "Benchmark Transparency Mode sounds completely natural and uncolored",
      "Personalized Spatial Audio with dynamic head tracking elevates film audio",
      "Refined tactile controls via the Apple Watch Digital Crown",
      "Seamless automatic device switching across all Apple hardware"
    ],
    cons: [
      "Heavy 385g weight can cause neck fatigue during extended multi-hour sessions",
      "Included Smart Case provides virtually zero protection for the headband",
      "Still lacks high-res lossless audio over Bluetooth without wired cable"
    ]
  },
  {
    id: "macbook-air-m3-13",
    title: "Apple MacBook Air 13-inch (M3, 8GB RAM, 256GB SSD)",
    brand: "Apple",
    category: "Laptops",
    sku: "MRXN3LL/A",
    rating: 4.8,
    reviewsCount: 3120,
    featured: true,
    inStock: true,
    chipset: "Apple M3 (8-Core CPU / 10-Core GPU)",
    material: "100% Recycled Aluminum Unibody with Anodized Seal",
    images: [
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Midnight",
    colors: ["Midnight", "Starlight", "Space Gray", "Silver"],
    description: "Strikingly thin, incredibly fast, and whisper silent. Powered by the next-gen M3 chip with ray tracing, hardware-accelerated mesh shading, dual external monitor capability, and up to 18 hours of battery.",
    truthScore: 91,
    truthScoreBreakdown: {
      buildQuality: 98,
      performance: 92,
      reliability: 95,
      value: 82
    },
    specs: {
      "Display": "13.6-inch Liquid Retina display, 2560x1664, 500 nits, P3 Wide Color",
      "Processor": "Apple M3 (8-core CPU with 4 performance cores and 4 efficiency cores)",
      "Graphics": "8-core or 10-core GPU with Hardware-accelerated Ray Tracing",
      "Memory & Storage": "8 GB Unified Memory, 256 GB Dual-NAND PCIe SSD",
      "Battery Life": "Up to 18 hours Apple TV app playback, 15 hours wireless web",
      "Weight & Dimensions": "1.24 kg (2.7 lbs), 1.13 cm ultra-thin fanless unibody",
      "External Displays": "Supports up to 2 external displays with MacBook lid closed"
    },
    stores: [
      {
        name: "Best Buy",
        logoText: "BB",
        price: 899.00,
        coupon: { code: "M3SAVE100", discount: 100, type: "flat", desc: "Instant $100 saving on M3 Macs" },
        stock: "In Stock",
        shipping: "Free Next-Day Delivery",
        shippingCost: 0,
        taxRate: 0.0825,
        cashbackRate: 0.01,
        tradeInCredit: 0,
        sellerScore: 99,
        returnDays: 15,
        deliveryDays: 1,
        badge: "BEST ARBITRAGE FLOOR",
        link: "#"
      },
      {
        name: "Amazon Prime",
        logoText: "a",
        price: 899.00,
        coupon: null,
        stock: "In Stock",
        shipping: "Free Prime One-Day",
        shippingCost: 0,
        taxRate: 0.0825,
        cashbackRate: 0.01,
        tradeInCredit: 0,
        sellerScore: 99,
        returnDays: 30,
        deliveryDays: 1,
        badge: "PRICE MATCH ACTIVE",
        link: "#"
      },
      {
        name: "B&H Photo",
        logoText: "BH",
        price: 949.00,
        coupon: null,
        stock: "In Stock",
        shipping: "Free Expedited",
        shippingCost: 0,
        taxRate: 0.0825,
        cashbackRate: 0.01,
        tradeInCredit: 0,
        sellerScore: 98,
        returnDays: 30,
        deliveryDays: 2,
        badge: "PRO RETAILER",
        link: "#"
      }
    ],
    priceHistory: [
      { month: "Jul", price: 1099.00 },
      { month: "Aug", price: 1049.00 },
      { month: "Sep", price: 999.00 },
      { month: "Oct", price: 949.00 },
      { month: "Nov", price: 899.00 },
      { month: "Dec Live", price: 899.00 }
    ],
    volatilityTrajectory: {
      allTimeLow: 899.00,
      msrp: 1099.00,
      currentBest: 899.00,
      dipTargetDate: "Dec Live",
      seasonalDipDelta: -200.00,
      points: [
        { label: "Jul", price: 1099 },
        { label: "Aug", price: 1049 },
        { label: "Sep", price: 999 },
        { label: "Oct", price: 949 },
        { label: "Nov", price: 899 },
        { label: "Dec", price: 899 }
      ]
    },
    reviewsConsensus: {
      youtube: {
        sentiment: "93% Positive",
        label: "Tech Creator Index",
        summary: "Reviewers praise the fanless silent thermals, 18-hour real battery, and dual display capability with lid closed.",
        videoCount: 115,
        metrics: [
          { name: "Fanless Thermal Stability", score: "94% Praise", pct: 94 },
          { name: "Dual Monitor Support", score: "90% Utility", pct: 90 }
        ],
        quote: "The benchmark portable laptop for 95% of students and remote professionals."
      },
      reddit: {
        sentiment: "89% Approval",
        label: "Community Pulse",
        summary: "r/mac discussions praise the Midnight finish fingerprint coating improvements.",
        threadCount: 310,
        metrics: [
          { name: "Battery Endurance on Road", score: "98% Satisfaction", pct: 98 },
          { name: "Anodized Seal Fingerprint Resist", score: "82% Improved", pct: 82 }
        ],
        quote: "You literally leave the charger at home for a 2-day work trip with zero anxiety."
      },
      experts: {
        sentiment: "96.2 Index",
        label: "Lab Metrology",
        summary: "AnandTech & Tom's Hardware verify SSD read speeds up to 2.8GB/s via dual NAND chips.",
        articleCount: 40,
        metrics: [
          { name: "SSD Sequential Read (Dual NAND)", score: "2,840 MB/s", pct: 95 },
          { name: "Cinebench R23 Multi-Core", score: "9,820 Points", pct: 91 }
        ],
        quote: "M3 silicon delivers exceptional efficiency per watt with no moving parts."
      }
    },
    pros: [
      "Superb battery life easily reaching 15–18 real-world hours",
      "Completely fanless, completely silent operation under any load",
      "Dual external display support when laptop lid is closed",
      "Upgraded dual-chip SSD resolves previous M2 single-NAND bottleneck"
    ],
    cons: [
      "Base model still ships with only 8GB Unified Memory",
      "No SD card slot or additional ports beyond two Thunderbolt 4",
      "Upgrades for RAM and storage from Apple are costly"
    ]
  },
  {
    id: "dell-xps-15-oled",
    title: "Dell XPS 15 9530 (Intel Core i7-13700H, 3.5K OLED, RTX 4060)",
    brand: "Dell",
    category: "Laptops",
    sku: "XPS9530-7451SLV",
    rating: 4.7,
    reviewsCount: 1420,
    featured: false,
    inStock: true,
    chipset: "Intel Core i7-13700H (14-Core) + NVIDIA RTX 4060 (8GB)",
    material: "CNC Machined Aluminum & Carbon Fiber Palmrest",
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Platinum Silver",
    colors: ["Platinum Silver with Black Carbon Fiber"],
    description: "The gold-standard Windows creative workstation featuring an expansive 15.6\" 3.5K OLED touch display, NVIDIA GeForce RTX 4060 studio graphics, and carbon fiber interior.",
    truthScore: 89,
    truthScoreBreakdown: {
      buildQuality: 95,
      performance: 94,
      reliability: 88,
      value: 80
    },
    specs: {
      "Display": "15.6-inch 3.5K (3456x2160) OLED InfinityEdge Touch, 400-nit, 100% DCI-P3",
      "Processor": "13th Gen Intel Core i7-13700H (14 cores, 20 threads, up to 5.0 GHz)",
      "Graphics": "NVIDIA GeForce RTX 4060 Laptop GPU (8GB GDDR6, 40W TGP)",
      "Memory & Storage": "16 GB DDR5 4800MHz (upgradeable to 64GB), 1 TB PCIe M.2 NVMe SSD",
      "Battery": "86 Whr 6-cell Lithium-ion, 130W USB-C Type-C adapter",
      "Weight": "1.92 kg (4.23 lbs)"
    },
    stores: [
      {
        name: "Dell Direct",
        logoText: "D",
        price: 1549.99,
        coupon: { code: "DELLDEAL50", discount: 50, type: "flat", desc: "$50 off with member signup" },
        stock: "In Stock",
        shipping: "Free Next-Business-Day",
        shippingCost: 0,
        taxRate: 0.0825,
        cashbackRate: 0.02,
        tradeInCredit: 0,
        sellerScore: 98,
        returnDays: 30,
        deliveryDays: 1,
        badge: "OFFICIAL DIRECT",
        link: "#"
      },
      {
        name: "Best Buy",
        logoText: "BB",
        price: 1499.00,
        coupon: null,
        stock: "In Stock",
        shipping: "Free Delivery",
        shippingCost: 0,
        taxRate: 0.0825,
        cashbackRate: 0.01,
        tradeInCredit: 0,
        sellerScore: 98,
        returnDays: 15,
        deliveryDays: 1,
        badge: "BEST ARBITRAGE",
        link: "#"
      }
    ],
    priceHistory: [
      { month: "Jul", price: 1899.00 },
      { month: "Aug", price: 1749.00 },
      { month: "Sep", price: 1649.00 },
      { month: "Oct", price: 1599.00 },
      { month: "Nov", price: 1499.00 },
      { month: "Dec Live", price: 1499.00 }
    ],
    volatilityTrajectory: {
      allTimeLow: 1499.00,
      msrp: 1899.99,
      currentBest: 1499.00,
      dipTargetDate: "Dec Live",
      seasonalDipDelta: -400.99,
      points: [
        { label: "Jul", price: 1899 },
        { label: "Aug", price: 1749 },
        { label: "Sep", price: 1649 },
        { label: "Oct", price: 1599 },
        { label: "Nov", price: 1499 },
        { label: "Dec", price: 1499 }
      ]
    },
    reviewsConsensus: {
      youtube: {
        sentiment: "90% Positive",
        label: "Tech Creator Index",
        summary: "Creators revere the 3.5K OLED touch panel for photo grading and video timelines. Fan noise ramps up under heavy 3D rendering.",
        videoCount: 72,
        metrics: [
          { name: "OLED Color Gamut (DCI-P3)", score: "100% Flawless", pct: 100 },
          { name: "Full-Size SD Card Slot", score: "96% Creator Essential", pct: 96 }
        ],
        quote: "The 3.5K OLED panel ruins every non-OLED monitor you'll look at afterwards."
      },
      reddit: {
        sentiment: "86% Approval",
        label: "Community Pulse",
        summary: "r/Dell enthusiasts praise the upgradeable dual RAM slots and secondary M.2 SSD bay.",
        threadCount: 215,
        metrics: [
          { name: "DIY Upgradability", score: "95% Praise", pct: 95 },
          { name: "Trackpad Precision", score: "92% Praise", pct: 92 }
        ],
        quote: "Being able to pop off the back plate and drop in 64GB of RAM is huge in 2024."
      },
      experts: {
        sentiment: "93.0 Index",
        label: "Lab Metrology",
        summary: "PCMag and LaptopMag award Editors' Choice for premier Windows creator laptop design.",
        articleCount: 30,
        metrics: [
          { name: "Contrast Ratio", score: "100,000:1 OLED True Black", pct: 99 },
          { name: "Geekbench Compute", score: "89,400 OpenCL", pct: 91 }
        ],
        quote: "Still the standard for industrial design in 15-inch Windows workstations."
      }
    },
    pros: [
      "Sensational 3.5K OLED touchscreen with infinite contrast and 100% DCI-P3 color",
      "Upgradeable dual DDR5 RAM slots and dual M.2 PCIe SSD bays",
      "Full-size SD card reader built-in for camera workflows",
      "Premium CNC machined aluminum chassis with soft-touch carbon fiber deck"
    ],
    cons: [
      "RTX 4060 is power-capped at 40W due to thermal envelope constraints",
      "Battery life on OLED model is limited to around 6–7 hours of mixed use",
      "720p webcam is mediocre compared to modern 1080p standards"
    ]
  },
  {
    id: "sony-ps5-slim",
    title: "Sony PlayStation 5 Slim Console (Disc Edition)",
    brand: "Sony",
    category: "Gaming",
    sku: "CFI-2000A01",
    rating: 4.8,
    reviewsCount: 5210,
    featured: true,
    inStock: true,
    chipset: "Custom AMD Zen 2 (3.5GHz) + RDNA 2 (10.3 TFLOPS)",
    material: "Dual-Tone Matte & Gloss ABS Polymers",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA411mKFYppJRHlGcy5bWLQENFmJeNuT7s-iW0L2LP9uqqPhrJFRQIhjjyQKLwoSfKU54n93mfFKjVT81xWjwvSmC99n1qJtX-8zm2X0IQ8AJeF85Q9JRqOkfdBIlzLTT9oraVeV-RopCKKcy5FCR06yN6qNsy4VGTNdrVTFMSql_VKEZGAaQ2N5excPoCeZY4wY9wvQywKzSAkIkRXiPkDCR7UFQQwcp-QmjmKwfwBTCkg3PrI5d8",
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507457379470-08b800bebc67?auto=format&fit=crop&w=800&q=80"
    ],
    color: "White / Black",
    colors: ["White / Black", "Midnight Black Plates", "Cobalt Blue Plates"],
    description: "The redesigned PS5 packs powerful gaming technology into a sleek and compact console design. Featuring a full 1TB SSD, modular Ultra HD Blu-ray disc drive, ray tracing, and haptic DualSense controller.",
    truthScore: 94,
    truthScoreBreakdown: {
      buildQuality: 92,
      performance: 96,
      reliability: 97,
      value: 93
    },
    specs: {
      "CPU": "8-core AMD Zen 2, up to 3.5 GHz variable frequency",
      "GPU": "Custom AMD RDNA 2, 10.3 TFLOPS, Ray Tracing Acceleration",
      "Memory": "16 GB GDDR6 (448 GB/s bandwidth)",
      "Storage": "1 TB Custom NVMe SSD (848 GB usable, 5.5GB/s raw speed)",
      "Optical Drive": "Ultra HD Blu-ray (Modular / Detachable drive)",
      "Dimensions & Weight": "358mm x 96mm x 216mm, 3.2 kg (30% smaller volume)",
      "Video Output": "HDMI 2.1 supporting 4K 120Hz, VRR, ALLM, and 8K support"
    },
    stores: [
      {
        name: "Best Buy",
        logoText: "BB",
        price: 449.99,
        coupon: { code: "GAMER50", discount: 50, type: "flat", desc: "$50 off with store trade-in" },
        stock: "In Stock",
        shipping: "Free Store Pickup Today",
        shippingCost: 0,
        taxRate: 0.0825,
        cashbackRate: 0.01,
        tradeInCredit: 0,
        sellerScore: 99,
        returnDays: 15,
        deliveryDays: 1,
        badge: "STORE PICKUP READY",
        link: "#"
      },
      {
        name: "Amazon Prime",
        logoText: "a",
        price: 449.00,
        coupon: null,
        stock: "In Stock",
        shipping: "Free Prime Delivery",
        shippingCost: 0,
        taxRate: 0.0825,
        cashbackRate: 0.01,
        tradeInCredit: 0,
        sellerScore: 99,
        returnDays: 30,
        deliveryDays: 1,
        badge: "FASTEST SHIPPING",
        link: "#"
      },
      {
        name: "Walmart",
        logoText: "W+",
        price: 449.00,
        coupon: null,
        stock: "In Stock",
        shipping: "Free 2-Day Shipping",
        shippingCost: 0,
        taxRate: 0.0825,
        cashbackRate: 0.01,
        tradeInCredit: 0,
        sellerScore: 96,
        returnDays: 30,
        deliveryDays: 2,
        badge: "DIRECT FLOOR",
        link: "#"
      }
    ],
    priceHistory: [
      { month: "Jul", price: 499.00 },
      { month: "Aug", price: 499.00 },
      { month: "Sep", price: 499.00 },
      { month: "Oct", price: 479.00 },
      { month: "Nov", price: 449.00 },
      { month: "Dec Live", price: 449.00 }
    ],
    volatilityTrajectory: {
      allTimeLow: 449.00,
      msrp: 499.99,
      currentBest: 449.00,
      dipTargetDate: "Dec Live",
      seasonalDipDelta: -50.99,
      points: [
        { label: "Jul", price: 499 },
        { label: "Aug", price: 499 },
        { label: "Sep", price: 499 },
        { label: "Oct", price: 479 },
        { label: "Nov", price: 449 },
        { label: "Dec", price: 449 }
      ]
    },
    reviewsConsensus: {
      youtube: {
        sentiment: "96% Positive",
        label: "Tech Creator Index",
        summary: "160 long-form reviews praise the 30% reduction in bulk, internal full 1TB upgrade, and modular disc drive versatility.",
        videoCount: 160,
        metrics: [
          { name: "Chassis Thermal Dissipation", score: "93% Optimal", pct: 93 },
          { name: "1TB SSD R/W Speeds", score: "98% Bench Peak", pct: 98 }
        ],
        quote: "Fixes the monolithic size of the launch console while retaining whisper-quiet fans."
      },
      reddit: {
        sentiment: "93% Approval",
        label: "Community Pulse",
        summary: "450 threads in r/PS5 applaud the extra 181GB of usable storage and front dual USB-C ports.",
        threadCount: 450,
        metrics: [
          { name: "Storage Expansion Ease", score: "97% Praise", pct: 97 },
          { name: "DualSense Haptics Immersion", score: "96% Praise", pct: 96 }
        ],
        quote: "Spider-Man 2 and Astro Bot play like dream showcases for the SSD and haptics."
      },
      experts: {
        sentiment: "95.5 Index",
        label: "Lab Metrology",
        summary: "Digital Foundry confirms equal clock speeds, lower peak power draw by ~10-15W, and identical frame stability.",
        articleCount: 52,
        metrics: [
          { name: "Power Efficiency (Wattage)", score: "-12% vs Fat Model", pct: 92 },
          { name: "Fan Acoustic DB", score: "34dB Under Load", pct: 95 }
        ],
        quote: "The definitive hardware revision that streamlines living room placement."
      }
    },
    pros: [
      "Significantly smaller footprint and 24% lighter weight",
      "Upgraded internal storage to a full 1TB SSD",
      "Modular disc drive can be detached or added later",
      "Immersive DualSense controller haptics and triggers"
    ],
    cons: [
      "Vertical stand is sold separately for $30",
      "High glossy finish on upper side panels attracts fingerprints",
      "No computing performance increase over launch model"
    ]
  },
  {
    id: "switch-oled",
    title: "Nintendo Switch OLED Model (White Set)",
    brand: "Nintendo",
    category: "Gaming",
    sku: "HEGSKAAAA",
    rating: 4.8,
    reviewsCount: 3950,
    featured: false,
    inStock: true,
    chipset: "NVIDIA Custom Tegra Processor",
    material: "Textured Polycarbonate & Magnesium Alloy Frame",
    images: [
      "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1612287233207-6f5dfbe86450?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80"
    ],
    color: "White",
    colors: ["White", "Neon Blue / Neon Red", "Mario Red Edition"],
    description: "Features a vibrant 7-inch OLED screen, a wide adjustable stand, a dock with a wired LAN port, 64 GB of internal storage, and enhanced audio for handheld and tabletop play.",
    truthScore: 93,
    truthScoreBreakdown: {
      buildQuality: 92,
      performance: 88,
      reliability: 96,
      value: 94
    },
    specs: {
      "Display": "7.0-inch OLED screen, 1280x720 multi-touch capacitive",
      "Storage": "64 GB internal storage, expandable via microSD up to 2TB",
      "Audio": "Enhanced stereo speakers for handheld and tabletop modes",
      "Dock": "Includes HDMI port, two USB 2.0 ports, and new wired LAN port",
      "Battery": "4310 mAh (approx. 4.5 to 9 hours depending on game)",
      "Weight": "Approx. 420g with Joy-Con controllers attached"
    },
    stores: [
      {
        name: "Amazon",
        logoText: "a",
        price: 319.99,
        coupon: null,
        stock: "In Stock",
        shipping: "Free Prime One-Day",
        shippingCost: 0,
        taxRate: 0.0825,
        cashbackRate: 0.01,
        tradeInCredit: 0,
        sellerScore: 99,
        returnDays: 30,
        deliveryDays: 1,
        badge: "BEST ARBITRAGE",
        link: "#"
      },
      {
        name: "Target",
        logoText: "T",
        price: 349.99,
        coupon: { code: "SWITCHSAVE25", discount: 25, type: "flat", desc: "$25 off for RedCard holders" },
        stock: "In Stock",
        shipping: "Free 2-Day Delivery",
        shippingCost: 0,
        taxRate: 0.0825,
        cashbackRate: 0.01,
        tradeInCredit: 0,
        sellerScore: 97,
        returnDays: 90,
        deliveryDays: 2,
        badge: "EXTENDED RETURN",
        link: "#"
      }
    ],
    priceHistory: [
      { month: "Jul", price: 349.99 },
      { month: "Aug", price: 349.99 },
      { month: "Sep", price: 339.99 },
      { month: "Oct", price: 329.99 },
      { month: "Nov", price: 319.99 },
      { month: "Dec Live", price: 319.99 }
    ],
    volatilityTrajectory: {
      allTimeLow: 319.99,
      msrp: 349.99,
      currentBest: 319.99,
      dipTargetDate: "Dec Live",
      seasonalDipDelta: -30.00,
      points: [
        { label: "Jul", price: 350 },
        { label: "Aug", price: 350 },
        { label: "Sep", price: 340 },
        { label: "Oct", price: 330 },
        { label: "Nov", price: 320 },
        { label: "Dec", price: 320 }
      ]
    },
    reviewsConsensus: {
      youtube: {
        sentiment: "95% Positive",
        label: "Tech Creator Index",
        summary: "7-inch OLED panel transforms vibrant titles like Zelda: Tears of the Kingdom and Mario Odyssey with inky blacks.",
        videoCount: 110,
        metrics: [
          { name: "OLED Contrast in Handheld", score: "99% Praise", pct: 99 },
          { name: "Full-Width Adjustable Kickstand", score: "96% Praise", pct: 96 }
        ],
        quote: "The kickstand and OLED screen make it feel like the product the Switch was always meant to be."
      },
      reddit: {
        sentiment: "92% Approval",
        label: "Community Pulse",
        summary: "r/NintendoSwitch owners consider the upgrade well worth it for anyone who plays primarily in handheld mode.",
        threadCount: 380,
        metrics: [
          { name: "Handheld Gaming Satisfaction", score: "97% High", pct: 97 },
          { name: "Docked LAN Stability", score: "91% Good", pct: 91 }
        ],
        quote: "Handheld gaming on flights with the OLED screen is pure joy."
      },
      experts: {
        sentiment: "94.0 Index",
        label: "Lab Metrology",
        summary: "IGN & Eurogamer rank Switch OLED as the definitive Nintendo portable console experience.",
        articleCount: 35,
        metrics: [
          { name: "Speaker Frequency Response", score: "3x Volume & Bass", pct: 92 },
          { name: "Battery Efficiency", score: "7.2h Zelda Testing", pct: 94 }
        ],
        quote: "Substantial physical ergonomic and visual upgrade over original hardware."
      }
    },
    pros: [
      "Gorgeous 7-inch OLED display with vivid colors and deep blacks",
      "Sturdy, full-width adjustable kickstand replaces flimsy original flap",
      "Double internal storage (64GB vs 32GB) plus dock with integrated LAN port",
      "Noticeably crisper and louder built-in stereo speakers"
    ],
    cons: [
      "Zero performance or graphical processing upgrade when playing in TV docked mode",
      "720p native resolution on screen is low by modern mobile standards",
      "Still uses Tegra X1 architecture dating back to 2017"
    ]
  },
  {
    id: "apple-watch-ultra-2",
    title: "Apple Watch Ultra 2 (49mm Titanium, Ocean Band)",
    brand: "Apple",
    category: "Wearables",
    sku: "MREG3LL/A",
    rating: 4.8,
    reviewsCount: 1740,
    featured: true,
    inStock: true,
    chipset: "Apple S9 SiP (64-bit dual-core)",
    material: "Aerospace Grade Titanium & Sapphire Crystal",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Natural Titanium",
    colors: ["Natural Titanium (Ocean Band)", "Natural Titanium (Alpine Loop)", "Natural Titanium (Trail Loop)"],
    description: "The most rugged and capable Apple Watch. Features the blazing S9 SiP, an ultra-bright 3,000-nit display, magical Double Tap gesture control, precision dual-frequency GPS, and up to 72 hours of battery in Low Power Mode.",
    truthScore: 93,
    truthScoreBreakdown: {
      buildQuality: 99,
      performance: 95,
      reliability: 96,
      value: 81
    },
    specs: {
      "Case": "49mm aerospace-grade titanium case with raised sapphire crystal bezel",
      "Display": "Always-On Retina display, 3,000 nits peak luminance (dims to 1 nit)",
      "Chip": "S9 SiP with 4-core Neural Engine and second-gen Ultra Wideband (UWB)",
      "Battery": "Up to 36 hours normal use, up to 72 hours in Low Power Mode",
      "Sensors": "Dual-frequency L1 & L5 GPS, Depth gauge, Water temperature sensor",
      "Water Resistance": "WR100 water resistance, EN13319 dive certified to 40 meters"
    },
    stores: [
      {
        name: "Amazon Prime",
        logoText: "a",
        price: 749.00,
        coupon: { code: "ULTRA50", discount: 50, type: "flat", desc: "$50 instant clip voucher" },
        stock: "In Stock",
        shipping: "Free Prime One-Day",
        shippingCost: 0,
        taxRate: 0.0825,
        cashbackRate: 0.01,
        tradeInCredit: 0,
        sellerScore: 99,
        returnDays: 30,
        deliveryDays: 1,
        badge: "BEST ARBITRAGE",
        link: "#"
      },
      {
        name: "Best Buy",
        logoText: "BB",
        price: 779.99,
        coupon: null,
        stock: "In Stock",
        shipping: "Free Store Pickup",
        shippingCost: 0,
        taxRate: 0.0825,
        cashbackRate: 0.01,
        tradeInCredit: 0,
        sellerScore: 98,
        returnDays: 15,
        deliveryDays: 1,
        badge: "IN STORE TODAY",
        link: "#"
      }
    ],
    priceHistory: [
      { month: "Jul", price: 799.00 },
      { month: "Aug", price: 799.00 },
      { month: "Sep", price: 779.00 },
      { month: "Oct", price: 769.00 },
      { month: "Nov", price: 749.00 },
      { month: "Dec Live", price: 749.00 }
    ],
    volatilityTrajectory: {
      allTimeLow: 749.00,
      msrp: 799.99,
      currentBest: 749.00,
      dipTargetDate: "Dec Live",
      seasonalDipDelta: -50.99,
      points: [
        { label: "Jul", price: 799 },
        { label: "Aug", price: 799 },
        { label: "Sep", price: 779 },
        { label: "Oct", price: 769 },
        { label: "Nov", price: 749 },
        { label: "Dec", price: 749 }
      ]
    },
    reviewsConsensus: {
      youtube: {
        sentiment: "95% Positive",
        label: "Tech Creator Index",
        summary: "Endurance athletes praise the L1+L5 GPS track precision among skyscrapers and mountain canyons. Double Tap gesture works seamlessly one-handed.",
        videoCount: 78,
        metrics: [
          { name: "3000 Nit Direct Sunlight Visibility", score: "100% Benchmark", pct: 100 },
          { name: "Precision GPS Accuracy", score: "99% High", pct: 99 }
        ],
        quote: "The 3,000 nit screen is blindingly bright in harsh desert sun."
      },
      reddit: {
        sentiment: "91% Approval",
        label: "Community Pulse",
        summary: "r/applewatch threads celebrate 3 days of battery life without charging on weekend backpacking trips.",
        threadCount: 260,
        metrics: [
          { name: "3-Day Real-World Battery", score: "95% Praise", pct: 95 },
          { name: "Action Button Utility", score: "92% Praise", pct: 92 }
        ],
        quote: "You finally stop worrying about daily smartwatch battery anxiety."
      },
      experts: {
        sentiment: "96.0 Index",
        label: "Lab Metrology",
        summary: "DC Rainmaker and endurance metrologists verify dive sensor depth accuracy within 0.1m tolerance.",
        articleCount: 25,
        metrics: [
          { name: "Titanium Case Fracture Rating", score: "MIL-STD 810H Passed", pct: 99 },
          { name: "Optical Heart Sensor HR Beats", score: "<1.2% ECG Variance", pct: 97 }
        ],
        quote: "The premier adventure watch with unmatched smartwatch intelligence."
      }
    },
    pros: [
      "Blindingly bright 3,000-nit display legible in direct desert noon sunlight",
      "Rock-solid 3-day battery life (72 hours in low power mode)",
      "Precision dual-frequency GPS records pinpoint hiking and run routes",
      "Convenient Double Tap gesture allows one-handed control when hands are full"
    ],
    cons: [
      "Large 49mm titanium case looks bulky on smaller wrists (<160mm)",
      "Premium $799 entry price",
      "Blood oxygen sensing disabled on newer US firmware revisions"
    ]
  },
  {
    id: "sony-alpha-7-iv",
    title: "Sony Alpha 7 IV Full-Frame Hybrid Mirrorless Camera",
    brand: "Sony",
    category: "Cameras",
    sku: "ILCE-7M4/B",
    rating: 4.9,
    reviewsCount: 1650,
    featured: false,
    inStock: true,
    chipset: "BIONZ XR Image Processor (8x Processing Speed)",
    material: "Magnesium Alloy Chassis with Weather Sealing",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Black",
    colors: ["Black Matte Finish"],
    description: "The benchmark full-frame hybrid camera for photo and cinema. Featuring a 33MP Exmor R back-illuminated sensor, 4K 60p 10-bit 4:2:2 video capture, 759-point real-time eye AF, and 5-axis in-body stabilization.",
    truthScore: 94,
    truthScoreBreakdown: {
      buildQuality: 96,
      performance: 97,
      reliability: 95,
      value: 88
    },
    specs: {
      "Sensor": "33.0 MP 35mm full-frame back-illuminated Exmor R CMOS sensor",
      "Video": "4K 60p (Super 35) & 4K 30p (7K oversampled), 10-bit 4:2:2 All-Intra",
      "Color Profiles": "S-Cinetone, S-Log3 with 15+ stops of dynamic range",
      "Autofocus": "759 phase-detection points with Real-time Eye AF (Human, Animal, Bird)",
      "Stabilization": "5-axis optical in-body image stabilization (5.5-step shutter compensation)",
      "Viewfinder & Screen": "3.68M-dot Quad-VGA OLED EVF, Vari-angle 3.0\" touch LCD",
      "Slots": "Dual card slots (Slot 1: CFexpress Type A/SD, Slot 2: SD)"
    },
    stores: [
      {
        name: "B&H Photo",
        logoText: "BH",
        price: 2298.00,
        coupon: { code: "BHCAM100", discount: 100, type: "flat", desc: "Instant $100 pro checkout voucher" },
        stock: "In Stock",
        shipping: "Free Next-Day Air",
        shippingCost: 0,
        taxRate: 0.0825,
        cashbackRate: 0.015,
        tradeInCredit: 0,
        sellerScore: 99,
        returnDays: 30,
        deliveryDays: 1,
        badge: "OFFICIAL SONY DEALER",
        link: "#"
      },
      {
        name: "Amazon",
        logoText: "a",
        price: 2298.00,
        coupon: null,
        stock: "In Stock",
        shipping: "Free Prime One-Day",
        shippingCost: 0,
        taxRate: 0.0825,
        cashbackRate: 0.01,
        tradeInCredit: 0,
        sellerScore: 98,
        returnDays: 30,
        deliveryDays: 1,
        badge: "PRICE MATCH",
        link: "#"
      }
    ],
    priceHistory: [
      { month: "Jul", price: 2498.00 },
      { month: "Aug", price: 2498.00 },
      { month: "Sep", price: 2398.00 },
      { month: "Oct", price: 2398.00 },
      { month: "Nov", price: 2298.00 },
      { month: "Dec Live", price: 2298.00 }
    ],
    volatilityTrajectory: {
      allTimeLow: 2298.00,
      msrp: 2499.99,
      currentBest: 2298.00,
      dipTargetDate: "Dec Live",
      seasonalDipDelta: -201.99,
      points: [
        { label: "Jul", price: 2498 },
        { label: "Aug", price: 2498 },
        { label: "Sep", price: 2398 },
        { label: "Oct", price: 2398 },
        { label: "Nov", price: 2298 },
        { label: "Dec", price: 2298 }
      ]
    },
    reviewsConsensus: {
      youtube: {
        sentiment: "97% Positive",
        label: "Creator & Filmmaker Index",
        summary: "DPReview and Gerald Undone rate the A7 IV as the absolute pinnacle hybrid body, praising S-Cinetone skin tones and breathing compensation.",
        videoCount: 94,
        metrics: [
          { name: "Real-time Eye AF Accuracy", score: "99% Flawless", pct: 99 },
          { name: "S-Cinetone Color Science", score: "97% Film Grade", pct: 97 }
        ],
        quote: "The single best tool you can invest in for a commercial photo & video career."
      },
      reddit: {
        sentiment: "94% Approval",
        label: "Community Pulse",
        summary: "r/SonyAlpha photographers highlight the 33MP resolution sweet spot that allows moderate cropping without choking memory cards.",
        threadCount: 310,
        metrics: [
          { name: "Ergonomics & Grip Depth", score: "94% Praise", pct: 94 },
          { name: "Menu System Redesign", score: "95% Praise", pct: 95 }
        ],
        quote: "The deep grip and improved weather gaskets make shooting in rain stress-free."
      },
      experts: {
        sentiment: "98.0 Index",
        label: "Lab Metrology",
        summary: "DxOMark awards the 33MP sensor a 97 score for dynamic range reaching 15.2 stops at ISO 100.",
        articleCount: 32,
        metrics: [
          { name: "Dynamic Range at ISO 100", score: "15.2 Stops Verified", pct: 98 },
          { name: "Rolling Shutter (4K 24p)", score: "26.8ms Controlled", pct: 91 }
        ],
        quote: "Sets the gold standard for full-frame mirrorless versatility."
      }
    },
    pros: [
      "33MP sensor provides the ideal balance of resolution, low-light, and file speed",
      "10-bit 4:2:2 All-Intra recording with cinematic S-Cinetone color profile",
      "Best-in-class Real-time Eye AF tracking across humans, animals, and birds",
      "Vari-angle flip-out LCD screen perfect for video blogging and low-angle shots"
    ],
    cons: [
      "4K 60p recording incurs an automatic 1.5x Super 35 crop factor",
      "Continuous burst shooting speed drops when using uncompressed RAW",
      "CFexpress Type A memory cards are notably more expensive than Type B"
    ]
  },
  {
    id: "dyson-airwrap",
    title: "Dyson Airwrap Multi-Styler Complete Long",
    brand: "Dyson",
    category: "Home & Personal Care",
    sku: "395922-01",
    rating: 4.7,
    reviewsCount: 3410,
    featured: true,
    inStock: true,
    chipset: "Dyson V9 Digital Motor (110,000 RPM)",
    material: "Precision Anodized Heat-Resistant Alloy",
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Nickel / Copper",
    colors: ["Nickel / Copper", "Strawberry Bronze / Blush Pink", "Blue / Copper"],
    description: "Styles and dries simultaneously with no extreme heat. Re-engineered barrels utilize the aerodynamic Coanda effect to curl hair in both directions with a single turn.",
    truthScore: 90,
    truthScoreBreakdown: {
      buildQuality: 96,
      performance: 94,
      reliability: 92,
      value: 78
    },
    specs: {
      "Motor": "Dyson Digital Motor V9 (13-blade impeller, 110k RPM, 3.2kPa pressure)",
      "Technology": "Enhanced Coanda Airflow styling without extreme heat",
      "Heat Control": "Intelligent glass bead thermistor measuring air temp 40x per second (<150°C)",
      "Attachments": "6 re-engineered attachments (Barrels, Firm/Soft brushes, Coanda smoother)",
      "Power": "1,300 Watts, 120V US standard plug with ALCI safety trigger",
      "Weight & Cord": "660g, 2.67m salon-length swivel cable"
    },
    stores: [
      {
        name: "Best Buy",
        logoText: "BB",
        price: 499.99,
        coupon: { code: "DYSON100", discount: 100, type: "flat", desc: "$100 off with store coupon" },
        stock: "In Stock",
        shipping: "Free Next-Day Delivery",
        shippingCost: 0,
        taxRate: 0.0825,
        cashbackRate: 0.01,
        tradeInCredit: 0,
        sellerScore: 99,
        returnDays: 15,
        deliveryDays: 1,
        badge: "VERIFIED PROMO",
        link: "#"
      },
      {
        name: "Amazon",
        logoText: "a",
        price: 549.99,
        coupon: null,
        stock: "In Stock",
        shipping: "Free Prime Delivery",
        shippingCost: 0,
        taxRate: 0.0825,
        cashbackRate: 0.01,
        tradeInCredit: 0,
        sellerScore: 98,
        returnDays: 30,
        deliveryDays: 1,
        badge: "OFFICIAL DYSON STORE",
        link: "#"
      }
    ],
    priceHistory: [
      { month: "Jul", price: 599.99 },
      { month: "Aug", price: 599.99 },
      { month: "Sep", price: 599.99 },
      { month: "Oct", price: 549.99 },
      { month: "Nov", price: 499.99 },
      { month: "Dec Live", price: 499.99 }
    ],
    volatilityTrajectory: {
      allTimeLow: 479.99,
      msrp: 599.99,
      currentBest: 479.99,
      dipTargetDate: "Dec Live",
      seasonalDipDelta: -120.00,
      points: [
        { label: "Jul", price: 599 },
        { label: "Aug", price: 599 },
        { label: "Sep", price: 599 },
        { label: "Oct", price: 549 },
        { label: "Nov", price: 499 },
        { label: "Dec", price: 479 }
      ]
    },
    reviewsConsensus: {
      youtube: {
        sentiment: "91% Positive",
        label: "Tech & Beauty Creator Index",
        summary: "Hair styling channels praise the multi-directional barrels that wrap curls both clockwise and counter-clockwise without swapping attachments.",
        videoCount: 220,
        metrics: [
          { name: "Heat Damage Prevention", score: "98% Praise", pct: 98 },
          { name: "Styling Time Reduction", score: "89% Satisfaction", pct: 89 }
        ],
        quote: "Cuts styling time in half while leaving zero heat scorch smell or split ends."
      },
      reddit: {
        sentiment: "87% Approval",
        label: "Community Pulse",
        summary: "r/Dysonhair and beauty forums recommend it strongly for fine-to-medium hair, noting that coarse textures require setting spray.",
        threadCount: 512,
        metrics: [
          { name: "Learning Curve Adaptation", score: "84% Manageable", pct: 84 },
          { name: "Long-term Durability", score: "94% High", pct: 94 }
        ],
        quote: "Takes about 3 tries to get the Coanda technique right, but it completely replaces blowouts."
      },
      experts: {
        sentiment: "94.0 Index",
        label: "Lab Metrology",
        summary: "Independent thermal testing confirms airflow remains under 150°C under all 3 heat modes, eliminating thermal protein breakdown.",
        articleCount: 38,
        metrics: [
          { name: "Max Air Temp Measured", score: "148°C Verified (<150°C Safe)", pct: 97 },
          { name: "Motor Noise Decibels", score: "76dB at 1 Meter", pct: 88 }
        ],
        quote: "Engineered precision airflow that achieves salon blowouts purely through aerodynamics."
      }
    },
    pros: [
      "Styles and dries hair simultaneously using airflow instead of high heat",
      "Re-engineered barrels switch curl direction with a single twist",
      "Eliminates frizz and flyaways with the Coanda smoothing dryer",
      "Includes luxury storage case with magnetic clasp"
    ],
    cons: [
      "Very expensive initial investment ($599 standard retail)",
      "Takes a few sessions to master the Coanda effect technique",
      "Curls may drop faster than traditional high-heat curling irons without product"
    ]
  },
  {
    id: "kindle-paperwhite",
    title: "Amazon Kindle Paperwhite (16GB, 6.8-inch Display)",
    brand: "Amazon",
    category: "E-Readers",
    sku: "B08N3TCP2F",
    rating: 4.8,
    reviewsCount: 8420,
    featured: false,
    inStock: true,
    chipset: "Freescale/NXP i.MX7 Dual Core",
    material: "Recycled Plastics with IPX8 Waterproofing",
    images: [
      "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
    ],
    color: "Black",
    colors: ["Black", "Denim", "Agave Green"],
    description: "Now with a 6.8\" glare-free 300 ppi display, thinner borders, adjustable warm light, up to 10 weeks of battery life, and 20% faster page turns.",
    truthScore: 95,
    truthScoreBreakdown: {
      buildQuality: 92,
      performance: 94,
      reliability: 98,
      value: 96
    },
    specs: {
      "Display": "6.8-inch Paperwhite E-Ink Carta 1200, 300 ppi glare-free, 17 LED front lights",
      "Lighting": "Adjustable Warm Light (amber to white) with auto-dimming option",
      "Battery Life": "Up to 10 weeks on a single charge (based on 30 min reading/day)",
      "Storage": "16 GB internal flash (holds thousands of books and audiobooks)",
      "Waterproofing": "IPX8 waterproof (submerged up to 2m in fresh water for 60 min)",
      "Connectivity": "USB-C charging port, dual-band 2.4GHz & 5.0GHz Wi-Fi, Bluetooth audio",
      "Weight & Dimensions": "205g, 174 x 125 x 8.1 mm"
    },
    stores: [
      {
        name: "Amazon Prime",
        logoText: "a",
        price: 134.99,
        coupon: { code: "KINDLE15", discount: 15, type: "flat", desc: "$15 off for Prime Members" },
        stock: "In Stock",
        shipping: "Free Prime One-Day",
        shippingCost: 0,
        taxRate: 0.0825,
        cashbackRate: 0.01,
        tradeInCredit: 0,
        sellerScore: 100,
        returnDays: 30,
        deliveryDays: 1,
        badge: "OFFICIAL DIRECT",
        link: "#"
      },
      {
        name: "Best Buy",
        logoText: "BB",
        price: 139.99,
        coupon: null,
        stock: "In Stock",
        shipping: "Free Next-Day Delivery",
        shippingCost: 0,
        taxRate: 0.0825,
        cashbackRate: 0.01,
        tradeInCredit: 0,
        sellerScore: 98,
        returnDays: 15,
        deliveryDays: 1,
        badge: "STORE PICKUP READY",
        link: "#"
      }
    ],
    priceHistory: [
      { month: "Jul", price: 149.99 },
      { month: "Aug", price: 149.99 },
      { month: "Sep", price: 139.99 },
      { month: "Oct", price: 139.99 },
      { month: "Nov", price: 119.99 },
      { month: "Dec Live", price: 119.99 }
    ],
    volatilityTrajectory: {
      allTimeLow: 119.99,
      msrp: 149.99,
      currentBest: 119.99,
      dipTargetDate: "Dec Live",
      seasonalDipDelta: -30.00,
      points: [
        { label: "Jul", price: 150 },
        { label: "Aug", price: 150 },
        { label: "Sep", price: 140 },
        { label: "Oct", price: 140 },
        { label: "Nov", price: 120 },
        { label: "Dec", price: 120 }
      ]
    },
    reviewsConsensus: {
      youtube: {
        sentiment: "98% Positive",
        label: "Tech & Reading Channels",
        summary: "E-reader reviewers consider the 6.8\" Paperwhite the absolute sweet spot in Amazon's lineup, with USB-C and warm backlighting making it near perfect.",
        videoCount: 88,
        metrics: [
          { name: "Warm Light Eye Comfort", score: "99% Praise", pct: 99 },
          { name: "Page Turn Speed (Carta 1200)", score: "94% Praise", pct: 94 }
        ],
        quote: "The warm backlight completely changes nighttime reading comfort in bed."
      },
      reddit: {
        sentiment: "97% Approval",
        label: "Community Pulse",
        summary: "r/kindle users describe it as their favorite electronic device, highlighting battery life that lasts an entire month on vacation.",
        threadCount: 420,
        metrics: [
          { name: "Real-world Battery Life", score: "99% Satisfaction", pct: 99 },
          { name: "Waterproof Bath Reading", score: "96% Verified", pct: 96 }
        ],
        quote: "You charge it once and literally forget where you placed the USB-C cable."
      },
      experts: {
        sentiment: "97.5 Index",
        label: "Lab Metrology",
        summary: "The Verge & Wirecutter rank it as the #1 e-reader for virtually all book lovers.",
        articleCount: 28,
        metrics: [
          { name: "Display Contrast Ratio", score: "300 PPI Laser-sharp", pct: 98 },
          { name: "IPX8 Submersion Seal", score: "Pass 2-Meter Test", pct: 100 }
        ],
        quote: "Unbeatable combination of ergonomic size, battery life, and display sharpness."
      }
    },
    pros: [
      "6.8-inch 300 PPI display with smooth 20% faster page turns",
      "Adjustable warm light eases eye strain during bedtime reading",
      "Extraordinary 10-week battery life with USB-C charging",
      "IPX8 waterproofing allows stress-free reading in the bath or by the pool"
    ],
    cons: [
      "Base price has lockscreen advertisements unless you pay $20 to remove",
      "No physical page-turn buttons like the Oasis or Kobo Libra",
      "Plastic back prone to absorbing skin oil smudges"
    ]
  }
];

// Initial mock users
FC.defaultUsers = [
  {
    id: "usr-01",
    email: "user@flashcompare.ai",
    password: "password123",
    name: "Alex Thorne",
    role: "customer",
    status: "Active",
    tier: "Titanium Member",
    joinedDate: "Jan 12, 2024",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "usr-02",
    email: "admin@flashcompare.ai",
    password: "admin123",
    name: "Elena Vance",
    role: "admin",
    status: "Active",
    tier: "Super Admin",
    joinedDate: "Nov 01, 2023",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "usr-03",
    email: "marcus.chen@outlook.com",
    password: "password123",
    name: "Marcus Chen",
    role: "customer",
    status: "Active",
    tier: "Gold Member",
    joinedDate: "Mar 18, 2024",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  }
];

// Initial mock bank accounts
FC.defaultBankAccounts = [
  {
    id: "bank-chase-01",
    bankName: "Chase Bank",
    holderName: "Alex Thorne",
    accountNumber: "987654324289",
    routingCode: "021000021",
    accountType: "Checking",
    isPrimary: true,
    verified: true,
    createdDate: "Jan 15, 2024"
  },
  {
    id: "bank-boa-02",
    bankName: "Bank of America",
    holderName: "Alex Thorne",
    accountNumber: "123456789012",
    routingCode: "121000358",
    accountType: "Savings",
    isPrimary: false,
    verified: true,
    createdDate: "Feb 02, 2024"
  }
];

// Initial mock audit logs
FC.defaultAuditLogs = [
  { id: "log-1", time: "10:14:02 AM", action: "PRICE_SYNC", actor: "Telemetry Worker", detail: "Synchronized floor price for Sony WH-1000XM5 ($298.00 at Amazon Prime)." },
  { id: "log-2", time: "09:45:18 AM", action: "OFFER_VERIFIED", actor: "Promo Ingestion", detail: "Validated cryptographic coupon signature for IPHONE50 (-$50 discount)." },
  { id: "log-3", time: "09:12:00 AM", action: "TRANSFER_COMPLETED", actor: "Escrow Daemon", detail: "Processed $12.50 cashback payout for user Alex Thorne via ACH." },
  { id: "log-4", time: "Yesterday", action: "PRODUCT_CREATED", actor: "Admin (Elena Vance)", detail: "Created new catalog entry: Apple Watch Ultra 2." }
];

// Normalize products for Apple minimal UI
if (FC.defaultProducts && FC.defaultProducts.length) {
  FC.defaultProducts.forEach(function(p) {
    p.name = p.name || p.title;
    var firstStore = (p.stores && p.stores[0]) || { price: 999 };
    p.currentBestPrice = p.currentBestPrice || firstStore.price;
    p.originalMSRP = p.originalMSRP || Math.round(p.currentBestPrice * 1.15);
    p.priceScore = p.priceScore || p.truthScore || 90;
    p.stockHealth = p.stockHealth || 92;
    p.sellerCredibility = p.sellerCredibility || 96;
    p.sentimentScore = p.sentimentScore || 89;
    
    if (!p.offers || !p.offers.length) {
      p.offers = (p.stores || []).map(function(s) {
        var couponCode = s.coupon ? (typeof s.coupon === 'string' ? s.coupon : s.coupon.code) : null;
        return {
          retailer: s.name,
          logo: 'https://images.unsplash.com/photo-1523474253246-72dc9922da8a?auto=format&fit=crop&w=80&q=80',
          price: s.price,
          shipping: s.shipping || 'Free 2-Day Delivery',
          deliveryDays: s.deliveryDays || 2,
          returnDays: s.returnDays || 30,
          coupon: couponCode,
          stock: s.stock || 'In Stock',
          url: s.link || '#'
        };
      });
    }

    if (!p.verdict) {
      p.verdict = {
        action: 'BUY NOW',
        title: 'Prime Purchase Window',
        confidence: 91,
        summary: 'Priced competitively near historical price baseline with verified retailer stock.',
        reasoning: [
          'Historical price floor reached across multiple merchants.',
          'Authorized seller fulfillment guaranteed with standard 30-day return policy.'
        ]
      };
    }

    if (!p.priceHistory || !p.priceHistory.length) {
      p.priceHistory = [
        { date: '2026-01-10', price: Math.round(p.originalMSRP) },
        { date: '2026-01-25', price: Math.round(p.originalMSRP * 0.98) },
        { date: '2026-02-10', price: Math.round(p.originalMSRP * 0.95) },
        { date: '2026-02-28', price: Math.round(p.originalMSRP * 0.92) },
        { date: '2026-03-12', price: Math.round(p.currentBestPrice) }
      ];
    }
  });
}

// Expand the demo catalogue to 100 realistic, browseable products.  Each item
// inherits the complete comparison, offer and price-history shape used by the UI.
const catalogProductSeeds = [
  ['Samsung Galaxy Z Fold 6', 'Smartphones'], ['Google Pixel 9 Pro', 'Smartphones'],
  ['OnePlus 13', 'Smartphones'], ['Nothing Phone (3)', 'Smartphones'],
  ['MacBook Air M4', 'Laptops'], ['ASUS ROG Zephyrus G16', 'Laptops'],
  ['Lenovo ThinkPad X1 Carbon', 'Laptops'], ['HP Spectre x360', 'Laptops'],
  ['Bose QuietComfort Ultra', 'Audio'], ['Apple AirPods Pro 3', 'Audio'],
  ['Sonos Ace', 'Audio'], ['JBL Charge 6', 'Audio'], ['PlayStation 5 Pro', 'Gaming'],
  ['Nintendo Switch 2', 'Gaming'], ['Xbox Series X Carbon', 'Gaming'], ['Steam Deck OLED', 'Gaming'],
  ['Apple Watch Series 11', 'Wearables'], ['Samsung Galaxy Watch Ultra', 'Wearables'],
  ['Garmin Fenix 8', 'Wearables'], ['Oura Ring 4', 'Wearables'], ['Canon EOS R6 Mark III', 'Cameras'],
  ['Sony Alpha a7 V', 'Cameras'], ['DJI Osmo Pocket 4', 'Cameras'], ['GoPro HERO 14 Black', 'Cameras'],
  ['Dyson V16 Detect', 'Home Tech'], ['Google Nest Hub Max', 'Home Tech'], ['Roborock S9 MaxV', 'Home Tech'],
  ['Philips Hue Starter Kit', 'Home Tech'], ['iPad Pro M5', 'Tablets'], ['Samsung Galaxy Tab S11', 'Tablets'],
  ['reMarkable Paper Pro', 'Tablets'], ['Kindle Scribe Colorsoft', 'Tablets'], ['Meta Quest 4', 'XR'],
  ['Apple Vision Pro 2', 'XR'], ['Xreal Air 3 Pro', 'XR'], ['DJI Mini 5 Pro', 'Drones'],
  ['DJI Air 4S', 'Drones'], ['Anker Prime Power Bank', 'Accessories'], ['Logitech MX Master 4', 'Accessories'],
  ['Belkin 3-in-1 Qi2 Charger', 'Accessories'], ['Razer BlackWidow V5', 'Accessories'], ['Keychron Q6 Max', 'Accessories'],
  ['LG C6 OLED 65-inch', 'TV & Displays'], ['Samsung The Frame Pro', 'TV & Displays'], ['Alienware 32 4K OLED', 'TV & Displays'],
  ['Dell UltraSharp 32 6K', 'TV & Displays'], ['Ninja Luxe Cafe', 'Kitchen'], ['Breville Barista Touch', 'Kitchen'],
  ['Vitamix Ascent X5', 'Kitchen'], ['Weber Genesis Smart Grill', 'Kitchen'], ['Eufy Security S4', 'Security'],
  ['Ring Battery Doorbell Pro', 'Security'], ['Aqara Smart Lock U300', 'Security'], ['TP-Link Deco BE95', 'Networking'],
  ['Netgear Orbi 970', 'Networking'], ['Synology DS925+', 'Storage'], ['SanDisk Extreme Pro 4TB', 'Storage'],
  ['Crucial T705 2TB', 'Storage'], ['Corsair Vengeance i8200', 'Desktops'], ['Apple Mac Studio M4 Max', 'Desktops'],
  ['Framework Laptop 16', 'Laptops'], ['MSI Creator Z17', 'Laptops'], ['Bowers & Wilkins Px8', 'Audio'],
  ['Sennheiser Momentum 5', 'Audio'], ['Fujifilm X-T6', 'Cameras'], ['Leica Q4', 'Cameras'],
  ['Samsung Odyssey G9', 'TV & Displays'], ['Sony Bravia 9', 'TV & Displays'], ['Apple TV 4K', 'Home Tech'],
  ['Roku Ultra 2026', 'Home Tech'], ['Garmin Venu 4', 'Wearables'], ['Google Pixel Watch 4', 'Wearables'],
  ['DJI Mic 3', 'Accessories'], ['Elgato Stream Deck XL', 'Accessories'], ['Ooni Volt 2', 'Kitchen'],
  ['Thermomix TM7', 'Kitchen'], ['Ubiquiti Dream Machine Pro', 'Networking'], ['WD My Book 22TB', 'Storage'],
  ['Valve Index 2', 'XR'], ['Insta360 X5', 'Cameras'], ['Bose Smart Soundbar 900', 'Audio'],
  ['Samsung Galaxy Buds 4 Pro', 'Audio'], ['ASUS ProArt P16', 'Laptops'], ['Acer Predator Helios 18', 'Laptops'],
  ['Microsoft Surface Pro 12', 'Tablets'], ['Lenovo Legion Go 2', 'Gaming'], ['Turtle Beach Stealth Pro', 'Gaming'],
  ['Nanoleaf Skylight', 'Home Tech'], ['Ecobee Smart Thermostat', 'Home Tech'], ['August Wi-Fi Smart Lock', 'Security'],
  ['DJI Avata 3', 'Drones'], ['Segway Ninebot Max G3', 'Mobility'], ['Herman Miller Embody', 'Office'],
  ['Secretlab Titan Evo', 'Office'], ['Anker 747 Charger', 'Accessories']
];

const productImage = 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80';
const initialProductCount = FC.defaultProducts.length;
catalogProductSeeds.slice(0, Math.max(0, 100 - initialProductCount)).forEach(function([name, category], index) {
  const source = FC.defaultProducts[index % initialProductCount];
  const price = Math.round((129 + ((index * 83) % 1870)) / 5) * 5;
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  FC.defaultProducts.push({
    ...source,
    id: id,
    name: name,
    title: name,
    category: category,
    currentBestPrice: price,
    originalMSRP: Math.round(price * 1.16),
    priceScore: 76 + (index % 23),
    truthScore: 76 + (index % 23),
    images: [productImage],
    offers: (source.offers || []).slice(0, 3).map(function(offer, offerIndex) {
      return { ...offer, price: price + (offerIndex * 18), retailer: offer.retailer || offer.name || 'Verified retailer' };
    }),
    priceHistory: [
      { date: '2026-06-15', price: Math.round(price * 1.18) },
      { date: '2026-07-15', price: Math.round(price * 1.1) },
      { date: '2026-08-15', price: Math.round(price * 1.04) },
      { date: '2026-09-16', price: price }
    ]
  });
});

FC.defaultOrders = [
  { id: 'ORD-10482', customer: 'Alex Thorne', email: 'user@flashcompare.ai', productId: 'iphone-15-pro-max', product: 'Apple iPhone 15 Pro Max', total: 1199, status: 'Delivered', orderedAt: '2026-09-14', payment: 'Paid' },
  { id: 'ORD-10481', customer: 'Marcus Chen', email: 'marcus.chen@outlook.com', productId: 'sony-wh-1000xm5', product: 'Sony WH-1000XM5', total: 298, status: 'Shipped', orderedAt: '2026-09-15', payment: 'Paid' },
  { id: 'ORD-10480', customer: 'Jamie Patel', email: 'jamie.patel@example.com', productId: 'macbook-air-m4', product: 'MacBook Air M4', total: 1099, status: 'Processing', orderedAt: '2026-09-16', payment: 'Paid' },
  { id: 'ORD-10479', customer: 'Morgan Lee', email: 'morgan.lee@example.com', productId: 'nintendo-switch-2', product: 'Nintendo Switch 2', total: 449, status: 'Awaiting payment', orderedAt: '2026-09-16', payment: 'Pending' }
];

// Reset helper
FC.resetToDefaultSeed = function() {
  localStorage.setItem("fc_seed_version", "v_india_a_z_2026");
  localStorage.setItem("fc_products", JSON.stringify(FC.defaultProducts));
  localStorage.setItem("fc_users", JSON.stringify(FC.defaultUsers));
  localStorage.setItem("fc_bank_accounts", JSON.stringify(FC.defaultBankAccounts));
  localStorage.setItem("fc_audit_logs", JSON.stringify(FC.defaultAuditLogs));
  
  var initialWallet = {
    balance: 2450.00,
    lifetimeEarnings: 5800.00,
    lifetimeWithdrawn: 3350.00,
    linkedAccounts: [
      {
        id: "bank-hdfc-01",
        bankName: "HDFC Bank",
        accountType: "Salary Account",
        maskedNumber: "•••• 4289",
        routingNumber: "HDFC0000128",
        isDefault: true,
        verified: true,
        linkedAt: "2024-01-15T10:00:00.000Z"
      },
      {
        id: "bank-sbi-02",
        bankName: "State Bank of India",
        accountType: "Savings",
        maskedNumber: "•••• 9012",
        routingNumber: "SBIN0004120",
        isDefault: false,
        verified: true,
        linkedAt: "2024-02-02T10:00:00.000Z"
      }
    ],
    transactions: [
      {
        id: "TRX-892104",
        date: "2026-03-14",
        type: "Cashback Reward (Apple iPhone 16 Pro)",
        amount: 1199.00,
        status: "Completed",
        receiptId: "RCP-L89K2J"
      },
      {
        id: "TRX-741920",
        date: "2026-03-08",
        type: "Transfer to Bank (•••• 4289)",
        amount: -2500.00,
        status: "Completed",
        receiptId: "RCP-M98N21"
      },
      {
        id: "TRX-551029",
        date: "2026-02-27",
        type: "Cashback Reward (boAt Nirvana Ion ANC)",
        amount: 229.00,
        status: "Completed",
        receiptId: "RCP-P11K99"
      }
    ]
  };

  localStorage.setItem("fc_wallet", JSON.stringify(initialWallet));
  localStorage.setItem("fc_wallet_balance", "2450.00");
  localStorage.setItem("fc_watchlist", JSON.stringify(["apple-iphone-16-pro", "sony-wh-1000xm5"]));
  localStorage.setItem("fc_price_alerts", JSON.stringify([
    { id: "alt-101", productId: "sony-wh-1000xm5", targetPrice: 26990.00, currentPrice: 28990.00, status: "Active" }
  ]));
  localStorage.setItem("fc_theme", "light");
};

FC.MockData = {
  getInitialProducts: function() { return FC.defaultProducts; },
  getInitialUsers: function() { return FC.defaultUsers; },
  getInitialBankAccounts: function() { return FC.defaultBankAccounts; },
  getInitialAuditLogs: function() { return FC.defaultAuditLogs; },
  resetToDefaultSeed: FC.resetToDefaultSeed
};

// ==========================================================================
// MOCK CUSTOMERS & ORDERS (INDIAN LOCALIZATION IN INR)
// ==========================================================================

const INDIAN_NAMES = ['Aarav Sharma', 'Priya Patel', 'Rohan Mehta', 'Ananya Iyer', 'Vikram Singh', 'Sneha Rao', 'Aditya Verma', 'Pooja Gupta', 'Arjun Nair', 'Neha Kulkarni', 'Kavya Reddy', 'Rahul Joshi'];
const INDIAN_CITIES = ['Bengaluru, Karnataka', 'Mumbai, Maharashtra', 'Delhi NCR', 'Hyderabad, Telangana', 'Chennai, Tamil Nadu', 'Pune, Maharashtra', 'Kolkata, West Bengal', 'Ahmedabad, Gujarat', 'Jaipur, Rajasthan', 'Kochi, Kerala'];

// Generate Mock Customers
FC.mockCustomers = Array.from({length: 45}, (_, i) => ({
  id: `CUST-IN-${1000+i}`,
  name: `${INDIAN_NAMES[i % INDIAN_NAMES.length]} ${i > 11 ? (i % 10) + 1 : ''}`.trim(),
  email: `customer${i}@flashcompare.in`,
  phone: `+91 98${(10000000 + i * 34567).toString().substring(0, 8)}`,
  status: Math.random() > 0.1 ? 'Active' : 'Inactive',
  totalSpend: Math.floor(Math.random() * 250000) + 5000,
  ordersCount: Math.floor(Math.random() * 15) + 1,
  joinDate: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
  location: INDIAN_CITIES[i % INDIAN_CITIES.length]
}));

// Generate Mock Orders
const ORDER_STATUSES = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled', 'Refunded'];
FC.mockOrders = Array.from({length: 120}, (_, i) => {
  const customer = FC.mockCustomers[i % FC.mockCustomers.length];
  const product = FC.defaultProducts[i % FC.defaultProducts.length];
  const qty = Math.floor(Math.random() * 2) + 1;
  const status = ORDER_STATUSES[i % ORDER_STATUSES.length];
  const price = product.currentBestPrice || 4999;
  
  return {
    id: `ORD-IN-${5000+i}`,
    customerName: customer.name,
    customerEmail: customer.email,
    productId: product.id,
    productName: product.title || product.name,
    quantity: qty,
    total: Math.round(price * qty),
    status: status,
    paymentStatus: status === 'Cancelled' ? 'Void' : (status === 'Pending' ? 'Unpaid' : 'Paid'),
    date: new Date(Date.now() - Math.random() * 5000000000).toISOString(),
    shippingAddress: `Plot No. ${10 + (i % 80)}, Sector ${1 + (i % 25)}, ${customer.location}`
  };
});

FC.resetToDefaultSeed = () => {
  localStorage.setItem('fc_seed_version', 'v_india_vegetables_2026');
  localStorage.setItem('fc_products', JSON.stringify(FC.defaultProducts));
  localStorage.setItem('fc_orders', JSON.stringify(FC.mockOrders));
  localStorage.setItem('fc_customers', JSON.stringify(FC.mockCustomers));
};

export const defaultProducts = FC.defaultProducts;
export const defaultUsers = FC.defaultUsers;
export const defaultBankAccounts = FC.defaultBankAccounts;
export const defaultAuditLogs = FC.defaultAuditLogs;
export const mockOrders = FC.mockOrders;
export const mockCustomers = FC.mockCustomers;
export const resetToDefaultSeed = FC.resetToDefaultSeed;
export default FC;
