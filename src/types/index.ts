export type DefenseLayerType = 'intent' | 'threat' | 'tamper' | 'heal';

export type DefenseStatus = 
  | 'protected' 
  | 'analyzing' 
  | 'threat_detected' 
  | 'tamper_alert' 
  | 'healing' 
  | 'rollback' 
  | 'intent_mismatch';

export interface SecurityScore {
  overall: number;
  intentSafety: number;
  applicationSecurity: number;
  clientIntegrity: number;
  recoveryReadiness: number;
}

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type EventStatus = 'LOGGED' | 'ANALYZING' | 'BLOCKED' | 'RESOLVED' | 'VERIFIED';

export interface ThreatEvent {
  id: string;
  timestamp: string;
  eventType: string;
  description: string;
  reasoning: string;
  risk: RiskLevel;
  status: EventStatus;
  endpoint?: string;
  ip?: string;
  stage?: 'RECONNAISSANCE' | 'AUTHENTICATION ATTEMPT' | 'PRIVILEGE PROBING' | 'UNAUTHORIZED ACCESS' | 'MITIGATED';
}

export interface IntentItem {
  id: string;
  time: string;
  action: string;
  productTitle: string;
  price: number;
  currency: string;
  ram: string;
  intentDriftScore: number;
  status: 'aligned' | 'warning' | 'drift_detected';
  reasoning?: string;
}

export interface CodeFileIntegrity {
  filename: string;
  hash: string;
  expectedHash: string;
  status: 'verified' | 'modified' | 'quarantined';
  lastChecked: string;
  securityImpact?: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH';
  diffPreview?: {
    removed: string[];
    added: string[];
  };
}

export interface HealPipelineStep {
  id: string;
  label: string;
  sublabel: string;
  status: 'idle' | 'active' | 'passed' | 'warning';
}

export interface LiveStreamEvent {
  id: string;
  time: string;
  type: string;
  detail: string;
  severity: 'info' | 'warning' | 'critical' | 'success';
}
