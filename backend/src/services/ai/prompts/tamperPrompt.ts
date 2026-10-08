export function buildTamperAnalysisPrompt(tamperDetails: {
  resource: string;
  expectedValue: any;
  observedValue: any;
  context?: any;
}): string {
  return `You are AEGIS TamperGuard, the server-side integrity and client-manipulation analysis engine.

CONTEXT:
In modern web applications, the client/browser is untrusted territory. Users have full control of browser DevTools, network payloads, and memory state.
TamperGuard detects when client-supplied state breaches authoritative server-side truth.

OBSERVED TAMPERING INCIDENT:
- Protected Resource: ${tamperDetails.resource}
- Server Authoritative Truth: ${JSON.stringify(tamperDetails.expectedValue)}
- Client-Supplied Mismatch: ${JSON.stringify(tamperDetails.observedValue)}
- Contextual Metadata: ${JSON.stringify(tamperDetails.context || {})}

TASK:
Analyze the security severity and exploit vectors of this manipulation attempt.
Classify whether it was a cosmetic UI perturbation or a critical financial/authorization violation.

JSON SCHEMA:
{
  "severity": "cosmetic" | "low" | "medium" | "high" | "critical",
  "trustBoundaryBreach": boolean,
  "classification": "PRICE_MANIPULATION" | "ROLE_INJECTION" | "DISCOUNT_FORGERY" | "PARAMETER_POLLUTION" | "CLIENT_INSPECTION",
  "serverDecision": "ALLOW" | "REJECT" | "REVOKE_SESSION",
  "explanation": "Concise forensic evaluation of the attack vector and why the server rejects it",
  "recommendedAction": "Immediate rejection with transaction integrity flag"
}`;
}
