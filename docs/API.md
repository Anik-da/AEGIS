# AEGIS COMMERCE — Complete API Documentation

Base URL: `http://localhost:5000/api`  
WebSocket Endpoint: `ws://localhost:5000/socket.io`  
Health Endpoint: `http://localhost:5000/health`

---

## 1. Authentication (`/api/auth`)

### `POST /api/auth/register`
Creates a customer account.
- **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "StrongPassword123"
  }
  ```
- **Response** (`201 Created`):
  ```json
  {
    "success": true,
    "data": {
      "user": { "id": "usr_...", "name": "Jane Doe", "email": "jane@example.com", "role": "customer" },
      "tokens": { "accessToken": "...", "refreshToken": "..." }
    }
  }
  ```

### `POST /api/auth/login`
Authenticates user, issues JWT access (15m) and refresh (7d) tokens. Includes automatic account lockout after 5 failed attempts.
- **Request Body**:
  ```json
  {
    "email": "customer@aegis.commerce",
    "password": "CustomerPass@123"
  }
  ```

### `POST /api/auth/refresh`
Refreshes access token via cryptographically signed refresh token.
- **Request Body**: `{ "refreshToken": "..." }`

### `POST /api/auth/logout`
Revokes active session tokens.

### `GET /api/auth/me`
Returns current authenticated user details verified server-side.

---

## 2. Product Catalog (`/api/products` & `/api/categories`)

### `GET /api/products`
Retrieves products with support for filters, category, search, sorting, and pagination.
- **Query Params**: `category`, `brand`, `minPrice`, `maxPrice`, `inStock`, `search`, `sortBy` (`price_asc` | `price_desc` | `rating`), `page`, `limit`.

### `GET /api/products/:id`
Retrieves single authoritative product by ID.

### `GET /api/products/search?q=laptop`
Search products across titles, descriptions, and tags.

### `GET /api/categories`
Retrieves list of active categories.

### `GET /api/products/:id/recommendations`
AI-assisted and category-matched related product recommendations.

---

## 3. Cart Management (`/api/cart`)
*Server-Side Recalculated: The server alone calculates prices, quantities, taxes, and totals. Client price claims are completely ignored.*

### `GET /api/cart`
Retrieves the user's cart recalculated using current database prices.

### `POST /api/cart/items`
Adds an item to cart.
- **Request Body**: `{ "productId": "aegis-pro-x1", "quantity": 1 }`

### `PATCH /api/cart/items/:productId`
Updates quantity with bounds validation (1 to 10).

### `DELETE /api/cart/items/:productId`
Removes product from cart.

### `POST /api/cart/recalculate`
Forces full recalculation of cart totals from catalog truth.

---

## 4. Checkout & Orders (`/api/checkout` & `/api/orders`)

### `POST /api/checkout/validate`
Executes pre-flight 9-point security inspection:
1. Authenticated user validation
2. Product inventory & stock reservation
3. Price Integrity (Server Authority vs Client Claim)
4. Cart structure & bounds
5. Baseline non-zero pricing
6. Intent contract alignment
7. Session risk telemetry
8. Client tamper history
9. Total consistency

### `POST /api/orders`
Places order after running AEGIS TransactionGuard. Automatically decrements inventory and writes tamper-evident audit log.

### `GET /api/orders`
Retrieves user's order history.

### `GET /api/orders/:id`
Retrieves details for a specific order.

---

## 5. IntentGuard (`/api/intent`)

### `POST /api/intent/analyze`
Extracts structured Intent Contract from natural language using Gemma 4 26B via OpenRouter.
- **Request Body**:
  ```json
  { "text": "I need a laptop under ₹80,000 with at least 32GB RAM for AI and ML." }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "intentContract": {
        "goal": "High-performance AI/ML laptop under ₹80,000",
        "budget": { "max": 80000, "currency": "INR" },
        "hardConstraints": ["RAM >= 32GB"],
        "preferences": ["AI/ML performance"],
        "riskLevel": "low"
      }
    }
  }
  ```

### `POST /api/intent/match`
Evaluates a product against an Intent Contract, producing a match score (0-100), hard violations, and preference matches.

### `POST /api/intent/events`
Records user journey actions (viewed product, added cart, upgraded warranty).

### `GET /api/intent/drift`
Calculates deterministic financial drift and uses Gemma 4 26B to explain why and how the customer diverged from their stated intent.

### `GET /api/intent/timeline`
Retrieves chronological timeline of user actions and intent events.

---

## 6. ThreatGuard (`/api/security`)

### `POST /api/security/analyze-event`
Defensively inspects a suspicious application event in the context of session telemetry.

### `GET /api/security/events`
Lists recent unified security events with filters.

### `GET /api/security/threats`
Lists active and mitigated threats.

### `GET /api/security/attack-chains`
Correlates discrete events into multi-stage attack chains using Gemma 4 26B reasoning.

### `POST /api/security/tamper-event`
Detects and records client-side tampering (e.g. price manipulation in DOM). Classifies severity and enforces server authority.

### `GET /api/security/tamper-events`
Lists all detected tampering events.

### `POST /api/security/transaction-check`
Runs full pre-flight security evaluation.

---

## 7. HealGuard (`/api/heal`)

### `POST /api/heal/analyze`
Analyzes code faults or vulnerability reports to identify root cause and severity using Gemma 4 26B.

### `POST /api/heal/generate-patch`
Synthesizes candidate TypeScript patch code.

### `POST /api/heal/verify-patch`
Runs candidate patch through sandbox AST verification, syntax checks, security scans, and regression test suites.

### `POST /api/heal/rollback`
Triggers automated recovery rollback if canary metrics detect regression.

### `GET /api/heal/versions`
Retrieves deployment version history and active release status.

---

## 8. AEGIS Control Center (`/api/aegis`)

### `GET /api/aegis/overview`
Provides unified dashboard metrics: dynamic security score, active threats, recent tamper records, and healing readiness.

### `GET /api/aegis/security-score`
Computes real-time 0-100 protection score derived dynamically from backend event history.

---

## 9. Hackathon Demo Endpoints (`/api/demo`)

- `POST /api/demo/intent-drift`: Simulates customer journey from ₹80,000 budget to ₹92,998 total.
- `POST /api/demo/tamper`: Simulates DOM price manipulation (₹74,999 -> ₹1) and verifies server rejection.
- `POST /api/demo/attack-chain`: Reconstructs multi-stage brute force and privilege probing chain.
- `POST /api/demo/heal`: Executes full AI-assisted root-cause diagnosis, patch generation, and sandboxed verification.
- `POST /api/demo/rollback`: Simulates canary regression and executes automated recovery rollback to 2.4.1.

---

## 10. WebSocket Real-Time Events (`/socket.io`)

The backend broadcasts the following events:
- `aegis:event`: Emitted for any unified security/system event.
- `aegis:threat`: Emitted when an attack chain or elevated threat is detected.
- `aegis:tamper`: Emitted when client-side state manipulation is detected and rejected.
- `aegis:intent`: Emitted on intent contract creation or drift detection.
- `aegis:repair`: Emitted when a candidate patch is verified and deployed.
- `aegis:rollback`: Emitted when an automated rollback occurs.
