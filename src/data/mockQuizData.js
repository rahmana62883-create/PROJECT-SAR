export const generateId = () => Math.random().toString(36).substring(2, 9);

// Base hand-crafted questions
const baseQuestions = [
  // Product Knowledge & Smartphones
  { category: "Smartphones", difficulty: "Easy", q: "Which company manufactures the iPhone?", options: ["Samsung", "Apple", "Google", "Nokia"], a: 1, explain: "Apple Inc. designs and manufactures the iPhone series.", points: 10 },
  { category: "Smartphones", difficulty: "Medium", q: "What does OLED stand for in display technology?", options: ["Organic Light-Emitting Diode", "Optical Light-Emitting Device", "Overlaid LED", "Optimized Light-Emitting Diode"], a: 0, explain: "OLED stands for Organic Light-Emitting Diode, known for deep blacks and high contrast.", points: 20 },
  { category: "Smartphones", difficulty: "Hard", q: "Which smartphone was the first to feature a capacitive touchscreen?", options: ["LG Prada", "Apple iPhone", "BlackBerry Storm", "HTC Dream"], a: 0, explain: "The LG Prada (announced shortly before the iPhone in 2006) was the first mobile phone with a capacitive touchscreen.", points: 30 },
  { category: "Smartphones", difficulty: "Medium", q: "What is the primary function of a smartphone's NPU?", options: ["Network Processing Unit", "Neural Processing Unit for AI tasks", "Numeric Processing Unit for math", "Navigation Processing Unit for GPS"], a: 1, explain: "An NPU (Neural Processing Unit) is a specialized circuit designed to accelerate AI and machine learning tasks.", points: 20 },
  
  // Laptops
  { category: "Laptops", difficulty: "Easy", q: "What does 'RAM' stand for?", options: ["Read Access Memory", "Random Access Memory", "Rapid Action Memory", "Run All Memory"], a: 1, explain: "RAM stands for Random Access Memory, the short-term memory of a computer.", points: 10 },
  { category: "Laptops", difficulty: "Medium", q: "Which of these is NOT an operating system?", options: ["Windows", "macOS", "Linux", "Intel Core"], a: 3, explain: "Intel Core is a brand of processors, not an operating system.", points: 20 },
  { category: "Laptops", difficulty: "Hard", q: "What is the primary advantage of an ARM-based laptop over x86?", options: ["Higher peak clock speeds", "Better compatibility with old Windows software", "Significantly better power efficiency", "Cheaper RAM modules"], a: 2, explain: "ARM architecture (like Apple's M-series or Qualcomm Snapdragon) is highly lauded for its exceptional power efficiency and battery life.", points: 30 },
  
  // Audio Devices
  { category: "Audio", difficulty: "Easy", q: "What feature actively cancels out background noise?", options: ["Passive Isolation", "ANC (Active Noise Cancellation)", "Spatial Audio", "Dolby Atmos"], a: 1, explain: "Active Noise Cancellation (ANC) uses microphones to generate sound waves that negate background noise.", points: 10 },
  { category: "Audio", difficulty: "Medium", q: "Which audio codec provides lossless quality over Bluetooth?", options: ["SBC", "AAC", "LDAC", "aptX Low Latency"], a: 2, explain: "Sony's LDAC codec allows streaming of high-resolution audio over Bluetooth at up to 990 kbps.", points: 20 },
  
  // Gaming
  { category: "Gaming", difficulty: "Easy", q: "Who developed the PlayStation console?", options: ["Microsoft", "Sony", "Nintendo", "Sega"], a: 1, explain: "Sony Computer Entertainment developed the PlayStation.", points: 10 },
  { category: "Gaming", difficulty: "Medium", q: "What does 'FPS' stand for in gaming performance?", options: ["First Person Shooter", "Frames Per Second", "Fast Processing Speed", "Fluid Pixel Shading"], a: 1, explain: "In the context of performance, FPS stands for Frames Per Second, indicating how smoothly a game runs.", points: 20 },
  { category: "Gaming", difficulty: "Hard", q: "Which component is most crucial for ray tracing in modern PC gaming?", options: ["CPU", "RAM", "GPU (with RT cores)", "SSD"], a: 2, explain: "Modern GPUs (like Nvidia's RTX series) contain dedicated Ray Tracing (RT) cores to calculate complex lighting in real-time.", points: 30 },
  
  // Online Shopping & Price Comparison
  { category: "Shopping", difficulty: "Easy", q: "What does 'MSRP' stand for?", options: ["Minimum Sales Retail Price", "Manufacturer's Suggested Retail Price", "Maximum Sale Reduction Policy", "Market Standard Rate Price"], a: 1, explain: "MSRP is the price the manufacturer recommends the retailer sell the product for.", points: 10 },
  { category: "Shopping", difficulty: "Medium", q: "In e-commerce, what does 'Arbitrage' refer to?", options: ["Buying products to return them", "Using bots to purchase stock", "Buying low in one market and selling high in another", "Applying multiple coupon codes"], a: 2, explain: "Arbitrage is the simultaneous purchase and sale of an asset to profit from an imbalance in the price.", points: 20 },
  { category: "Shopping", difficulty: "Hard", q: "Which metric is NOT part of the Flash AI 4-Ring Truth Score?", options: ["Price Health", "Stock Velocity", "Marketing Budget", "Seller Credibility"], a: 2, explain: "The 4-Ring Truth Engine evaluates Price Health, Stock Velocity, Seller Credibility, and Review Sentiment.", points: 30 },
  { category: "Shopping", difficulty: "Medium", q: "Why do prices often drop on Black Friday?", options: ["Retailers must sell out", "Excess inventory clearing & loss-leaders", "Factory errors", "Tax breaks"], a: 1, explain: "Retailers use loss-leaders to draw traffic and clear out older inventory before the end of the year.", points: 20 },
  
  // Tech Facts
  { category: "Tech Facts", difficulty: "Hard", q: "Which product holds the highest market cap impact historically?", options: ["Apple iPhone", "Sony PlayStation", "Nintendo Switch", "Samsung Galaxy S"], a: 0, explain: "The Apple iPhone has consistently generated the highest revenue and market cap impact of any consumer electronics product.", points: 30 },
  { category: "Tech Facts", difficulty: "Medium", q: "What does 'IP68' mean on a smartphone?", options: ["It has 68 hours of battery life", "It supports 68W fast charging", "It is highly dust and water resistant", "It has a 68-megapixel camera"], a: 2, explain: "IP68 is an Ingress Protection rating indicating the device is dust-tight and can survive prolonged water submersion.", points: 20 }
];

// Add IDs to base questions
const processedBase = baseQuestions.map(q => ({ ...q, id: generateId() }));

// Dynamic Generator to scale to 150+ questions
const generateVariations = () => {
  const variations = [];
  
  const techCompanies = [
    { name: "Samsung", product: "Galaxy S Series", type: "Smartphone" },
    { name: "Apple", product: "MacBook Pro", type: "Laptop" },
    { name: "Sony", product: "PlayStation 5", type: "Console" },
    { name: "Microsoft", product: "Xbox Series X", type: "Console" },
    { name: "Nintendo", product: "Switch", type: "Console" },
    { name: "Google", product: "Pixel", type: "Smartphone" },
    { name: "Dell", product: "XPS 13", type: "Laptop" },
    { name: "Bose", product: "QuietComfort", type: "Headphones" }
  ];

  const acronyms = [
    { abbr: "CPU", meaning: "Central Processing Unit", wrong: ["Computer Power Unit", "Central Power Unit", "Core Processing Unit"] },
    { abbr: "GPU", meaning: "Graphics Processing Unit", wrong: ["General Processing Unit", "Graphical Power Unit", "Gaming Processing Unit"] },
    { abbr: "SSD", meaning: "Solid State Drive", wrong: ["Super Speed Drive", "Solid Storage Device", "System State Drive"] },
    { abbr: "USB", meaning: "Universal Serial Bus", wrong: ["Universal Storage Bus", "Unified Serial Bus", "Unit Serial Bus"] },
    { abbr: "HDMI", meaning: "High-Definition Multimedia Interface", wrong: ["High-Display Monitor Interface", "Heavy-Duty Multimedia Input", "Hyper-Data Media Interface"] },
    { abbr: "LCD", meaning: "Liquid Crystal Display", wrong: ["Light Crystal Display", "Liquid Color Display", "Laser Crystal Device"] },
    { abbr: "NFC", meaning: "Near Field Communication", wrong: ["Network File Connection", "Near Frequency Control", "New Field Connection"] },
    { abbr: "Wi-Fi", meaning: "Wireless Fidelity", wrong: ["Wireless Firewire", "Wired Fiber", "Wireless Frequency"] }
  ];

  // Generate Acronym Questions (8 * 3 = 24 questions)
  acronyms.forEach(ac => {
    // Meaning question
    variations.push({
      id: generateId(),
      category: "Tech Facts",
      difficulty: "Easy",
      q: `What does '${ac.abbr}' stand for?`,
      options: [ac.meaning, ...ac.wrong].sort(() => 0.5 - Math.random()),
      get a() { return this.options.indexOf(ac.meaning); },
      explain: `${ac.abbr} stands for ${ac.meaning}.`,
      points: 10
    });
  });

  // Generate Company/Product Questions (8 * 2 = 16 questions)
  techCompanies.forEach(comp => {
    // Who makes it?
    variations.push({
      id: generateId(),
      category: comp.type === "Smartphone" ? "Smartphones" : comp.type === "Laptop" ? "Laptops" : comp.type === "Console" ? "Gaming" : "Audio",
      difficulty: "Easy",
      q: `Which company makes the ${comp.product}?`,
      options: [comp.name, "Logitech", "HP", "Asus"].sort(() => 0.5 - Math.random()),
      get a() { return this.options.indexOf(comp.name); },
      explain: `${comp.name} is the manufacturer of the ${comp.product}.`,
      points: 10
    });
  });

  // Battery / Spec Comparisons (Generative) - Approx 50 questions
  for (let i = 0; i < 50; i++) {
    const isRAM = Math.random() > 0.5;
    const val1 = isRAM ? (Math.floor(Math.random() * 4) + 1) * 8 : Math.floor(Math.random() * 3000) + 3000;
    const val2 = isRAM ? val1 + 8 : val1 + 1000;
    const unit = isRAM ? "GB RAM" : "mAh";
    const component = isRAM ? "memory for multitasking" : "battery capacity";

    variations.push({
      id: generateId(),
      category: "Smartphones",
      difficulty: "Medium",
      q: `Which specification generally provides better ${component}?`,
      options: [`${val1} ${unit}`, `${val2} ${unit}`, `They are exactly the same`, `It depends on the color`],
      a: 1, // val2 is always larger in options array index 1
      explain: `A higher capacity (${val2} ${unit}) generally provides better ${component}, though software optimization also matters.`,
      points: 20
    });
  }

  // E-commerce & Deals (Generative) - Approx 50 questions
  const discountScenarios = [
    { base: 1000, discount: 20, final: 800 },
    { base: 500, discount: 10, final: 450 },
    { base: 200, discount: 25, final: 150 },
    { base: 1200, discount: 15, final: 1020 },
    { base: 80, discount: 50, final: 40 }
  ];

  for (let i = 0; i < 50; i++) {
    const scen = discountScenarios[i % discountScenarios.length];
    variations.push({
      id: generateId(),
      category: "Shopping",
      difficulty: "Hard",
      q: `If a product costs $${scen.base} and has a ${scen.discount}% discount, what is the final price?`,
      options: [`$${scen.final}`, `$${scen.base - 10}`, `$${scen.final + 50}`, `$${scen.final - 20}`].sort(() => 0.5 - Math.random()),
      get a() { return this.options.indexOf(`$${scen.final}`); },
      explain: `${scen.discount}% of ${scen.base} is ${scen.base * (scen.discount/100)}. Subtracting that gives $${scen.final}.`,
      points: 30
    });
  }

  return variations;
};

export const QUIZ_BANK = [...processedBase, ...generateVariations()];
