import { UserModel } from '../models/User.js';
import { ProductModel } from '../models/Product.js';
import { CategoryModel } from '../models/Category.js';
import { hashPassword } from './jwt.js';
import { logger } from './logger.js';
import { initializeFirebaseAdmin } from '../config/firebase.js';

export const SEED_CATEGORIES = [
  { id: 'cat-laptops', name: 'Laptops', slug: 'laptops', description: 'AI workstations, ultrabooks, and mobile computing rigs', isActive: true },
  { id: 'cat-smartphones', name: 'Smartphones', slug: 'smartphones', description: 'Next-gen flagship mobile devices with neural silicon', isActive: true },
  { id: 'cat-audio', name: 'Audio', slug: 'audio', description: 'High-fidelity planar magnetic headphones and studio monitors', isActive: true },
  { id: 'cat-accessories', name: 'Accessories', slug: 'accessories', description: 'Precision mechanical keyboards, ergonomic mice, and docks', isActive: true },
  { id: 'cat-lifestyle', name: 'Lifestyle', slug: 'lifestyle', description: 'Cybernetic executive gear, smart wearables, and ballistic bags', isActive: true }
];

export const SEED_PRODUCTS = [
  {
    id: 'aegis-pro-x1',
    name: 'AEGIS PRO X1',
    slug: 'aegis-pro-x1',
    description: 'Engineered for sustained neural tensor computation and high-throughput model development. Features aerospace-grade magnesium-aluminum chassis with vapor chamber liquid cooling.',
    category: 'Laptops',
    brand: 'AEGIS',
    price: 74999,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=85'
    ],
    rating: 4.9,
    reviewCount: 184,
    stock: 25,
    specifications: {
      ram: 32,
      storage: 1024,
      processor: 'Intel Core i7-14700H (16 Cores, 24 Threads)',
      gpu: 'NVIDIA RTX 4070 Laptop (140W TGP)',
      display: '16" 2.8K 165Hz OLED'
    },
    tags: ['ai-workstation', 'rtx4070', '32gb-ram', 'laptop', 'gaming'],
    isActive: true
  },
  {
    id: 'ultrabook-stealth-x',
    name: 'ULTRABOOK STEALTH X',
    slug: 'ultrabook-stealth-x',
    description: 'Ultra-thin profile focused on light creative tasks and executive mobility. Beautiful glass trackpad and carbon-fiber composite construction.',
    category: 'Laptops',
    brand: 'StealthTech',
    price: 89999,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=85'
    ],
    rating: 4.6,
    reviewCount: 92,
    stock: 14,
    specifications: {
      ram: 16,
      storage: 512,
      processor: 'Intel Core Ultra 7 155H',
      gpu: 'Intel Arc Graphics',
      display: '14" 3K PureSight OLED'
    },
    tags: ['ultrabook', 'creator', 'thin-light'],
    isActive: true
  },
  {
    id: 'titan-workstation-ultra',
    name: 'TITAN WORKSTATION ULTRA',
    slug: 'titan-workstation-ultra',
    description: 'Extreme compute desktop-replacement notebook with 64GB DDR5, liquid metal cooling, and dual NVMe Gen5 drives for heavy local LLM inference.',
    category: 'Laptops',
    brand: 'Titan',
    price: 84999,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=85'
    ],
    rating: 4.8,
    reviewCount: 65,
    stock: 8,
    specifications: {
      ram: 32,
      storage: 2048,
      processor: 'AMD Ryzen 9 7945HX (16 Cores, 32 Threads)',
      gpu: 'NVIDIA RTX 4080 (175W)',
      display: '17.3" QHD+ 240Hz'
    },
    tags: ['workstation', 'extreme', 'local-llm', 'titan'],
    isActive: true
  },
  {
    id: 'zenith-creator-16',
    name: 'ZENITH CREATOR 16',
    slug: 'zenith-creator-16',
    description: 'Calibrated factory display with 100% Adobe RGB and Delta-E < 1. Studio-grade dual condenser microphones and haptic trackpad.',
    category: 'Laptops',
    brand: 'Zenith',
    price: 79999,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=85'
    ],
    rating: 4.7,
    reviewCount: 110,
    stock: 19,
    specifications: {
      ram: 32,
      storage: 1024,
      processor: 'Intel Core i9-13900H',
      gpu: 'RTX 4060 Studio',
      display: '16" 4K Mini-LED'
    },
    tags: ['creator', '4k-oled', 'video-editing'],
    isActive: true
  },
  {
    id: 'nexus-prime-v',
    name: 'NEXUS PRIME V SMARTPHONE',
    slug: 'nexus-prime-v',
    description: 'Flagship neural handheld featuring onboard 8B parameter model quantization accelerator, periscope 10x optical zoom, and ceramic back.',
    category: 'Smartphones',
    brand: 'Nexus',
    price: 54999,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02560?auto=format&fit=crop&w=1200&q=85'
    ],
    rating: 4.8,
    reviewCount: 312,
    stock: 45,
    specifications: {
      ram: 16,
      storage: 512,
      processor: 'Snapdragon 8 Gen 3',
      battery: '5400 mAh 100W Fast Charge',
      camera: '50MP Sony LYT-900 1-inch sensor'
    },
    tags: ['smartphone', 'flagship', '5g', 'ai-phone'],
    isActive: true
  },
  {
    id: 'aegis-acoustic-planar-1',
    name: 'AEGIS PLANAR ACOUSTIC HEADPHONES',
    slug: 'aegis-acoustic-planar-1',
    description: 'Open-back planar magnetic audiophile headphones with ultra-thin nanometer diaphragms, CNC machined aluminum earcups, and balanced 4.4mm Pentaconn cabling.',
    category: 'Audio',
    brand: 'AEGIS Acoustic',
    price: 12999,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85'
    ],
    rating: 4.9,
    reviewCount: 220,
    stock: 50,
    specifications: {
      driver: '100mm Planar Magnetic',
      frequencyResponse: '6Hz - 48kHz',
      impedance: '32 Ohms',
      weight: '380g'
    },
    tags: ['audiophile', 'planar-magnetic', 'headphones', 'sound'],
    isActive: true
  },
  {
    id: 'cyber-pulse-watch-3',
    name: 'CYBERPULSE SMARTWATCH TITANIUM',
    slug: 'cyber-pulse-watch-3',
    description: 'Grade 5 titanium bezel, sapphire crystal face, dual-frequency GNSS, and military-standard MIL-STD-810H durability with 14-day battery life.',
    category: 'Lifestyle',
    brand: 'CyberPulse',
    price: 8499,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85'
    ],
    rating: 4.7,
    reviewCount: 175,
    stock: 60,
    specifications: {
      display: '1.43" AMOLED 1000 nits',
      battery: '14 Days standard use',
      waterResistance: '50M / 5 ATM'
    },
    tags: ['smartwatch', 'titanium', 'wearable', 'health'],
    isActive: true
  },
  {
    id: 'tactile-mech-65',
    name: 'AEGIS TACTILE MECH 65 KEYBOARD',
    slug: 'tactile-mech-65',
    description: 'Gasket-mounted wireless custom mechanical keyboard with lubed Holy Panda tactile switches, PBT dye-sub keycaps, and hot-swap PCB.',
    category: 'Accessories',
    brand: 'AEGIS Hardware',
    price: 9999,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=85'
    ],
    rating: 4.8,
    reviewCount: 140,
    stock: 35,
    specifications: {
      layout: '65% Compact',
      connectivity: '2.4GHz / Bluetooth 5.2 / USB-C',
      switchType: 'Custom Pre-lubed Tactile'
    },
    tags: ['keyboard', 'mechanical', 'custom', 'desk-setup'],
    isActive: true
  },
  {
    id: 'orbital-shield-backpack',
    name: 'ORBITAL SHIELD BALLISTIC BACKPACK',
    slug: 'orbital-shield-backpack',
    description: 'Cordura 1000D weatherproof ballistic nylon laptop backpack with RFID-blocking passport compartment and dedicated padded 16" laptop sleeve.',
    category: 'Lifestyle',
    brand: 'Orbital',
    price: 6499,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85'
    ],
    rating: 4.6,
    reviewCount: 88,
    stock: 40,
    specifications: {
      capacity: '24 Liters',
      material: 'Cordura 1000D Ballistic Nylon',
      weight: '950g'
    },
    tags: ['backpack', 'lifestyle', 'travel', 'ballistic'],
    isActive: true
  },
  {
    id: 'studio-pro-stream-mic',
    name: 'STUDIO PRO BROADCAST MICROPHONE',
    slug: 'studio-pro-stream-mic',
    description: 'Dynamic broadcast cardioid XLR/USB-C microphone with internal shock isolation and built-in hardware DSP compressor.',
    category: 'Audio',
    brand: 'VocalTech',
    price: 14999,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=85'
    ],
    rating: 4.8,
    reviewCount: 95,
    stock: 22,
    specifications: {
      polarPattern: 'Cardioid',
      sampleRate: '24-bit / 96kHz',
      inputs: 'USB-C and XLR'
    },
    tags: ['audio', 'microphone', 'studio', 'streaming'],
    isActive: true
  },
  {
    id: 'aurora-oled-monitor-34',
    name: 'AURORA QD-OLED 34" CURVED MONITOR',
    slug: 'aurora-oled-monitor-34',
    description: 'Ultrawide 34-inch QD-OLED display, 0.03ms response time, 175Hz refresh rate, 99.3% DCI-P3 color gamut, and custom graphene heatsink.',
    category: 'Accessories',
    brand: 'Aurora',
    price: 68999,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=85'
    ],
    rating: 4.9,
    reviewCount: 78,
    stock: 12,
    specifications: {
      panel: 'Quantum Dot OLED 3440 x 1440',
      refreshRate: '175Hz',
      curvature: '1800R'
    },
    tags: ['monitor', 'qd-oled', 'ultrawide', 'curved'],
    isActive: true
  },
  {
    id: 'phantom-wireless-mouse',
    name: 'PHANTOM ULTRA-LIGHT WIRELESS MOUSE',
    slug: 'phantom-wireless-mouse',
    description: '49g carbon-composite ergonomic wireless mouse featuring PAW3395 26,000 DPI sensor and 4000Hz polling rate dongle.',
    category: 'Accessories',
    brand: 'Phantom',
    price: 4999,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1200&q=85'
    ],
    rating: 4.7,
    reviewCount: 164,
    stock: 75,
    specifications: {
      weight: '49g',
      sensor: 'PAW3395 26K DPI',
      batteryLife: '80 Hours'
    },
    tags: ['mouse', 'wireless', 'ultralight', 'gaming'],
    isActive: true
  },
  {
    id: 'aegis-warp-dock-pro',
    name: 'AEGIS WARPDOCK THUNDERBOLT 4 HUB',
    slug: 'aegis-warp-dock-pro',
    description: '14-in-1 Thunderbolt 4 docking station supplying 100W PD charging, dual 4K 120Hz display outputs, 2.5GbE Ethernet, and SD 4.0 UHS-II card slot.',
    category: 'Accessories',
    brand: 'AEGIS Hardware',
    price: 18999,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=85'
    ],
    rating: 4.8,
    reviewCount: 52,
    stock: 30,
    specifications: {
      ports: 'Thunderbolt 4, 3x USB-A 10Gbps, HDMI 2.1, DP 1.4, 2.5GbE',
      powerDelivery: '100W Host Charge'
    },
    tags: ['thunderbolt', 'dock', 'workstation', 'accessories'],
    isActive: true
  },
  {
    id: 'quantum-noise-cancelling-buds',
    name: 'QUANTUM PRO WIRELESS ANC EARBUDS',
    slug: 'quantum-noise-cancelling-buds',
    description: 'True wireless spatial audio earbuds with 48dB active noise cancellation, LDAC high-res codec, and wireless charging case.',
    category: 'Audio',
    brand: 'Quantum',
    price: 7999,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=85'
    ],
    rating: 4.6,
    reviewCount: 230,
    stock: 80,
    specifications: {
      anc: '48dB Hybrid ANC',
      battery: '38 Hours total with case',
      codecs: 'LDAC, AAC, SBC'
    },
    tags: ['earbuds', 'anc', 'wireless', 'audio'],
    isActive: true
  },
  {
    id: 'zenith-fold-z7',
    name: 'ZENITH FOLD Z7 SMARTPHONE',
    slug: 'zenith-fold-z7',
    description: 'Ultra-thin folding glass display with zero-gap titanium hinge, multi-window productivity canvas, and Snapdragon 8 Gen 3 for Galaxy.',
    category: 'Smartphones',
    brand: 'Zenith',
    price: 114999,
    currency: 'INR',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02560?auto=format&fit=crop&w=1200&q=85'
    ],
    rating: 4.7,
    reviewCount: 45,
    stock: 10,
    specifications: {
      screen: '7.8" Foldable Dynamic AMOLED 2X 120Hz',
      ram: 16,
      storage: 512,
      hinge: 'Titanium Zero-Gap Hinge'
    },
    tags: ['foldable', 'flagship', 'smartphone'],
    isActive: true
  }
];

export async function seedDatabase(): Promise<void> {
  const existingCount = await ProductModel.countDocuments();
  if (existingCount > 0) {
    logger.info(`Catalog already seeded (${existingCount} products present). Skipping.`);
    return;
  }

  logger.info('🌱 Seeding initial AEGIS database...');

  // Seed Categories
  await CategoryModel.deleteMany({});
  await CategoryModel.insertMany(SEED_CATEGORIES);

  // Seed Products
  await ProductModel.deleteMany({});
  await ProductModel.insertMany(SEED_PRODUCTS);

  // Seed Admin & Demo Customer Users
  const adminPasswordHash = await hashPassword('AdminPass@123');
  const customerPasswordHash = await hashPassword('CustomerPass@123');

  await UserModel.deleteMany({ email: { $in: ['admin@aegis.commerce', 'customer@aegis.commerce'] } });
  await UserModel.insertMany([
    {
      id: 'usr_admin_001',
      name: 'AEGIS Security Lead',
      email: 'admin@aegis.commerce',
      passwordHash: adminPasswordHash,
      role: 'admin',
      failedLoginAttempts: 0
    },
    {
      id: 'usr_customer_001',
      name: 'Devin Vance',
      email: 'customer@aegis.commerce',
      passwordHash: customerPasswordHash,
      role: 'customer',
      failedLoginAttempts: 0
    }
  ]);

  logger.info(`✅ Successfully seeded ${SEED_PRODUCTS.length} products, ${SEED_CATEGORIES.length} categories, and admin/customer accounts.`);
}

// Standalone execution runner
if (process.argv[1]?.includes('seed.ts')) {
  try {
    initializeFirebaseAdmin();
    seedDatabase().then(() => {
      logger.info('Seed process completed successfully.');
      process.exit(0);
    });
  } catch (err) {
    logger.error('Seed process failed', err);
    process.exit(1);
  }
}
