/**
 * NEXUS PROTOCOL - Cinematic Trailer Sequence
 * Enhanced cinematic introduction with real agent and team images
 * Version: 4.0.0 - Complete Redesign with Asset Images
 * Last Updated: February 17, 2026
 */

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from '../../lib/gsap.js';
import { Shield, Sword, Lock, AlertTriangle } from 'lucide-react';
import '../../styles/trailer-cinematic.css';

export default function TrailerSequence() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const pixelRef = useRef<HTMLDivElement>(null);
  const teamRevealRef = useRef<HTMLDivElement>(null);
  const systemAlertRef = useRef<HTMLDivElement>(null);
  const vaultRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const voiceoverRef = useRef<HTMLDivElement>(null);

  const [currentVO, setCurrentVO] = useState('');

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('nexus_trailer_shown', 'true');
        setTimeout(() => navigate('/team-select'), 1000);
      }
    });

    // 🎬 ENHANCED CINEMATIC TRAILER TIMELINE (50 seconds)

    // 0-5s: Black → pixel ignites
    tl.set(containerRef.current, { backgroundColor: '#000000' })
      .call(() => setCurrentVO('In the shadows of the digital world...'), [], 0)
      .fromTo(pixelRef.current,
        { scale: 0, opacity: 0, backgroundColor: '#00D4FF' },
        { scale: 1, opacity: 1, duration: 2, ease: 'power2.out' },
        1
      )
      .to(pixelRef.current, {
        scale: 80,
        opacity: 0.6,
        duration: 3,
        ease: 'power3.out'
      }, 2)

      // 6-15s: Team reveal - Red Team vs Blue Team with actual images
      .call(() => setCurrentVO('Two forces collide.'), [], 6)
      .to(containerRef.current, {
        backgroundColor: '#0A0A0F',
        duration: 1
      }, 6)
      .set(teamRevealRef.current, { autoAlpha: 1 }, 7)
      .fromTo('#team-red',
        { opacity: 0, x: -300, rotationY: -45, scale: 0.8 },
        { opacity: 1, x: 0, rotationY: 0, scale: 1, duration: 2, ease: 'power2.out' },
        7
      )
      .fromTo('#team-blue',
        { opacity: 0, x: 300, rotationY: 45, scale: 0.8 },
        { opacity: 1, x: 0, rotationY: 0, scale: 1, duration: 2, ease: 'power2.out' },
        7.5
      )
      .to('#team-red, #team-blue', {
        scale: 1.05,
        duration: 1,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: 1
      }, 10)
      .call(() => setCurrentVO('Choose your operative.'), [], 13)
      .to(teamRevealRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1
      }, 14)

      // 16-26s: Agent reveals with actual images
      // CIPHER Agent (Red Team - Breach Architect)
      .set('#agent-cipher', { autoAlpha: 1 }, 16)
      .fromTo('#agent-cipher .agent-image',
        { scale: 0.5, opacity: 0, rotationY: 180 },
        { scale: 1, opacity: 1, rotationY: 0, duration: 1.5, ease: 'back.out(1.7)' },
        16
      )
      .fromTo('#agent-cipher .agent-info',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
        16.5
      )
      .to('#agent-cipher', { autoAlpha: 0, duration: 0.5 }, 20)

      // GHOST Agent (Blue Team - Shadow Linguist)
      .set('#agent-ghost', { autoAlpha: 1 }, 21)
      .fromTo('#agent-ghost .agent-image',
        { scale: 0.5, opacity: 0, rotationY: -180 },
        { scale: 1, opacity: 1, rotationY: 0, duration: 1.5, ease: 'back.out(1.7)' },
        21
      )
      .fromTo('#agent-ghost .agent-info',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
        21.5
      )
      .to('#agent-ghost', { autoAlpha: 0, duration: 0.5 }, 25)

      // 27-35s: System breach alert
      .call(() => setCurrentVO('Every choice has consequences.'), [], 27)
      .to(containerRef.current, {
        backgroundColor: '#FF1744',
        duration: 0.3
      }, 27)
      .fromTo(systemAlertRef.current,
        { opacity: 0, y: 100, rotationX: -90 },
        { opacity: 1, y: 0, rotationX: 0, duration: 2, ease: 'back.out(1.7)' },
        27.5
      )
      .to('.crack-line', {
        clipPath: 'inset(0 0 0 0)',
        duration: 2,
        stagger: 0.3
      }, 28)
      .to(containerRef.current, {
        backgroundColor: '#000000',
        duration: 1,
        ease: 'power2.in'
      }, 33)
      .to(systemAlertRef.current, { opacity: 0, duration: 0.5 }, 33)

      // 36-44s: Black Vault sequence
      .call(() => setCurrentVO('There is no clean exit.'), [], 36)
      .fromTo(vaultRef.current,
        { opacity: 0, scale: 0.5, rotationY: -180 },
        { opacity: 1, scale: 1, rotationY: 0, duration: 4, ease: 'power3.out' },
        36
      )
      .to(vaultRef.current, {
        scale: 1.1,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: 1
      }, 40)
      .to(vaultRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 2,
        ease: 'power2.in'
      }, 43)

      // 45-50s: Final logo reveal
      .call(() => setCurrentVO(''), [], 45)
      .set(containerRef.current, { backgroundColor: '#000000' }, 45)
      .fromTo(logoRef.current,
        {
          opacity: 0,
          scale: 0.3,
          rotationY: 180,
          y: 100
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          y: 0,
          duration: 3,
          ease: 'power3.out'
        },
        46
      )
      .call(() => setCurrentVO('NEXUS PROTOCOL'), [], 48)
      .to(logoRef.current, {
        scale: 1.05,
        duration: 1,
        ease: 'sine.inOut'
      }, 48);

    return () => {
      tl.kill();
    };
  }, [navigate]);

  const handleSkip = () => {
    sessionStorage.setItem('nexus_trailer_shown', 'true');
    navigate('/team-select');
  };

  return (
    <div
      ref={containerRef}
      className="trailer-container"
    >
      {/* Skip Button */}
      <div className="absolute bottom-8 right-8 z-50">
        <button
          onClick={handleSkip}
          className="skip-button text-arcane-teal font-mono text-sm border border-arcane-teal/30 px-6 py-3 bg-black/50 hover:bg-arcane-teal/10 transition-all hover:border-arcane-teal"
        >
          SKIP SEQUENCE &gt;&gt;
        </button>
      </div>

      {/* Pixel Ignition */}
      <div
        ref={pixelRef}
        className="pixel-ignite absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0"
      />

      {/* Team Reveal - Red Team vs Blue Team */}
      <div
        ref={teamRevealRef}
        className="scene absolute inset-0 flex items-center justify-center gap-16 invisible"
      >
        <div id="team-red" className="team-card opacity-0">
          <div className="relative w-96 h-[500px] overflow-hidden rounded-xl border-4 border-red-600 shadow-2xl shadow-red-600/50">
            <img
              src="/assets/RED TEAM.WEBP"
              alt="Red Team - Offensive Security"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <Sword className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-white mb-2">RED TEAM</h3>
              <p className="text-red-400 text-lg font-mono">OFFENSIVE SECURITY</p>
            </div>
          </div>
        </div>

        <div id="team-blue" className="team-card opacity-0">
          <div className="relative w-96 h-[500px] overflow-hidden rounded-xl border-4 border-cyan-500 shadow-2xl shadow-cyan-500/50">
            <img
              src="/assets/BLUETEAM.WEBP"
              alt="Blue Team - Defensive Security"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <Shield className="w-16 h-16 text-cyan-500 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-white mb-2">BLUE TEAM</h3>
              <p className="text-cyan-400 text-lg font-mono">DEFENSIVE SECURITY</p>
            </div>
          </div>
        </div>
      </div>

      {/* CIPHER Agent Scene */}
      <div id="agent-cipher" className="scene absolute inset-0 flex items-center justify-center invisible">
        <div className="agent-showcase">
          <div className="agent-image relative w-[600px] h-[700px] overflow-hidden rounded-2xl border-4 border-red-600 shadow-2xl shadow-red-600/50">
            <img
              src="/assets/agent01.webp"
              alt="CIPHER - Breach Architect"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>
          <div className="agent-info absolute bottom-12 left-0 right-0 text-center">
            <div className="inline-block bg-black/80 backdrop-blur-md px-12 py-6 rounded-xl border-2 border-red-600">
              <h2 className="text-6xl font-bold text-white mb-2">CIPHER</h2>
              <p className="text-2xl text-red-400 font-mono mb-2">BREACH ARCHITECT</p>
              <p className="text-lg text-gray-400">System Exploitation Specialist</p>
            </div>
          </div>
        </div>
      </div>

      {/* GHOST Agent Scene */}
      <div id="agent-ghost" className="scene absolute inset-0 flex items-center justify-center invisible">
        <div className="agent-showcase">
          <div className="agent-image relative w-[600px] h-[700px] overflow-hidden rounded-2xl border-4 border-cyan-500 shadow-2xl shadow-cyan-500/50">
            <img
              src="/assets/agent02.webp"
              alt="GHOST - Shadow Linguist"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>
          <div className="agent-info absolute bottom-12 left-0 right-0 text-center">
            <div className="inline-block bg-black/80 backdrop-blur-md px-12 py-6 rounded-xl border-2 border-cyan-500">
              <h2 className="text-6xl font-bold text-white mb-2">GHOST</h2>
              <p className="text-2xl text-cyan-400 font-mono mb-2">SHADOW LINGUIST</p>
              <p className="text-lg text-gray-400">Social Engineering Specialist</p>
            </div>
          </div>
        </div>
      </div>

      {/* System Alert */}
      <div
        ref={systemAlertRef}
        className="absolute inset-0 flex items-center justify-center opacity-0"
      >
        <div className="text-center relative">
          <AlertTriangle size={150} className="text-red-600 mx-auto mb-8 animate-pulse" />
          <div className="system-alert text-7xl font-bold text-white mb-8">
            SYSTEM BREACH
          </div>
          <div className="text-3xl text-red-500 font-mono">
            TRACE LEVEL: CRITICAL
          </div>
        </div>
        <div className="crack-line absolute top-0 left-1/3 w-[2px] h-full bg-red-600/70" style={{ clipPath: 'inset(0 100% 0 0)' }} />
        <div className="crack-line absolute top-1/3 left-0 w-full h-[2px] bg-red-600/70" style={{ clipPath: 'inset(0 100% 0 0)' }} />
        <div className="crack-line absolute top-2/3 right-1/4 w-full h-[2px] bg-red-600/70" style={{ clipPath: 'inset(0 100% 0 0)' }} />
      </div>

      {/* Black Vault */}
      <div
        ref={vaultRef}
        className="vault-container absolute inset-0 flex items-center justify-center opacity-0"
      >
        <div className="vault-door relative">
          <div className="w-[500px] h-[500px] border-4 border-cyan-500 bg-black/90 flex flex-col items-center justify-center gap-6 rounded-xl">
            <Lock size={120} className="text-cyan-500" />
            <div className="text-5xl font-mono text-cyan-500 tracking-widest">
              █ CLASSIFIED █
            </div>
            <div className="text-xl font-mono text-gray-400">
              ACCESS DENIED
            </div>
          </div>
        </div>
      </div>

      {/* Final Logo */}
      <div
        ref={logoRef}
        className="logo-assembly absolute inset-0 flex items-center justify-center opacity-0"
      >
        <div className="text-center">
          <div className="logo-text text-9xl font-bold font-display mb-6">
            NEXUS
          </div>
          <div className="text-5xl font-mono text-cyan-500 tracking-widest">
            PROTOCOL
          </div>
        </div>
      </div>

      {/* Voiceover Display */}
      <div
        ref={voiceoverRef}
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-center"
      >
        {currentVO && (
          <div className="voiceover-display px-12 py-6">
            <div className="text-2xl font-mono text-cyan-400">
              {currentVO}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
