# 🛡️ AEGIS COMMERCE
### *The Autonomous Digital Guardian & Cyber Defense Engine for Next-Generation Commerce*

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8%20%7C%20ES2022-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore%20%2B%20Realtime%20DB-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![OpenRouter](https://img.shields.io/badge/AI%20Core-Google%20Gemma%204%2026B%20A4B-6366F1)](https://openrouter.ai/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Zero Trust](https://img.shields.io/badge/Security-Zero%20Trust%20Architecture-10B981)](#-zero-trust-security--governance)
[![Tests](https://img.shields.io/badge/Tests-29%2F29%20Passing%20(100%25)-brightgreen)](#-automated-verification--test-suite)

> **AEGIS COMMERCE** unites an ultra-premium, cinematic digital storefront with an autonomous, real-time AI cybersecurity defense matrix. Designed on the principle that modern cyber defense should be **an invisible, intelligent shield rather than an obstacle**, AEGIS observes user interactions, creates semantic intent contracts, intercepts client-side payload tampering, correlates distributed attack chains, and autonomously heals vulnerable application code inside isolated execution sandboxes.

---

## ⚡ MAJOR FUNCTIONS HIGHLIGHTED

AEGIS is driven by five core defense engines operating in concert with real-time cloud telemetry:

```
+---------------------------------------------------------------------------------------------------------+
|                                        AEGIS DEFENSE CORE                                               |
|                                                                                                         |
|  +--------------------+   +--------------------+   +--------------------+   +--------------------+     |
|  |    IntentGuard     |   |    ThreatGuard     |   |    TamperGuard     |   |     HealGuard      |     |
|  |  Semantic Intent   |   | Behavioral Anomaly |   |  Client & DOM State|   | Sandboxed Patching |     |
|  |   & Drift Engine   |   |   Attack Chains    |   | Integrity Monitor  |   | & Auto Rollback    |     |
|  +--------------------+   +--------------------+   +--------------------+   +--------------------+     |
|            ^                        ^                        ^                        ^                 |
|            |                        |                        |                        |                 |
|  +---------------------------------------------------------------------------------------------------+ |
|  |                                  TRANSACTIONGUARD (9-Point Gate)                                  | |
|  +---------------------------------------------------------------------------------------------------+ |
|                                                    ^                                                    |
|                                                    |                                                    |
|  +---------------------------------------------------------------------------------------------------+ |
|  |                 REAL-TIME TELEMETRY ENGINE (Firebase Firestore + Realtime Database)                | |
|  +---------------------------------------------------------------------------------------------------+ |
+---------------------------------------------------------------------------------------------------------+
```

### 1. 🎯 IntentGuard — Natural Language Intent Synthesis & Real-Time Drift Engine
* **Semantic Contract Generation**: When a customer articulates what they want (*"I need a high-performance laptop under ₹80,000 with at least 32GB RAM for AI research"*), IntentGuard utilizes **Gemma 4 26B** to compile the natural language prompt into an immutable, mathematically verifiable `IntentContract`.
* **Constraint Extraction**: Extracts structured boundaries:
  * Maximum budget ceilings and currency normalization (INR).
  * Hard technical constraints (`RAM >= 32GB`, specific GPU architectures, screen requirements).
  * Category and recipient boundaries.
* **Algorithmic Match Scoring**: Products in the catalog are scored against the contract (0–100%) with strict penalties applied if hard constraints are breached.
* **Real-Time Intent Drift Engine**: As the user browses, adds accessories, or modifies options, AEGIS calculates dynamic drift vectors. If session actions diverge from stated boundaries (e.g., adding an overpriced alternative and extended warranties totaling ₹92,998), IntentGuard:
  * Calculates financial drift delta (`exceededBy: ₹12,998`, `driftScore: 54`).
  * Triggers intelligent contextual alerts explaining the drift without interrupting legitimate high-value purchases.

### 2. 🛡️ ThreatGuard — Behavioral Threat Analysis & Attack Chain Correlation
* **Session Telemetry & Anomaly Analysis**: Evaluates mouse velocity, request entropy, IP geographic hops, device fingerprint fluctuations, and rapid-fire interactions to detect bots, credential stuffers, and automated scrapers.
* **Multi-Stage Attack Chain Correlation**: Discrete security anomalies (e.g., 12 consecutive failed logins $\rightarrow$ sudden successful credential match $\rightarrow$ immediate administrative route probing) are correlated using AI reasoning into structured attack chains.
* **Risk Categorization & MITRE/OWASP Mapping**: Threat events are categorized across `INFO`, `LOW`, `MEDIUM`, `HIGH`, and `CRITICAL` risk profiles and automatically correlated against OWASP API Top 10 vulnerabilities (e.g., Broken Object Level Authorization, Mass Assignment, Security Misconfiguration).
* **Live Threat Intelligence Feed**: Streams telemetry in real-time to the AEGIS Security HUD for rapid administrative intervention.

### 3. 🔒 TamperGuard — Client-Side DOM & Payload Integrity Monitor
* **Zero-Trust Client Principle**: The frontend browser environment is treated as inherently hostile. The client is strictly prohibited from declaring prices, discounts, GST rates, or user privilege roles.
* **DOM Mutation Interception**: If an attacker alters DOM attributes or manipulates a checkout payload via browser DevTools (e.g., attempting to purchase a ₹74,999 laptop for **₹1**):
  * TamperGuard instantly detects the discrepancy against authoritative database catalog truth.
  * Rejects the malicious payload with `serverDecision: "REJECT"`.
  * Restores authoritative state seamlessly.
  * Dispatches an alert to Firebase Realtime Database and Socket.IO listeners for forensic recording.

### 4. 🧬 HealGuard — Autonomous Sandboxed Code Repair & Self-Healing Pipeline
* **Autonomous Fault Localization**: In the event of an unhandled runtime exception, zero-day exploit pattern, or logic vulnerability, HealGuard isolates the offending stack frame and source code.
* **AI-Guided Patch Synthesis**: Leverages Gemma 4 26B to construct targeted, idiomatic TypeScript patches that resolve the root flaw without regressing surrounding features.
* **4-Stage Sandboxed Verification**:
  1. *AST Syntax Parsing*: Validates syntactic correctness of the candidate patch.
  2. *Static Security Scan*: Ensures the patch does not introduce injection vulnerabilities, unsafe deserialization, or prototype poisoning.
  3. *Unit Regression Execution*: Runs test assertions within an isolated sandbox.
  4. *Canary Stage Deployment*: Promotes verified patches to a staged release (e.g., `v2.4.2-canary`).
* **Automated Recovery Rollback Engine**: Monitors live telemetry following a canary release. If error rates exceed predefined thresholds (e.g., > 5%), HealGuard triggers an atomic, zero-downtime rollback to the previous stable release (`v2.4.1`) and logs an immutable audit trail.

### 5. 💳 TransactionGuard — 9-Point Pre-Flight Security Gatekeeper
Before any checkout transaction or inventory reservation is committed to the database, it must pass a rigorous 9-point security audit:
1. **User Identity & Session Integrity**: Verifies cryptographically signed JWT claims and checks for active account lockouts.
2. **Stock Concurrency Lock**: Validates real-time catalog stock reservations to prevent double-spending or race conditions.
3. **Price Integrity Check**: Reconciles item unit prices strictly against authoritative catalog records.
4. **Cart Boundary Validation**: Enforces quantity limits (1–10 items per SKU) and structural validity.
5. **Non-Zero Financial Math**: Rejects invalid, negative, or zero totals.
6. **Intent Alignment Evaluation**: Checks whether the final order severely violates any hard constraints in the active Intent Contract.
7. **Session Velocity & Anomaly Risk**: Assesses recent velocity spikes or IP/Geo anomalies.
8. **Client Tamper History**: Checks for recent DOM manipulation or rejected client payloads in the user's active session.
9. **Deterministic Financial Calculation**: Computes 18% GST and standardized shipping deterministically on the server.

### 6. 📡 Real-Time Telemetry & Firebase Event Engine
* **Bi-Directional Event Mirroring**: Integrated natively with **Firebase Firestore** (persistent structured storage) and **Firebase Realtime Database** (sub-millisecond streaming).
* **Live Security HUD Synchronization**: WebSocket (Socket.IO) and Realtime DB nodes immediately notify connected administrative consoles when threat levels change, patches are staged, or tampering attempts are intercepted.
* **Forensic Audit Logging**: Every administrative action, threat decision, patch generation, and transaction evaluation is preserved in tamper-evident Firestore audit logs.

---

## 🏛️ SYSTEM ARCHITECTURE

```
                                  [ Cinematic E-Commerce Storefront ]
                                     (React 19 / TypeScript / Vite)
                                                   |
                     +-----------------------------+-----------------------------+
                     | HTTP REST (JSON)                                          | WebSockets (Socket.IO)
                     v                                                           v
+-------------------------------------------------------------------------------------------------------+
|                                     AEGIS COMMERCE BACKEND ENGINE                                     |
|                                                                                                       |
|  [ API Gateway & Security Perimeter ]                                                                 |
|  * Helmet Security Headers & Strict CORS                                                              |
|  * Multi-Tier Rate Limiting (Auth: 20/15m, AI: 30/m, Checkout: 15/5m)                                  |
|  * Structured Audit Logging & Centralized Error Sanitization                                          |
|                                                                                                       |
|  [ Commerce Subsystem ]                      [ AEGIS Autonomous Defense Core ]                         |
|  * Authoritative Product Catalog (INR)       * IntentGuard (NLP Extraction, Drift Engine)             |
|  * Server-Calculated Cart (GST / Shipping)   * ThreatGuard (Anomaly Analysis, Attack Chains)           |
|  * TransactionGuard 9-Point Preflight        * TamperGuard (Client Manipulation Suppressor)           |
|  * Secure Order State Machine                * HealGuard (AI Diagnostics, Sandbox, Rollback)          |
|  * JWT Auth with Account Lockout             * Dynamic Security Score & Real-Time Event Bus           |
|                                                                                                       |
|  [ AI Dual-Engine Routing Layer ]                                                                     |
|         |                                                                                             |
|         +---> Primary Engine: OpenRouter (google/gemma-4-26b-a4b-it) [Deep Semantic Reasoning]       |
|         |                                                                                             |
|         +---> Secondary Engine: Hugging Face (google/gemma-4-26B-A4B) [Google Model Only]             |
|         |                                                                                             |
|         +---> Tertiary Engine: Deterministic Safety Engine [100% Availability Offline Rulebook]       |
+-------------------------------------------------------------------------------------------------------+
                                 |                               |
                                 v                               v
                     [ Firebase Firestore ]          [ Firebase Realtime Database ]
                     * Users, Products, Carts,       * Sub-millisecond Telemetry
                       Orders, Sessions, AuditLogs   * Live Threat & Tamper Streams
                     * Security & Intent Contracts   * Real-time HUD State Mirroring
```

---

## 🤖 DUAL-AI ROUTING LAYER (GOOGLE AI EXCLUSIVE)

AEGIS leverages a resilient multi-tier AI pipeline strictly restricted to **Google AI Models**:

| Tier | Provider | Model | Primary Role |
| :--- | :--- | :--- | :--- |
| **Primary** | OpenRouter | `google/gemma-4-26b-a4b-it` | Intent contract compilation, multi-event attack chain correlation, code vulnerability diagnosis, and candidate patch synthesis |
| **Secondary** | Hugging Face | `google/gemma-4-26B-A4B` | Secondary Google Gemma inference stream and policy-restricted fallback (Google-only models permitted) |
| **Tertiary** | Built-in | Deterministic Rule Engine | Zero-dependency safety heuristics ensuring uninterrupted operation even in total upstream API outages |

---

## 🎮 INTERACTIVE THREAT SIMULATOR & DEMO SUITE

AEGIS includes 5 turnkey demonstration endpoints and corresponding frontend controls designed for live presentations:

### Scenario 1: Intent Drift Detection
```bash
curl -X POST http://localhost:5000/api/demo/intent-drift
```
* **Customer Intent**: Stated budget of ₹80,000 for an AI/ML laptop.
* **Observed Actions**: Customer inspects laptops, adds an ₹84,999 unit, and adds a ₹7,999 warranty (Total: ₹92,998).
* **AEGIS Action**: Calculates a financial drift score of `54`, flags the budget breach (+₹12,998), and outputs an AI summary explaining the divergence.

### Scenario 2: Client-Side DOM Price Manipulation
```bash
curl -X POST http://localhost:5000/api/demo/tamper
```
* **Attack Scenario**: An attacker uses browser DevTools to change the unit price from ₹74,999 to ₹1 before checkout.
* **AEGIS Action**: The backend identifies the discrepancy against authoritative database truth, sets `serverDecision: "REJECT"`, records a tamper event in Firebase, and broadcasts an alert to the HUD.

### Scenario 3: Correlated Attack Chain Detection
```bash
curl -X POST http://localhost:5000/api/demo/attack-chain
```
* **Attack Scenario**: 12 failed logins within 60 seconds followed by a successful login and an attempt to access `/api/admin/users`.
* **AEGIS Action**: ThreatGuard correlates these individual events into a unified high-confidence attack chain (`riskLevel: "CRITICAL"`, `confidence: 95`) using Gemma 4 26B.

### Scenario 4: Autonomous Self-Healing (HealGuard)
```bash
curl -X POST http://localhost:5000/api/demo/heal
```
* **Trigger**: A logic vulnerability is detected in `demoCheckoutValidator.ts`.
* **AEGIS Action**: Gemma 4 diagnoses the vulnerability, synthesizes a candidate patch, executes sandbox AST and security tests, and stages the patch as `v2.4.2-canary`.

### Scenario 5: Automated Canary Rollback
```bash
curl -X POST http://localhost:5000/api/demo/rollback
```
* **Trigger**: Simulated error telemetry on the canary release exceeds 5%.
* **AEGIS Action**: Rollback engine restores the previous stable build (`v2.4.1`) instantly, logs a forensic audit record, and updates connected dashboards via WebSocket.

---

## 📚 COMPLETE API SPECIFICATION

Base URL: `http://localhost:5000/api`  
WebSocket Endpoint: `ws://localhost:5000/socket.io`  
Health Endpoint: `http://localhost:5000/health`

### 🔑 Authentication (`/api/auth`)
* `POST /api/auth/register` — Create a new customer account.
* `POST /api/auth/login` — Authenticate user, receive JWT access (15m) & refresh (7d) tokens. Features 5-attempt brute-force lockout.
* `POST /api/auth/refresh` — Refresh access token securely.
* `POST /api/auth/logout` — Revoke active session tokens.
* `GET /api/auth/me` — Return current authenticated user profile.

### 🛍️ Product Catalog & Cart (`/api/products`, `/api/categories`, `/api/cart`)
* `GET /api/products` — Retrieve products with category, brand, price filters, and pagination.
* `GET /api/products/:id` — Authoritative product detail by ID.
* `GET /api/products/search?q=laptop` — Full-text search across catalog.
* `GET /api/categories` — List all active categories.
* `GET /api/cart` — Retrieve user's server-recalculated cart.
* `POST /api/cart/items` — Add product to cart with server-side pricing.
* `PATCH /api/cart/items/:productId` — Update item quantity (1–10 bounds).
* `DELETE /api/cart/items/:productId` — Remove item from cart.
* `POST /api/cart/recalculate` — Force full recalculation from database truth.

### 💳 Checkout & Orders (`/api/checkout`, `/api/orders`)
* `POST /api/checkout/validate` — Execute 9-point TransactionGuard pre-flight security evaluation.
* `POST /api/orders` — Place order with authoritative calculations and stock decrementing.
* `GET /api/orders` — View user's order history.
* `GET /api/orders/:id` — View specific order details.

### 🧠 IntentGuard (`/api/intent`)
* `POST /api/intent/analyze` — Parse natural language into structured `IntentContract`.
* `POST /api/intent/match` — Evaluate product fit against active intent contract (0–100%).
* `POST /api/intent/events` — Log shopping journey actions.
* `GET /api/intent/drift` — Retrieve intent drift metrics and AI analysis.
* `GET /api/intent/timeline` — Chronological timeline of customer intent events.

### 🛡️ ThreatGuard & Security (`/api/security`)
* `POST /api/security/analyze-event` — Analyze suspicious event with session context.
* `GET /api/security/events` — Query unified security event log.
* `GET /api/security/threats` — List active and mitigated threats.
* `GET /api/security/attack-chains` — Retrieve correlated multi-stage attack chains.
* `POST /api/security/tamper-event` — Log and intercept client-side manipulation.
* `GET /api/security/tamper-events` — View history of intercepted tamper events.
* `POST /api/security/transaction-check` — Evaluate transaction risk score.

### 🧬 HealGuard (`/api/heal`)
* `POST /api/heal/analyze` — AI fault diagnosis for code vulnerabilities.
* `POST /api/heal/generate-patch` — Synthesize candidate TypeScript patch.
* `POST /api/heal/verify-patch` — Execute sandboxed AST and test verification.
* `POST /api/heal/rollback` — Trigger automated rollback to previous stable release.
* `GET /api/heal/versions` — View release version history and active status.

### 📊 AEGIS Control Center & Health (`/api/aegis`, `/health`)
* `GET /api/aegis/overview` — High-level metrics for administrative HUD.
* `GET /api/aegis/security-score` — Compute real-time 0–100 dynamic protection score.
* `GET /health` — System status, uptime, and database connectivity.

---

## 🗄️ DATABASE COLLECTIONS & SCHEMA

AEGIS uses **Google Cloud Firebase Firestore** for persistent records and **Firebase Realtime Database** for sub-millisecond telemetry.

### Firestore Collections:
| Collection | Description | Key Fields |
| :--- | :--- | :--- |
| `users` | Authenticated users & credentials | `email`, `passwordHash`, `role`, `failedLogins`, `lockedUntil` |
| `products` | Authoritative product catalog | `name`, `price`, `stock`, `category`, `specifications`, `tags` |
| `categories` | Product classification taxonomy | `name`, `slug`, `description` |
| `carts` | User shopping carts | `userId`, `items`, `subtotal`, `tax`, `total`, `updatedAt` |
| `orders` | Completed transactions | `userId`, `items`, `totalAmount`, `status`, `preflightAudit` |
| `sessions` | Active user browsing sessions | `token`, `ipAddress`, `userAgent`, `riskScore`, `lastActive` |
| `intentContracts` | Immutable user intent contracts | `userId`, `budget`, `hardConstraints`, `preferences`, `status` |
| `intentEvents` | Shopping journey actions | `userId`, `action`, `productId`, `driftScore`, `timestamp` |
| `securityEvents` | Unified security telemetry | `type`, `severity`, `sourceIp`, `details`, `timestamp` |
| `threatEvents` | Correlated threat incidents | `threatType`, `confidence`, `riskLevel`, `attackChainId` |
| `tamperEvents` | Intercepted client manipulations | `field`, `expectedValue`, `observedValue`, `decision` |
| `repairEvents` | Self-healing patches & rollbacks | `faultId`, `patchDiff`, `verificationStatus`, `version` |
| `auditLogs` | Tamper-evident admin records | `actor`, `action`, `target`, `ipAddress`, `timestamp` |

---

## 🛠️ TECH STACK

### Frontend:
* **Framework**: React 19, TypeScript
* **Build System**: Vite 8.3
* **Styling**: Tailwind CSS, Custom Glassmorphism, Cinematic Dark-Mode Theme
* **Animation & Visuals**: HTML5 Canvas, Parallax scrolling, Three.js-inspired shader layers
* **Icons**: Lucide React
* **Real-time Client**: Socket.IO Client, Firebase Client SDK

### Backend:
* **Runtime**: Node.js, Express.js, TypeScript (ES2022)
* **Databases**: Firebase Cloud Firestore & Firebase Realtime Database
* **Real-time Transport**: Socket.IO
* **AI Orchestration**: OpenRouter SDK (`google/gemma-4-26b-a4b`), Hugging Face API (`google/gemma-4-26B-A4B`)
* **Security & Auth**: Helmet, CORS, Express-Rate-Limit, Bcrypt, JsonWebToken
* **Validation**: Zod schema validation

---

## 🚀 GETTING STARTED

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher
* **Git**: Installed and configured

### 1. Clone the Repository
```bash
git clone https://github.com/Anik-da/AEGIS.git
cd AEGIS
```

### 2. Configure Environment Variables

#### Backend Configuration (`backend/.env`)
Copy `backend/.env.example` to `backend/.env` and insert your credentials:
```bash
cp backend/.env.example backend/.env
```
Fill in the parameters:
```env
PORT=5000
NODE_ENV=development
DEMO_MODE=true
FRONTEND_URL=http://localhost:5173

# Firebase Configuration
FIREBASE_PROJECT_ID=aegis-commerce
FIREBASE_DATABASE_URL=https://aegis-commerce-default-rtdb.firebaseio.com
FIREBASE_STORAGE_BUCKET=aegis-commerce.firebasestorage.app
FIREBASE_SERVICE_ACCOUNT_KEY=

# Cryptographic Secrets
JWT_ACCESS_SECRET=your_jwt_access_secret_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_here

# AI Engine Keys
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_MODEL=google/gemma-4-26b-a4b

HUGGINGFACE_API_KEY=your_huggingface_api_key_here
HUGGINGFACE_MODEL=google/gemma-4-26B-A4B
```

> ⚠️ **CRITICAL SECURITY NOTE**: Never commit `.env` files containing real API keys or cryptographic secrets to GitHub. Both root `.env` and `backend/.env` are strictly excluded in `.gitignore`.

#### Frontend Configuration (`.env`)
Copy `.env.example` to `.env` in the root directory:
```bash
cp .env.example .env
```
Fill in your Firebase client config:
```env
VITE_FIREBASE_API_KEY=your_firebase_web_api_key
VITE_FIREBASE_AUTH_DOMAIN=aegis-commerce.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=aegis-commerce
VITE_FIREBASE_STORAGE_BUCKET=aegis-commerce.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=787778804118
VITE_FIREBASE_APP_ID=1:787778804118:web:840ed30ed5b739192e65b7
VITE_FIREBASE_MEASUREMENT_ID=G-2Z04CHVL7D
VITE_API_URL=http://localhost:5000/api
```

### 3. Install Dependencies
```bash
# Install frontend dependencies (root)
npm install

# Install backend dependencies
cd backend && npm install
cd ..
```

### 4. Seed the Database
Populate Firebase Firestore with the initial product catalog (15 luxury items priced in INR), categories, and default test accounts:
```bash
npm run backend:seed
```

**Default Seed Accounts:**
* **Administrator**: `admin@aegis.commerce` / `AdminPass@123`
* **Customer**: `customer@aegis.commerce` / `CustomerPass@123`

### 5. Launch the Application

#### Option A: Run Both Simultaneously (Recommended)
From the root workspace directory:
```bash
# Terminal 1: Launch Backend Engine
npm run backend:dev

# Terminal 2: Launch Frontend Storefront
npm run dev
```

* **Frontend Storefront**: `http://localhost:5173`
* **Backend API Gateway**: `http://localhost:5000/api`
* **Health Check**: `http://localhost:5000/health`
* **WebSocket Server**: `ws://localhost:5000/socket.io`

---

## 🧪 AUTOMATED VERIFICATION & TEST SUITE

The backend includes a comprehensive, automated test suite that validates every layer of the architecture.

To run the verification suite:
```bash
npm run backend:test
```

### Test Results Breakdown: **29 Passed, 0 Failed (100% Pass Rate)**
```
================================================================================
TEST RESULTS: 29 PASSED, 0 FAILED
================================================================================
--- TEST GROUP 1: AUTHENTICATION & ROLE TAMPERING ---
  ✅ Admin user exists with server-authoritative role
  ✅ Bcrypt password comparison succeeded
  ✅ JWT verification preserves claims securely

--- TEST GROUP 2: PRODUCT CATALOG & AUTHORITATIVE PRICING ---
  ✅ Authoritative database price for AEGIS PRO X1 is ₹74,999

--- TEST GROUP 3: SERVER-SIDE CART & PRICE TAMPERING PREVENTION ---
  ✅ Cart subtotal matches authoritative ₹74,999
  ✅ Cart tax accurately computed at 18% GST
  ✅ Cart total calculated deterministically server-side

--- TEST GROUP 4: DOM PRICE TAMPERING (₹74,999 -> ₹1) ---
  ✅ TamperGuard detected price mismatch
  ✅ Tampered transaction rejected
  ✅ Server enforced ₹74,999 as authoritative truth
  ✅ TransactionGuard rejected order with manipulated claimed total of ₹1
  ✅ Price Integrity check flagged as failed

--- TEST GROUP 5: INTENTGUARD & INTENT MATCHING ---
  ✅ IntentGuard extracted maximum budget <= ₹80,000
  ✅ IntentGuard extracted 32GB RAM constraint
  ✅ AEGIS PRO X1 scored 100% (Expected >= 85%)
  ✅ Overpriced low-RAM product penalized to score 43%
  ✅ Hard constraint violations recorded for budget & RAM

--- TEST GROUP 6: INTENT DRIFT ENGINE ---
  ✅ Drift score calculated
  ✅ Semantic explanation provided

--- TEST GROUP 7: THREATGUARD & ATTACK CHAIN CORRELATION ---
  ✅ ThreatGuard assigned elevated threat score
  ✅ ThreatGuard classified risk level
  ✅ Attack chain correlation executed

--- TEST GROUP 8: HEALGUARD & ROLLBACK ---
  ✅ Safe candidate patch passed sandboxed verification
  ✅ Unit test assertions passed
  ✅ Static security analysis passed
  ✅ Rollback restored previous stable version
  ✅ Restored version is 2.4.1

--- TEST GROUP 9: FIREBASE REALTIME DATABASE & FIRESTORE VERIFICATION ---
  ✅ Firebase Realtime Database read/write verified
  ✅ Firestore 'products' collection contains 15 items
```

---

## 🛡️ ZERO-TRUST SECURITY & GOVERNANCE

AEGIS enforces a Zero-Trust security model across the entire pipeline:

1. **Server Authority**: Every financial figure, stock level, tax calculation, and authorization role is computed on the server.
2. **Deterministic Arithmetic**: LLMs are strictly prohibited from performing financial arithmetic. Mathematical calculations are 100% deterministic code.
3. **AI Output Sanitization**: All AI inferences pass through strict Zod schemas before being accepted into the application state.
4. **Sandboxed Code Execution**: Synthesized candidate patches must pass AST parsing, security scans, and isolated unit test execution before canary promotion.
5. **Rate Limiting & Threat Shielding**: Protects sensitive endpoints against credential brute-forcing, scraping, and denial-of-service attempts.
6. **Zero Secrets in Repository**: No API keys, tokens, or credentials are committed to version control.

---

## 📄 LICENSE

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <b>AEGIS COMMERCE</b> — <i>Autonomous Intelligence. Uncompromising Defense. Luxury Experience.</i>
</div>
