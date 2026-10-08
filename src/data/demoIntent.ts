import type { IntentItem } from '../types';

export const userIntentQuery = "I want a laptop under ₹80,000, minimum 32GB RAM, mainly for AI/ML.";

export const extractedConstraints = [
  { label: 'BUDGET', value: '≤ ₹80,000', status: 'VIOLATED' },
  { label: 'RAM', value: '≥ 32GB', status: 'VIOLATED' },
  { label: 'AI/ML PRIORITY', value: 'HIGH PRIORITY', status: 'MISMATCHED' },
];

export const currentBrowsedProduct = {
  title: 'Apex Titan RTX Hyper-15 (Gaming Edition)',
  price: 87990,
  formattedPrice: '₹87,990',
  ram: '16GB DDR5',
  category: 'Gaming Laptop',
  originalBudget: 80000,
};

export const intentConflicts = [
  'Budget exceeded by ₹7,990 (+10% margin)',
  'RAM requirement violated (16GB provided vs 32GB min intended)',
  'Preference mismatch (Thermal dissipation profile optimized for gaming graphics over sustained tensor training)',
];

export const driftTimelineData: IntentItem[] = [
  {
    id: 'dt-1',
    time: '10:01',
    action: 'Initial prompt defined',
    productTitle: 'Search: "Laptop under ₹70K, 32GB RAM"',
    price: 70000,
    currency: '₹',
    ram: '32GB',
    intentDriftScore: 100,
    status: 'aligned',
    reasoning: 'Goal accurately parsed and stored in active session intent buffer.',
  },
  {
    id: 'dt-2',
    time: '10:08',
    action: 'Filtered listing viewed',
    productTitle: 'ProBook Matrix 14',
    price: 72000,
    currency: '₹',
    ram: '32GB',
    intentDriftScore: 92,
    status: 'aligned',
    reasoning: 'Minor price deviation (+2.8%), core tensor workload requirement satisfied.',
  },
  {
    id: 'dt-3',
    time: '10:14',
    action: 'Related accessory bundle viewed',
    productTitle: 'VaporPulse Studio Ultra',
    price: 78000,
    currency: '₹',
    ram: '24GB',
    intentDriftScore: 78,
    status: 'warning',
    reasoning: 'RAM capacity reduced below intended 32GB threshold.',
  },
  {
    id: 'dt-4',
    time: '10:21',
    action: 'Item added to checkout cart',
    productTitle: 'Apex Titan RTX Hyper-15',
    price: 85000,
    currency: '₹',
    ram: '16GB',
    intentDriftScore: 54,
    status: 'warning',
    reasoning: 'Critical divergence: Price ceiling breached, half requested RAM.',
  },
  {
    id: 'dt-5',
    time: '10:27',
    action: 'Checkout initiated with accessories',
    productTitle: 'Apex Titan + RGB Cooler Bundle',
    price: 92000,
    currency: '₹',
    ram: '16GB',
    intentDriftScore: 31,
    status: 'drift_detected',
    reasoning: 'Your current decision has progressively diverged from the original budget constraint.',
  },
];
