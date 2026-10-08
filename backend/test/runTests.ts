import { initializeFirebaseAdmin, realtimeDb } from '../src/config/firebase.js';
import { seedDatabase } from '../src/utils/seed.js';
import { ProductModel } from '../src/models/Product.js';
import { UserModel } from '../src/models/User.js';
import { hashPassword, comparePassword, generateAccessToken, verifyAccessToken } from '../src/utils/jwt.js';
import { cartService } from '../src/services/commerce/cartService.js';
import { transactionGuardService } from '../src/services/security/transactionGuardService.js';
import { tamperGuardService } from '../src/services/security/tamperGuardService.js';
import { intentService } from '../src/services/ai/intentService.js';
import { intentDriftEngine } from '../src/services/intent/intentDriftEngine.js';
import { threatService } from '../src/services/ai/threatService.js';
import { attackChainService } from '../src/services/security/attackChainService.js';
import { verificationService } from '../src/services/ai/verificationService.js';
import { rollbackService } from '../src/services/heal/rollbackService.js';

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

async function runTestSuite() {
  console.log('🧪 Starting AEGIS Backend Firebase Firestore & Realtime Database Verification Suite...\n');

  // 1. Firebase Initialization & Seed
  initializeFirebaseAdmin();
  await seedDatabase();

  console.log('--- TEST GROUP 1: AUTHENTICATION & ROLE TAMPERING ---');
  const user = await UserModel.findOne({ email: 'admin@aegis.commerce' });
  assert(Boolean(user && user.role === 'admin'), 'Admin user exists with server-authoritative role');
  
  const pwOk = await comparePassword('AdminPass@123', user?.passwordHash || '');
  assert(pwOk, 'Bcrypt password comparison succeeded');

  const token = generateAccessToken({ userId: user!.id, email: user!.email, role: user!.role });
  const decoded = verifyAccessToken(token);
  assert(decoded?.userId === user!.id && decoded.role === 'admin', 'JWT verification preserves claims securely');

  console.log('\n--- TEST GROUP 2: PRODUCT CATALOG & AUTHORITATIVE PRICING ---');
  const laptop = await ProductModel.findOne({ id: 'aegis-pro-x1' });
  assert(Boolean(laptop && laptop.price === 74999), 'Authoritative database price for AEGIS PRO X1 is ₹74,999');

  console.log('\n--- TEST GROUP 3: SERVER-SIDE CART & PRICE TAMPERING PREVENTION ---');
  const testUserId = 'test-cart-user-1';
  // Add item
  await cartService.addItem(testUserId, 'aegis-pro-x1', 1);
  const cart = await cartService.recalculateCart(testUserId);
  assert(cart.subtotal === 74999, 'Cart subtotal matches authoritative ₹74,999');
  assert(cart.tax === Math.round(74999 * 0.18), 'Cart tax accurately computed at 18% GST');
  assert(cart.total > 74999, 'Cart total calculated deterministically server-side');

  // Tamper test: Client claims price is ₹1
  console.log('\n--- TEST GROUP 4: DOM PRICE TAMPERING (₹74,999 -> ₹1) ---');
  const tamperResult = await tamperGuardService.processTamperEvent({
    type: 'DOM_PRICE_MANIPULATION',
    resource: 'product:aegis-pro-x1:price',
    expectedValue: 74999,
    observedValue: 1,
    userId: testUserId
  });
  assert(tamperResult.tampered === true, 'TamperGuard detected price mismatch');
  assert(tamperResult.transactionAllowed === false, 'Tampered transaction rejected');
  assert(tamperResult.authoritativeExpected === 74999, 'Server enforced ₹74,999 as authoritative truth');

  // Pre-flight TransactionGuard check
  const txCheck = await transactionGuardService.evaluateTransaction(testUserId, 1);
  assert(txCheck.allowed === false, 'TransactionGuard rejected order with manipulated claimed total of ₹1');
  const priceCheck = txCheck.checks.find(c => c.name.includes('Price Integrity'));
  assert(priceCheck?.status === 'failed', 'Price Integrity check flagged as failed');

  console.log('\n--- TEST GROUP 5: INTENTGUARD & INTENT MATCHING ---');
  const intentContract = await intentService.analyzeText('I need a laptop under ₹80,000 with at least 32GB RAM for AI and ML.');
  assert(intentContract.budget.max <= 80000, 'IntentGuard extracted maximum budget ≤ ₹80,000');
  assert(intentContract.hardConstraints.some(c => c.includes('32')), 'IntentGuard extracted 32GB RAM constraint');

  const match1 = intentService.matchProduct(intentContract, {
    id: 'aegis-pro-x1',
    name: 'AEGIS PRO X1',
    price: 74999,
    keySpecs: ['32GB DDR5 5600MHz RAM', 'RTX 4070'],
    specifications: { ram: 32 }
  });
  assert(match1.matchScore >= 85, `AEGIS PRO X1 scored ${match1.matchScore}% (Expected ≥ 85%)`);

  const match2 = intentService.matchProduct(intentContract, {
    id: 'budget-mismatch',
    name: 'Overpriced 16GB Laptop',
    price: 89999,
    keySpecs: ['16GB RAM'],
    specifications: { ram: 16 }
  });
  assert(match2.matchScore < 45, `Overpriced low-RAM product penalized to score ${match2.matchScore}%`);
  assert(match2.hardConstraintViolations.length >= 2, 'Hard constraint violations recorded for budget & RAM');

  console.log('\n--- TEST GROUP 6: INTENT DRIFT ENGINE ---');
  const drift = await intentDriftEngine.evaluateDrift(testUserId);
  assert(typeof drift.driftScore === 'number', 'Drift score calculated');
  assert(typeof drift.explanation === 'string' && drift.explanation.length > 10, 'Semantic explanation provided');

  console.log('\n--- TEST GROUP 7: THREATGUARD & ATTACK CHAIN CORRELATION ---');
  const threatAnalysis = await threatService.analyzeEvent({
    type: 'SUSPICIOUS_ENDPOINT_ACCESS',
    metadata: { path: '/api/admin/secrets' }
  });
  assert(threatAnalysis.threatScore > 50, 'ThreatGuard assigned elevated threat score');
  assert(['MEDIUM', 'HIGH', 'CRITICAL'].includes(threatAnalysis.riskLevel), 'ThreatGuard classified risk level');

  const chain = await attackChainService.detectAttackChains();
  assert(typeof chain.isAttackChain === 'boolean', 'Attack chain correlation executed');

  console.log('\n--- TEST GROUP 8: HEALGUARD & ROLLBACK ---');
  const verification = await verificationService.verifyPatch('PATCH-DEMO-1', `
    export function validateCartPrices(items: any[]) {
      const authoritativePrice = 74999;
      return items.map(i => ({ ...i, authoritativePrice }));
    }
  `);
  assert(verification.verified === true, 'Safe candidate patch passed sandboxed verification');
  assert(verification.unitTestsPassed === true, 'Unit test assertions passed');
  assert(verification.securityChecksPassed === true, 'Static security analysis passed');

  const rollback = await rollbackService.executeRollback('Test regression threshold exceeded');
  assert(rollback.restored === true, 'Rollback restored previous stable version');
  assert(rollback.previousVersion === '2.4.1', 'Restored version is 2.4.1');

  console.log('\n--- TEST GROUP 9: FIREBASE REALTIME DATABASE & FIRESTORE VERIFICATION ---');
  await realtimeDb.ref('aegis/testNode').set({
    ping: 'pong',
    timestamp: new Date().toISOString()
  });
  const rtdbSnap = await realtimeDb.ref('aegis/testNode').once('value');
  assert(rtdbSnap.val()?.ping === 'pong', 'Firebase Realtime Database read/write verified');

  const productCount = await ProductModel.countDocuments();
  assert(productCount >= 15, `Firestore 'products' collection contains ${productCount} items`);

  console.log(`\n========================================`);
  console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTestSuite().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
