export function buildIntentExtractionPrompt(userText: string): string {
  return `You are AEGIS IntentGuard, an autonomous natural language intent extraction system for a high-security e-commerce platform.

TASK:
Analyze the customer's input and extract an authoritative Intent Contract.

CUSTOMER INPUT:
"${userText}"

STRICT RULES:
1. Return ONLY a single raw JSON object. Do not wrap in markdown quotes if possible, or use standard json block.
2. Separate observed facts from inferences.
3. Budget currency must be 'INR' unless explicitly stated otherwise.
4. Extract numeric maximum budget if mentioned, or null if none.
5. Extract hard constraints (e.g. "RAM >= 32GB", "Storage >= 1TB", "RTX 40-series").
6. Extract preferences (e.g. "AI/ML workloads", "lightweight", "quiet fans").
7. Extract exclusions and priorities.
8. Assess initial risk level ('low', 'medium', 'high').

JSON SCHEMA:
{
  "goal": "Concise summary of user objective",
  "budget": {
    "max": number or 0 if unbounded,
    "currency": "INR"
  },
  "hardConstraints": ["string"],
  "preferences": ["string"],
  "exclusions": ["string"],
  "priorities": ["string"],
  "riskLevel": "low" | "medium" | "high"
}`;
}

export function buildIntentDriftExplanationPrompt(
  originalContract: any,
  driftMetrics: {
    originalBudget: number;
    currentTotal: number;
    exceededBy: number;
    driftScore: number;
    actions: any[];
  }
): string {
  return `You are AEGIS IntentGuard Drift Reasoner.
Explain why and how the customer's journey drifted from their original stated intent contract.

ORIGINAL INTENT:
${JSON.stringify(originalContract, null, 2)}

DETERMINISTIC DRIFT METRICS:
- Stated Maximum Budget: ₹${driftMetrics.originalBudget}
- Current Cart Total: ₹${driftMetrics.currentTotal}
- Exceeded By: ₹${driftMetrics.exceededBy}
- Calculated Drift Score: ${driftMetrics.driftScore}/100
- Event Sequence: ${JSON.stringify(driftMetrics.actions, null, 2)}

TASK:
Provide a clear, respectful, non-accusatory security explanation that informs the user about the financial and feature divergence.

JSON SCHEMA:
{
  "explanation": "Human-readable synthesis of how the customer drifted",
  "changedConstraints": ["string list of divergent constraints"],
  "advisoryRecommendation": "Guidance on whether to proceed or re-align with original budget"
}`;
}
