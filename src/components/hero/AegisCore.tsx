import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useAegis } from '../../context/AegisContext';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface AegisCoreProps {
  className?: string;
  size?: 'normal' | 'large' | 'compact';
}

export const AegisCore: React.FC<AegisCoreProps> = ({ className = '', size = 'normal' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { defenseStatus } = useAegis();
  const mouse = useMousePosition();
  const reducedMotion = useReducedMotion();
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
    if (!gl) {
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group for mouse/scroll orientation
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Central Nucleus (Inner Crimson Energy)
    const nucleusGeo = new THREE.IcosahedronGeometry(0.9, 1);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: 0xD71920,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    coreGroup.add(nucleus);

    // Inner glowing sphere
    const innerSphereGeo = new THREE.SphereGeometry(0.65, 32, 32);
    const innerSphereMat = new THREE.MeshStandardMaterial({
      color: 0x110203,
      emissive: 0xD71920,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.9,
    });
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    coreGroup.add(innerSphere);

    // 2. Obsidian Faceted Armor Shell (Octahedron/Icosahedron combo)
    const shellGeo = new THREE.IcosahedronGeometry(1.5, 0);
    const shellMat = new THREE.MeshPhysicalMaterial({
      color: 0x090A0C,
      roughness: 0.15,
      metalness: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
      transparent: true,
      opacity: 0.82,
    });
    const shell = new THREE.Mesh(shellGeo, shellMat);
    coreGroup.add(shell);

    // Shell Wireframe Lattice
    const shellWireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const shellWire = new THREE.Mesh(shellGeo, shellWireMat);
    coreGroup.add(shellWire);

    // 3. Orbital Defense Rings (Gyroscopic)
    const ring1Geo = new THREE.TorusGeometry(2.1, 0.012, 16, 120);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0xD71920,
      transparent: true,
      opacity: 0.75,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.4, 0.008, 16, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xF4F4F1,
      transparent: true,
      opacity: 0.35,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    coreGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(2.7, 0.01, 16, 120);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0xD71920,
      transparent: true,
      opacity: 0.45,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 2.5;
    ring3.rotation.y = Math.PI / 5;
    coreGroup.add(ring3);

    // 4. Subtle Shimmering Red & Silver Particles
    const particleCount = 220;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 2.0 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xD71920,
      size: 0.035,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x090A0C, 2.0);
    scene.add(ambientLight);

    const redPointLight = new THREE.PointLight(0xD71920, 4.5, 12);
    redPointLight.position.set(0, 0, 0);
    scene.add(redPointLight);

    const keyLight = new THREE.DirectionalLight(0xF4F4F1, 2.0);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xD71920, 2.5);
    rimLight.position.set(-5, -5, -3);
    scene.add(rimLight);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // State variations
      let speedMult = 1.0;
      let pulseIntensity = 0.6;
      let particleOpacity = 0.65;

      if (defenseStatus === 'threat_detected' || defenseStatus === 'tamper_alert') {
        speedMult = 2.4;
        pulseIntensity = 1.5 + Math.sin(elapsed * 12) * 0.8;
        redPointLight.color.setHex(0xD71920);
        innerSphereMat.emissive.setHex(0xD71920);
      } else if (defenseStatus === 'healing') {
        speedMult = 1.6;
        pulseIntensity = 1.1 + Math.sin(elapsed * 6) * 0.4;
        redPointLight.color.setHex(0xf59e0b);
        innerSphereMat.emissive.setHex(0xf59e0b);
      } else {
        speedMult = 0.8;
        pulseIntensity = 0.6 + Math.sin(elapsed * 1.5) * 0.25;
        redPointLight.color.setHex(0xD71920);
        innerSphereMat.emissive.setHex(0xD71920);
      }

      innerSphereMat.emissiveIntensity = pulseIntensity;
      redPointLight.intensity = pulseIntensity * 4.0;

      if (!reducedMotion) {
        // Slow intentional rotation
        shell.rotation.y = elapsed * 0.15 * speedMult;
        shell.rotation.x = elapsed * 0.08 * speedMult;
        shellWire.rotation.y = elapsed * 0.15 * speedMult;
        shellWire.rotation.x = elapsed * 0.08 * speedMult;

        nucleus.rotation.y = -elapsed * 0.3 * speedMult;
        nucleus.rotation.z = elapsed * 0.2 * speedMult;

        ring1.rotation.z = elapsed * 0.25 * speedMult;
        ring2.rotation.x = -elapsed * 0.2 * speedMult;
        ring3.rotation.y = elapsed * 0.18 * speedMult;

        particles.rotation.y = elapsed * 0.05 * speedMult;

        // Smooth mouse parallax target
        const targetRotX = (mouse.normalizedY * 0.35);
        const targetRotY = (mouse.normalizedX * 0.35);

        coreGroup.rotation.x += (targetRotX - coreGroup.rotation.x) * 0.05;
        coreGroup.rotation.y += (targetRotY - coreGroup.rotation.y) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      // Clean up Three.js resources
      renderer.dispose();
      shellGeo.dispose();
      shellMat.dispose();
      nucleusGeo.dispose();
      nucleusMat.dispose();
      innerSphereGeo.dispose();
      innerSphereMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [defenseStatus, mouse.normalizedX, mouse.normalizedY, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}
      style={{
        width: size === 'large' ? '100%' : size === 'compact' ? '340px' : '520px',
        height: size === 'large' ? '680px' : size === 'compact' ? '340px' : '520px',
        maxWidth: '100vw',
      }}
    >
      {/* Fallback for WebGL missing or disabled */}
      {!hasWebGL && (
        <div className="flex flex-col items-center justify-center w-64 h-64 rounded-full border border-[#D71920]/40 bg-gradient-to-br from-[#120405] to-[#050607] shadow-[0_0_50px_rgba(215,25,32,0.3)] animate-pulse">
          <div className="w-32 h-32 rounded-full border border-white/20 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#D71920]/80 shadow-[0_0_30px_#D71920]" />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-white/60 mt-4 uppercase">
            AEGIS DEFENSE CORE
          </span>
        </div>
      )}

      {/* Atmospheric center glow under the 3D core */}
      <div className="absolute inset-0 m-auto w-3/4 h-3/4 bg-radial from-[#D71920]/15 via-transparent to-transparent blur-3xl pointer-events-none -z-10" />
    </div>
  );
};
