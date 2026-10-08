import React from 'react';
import { CommerceHero } from '../commerce/CommerceHero';
import { ProductDiscovery } from '../commerce/ProductDiscovery';
import { IntentUnderstandingSection } from '../commerce/IntentUnderstandingSection';
import { IntentMatchSection } from '../commerce/IntentMatchSection';
import { IntentDriftTimeline } from '../commerce/IntentDriftTimeline';
import { ProductDetailSpotlight } from '../commerce/ProductDetailSpotlight';
import { CartSection } from '../commerce/CartSection';
import { CheckoutSection } from '../commerce/CheckoutSection';
import { TamperGuardDemo } from '../commerce/TamperGuardDemo';
import { ThreatGuardStory } from '../commerce/ThreatGuardStory';
import { HealGuardStory } from '../commerce/HealGuardStory';
import { RollbackStory } from '../commerce/RollbackStory';
import { ControlCenterSection } from '../commerce/ControlCenterSection';
import { DefenseCoreVisual } from '../commerce/DefenseCoreVisual';
import { CommerceFinalCTA } from '../commerce/CommerceFinalCTA';

export const HomeView: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      {/* 01. Hero — Shop With Intent */}
      <div id="hero">
        <CommerceHero />
      </div>

      {/* 02. Discover — Find What Actually Fits You */}
      <div id="discover">
        <ProductDiscovery />
      </div>

      {/* 03. AI Understands Intent — Not Just What You Click. What You Mean */}
      <div id="intent-layer">
        <IntentUnderstandingSection />
      </div>

      {/* 04. Intent Match Across the Catalog */}
      <div id="intent-match">
        <IntentMatchSection />
      </div>

      {/* 05. Intent Drift Progression Timeline */}
      <div id="intent-drift">
        <IntentDriftTimeline />
      </div>

      {/* 06. Product Detail Spotlight — AEGIS Pro X1 */}
      <div id="spotlight">
        <ProductDetailSpotlight />
      </div>

      {/* 07. Intent-Aware Shopping Cart */}
      <div id="cart-preview">
        <CartSection />
      </div>

      {/* 08. Checkout Flow with Final AEGIS Check */}
      <div id="checkout-preview">
        <CheckoutSection />
      </div>

      {/* 09. TamperGuard Demonstration — Your Browser is Not the Authority */}
      <div id="tamper-guard">
        <TamperGuardDemo />
      </div>

      {/* 10. ThreatGuard Story — When an Attack Isn't One Event */}
      <div id="threat-guard">
        <ThreatGuardStory />
      </div>

      {/* 11. HealGuard Autonomous Error Recovery Pipeline */}
      <div id="heal-guard">
        <HealGuardStory />
      </div>

      {/* 12. Automated Recovery Rollback — Canary Resilience */}
      <div id="rollback-guard">
        <RollbackStory />
      </div>

      {/* 13. AEGIS Control Center (Secondary SOC Dashboard) */}
      <div id="control-center">
        <ControlCenterSection />
      </div>

      {/* 14. AEGIS Defense Core 3D Nexus */}
      <div id="defense-core">
        <DefenseCoreVisual />
      </div>

      {/* 15. Final CTA — Shop with Confidence */}
      <div id="final-cta">
        <CommerceFinalCTA />
      </div>
    </div>
  );
};
