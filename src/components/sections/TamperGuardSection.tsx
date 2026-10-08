import React from 'react';
import { SectionLabel } from '../ui/SectionLabel';
import { GlassPanel } from '../ui/GlassPanel';
import { CodeIntegrity } from './CodeIntegrity';
import { useAegis } from '../../context/AegisContext';
import { Shield, ShieldAlert, Terminal, Lock, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

export const TamperGuardSection: React.FC = () => {
  const { clientRole, setClientRole, serverVerdict } = useAegis();

  return (
    <section id="tamper" className="relative w-full py-32 px-6 md:px-12 bg-[#050607] border-t border-white/[0.06] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[500px] bg-radial from-[#D71920]/[0.05] via-transparent to-transparent pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <SectionLabel label="TAMPERGUARD" category="LAYER 03" />

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-[-0.03em] text-[#F4F4F1] leading-tight mb-6">
            THE BROWSER <br />
            IS NOT <br />
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#D71920]">
              THE TRUST BOUNDARY.
            </span>
          </h2>

          <div className="inline-block p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] max-w-2xl text-center">
            <p className="text-sm sm:text-base font-light text-[#F4F4F1] leading-relaxed">
              "AEGIS detects security-relevant client-side tampering and never trusts the browser alone for authorization."
            </p>
          </div>
        </div>

        {/* Interactive Dual-State Client Demonstration */}
        <div className="w-full mb-20">
          <GlassPanel className="p-0 overflow-hidden border-white/[0.1] shadow-2xl bg-black/70">
            {/* Top Bar with Tamper Toggle */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 bg-white/[0.02] border-b border-white/[0.08] gap-4">
              <div className="flex items-center gap-3">
                <Terminal className="w-4 h-4 text-[#D71920]" />
                <span className="text-xs font-mono font-medium tracking-[0.2em] uppercase text-white">
                  CLIENT STATE VS SERVER BOUNDARY INSPECTOR
                </span>
              </div>

              {/* State Switcher */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#8D9096] mr-2">SIMULATE CLIENT DEVTOOLS:</span>
                <button
                  onClick={() => setClientRole('user')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    clientRole === 'user'
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'text-[#8D9096] hover:text-white'
                  }`}
                >
                  NORMAL SESSION (role: user)
                </button>
                <button
                  onClick={() => setClientRole('admin')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    clientRole === 'admin'
                      ? 'bg-[#D71920] text-white shadow-[0_0_20px_rgba(215,25,32,0.4)]'
                      : 'text-[#8D9096] hover:text-[#D71920]'
                  }`}
                >
                  FORGE ROLE IN BROWSER (role: admin)
                </button>
              </div>
            </div>

            {/* Split Screen Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
              
              {/* Left Side: Client Environment */}
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.06]">
                    <span className="text-xs font-mono tracking-wider text-white/50 uppercase">
                      CLIENT ENVIRONMENT (UNTRUSTED DOM)
                    </span>
                    <span className="text-xs font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                      ADVERSARIAL SURFACE
                    </span>
                  </div>

                  <div className="space-y-4 font-mono text-xs">
                    <div className="p-4 rounded-xl bg-black/50 border border-white/[0.06]">
                      <div className="text-[10px] text-[#8D9096] uppercase mb-1">
                        BROWSER LOCAL STORAGE & MEMORY STATE
                      </div>
                      <pre className="text-white/90 overflow-x-auto text-[11px] leading-relaxed">
{`{
  "sessionId": "aegis_sess_9024f",
  "expectedRole": "user",
  "clientInjectedRole": "${clientRole}"
}`}
                      </pre>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-[#8D9096]">EXPECTED BY SERVER:</span>
                      <span className="text-white font-medium">role = user</span>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-[#8D9096]">CURRENT IN BROWSER MEMORY:</span>
                      <span className={clientRole === 'admin' ? 'text-[#D71920] font-bold' : 'text-white'}>
                        role = {clientRole}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.06] text-xs font-mono text-[#8D9096]">
                  Modifying browser storage, globals, or headers is trivial for anyone using DevTools.
                </div>
              </div>

              {/* Right Side: AEGIS Cryptographic Server-Side Verification */}
              <div className={`p-8 flex flex-col justify-between transition-colors duration-500 ${
                clientRole === 'admin' ? 'bg-[#D71920]/[0.04]' : 'bg-transparent'
              }`}>
                <div>
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.06]">
                    <span className="text-xs font-mono tracking-wider text-white uppercase">
                      AEGIS ZERO-TRUST AUTHORIZATION GATE
                    </span>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded font-bold ${
                      clientRole === 'admin'
                        ? 'bg-[#D71920] text-white'
                        : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {clientRole === 'admin' ? 'TAMPER DETECTED' : 'NOMINAL'}
                    </span>
                  </div>

                  {clientRole === 'admin' ? (
                    <div className="space-y-4">
                      <div className="p-5 rounded-xl bg-[#D71920]/20 border border-[#D71920]/60">
                        <div className="flex items-center gap-2 mb-2 text-[#D71920] font-mono text-xs font-bold uppercase tracking-wider">
                          <XCircle className="w-4 h-4" />
                          <span>CLIENT TAMPERING DETECTED</span>
                        </div>
                        <p className="text-xs font-mono text-white/90 leading-relaxed mb-3">
                          Client submitted forged role="admin" with mismatched HMAC signature key.
                        </p>
                        <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-[#D71920]/30">
                          <span className="text-white/60">RISK LEVEL:</span>
                          <span className="text-white font-bold bg-[#D71920] px-2 py-0.5 rounded">
                            CRITICAL
                          </span>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-black/60 border border-[#D71920]/30 space-y-2 text-xs font-mono">
                        <div className="flex items-center justify-between">
                          <span className="text-[#8D9096]">SERVER-SIDE ACTION:</span>
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> REQUEST REJECTED
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#8D9096]">ENCLAVE ENFORCEMENT:</span>
                          <span className="text-white">HARD RESET / SESSION REVOKED</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center space-y-3">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                      <h4 className="text-sm font-mono text-white font-medium">
                        SESSION AUTHENTICATED & VERIFIED
                      </h4>
                      <p className="text-xs font-mono text-[#8D9096] max-w-md mx-auto">
                        Client role matches the tamper-resistant signed server token. Authorization boundary intact.
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#8D9096]">ZERO TRUST GUARANTEE:</span>
                  <span className="text-white">CLIENT CANNOT ESCALATE PRIVILEGES</span>
                </div>
              </div>

            </div>
          </GlassPanel>
        </div>

        {/* Section 14: Code Integrity Visual */}
        <CodeIntegrity />

      </div>
    </section>
  );
};
