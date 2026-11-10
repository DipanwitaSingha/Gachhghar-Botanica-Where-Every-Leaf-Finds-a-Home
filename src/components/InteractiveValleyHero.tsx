import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Volume2, VolumeX, ArrowDown, Sparkles, ShieldCheck, Truck } from 'lucide-react';

interface ValleyHeroProps {
  onExploreClick: () => void;
  onCategorySelect: (cat: string) => void;
}

export const InteractiveValleyHero: React.FC<ValleyHeroProps> = ({
  onExploreClick,
  onCategorySelect,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const ambientOscRef = useRef<OscillatorNode | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Web Audio API ambient garden synthesizer (gentle night garden breeze + harmonic drone)
  const toggleSound = () => {
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Warm ambient drone (night valley flora resonance)
        const osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(130.81, ctx.currentTime); // C3
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(380, ctx.currentTime);

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.06, ctx.currentTime);

        osc1.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(masterGain);
        osc1.start();
        ambientOscRef.current = osc1;

        // Subtle harmonic overtone (wind chimes / gentle night breeze)
        const osc2 = ctx.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(392.00, ctx.currentTime); // G4
        const osc2Gain = ctx.createGain();
        osc2Gain.gain.setValueAtTime(0.02, ctx.currentTime);
        osc2.connect(filter);
        osc2Gain.connect(masterGain);
        osc2.start();

        setIsMuted(false);
      } else {
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        if (gainNodeRef.current) {
          if (isMuted) {
            gainNodeRef.current.gain.setTargetAtTime(0.08, ctx.currentTime, 0.4);
            setIsMuted(false);
          } else {
            gainNodeRef.current.gain.setTargetAtTime(0.0, ctx.currentTime, 0.4);
            setIsMuted(true);
          }
        }
      }
    } catch {
      // Audio autoplay policy fallback
      setIsMuted(true);
    }
  };

  // Three.js interactive night flower valley
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070c09, 0.018);

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 15, 45);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle field: Glowing flower petals and night fireflies
    const particleCount = 2800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    // Color palette: deep rose crimson, electric magenta bougainvillea, golden yellow, lotus petal pink, bioluminescent jade
    const colorPalette = [
      new THREE.Color(0xe11d48), // Rose Crimson
      new THREE.Color(0xd946ef), // Bougainvillea Magenta
      new THREE.Color(0xf472b6), // Lotus Sacred Pink
      new THREE.Color(0x34d399), // Foliage Emerald
      new THREE.Color(0xfde047), // Pollen Firefly Gold
      new THREE.Color(0xf5efe2), // Cream blossom
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Spread across an undulating night valley
      const x = (Math.random() - 0.5) * 160;
      const z = (Math.random() - 0.5) * 140;
      // Terrain wave formula
      const y = Math.sin(x * 0.05) * Math.cos(z * 0.05) * 8 + (Math.random() - 0.5) * 4;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;

      scales[i] = Math.random() * 2.4 + 0.8;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Generate round glowing petal texture programmatically
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      const gradient = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.3, 'rgba(255,230,240,0.8)');
      gradient.addColorStop(0.7, 'rgba(220,100,180,0.3)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      pCtx.fillStyle = gradient;
      pCtx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(pCanvas);

    const material = new THREE.PointsMaterial({
      size: 2.2,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse coordinates in normalized 3D space
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const planeIntersect = new THREE.Vector3();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.targetY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse camera tilt
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      camera.position.x = mouse.x * 12;
      camera.position.y = 14 + mouse.y * 6;
      camera.lookAt(0, 2, 0);

      // Particle physics: gentle floating and cursor repulsion
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      raycaster.setFromCamera(new THREE.Vector2(mouse.x, mouse.y), camera);
      raycaster.ray.intersectPlane(plane, planeIntersect);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];
        const oz = originalPositions[i3 + 2];

        // Undulating wave movement
        const wave = Math.sin(elapsed * 1.2 + ox * 0.1) * 0.8;
        const drift = Math.cos(elapsed * 0.8 + oz * 0.08) * 0.6;

        let targetY = oy + wave;
        let targetX = ox + drift;
        let targetZ = oz;

        // Distance to mouse pointer projection
        const dx = posArray[i3] - planeIntersect.x;
        const dy = posArray[i3 + 1] - planeIntersect.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 18) {
          const force = (18 - dist) / 18;
          targetX += (dx / dist) * force * 10;
          targetY += (dy / dist) * force * 10;
        }

        posArray[i3] += (targetX - posArray[i3]) * 0.08;
        posArray[i3 + 1] += (targetY - posArray[i3 + 1]) * 0.08;
        posArray[i3 + 2] = targetZ;
      }

      posAttr.needsUpdate = true;
      particles.rotation.y = elapsed * 0.02;

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen min-h-[700px] overflow-hidden bg-[#070c09] text-[#f5efe2] flex flex-col justify-between"
    >
      {/* 3D WebGL Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
      />

      {/* Atmospheric Vignette & Subtle Fog Gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0b100d] via-transparent to-[#070c09]/80" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(7,12,9,0.85)_100%)]" />

      {/* Top Banner: In-Person Nursery Inspection & Direct Pickup Notice */}
      <div className="relative z-10 w-full border-b border-[#27362c]/60 bg-[#070c09]/80 backdrop-blur-md px-4 py-2.5 text-center text-xs tracking-wider uppercase flex items-center justify-center gap-3 text-[#d1e7d8]">
        <span className="flex items-center gap-1.5 font-medium text-[#4ade80]">
          <ShieldCheck className="w-3.5 h-3.5" /> In-Person Plant Inspection & Direct Nursery Pickup
        </span>
        <span className="text-[#3c5243]">·</span>
        <span className="flex items-center gap-1.5 font-semibold text-[#f5efe2]">
          <span className="text-[#eab308]">📍</span> 4No Mahajati Nagar, Birati, Kolkata-700051, West Bengal
        </span>
        <span className="text-[#3c5243]">·</span>
        <span className="hidden sm:inline text-[#a3b899]">No Courier Shipping · Inspect & Verify Living Plants Before Paying</span>
      </div>

      {/* Hero Content Overlay (Centered as in Fernhollow design) */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full my-auto flex flex-col items-center text-center pointer-events-none">
        {/* Editorial Eyebrow */}
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#a3b899] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#4ade80]" />
          <span>Gachhghar Botanical Nursery</span>
          <span>·</span>
          <span>Birati, Kolkata, West Bengal</span>
        </div>

        {/* Tall Display Headline (Antonio typeface) */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-antonio tracking-[-0.015em] leading-[0.92] text-[#f5efe2] text-balance max-w-5xl">
          GROWN, NOT BUILT.
        </h1>

        {/* Plant Nursery Tagline & Caption */}
        <p className="mt-6 text-lg sm:text-xl md:text-2xl font-light text-[#dcd4c4] max-w-2xl leading-relaxed">
          Grow Your Own Paradise.
          <span className="block mt-1 text-sm sm:text-base text-[#a8bba1] font-normal">
            Rooted in nature. Choose your species online, visit our Birati nursery to personally see, touch, and verify healthy living saplings, and pay upon collection.
          </span>
        </p>

        {/* Interactive Quick Categories Pills & Primary CTA */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 pointer-events-auto">
          <button
            onClick={onExploreClick}
            className="px-6 py-2.5 rounded-full bg-[#f5efe2] text-[#0b100d] font-semibold text-xs sm:text-sm hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(245,239,226,0.25)] flex items-center gap-2"
          >
            <span>Explore Nursery Collection</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>

          <button
            onClick={() => onCategorySelect('rose')}
            className="px-3.5 py-2 rounded-full border border-[#f5efe2]/25 bg-[#121915]/60 hover:bg-[#121915] hover:border-[#f5efe2]/60 text-xs font-medium tracking-wide transition-colors"
          >
            🌹 Roses & Desert Rose (Adenium)
          </button>
          <button
            onClick={() => onCategorySelect('flowering-climbers')}
            className="px-3.5 py-2 rounded-full border border-[#4ade80]/40 bg-[#121915]/80 hover:bg-[#16251b] hover:border-[#4ade80] text-xs font-medium tracking-wide transition-colors text-[#4ade80]"
          >
            🌸 Nilkantha (Aparajita) & Climbers
          </button>
          <button
            onClick={() => onCategorySelect('bougainvillea')}
            className="px-3.5 py-2 rounded-full border border-[#f5efe2]/25 bg-[#121915]/60 hover:bg-[#121915] hover:border-[#f5efe2]/60 text-xs font-medium tracking-wide transition-colors"
          >
            🌺 Bougainvillea & Hibiscus
          </button>
          <button
            onClick={() => onCategorySelect('variety-leaf')}
            className="px-3.5 py-2 rounded-full border border-[#f5efe2]/25 bg-[#121915]/60 hover:bg-[#121915] hover:border-[#f5efe2]/60 text-xs font-medium tracking-wide transition-colors"
          >
            🌿 Dracaena, Monstera & Croton
          </button>
          <button
            onClick={() => onCategorySelect('palms-bonsai')}
            className="px-3.5 py-2 rounded-full border border-[#f5efe2]/25 bg-[#121915]/60 hover:bg-[#121915] hover:border-[#f5efe2]/60 text-xs font-medium tracking-wide transition-colors"
          >
            🌴 Palms, Bonsai & Tulsi
          </button>
          <button
            onClick={() => onCategorySelect('lotus-aquatic')}
            className="px-3.5 py-2 rounded-full border border-[#f5efe2]/25 bg-[#121915]/60 hover:bg-[#121915] hover:border-[#f5efe2]/60 text-xs font-medium tracking-wide transition-colors"
          >
            🪷 Sacred Lotus
          </button>
        </div>
      </div>

      {/* Bottom Corner Floating Bar (Scroll to wander & Ambient Sound Toggle) */}
      <div className="relative z-10 w-full px-6 py-5 max-w-7xl mx-auto flex items-center justify-between text-xs tracking-widest uppercase text-[#a3b899]">
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline font-medium">Scroll down to wander & reserve saplings</span>
          <span className="sm:hidden font-medium">Explore species</span>
          <div className="w-8 h-[1px] bg-[#3c5243]" />
          <span className="text-[#f5efe2] font-semibold">In-Person Verification & Pickup at Birati</span>
        </div>

        {/* Ambient Soundscape Toggle */}
        <button
          onClick={toggleSound}
          aria-label={isMuted ? 'Unmute night garden soundscape' : 'Mute sound'}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#27362c] bg-[#0b100d]/80 hover:bg-[#16211a] hover:border-[#4ade80]/40 transition-colors pointer-events-auto"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-[#a3b899]" />
              <span className="hidden md:inline text-[11px] font-normal">Garden Ambience: Muted</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-[#4ade80] animate-pulse" />
              <span className="hidden md:inline text-[11px] font-normal text-[#4ade80]">Playing Night Flora</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
