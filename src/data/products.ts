import type { Product } from '../types/commerce';

export const productsCatalog: Product[] = [
  {
    id: 'aegis-pro-x1',
    name: 'AEGIS PRO X1',
    tagline: 'AI WORKSTATION LAPTOP',
    category: 'ELECTRONICS',
    subCategory: 'LAPTOPS',
    price: 74999,
    originalPrice: 84999,
    formattedPrice: '₹74,999',
    rating: 4.9,
    reviewsCount: 184,
    description: 'Engineered for sustained neural tensor computation and high-throughput model development. Features aerospace-grade magnesium-aluminum chassis with vapor chamber liquid cooling.',
    keySpecs: [
      '32GB DDR5 5600MHz RAM',
      '1TB NVMe PCIe 4.0 SSD',
      'RTX 4070 Laptop GPU (140W TGP)',
      '16" 2.8K 165Hz OLED (100% DCI-P3)',
      'Intel Core i7-14700H (16 Cores, 24 Threads)'
    ],
    fullSpecs: {
      'Processor': 'Intel® Core™ i7-14700H (Up to 5.4 GHz, 24MB Cache)',
      'Memory': '32 GB DDR5-5600 MHz Dual-Channel RAM',
      'Graphics': 'NVIDIA® GeForce RTX™ 4070 (8 GB GDDR6 dedicated)',
      'Storage': '1 TB PCIe® 4.0 NVMe™ M.2 Performance SSD',
      'Display': '40.6 cm (16.0") 2.8K (2880 x 1800) OLED 165Hz 0.2ms HDR 500',
      'Cooling': 'AEGIS CryoChamber Vapor Chamber with dual liquid-crystal polymer fans',
      'Battery': '99.9 Wh with 140W Type-C HyperCharge (50% in 28 mins)',
      'Weight': '1.88 kg'
    },
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=85'
    ],
    primaryImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=85',
    aiFitScore: 94,
    aiFitReason: 'Strong match for your stated requirements (Budget ≤ ₹80K, 32GB RAM, dedicated Tensor GPU for AI/ML).',
    intentMatch: 'optimal',
    badge: '94% INTENT MATCH',
    inStock: true,
    featured: true
  },
  {
    id: 'ultrabook-stealth-x',
    name: 'ULTRABOOK STEALTH X',
    tagline: 'CREATOR SLIM EDITION',
    category: 'ELECTRONICS',
    subCategory: 'LAPTOPS',
    price: 89999,
    originalPrice: 94999,
    formattedPrice: '₹89,999',
    rating: 4.6,
    reviewsCount: 92,
    description: 'Ultra-thin profile focused on light creative tasks and executive mobility. Beautiful glass trackpad and carbon-fiber composite construction.',
    keySpecs: [
      '16GB LPDDR5X RAM',
      '512GB NVMe SSD',
      'Intel Arc Graphics 8-Xe',
      '14" 3.2K 120Hz PureSight Display',
      'Intel Core Ultra 7 155H'
    ],
    fullSpecs: {
      'Processor': 'Intel® Core™ Ultra 7 155H with integrated NPU',
      'Memory': '16 GB Soldered LPDDR5X-7467 MHz (Non-upgradable)',
      'Graphics': 'Intel® Arc™ Graphics (8 Xe-cores)',
      'Storage': '512 GB PCIe 4.0 SSD',
      'Display': '35.5 cm (14.0") 3.2K (3200 x 2000) IPS 120Hz 430 nits',
      'Weight': '1.24 kg'
    },
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&q=85'
    ],
    primaryImage: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=85',
    aiFitScore: 31,
    aiFitReason: 'Differs from your original requirements: Budget ₹89,999 exceeds ₹80,000 ceiling by ₹9,999; RAM is 16GB (below your 32GB minimum).',
    intentMatch: 'drift',
    badge: '31% INTENT DRIFT',
    inStock: true,
    featured: true
  },
  {
    id: 'aegis-horizon-neo',
    name: 'AEGIS HORIZON NEO',
    tagline: 'NEURAL FLAGSHIP SMARTPHONE',
    category: 'SMARTPHONES',
    subCategory: 'PHONES',
    price: 64999,
    originalPrice: 69999,
    formattedPrice: '₹64,999',
    rating: 4.8,
    reviewsCount: 230,
    description: 'Precision-milled aerospace titanium frame with on-device 7B parameter neural processing. Triple 50MP Hasselblad optical system with periscope telephoto.',
    keySpecs: [
      '16GB LPDDR5X RAM',
      '512GB UFS 4.0 Storage',
      'Snapdragon 8 Gen 3 with Hexagon NPU',
      '6.78" 1.5K LTPO AMOLED 144Hz',
      '50MP Sony LYT-900 1-inch Main Sensor'
    ],
    fullSpecs: {
      'Processor': 'Snapdragon® 8 Gen 3 Mobile Platform (4nm)',
      'Memory': '16 GB LPDDR5X RAM',
      'Storage': '512 GB UFS 4.0',
      'Display': '6.78" LTPO 4.0 AMOLED, 1-144Hz, 4500 nits peak',
      'Battery': '5400 mAh with 100W wired and 50W wireless flash charge',
      'Security': 'Hardware Enclave Security Coprocessor & In-Display Ultrasonic'
    },
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=85'
    ],
    primaryImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=85',
    aiFitScore: 88,
    aiFitReason: 'Exceptional mobile compute capability with hardware security isolation and on-device AI acceleration.',
    intentMatch: 'neutral',
    badge: 'NEW ARRIVAL',
    inStock: true,
    featured: true
  },
  {
    id: 'obsidian-acoustic-anc',
    name: 'OBSIDIAN ACOUSTIC ANC',
    tagline: 'STUDIO REFERENCE WIRELESS',
    category: 'AUDIO',
    subCategory: 'HEADPHONES',
    price: 24999,
    originalPrice: 28999,
    formattedPrice: '₹24,999',
    rating: 4.9,
    reviewsCount: 314,
    description: 'Custom 40mm planar magnetic transducers housed in acoustically tuned anodized aluminum cups. Hybrid neural active noise cancellation with 8 precision microphones.',
    keySpecs: [
      'Custom 40mm Planar Magnetic Drivers',
      'Spatial Audio with 6-Axis Head Tracking',
      'Hybrid Neural Noise Cancellation (-44dB)',
      '50 Hours Battery (38 hrs with ANC on)',
      'Lossless LDAC & aptX Lossless Support'
    ],
    fullSpecs: {
      'Transducer Type': 'Planar Magnetic, 40mm ultra-thin diaphragm',
      'Frequency Response': '5 Hz - 45,000 Hz',
      'Codecs': 'LDAC, aptX Adaptive, AAC, SBC, LC3',
      'Microphones': '8 MEMS microphones with AI beamforming',
      'Weight': '290 grams'
    },
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=85'
    ],
    primaryImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85',
    aiFitScore: 91,
    aiFitReason: 'Reference-class studio isolation for deep focus coding and audio engineering workflows.',
    intentMatch: 'neutral',
    badge: 'BESTSELLER',
    inStock: true,
    featured: true
  },
  {
    id: 'lumina-mirrorless-mk4',
    name: 'LUMINA MIRRORLESS MK-IV',
    tagline: '8K CINEMA & OPTICAL STILLS',
    category: 'CAMERAS',
    subCategory: 'CAMERAS',
    price: 118000,
    originalPrice: 129000,
    formattedPrice: '₹1,18,000',
    rating: 4.9,
    reviewsCount: 47,
    description: '45-megapixel back-illuminated stacked CMOS sensor capable of 8K60p ProRes internal recording and 30fps burst shooting with zero blackout.',
    keySpecs: [
      '45.7MP Full-Frame Stacked BSI CMOS',
      '8K60p ProRes RAW & 4K120p 10-Bit Internal',
      'Dual CFexpress Type B Card Slots',
      'Deep Learning AI Subject Recognition AF',
      '5-Axis In-Body Image Stabilization (8.0 stops)'
    ],
    fullSpecs: {
      'Sensor': '35.9 x 23.9 mm Full-Frame Stacked CMOS',
      'ISO Sensitivity': '64 - 25,600 (Expandable to 32 - 102,400)',
      'Viewfinder': '5.76M-dot OLED EVF with 120Hz refresh',
      'Body Construction': 'Magnesium alloy with weather-sealing at 42 joints',
      'Weight': '820 grams (body with battery)'
    },
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=85'
    ],
    primaryImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=85',
    aiFitScore: 67,
    aiFitReason: 'Professional optical cinema tier; exceeds laptop/workstation hardware domain.',
    intentMatch: 'neutral',
    inStock: true
  },
  {
    id: 'aegis-chrono-carbon',
    name: 'AEGIS CHRONO CARBON',
    tagline: 'TITANIUM SMART HOROLOGY',
    category: 'LIFESTYLE',
    subCategory: 'ACCESSORIES',
    price: 34999,
    originalPrice: 39999,
    formattedPrice: '₹34,999',
    rating: 4.8,
    reviewsCount: 112,
    description: 'Forged carbon fiber bezel with Grade 5 micro-blasted titanium chassis. Equipped with medical-grade ECG and dual-frequency L1+L5 multi-satellite navigation.',
    keySpecs: [
      'Grade 5 Titanium & Forged Carbon Case',
      'Sapphire Crystal Anti-Reflective Glass',
      'Dual-Frequency GPS (L1+L5) with Offline Topo Maps',
      '14-Day Smart Battery Life (60h GPS mode)',
      '100-Meter Water Resistance (10 ATM)'
    ],
    fullSpecs: {
      'Case Diameter': '44mm x 11.8mm thickness',
      'Display': '1.43" AMOLED 466x466 (1500 nits)',
      'Connectivity': 'Bluetooth 5.3, Wi-Fi, NFC Secure Payments',
      'Strap': 'Fluoroelastomer quick-release + Titanium link included',
      'Weight': '52g without strap'
    },
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85'
    ],
    primaryImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85',
    aiFitScore: 85,
    aiFitReason: 'Subtle biometric and contextual companion with cryptographic NFC authentication.',
    intentMatch: 'neutral',
    inStock: true
  },
  {
    id: 'cyberwear-modular-parka',
    name: 'AEGIS TECHNICAL PARKA',
    tagline: '3-LAYER MODULAR WEATHERWEAR',
    category: 'FASHION',
    subCategory: 'OUTERWEAR',
    price: 18500,
    originalPrice: 21900,
    formattedPrice: '₹18,500',
    rating: 4.7,
    reviewsCount: 68,
    description: 'Waterproof breathable 3-layer laminated technical shell with magnetic quick-release storm flaps and stealth RFID-shielded device pockets.',
    keySpecs: [
      '3-Layer GORE-TEX Pro 70D Membrane',
      'YKK AquaGuard Matte Waterproof Zippers',
      'Dual RFID Signal-Shielded Pockets',
      'Magnetic Fidlock Hood & Cuff Adjusters',
      'Laser-Perforated Underarm Ventilation'
    ],
    fullSpecs: {
      'Fabric': '100% Recycled Polyamide 3L Shell',
      'Waterproof Rating': '28,000 mm hydrostatic head',
      'Breathability': 'RET < 6 m² Pa/W',
      'Color': 'Deep Matte Obsidian Black'
    },
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85'
    ],
    primaryImage: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85',
    aiFitScore: 89,
    aiFitReason: 'Physical protection layer complementing digital security posture.',
    intentMatch: 'neutral',
    inStock: true
  },
  {
    id: 'neural-frame-vision',
    name: 'NEURAL FRAME VISION',
    tagline: 'AUDIO & HEAD-UP SUNWEAR',
    category: 'FASHION',
    subCategory: 'ACCESSORIES',
    price: 14999,
    originalPrice: 17500,
    formattedPrice: '₹14,999',
    rating: 4.8,
    reviewsCount: 84,
    description: 'Architectural matte black frame with open-ear directional micro-acoustics. Polarized Zeiss lenses with hydrophobic anti-reflective coating.',
    keySpecs: [
      'Zeiss Precision Polarized Lenses (UV400)',
      'Directional Open-Ear Sound Chamber',
      'Dual Noise-Suppression Microphones',
      'Ultra-Light Titanium Temple Arms (34g)',
      'IPX4 Sweat and Splash Water Resistant'
    ],
    fullSpecs: {
      'Frame Material': 'TR90 Bio-Nylon & Grade 5 Titanium',
      'Audio Transducers': '16mm x 11mm custom dual-magnet micro speakers',
      'Battery Life': '6.5 hours playback, 36 hours with charging case',
      'Weight': '34.2 grams'
    },
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85'
    ],
    primaryImage: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85',
    aiFitScore: 82,
    aiFitReason: 'Discreet hands-free notification interface with optical glare mitigation.',
    intentMatch: 'neutral',
    inStock: true
  }
];
