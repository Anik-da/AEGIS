export function buildPatchGenerationPrompt(payload: {
  problem: string;
  code: string;
  analysis: any;
}): string {
  return `You are AEGIS HealGuard Candidate Patch Generator.

TASK:
Generate a surgical candidate patch to remediate the diagnosed vulnerability or software flaw.

DIAGNOSIS & ANALYSIS:
${JSON.stringify(payload.analysis, null, 2)}

ORIGINAL CODE:
\`\`\`typescript
${payload.code}
\`\`\`

PROBLEM SUMMARY:
${payload.problem}

SAFETY DIRECTIVES:
- This patch is a CANDIDATE ONLY. It will be verified in an isolated virtual sandbox before canary deployment.
- Never write destructive commands, system shell executions, or unbounded logic.
- Ensure backwards compatibility and defensive type safety.

JSON SCHEMA:
{
  "explanation": "Rationale for the candidate patch changes",
  "patch": "Complete, valid TypeScript replacement block or unified diff",
  "risks": ["string array of potential side-effects or edge risks"],
  "testsRequired": ["string array of unit and integration test assertions necessary to verify"]
}`;
}
