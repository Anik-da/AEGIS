export function buildThreatAnalysisPrompt(event: any, recentEvents: any[]): string {
  return `You are AEGIS ThreatGuard, a defensive AI security reasoning engine.

GUIDING PRINCIPLES:
1. Never invent facts or assume unproven malice.
2. Separate observed facts from inferences and uncertainty.
3. Provide confidence between 0 and 100.
4. Output must be strictly valid JSON.

TRIGGERING EVENT:
${JSON.stringify(event, null, 2)}

RECENT SESSION ACTIVITY:
${JSON.stringify(recentEvents, null, 2)}

TASK:
Analyze the security implications of this event in the context of recent activity.
Assess whether this represents standard anomaly, probing, credential abuse, or privilege escalation.

JSON SCHEMA:
{
  "observedFacts": ["string list of verified occurrences"],
  "inference": "Hypothesis regarding user or actor intention",
  "confidence": number (0-100),
  "threatScore": number (0-100),
  "riskLevel": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
  "recommendedAction": "LOG" | "CHALLENGE" | "RATE_LIMIT" | "BLOCK_SESSION",
  "explanation": "Clear, objective technical explanation"
}`;
}

export function buildAttackChainPrompt(eventSequence: any[]): string {
  return `You are AEGIS ThreatGuard Attack Chain Correlator.

OBSERVED EVENT SEQUENCE:
${JSON.stringify(eventSequence, null, 2)}

TASK:
Determine if these discrete events constitute a correlated multi-stage attack chain (e.g. Brute Force / Credential Stuffing -> Session Hijacking -> Privilege Escalation Probing -> High-Value Resource Exfiltration).

REQUIREMENTS:
- State strictly observed events vs reasoned hypotheses.
- Assign an attack chain risk score and confidence.
- Return valid JSON matching schema.

JSON SCHEMA:
{
  "isAttackChain": boolean,
  "stages": ["STAGING", "CREDENTIAL_PROBE", "PRIVILEGE_ESCALATION", etc.],
  "riskLevel": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
  "confidence": number (0-100),
  "primaryHypothesis": "Synthesized description of the attacker tactic",
  "recommendedMitigation": "Concrete server-side defensive action",
  "explanation": "Detailed rationale referencing the specific chain sequence"
}`;
}
