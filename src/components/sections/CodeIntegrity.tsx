import React, { useState } from 'react';
import { GlassPanel } from '../ui/GlassPanel';
import { demoIntegrityFiles } from '../../data/demoRepairs';
import { aegisAudio } from '../../utils/audio';
import { Code, CheckCircle, AlertTriangle, ShieldCheck, FileText, GitCommit } from 'lucide-react';

export const CodeIntegrity: React.FC = () => {
  const [tamperedFile, setTamperedFile] = useState<boolean>(false);

  const toggleTamperFile = () => {
    if (!tamperedFile) {
      aegisAudio.playAlert();
    } else {
      aegisAudio.playVerify();
    }
    setTamperedFile(!tamperedFile);
  };

  const steps = [
    { title: 'CHANGE DETECTED', desc: 'Unexpected AST hash mismatch on auth.ts', active: tamperedFile },
    { title: 'AI ANALYSIS', desc: 'Header-based authorization bypass identified', active: tamperedFile },
    { title: 'SECURITY IMPACT', desc: 'Classified: HIGH (Privilege escalation)', active: tamperedFile },
    { title: 'ISOLATE', desc: 'Traffic quarantined from untrusted build instance', active: tamperedFile },
    { title: 'VERIFY', desc: 'Synthesizing verified zero-trust cryptographic patch', active: tamperedFile },
    { title: 'RECOVER', desc: 'Canary build restored with cryptographic assertions', active: tamperedFile },
  ];

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-white font-medium flex items-center gap-2">
            <GitCommit className="w-4 h-4 text-[#D71920]" />
            CODEBASE CRYPTOGRAPHIC INTEGRITY MONITOR
          </span>
          <span className="text-[11px] font-mono text-[#8D9096] block mt-0.5">
            Continuous verification against hardware-backed git tree signatures.
          </span>
        </div>

        <button
          onClick={toggleTamperFile}
          className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider border transition-all cursor-pointer ${
            tamperedFile
              ? 'bg-[#D71920]/20 border-[#D71920] text-white shadow-[0_0_20px_rgba(215,25,32,0.3)]'
              : 'bg-white/[0.04] border-white/10 hover:border-white/30 text-white/80'
          }`}
        >
          {tamperedFile ? 'RESTORE ORIGINAL BUILD HASH' : 'SIMULATE UNEXPECTED CODE CHANGE'}
        </button>
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {demoIntegrityFiles.map((file) => {
          const isTarget = file.filename === 'auth.ts';
          const isAltered = isTarget && tamperedFile;

          return (
            <GlassPanel
              key={file.filename}
              variant={isAltered ? 'alert' : 'default'}
              className="p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-white">
                    <FileText className="w-4 h-4 text-[#8D9096]" />
                    <span className="font-semibold">{file.filename}</span>
                  </div>
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                      isAltered
                        ? 'bg-[#D71920] text-white font-bold'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {isAltered ? 'MODIFIED' : 'VERIFIED'}
                  </span>
                </div>

                <div className="space-y-1.5 text-[10px] font-mono text-[#8D9096]">
                  <div>
                    EXPECTED: <span className="text-white/60">{file.expectedHash.substring(0, 16)}...</span>
                  </div>
                  <div>
                    CURRENT: <span className={isAltered ? 'text-[#D71920] font-bold' : 'text-white/60'}>
                      {isAltered ? 'sha256:e3b0c44298fc...b411' : file.hash.substring(0, 16) + '...'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] mt-4 flex items-center justify-between text-[10px] font-mono">
                <span className="text-white/40">CHECKED: {file.lastChecked}</span>
                <span className={isAltered ? 'text-[#D71920] font-bold' : 'text-emerald-400'}>
                  {isAltered ? 'HASH MISMATCH' : 'PASSED'}
                </span>
              </div>
            </GlassPanel>
          );
        })}
      </div>

      {/* Defense Mode Activated Sequence if Tampered */}
      {tamperedFile && (
        <GlassPanel variant="alert" className="p-6 bg-[#D71920]/[0.08] border-[#D71920]/40">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#D71920]/20">
            <div className="flex items-center gap-2 text-white font-mono text-sm font-semibold tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D71920] animate-ping" />
              <span>DEFENSE MODE ACTIVATED — RECOVERY PIPELINE ENGAGED</span>
            </div>
            <span className="text-xs font-mono text-[#D71920] font-bold">
              SECURITY RELEVANCE: HIGH
            </span>
          </div>

          {/* Sequential Lifecycle Pipeline */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {steps.map((st, i) => (
              <div
                key={st.title}
                className="p-3 rounded-lg bg-black/60 border border-[#D71920]/30 text-left"
              >
                <div className="text-[10px] font-mono text-[#D71920] font-bold mb-1">
                  0{i + 1} // {st.title}
                </div>
                <div className="text-[10px] font-mono text-white/80 leading-snug">
                  {st.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-[#D71920]/20 flex items-center justify-between text-xs font-mono text-[#8D9096]">
            <span>ROOT CAUSE: Unsanitized client header binding introduced in PR-1849</span>
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> QUARANTINE ACTIVE
            </span>
          </div>
        </GlassPanel>
      )}
    </div>
  );
};
