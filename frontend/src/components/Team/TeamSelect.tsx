/**
 * NEXUS PROTOCOL - Team Selection Component
 * Interactive team selection with theme switching
 * Version: 1.0.0
 * Last Updated: February 17, 2026
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useGame } from '../../context/GameContext';
import { useAudio } from '../../context/AudioContext';
import NexusButton from '../UI/NexusButton';
import NexusCard from '../UI/NexusCard';
import './TeamSelect.css';

const teams = {
  redteam: {
    id: 'redteam',
    name: 'RED TEAM',
    codeName: 'OFFENSIVE SECURITY',
    description: 'Offensive security specialists focused on penetration testing and exploitation',
    philosophy: 'Think like an attacker. Break systems before the enemy does.',
    image: '/assets/RED TEAM.WEBP',
    color: '#FF1744',
    role: 'Red Team',
    capabilities: [
      'Penetration Testing: Simulate real-world attacks to identify vulnerabilities',
      'Exploit Development: Create and deploy custom exploits against target systems',
      'Social Engineering: Manipulate human psychology to gain unauthorized access',
      'Network Infiltration: Breach perimeter defenses and establish persistence',
      'Vulnerability Research: Discover zero-day exploits and security flaws'
    ],
    objectives: [
      'Identify and exploit security weaknesses',
      'Test defensive capabilities under pressure',
      'Simulate advanced persistent threats (APTs)',
      'Provide actionable intelligence for defense improvements'
    ],
    stats: {
      offense: 100,
      stealth: 85,
      exploitation: 95,
      reconnaissance: 80
    }
  },
  blueteam: {
    id: 'blueteam',
    name: 'BLUE TEAM',
    codeName: 'DEFENSIVE SECURITY',
    description: 'Defensive security specialists focused on threat detection and incident response',
    philosophy: 'Defend the perimeter. Detect the breach. Respond with precision.',
    image: '/assets/BLUETEAM.WEBP',
    color: '#00D4FF',
    role: 'Blue Team',
    capabilities: [
      'Threat Detection: Monitor systems for suspicious activities and anomalies',
      'Incident Response: Rapidly contain and remediate security breaches',
      'Security Hardening: Implement defensive measures and security controls',
      'Forensic Analysis: Investigate attacks and trace attacker methodologies',
      'Security Operations: Maintain 24/7 vigilance over critical infrastructure'
    ],
    objectives: [
      'Detect and prevent unauthorized access attempts',
      'Minimize attack surface and exposure',
      'Respond to incidents with speed and accuracy',
      'Maintain system integrity and availability'
    ],
    stats: {
      defense: 100,
      detection: 90,
      response: 95,
      analysis: 85
    }
  }
};

export default function TeamSelect() {
  const navigate = useNavigate();
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const { setTheme } = useTheme();
  const { selectTeam } = useGame();
  const { playSound } = useAudio();

  const handleTeamSelect = (teamId: string) => {
    playSound('click');
    setSelectedTeam(teamId);
    // Set theme based on team (red team = hacker theme, blue team = infiltrator theme)
    setTheme(teamId === 'redteam' ? 'hacker' : 'infiltrator');
  };

  const handleConfirm = () => {
    if (selectedTeam) {
      playSound('success');
      const team = teams[selectedTeam as keyof typeof teams];
      selectTeam(team.role);
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-arcane-dark p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold font-display text-arcane-teal mb-4">
            SELECT YOUR TEAM
          </h1>
          <p className="text-xl text-arcane-muted">
            Choose your operational role in the cyber warfare arena
          </p>
        </div>

        {/* Team Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
          {Object.values(teams).map((team) => (
            <NexusCard
              key={team.id}
              variant="agent"
              interactive
              selected={selectedTeam === team.id}
              onClick={() => handleTeamSelect(team.id)}
              className={`team-card cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                selectedTeam === team.id
                  ? 'ring-2 ring-theme-primary shadow-2xl shadow-theme-primary/25 pulse-glow'
                  : 'hover:shadow-xl hover:shadow-theme-primary/10'
              }`}
            >
              <div className="text-center mb-6">
                {/* Team Image */}
                <div className="team-card-image w-full h-64 mb-4 cyberpunk-border hologram-effect group relative overflow-hidden rounded-lg">
                  <img
                    src={team.image}
                    alt={`${team.name} - ${team.codeName}`}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  
                  {/* Cyberpunk overlay effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div 
                    className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ 
                      background: `linear-gradient(90deg, ${team.color}10 0%, transparent 100%)`
                    }}
                  />

                  {/* Glitch lines effect */}
                  <div 
                    className="absolute top-0 left-0 w-full h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: team.color }}
                  />
                  <div 
                    className="absolute bottom-0 right-0 w-full h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: team.color }}
                  />

                  {/* Team name overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-white font-display font-bold text-2xl mb-1">
                      {team.name}
                    </div>
                    <div 
                      className="text-sm font-mono"
                      style={{ color: team.color }}
                    >
                      {team.codeName}
                    </div>
                  </div>

                  {/* Selection indicator */}
                  {selectedTeam === team.id && (
                    <div className="absolute top-4 right-4">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center animate-pulse"
                        style={{ backgroundColor: team.color }}
                      >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Hover effect border */}
                  <div 
                    className="absolute inset-0 border-2 border-transparent group-hover:border-opacity-50 rounded-lg transition-colors duration-300"
                    style={{ borderColor: selectedTeam === team.id ? team.color : 'transparent' }}
                  />
                </div>

                <h3 className="text-xl font-bold font-display text-arcane-text mb-2 glitch-effect" data-text={team.name}>
                  {team.name}
                </h3>
                <div className="flex items-center justify-center mb-2">
                  <div 
                    className="w-2 h-2 rounded-full mr-2 animate-pulse"
                    style={{ backgroundColor: team.color }}
                  ></div>
                  <p className="text-sm font-mono" style={{ color: team.color }}>
                    {team.description}
                  </p>
                </div>
                <div className="text-xs text-arcane-muted mb-4 px-4 py-2 bg-arcane-panel/50 rounded border border-arcane-border/50">
                  <span className="text-theme-accent">CLEARANCE:</span> CLASSIFIED
                </div>
              </div>

              {/* Combat Statistics */}
              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-semibold text-arcane-text uppercase mb-3 flex items-center">
                  <span 
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: team.color }}
                  ></span>
                  Operational Capabilities
                </h4>
                {Object.entries(team.stats).map(([stat, value]) => (
                  <div key={stat} className="flex items-center group">
                    <span className="w-24 text-xs text-arcane-muted uppercase group-hover:text-theme-primary transition-colors">
                      {stat}
                    </span>
                    <div className="flex-1 mx-3 h-2 bg-arcane-border rounded-full overflow-hidden stat-bar">
                      <div
                        className="h-full transition-all duration-1000 relative"
                        style={{ 
                          width: `${value}%`,
                          background: `linear-gradient(90deg, ${team.color}, ${team.color}CC)`
                        }}
                      >
                        <div className="absolute inset-0 bg-white/10"></div>
                      </div>
                    </div>
                    <span className="w-8 text-xs text-arcane-text text-right font-mono">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Core Capabilities */}
              <div className="space-y-2 mb-6">
                <h4 className="text-xs font-semibold text-arcane-text uppercase flex items-center">
                  <span 
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: team.color }}
                  ></span>
                  Core Capabilities
                </h4>
                {team.capabilities.map((capability, index) => (
                  <div key={index} className="text-xs text-arcane-muted flex items-start group">
                    <span 
                      className="mr-2 group-hover:text-theme-primary transition-colors"
                      style={{ color: team.color }}
                    >▶</span>
                    <span className="group-hover:text-arcane-text transition-colors">{capability}</span>
                  </div>
                ))}
              </div>

              {/* Mission Objectives */}
              <div className="space-y-2 mb-6">
                <h4 className="text-xs font-semibold text-arcane-text uppercase flex items-center">
                  <span 
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: team.color }}
                  ></span>
                  Primary Objectives
                </h4>
                {team.objectives.map((objective, index) => (
                  <div key={index} className="text-xs text-arcane-muted flex items-start group">
                    <span 
                      className="mr-2 group-hover:text-theme-primary transition-colors"
                      style={{ color: team.color }}
                    >◆</span>
                    <span className="group-hover:text-arcane-text transition-colors">{objective}</span>
                  </div>
                ))}
              </div>

              {/* Philosophy */}
              <div className="mt-6 pt-4 border-t border-arcane-border">
                <div className="bg-arcane-panel/30 p-3 rounded border border-theme-primary/20">
                  <p 
                    className="text-xs italic leading-relaxed"
                    style={{ color: team.color }}
                  >
                    "{team.philosophy}"
                  </p>
                </div>
              </div>
            </NexusCard>
          ))}
        </div>

        <div className="text-center">
          <NexusButton
            variant="primary"
            size="lg"
            onClick={handleConfirm}
            disabled={!selectedTeam}
          >
            Confirm Team Selection
          </NexusButton>
        </div>
      </div>
    </div>
  );
}
