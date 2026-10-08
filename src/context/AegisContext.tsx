import React, { createContext, useContext, useState, useCallback } from 'react';
import type { DefenseLayerType, DefenseStatus, SecurityScore, ThreatEvent, LiveStreamEvent } from '../types';
import { initialThreatTimeline } from '../data/demoThreats';
import { aegisAudio } from '../utils/audio';

interface AegisContextType {
  defenseStatus: DefenseStatus;
  securityScore: SecurityScore;
  activeLayer: DefenseLayerType | null;
  setActiveLayer: (layer: DefenseLayerType | null) => void;
  commandCenterOpen: boolean;
  setCommandCenterOpen: (open: boolean) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  liveEvents: LiveStreamEvent[];
  activeThreatEvents: ThreatEvent[];
  triggerDemoScenario: (scenario: 'intent_drift' | 'attack_chain' | 'client_tamper' | 'self_heal' | 'rollback') => void;
  resetDefenseState: () => void;
  activeScenarioName: string | null;
  isSimulating: boolean;
  // Browser tamper state
  clientRole: 'user' | 'admin';
  setClientRole: (role: 'user' | 'admin') => void;
  serverVerdict: 'VERIFIED' | 'TAMPER_REJECTED';
}

const defaultScores: SecurityScore = {
  overall: 96,
  intentSafety: 94,
  applicationSecurity: 98,
  clientIntegrity: 97,
  recoveryReadiness: 95,
};

const initialLiveEvents: LiveStreamEvent[] = [
  { id: '1', time: '23:14:02', type: 'CLIENT INTEGRITY', detail: 'Signature validation check passed (auth.ts)', severity: 'success' },
  { id: '2', time: '23:14:07', type: 'AUTHORIZATION PROBE', detail: 'Unauthenticated claim blocked on /v1/admin', severity: 'warning' },
  { id: '3', time: '23:14:12', type: 'INTENT MONITOR', detail: 'Hardware constraint within nominal boundary', severity: 'info' },
  { id: '4', time: '23:14:18', type: 'PATCH VERIFIED', detail: 'Zero-trust cryptographic wrapper verified', severity: 'success' },
  { id: '5', time: '23:14:22', type: 'SYSTEM HEALTH', detail: 'All 4 defense rings operational (100% SLO)', severity: 'success' },
];

const AegisContext = createContext<AegisContextType | undefined>(undefined);

export const AegisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [defenseStatus, setDefenseStatus] = useState<DefenseStatus>('protected');
  const [securityScore, setSecurityScore] = useState<SecurityScore>(defaultScores);
  const [activeLayer, setActiveLayer] = useState<DefenseLayerType | null>(null);
  const [commandCenterOpen, setCommandCenterOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [liveEvents, setLiveEvents] = useState<LiveStreamEvent[]>(initialLiveEvents);
  const [activeThreatEvents, setActiveThreatEvents] = useState<ThreatEvent[]>(initialThreatTimeline);
  const [activeScenarioName, setActiveScenarioName] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  
  // Client tamper state
  const [clientRole, setClientRoleState] = useState<'user' | 'admin'>('user');
  const [serverVerdict, setServerVerdict] = useState<'VERIFIED' | 'TAMPER_REJECTED'>('VERIFIED');

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    aegisAudio.enabled = next;
  };

  const setClientRole = (role: 'user' | 'admin') => {
    setClientRoleState(role);
    if (role === 'admin') {
      aegisAudio.playAlert();
      setServerVerdict('TAMPER_REJECTED');
      setDefenseStatus('tamper_alert');
      addLiveEvent('CLIENT TAMPERING', 'Detected forged admin role in DOM memory. Server-side rejected.', 'critical');
    } else {
      aegisAudio.playVerify();
      setServerVerdict('VERIFIED');
      setDefenseStatus('protected');
      addLiveEvent('CLIENT INTEGRITY', 'Client session normalized to authenticated standard role.', 'success');
    }
  };

  const addLiveEvent = useCallback((type: string, detail: string, severity: 'info' | 'warning' | 'critical' | 'success') => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    const newEvt: LiveStreamEvent = {
      id: Math.random().toString(36).substring(2, 9),
      time: timeStr,
      type,
      detail,
      severity,
    };
    setLiveEvents(prev => [newEvt, ...prev.slice(0, 14)]);
  }, []);

  const resetDefenseState = useCallback(() => {
    setDefenseStatus('protected');
    setSecurityScore(defaultScores);
    setActiveScenarioName(null);
    setIsSimulating(false);
    setClientRoleState('user');
    setServerVerdict('VERIFIED');
    aegisAudio.playVerify();
  }, []);

  const triggerDemoScenario = useCallback((scenario: 'intent_drift' | 'attack_chain' | 'client_tamper' | 'self_heal' | 'rollback') => {
    setIsSimulating(true);
    setActiveScenarioName(scenario);

    if (scenario === 'intent_drift') {
      aegisAudio.playAlert();
      setDefenseStatus('intent_mismatch');
      setSecurityScore(prev => ({ ...prev, overall: 81, intentSafety: 31 }));
      addLiveEvent('INTENT DRIFT', '69% deviation detected from user original hardware prompt.', 'warning');
      
      setTimeout(() => {
        addLiveEvent('INTENT INTERVENTION', 'Review modal triggered before checkout authorization.', 'info');
      }, 2500);

    } else if (scenario === 'attack_chain') {
      aegisAudio.playAlert();
      setDefenseStatus('threat_detected');
      setSecurityScore(prev => ({ ...prev, overall: 64, applicationSecurity: 42 }));
      addLiveEvent('ATTACK CHAIN', 'Multi-stage reconnaissance and privilege probing detected.', 'critical');
      
      setTimeout(() => {
        addLiveEvent('DEFENSE ENGAGED', 'Endpoint /api/v2/rbac/elevate blocked & IP blackholed.', 'critical');
      }, 2000);

      setTimeout(() => {
        aegisAudio.playVerify();
        setDefenseStatus('protected');
        setSecurityScore(prev => ({ ...prev, overall: 96, applicationSecurity: 98 }));
        addLiveEvent('THREAT MITIGATED', 'Autonomous zero-trust boundary intact. Threat resolved.', 'success');
        setIsSimulating(false);
      }, 6000);

    } else if (scenario === 'client_tamper') {
      aegisAudio.playAlert();
      setClientRoleState('admin');
      setServerVerdict('TAMPER_REJECTED');
      setDefenseStatus('tamper_alert');
      setSecurityScore(prev => ({ ...prev, overall: 78, clientIntegrity: 48 }));
      addLiveEvent('CLIENT TAMPERING', 'Client state mutation: role set to admin. Cryptographic check failed.', 'critical');

    } else if (scenario === 'self_heal') {
      aegisAudio.playCoreHum();
      setDefenseStatus('healing');
      setSecurityScore(prev => ({ ...prev, overall: 91, recoveryReadiness: 88 }));
      addLiveEvent('VULNERABILITY DETECTED', 'auth.ts authorization branch flaw discovered.', 'warning');

      setTimeout(() => {
        addLiveEvent('PATCH GENERATED', 'Zero-trust AST replacement synthesized.', 'info');
      }, 1500);

      setTimeout(() => {
        addLiveEvent('SANDBOX VERIFIED', 'Security & regression test suites passed (100%).', 'info');
      }, 3000);

      setTimeout(() => {
        aegisAudio.playVerify();
        setDefenseStatus('protected');
        setSecurityScore({
          overall: 99,
          intentSafety: 97,
          applicationSecurity: 99,
          clientIntegrity: 98,
          recoveryReadiness: 100,
        });
        addLiveEvent('HEALGUARD DEPLOYED', 'Canary patch deployed. System status healthy.', 'success');
        setIsSimulating(false);
      }, 5000);

    } else if (scenario === 'rollback') {
      aegisAudio.playAlert();
      setDefenseStatus('rollback');
      setSecurityScore(prev => ({ ...prev, overall: 72, recoveryReadiness: 65 }));
      addLiveEvent('REGRESSION DETECTED', 'Patch 2.4.2 error rate increased to 12.8%.', 'critical');

      setTimeout(() => {
        addLiveEvent('AUTONOMOUS ROLLBACK', 'Restoring known healthy state VERSION 2.4.1.', 'warning');
      }, 1800);

      setTimeout(() => {
        aegisAudio.playVerify();
        setDefenseStatus('protected');
        setSecurityScore(defaultScores);
        addLiveEvent('RECOVERED', 'Version 2.4.1 restored in 420ms. SLO restored.', 'success');
        setIsSimulating(false);
      }, 4500);
    }
  }, [addLiveEvent]);

  return (
    <AegisContext.Provider
      value={{
        defenseStatus,
        securityScore,
        activeLayer,
        setActiveLayer,
        commandCenterOpen,
        setCommandCenterOpen,
        soundEnabled,
        toggleSound,
        liveEvents,
        activeThreatEvents,
        triggerDemoScenario,
        resetDefenseState,
        activeScenarioName,
        isSimulating,
        clientRole,
        setClientRole,
        serverVerdict,
      }}
    >
      {children}
    </AegisContext.Provider>
  );
};

export const useAegis = () => {
  const context = useContext(AegisContext);
  if (!context) {
    throw new Error('useAegis must be used within an AegisProvider');
  }
  return context;
};
