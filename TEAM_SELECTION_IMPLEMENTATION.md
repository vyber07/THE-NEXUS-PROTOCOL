# Team Selection Implementation

## Overview
A new team selection page has been added to the NEXUS PROTOCOL application, positioned between the trailer and login screens. This page allows users to choose between Red Team (Offensive Security) and Blue Team (Defensive Security).

---

## Flow Update

**Previous Flow:**
Landing → Trailer → Login → Agent Select → Mission Briefing

**New Flow:**
Landing → Trailer → **Team Select** → Login → Agent Select → Mission Briefing

---

## Components Created

### 1. TeamSelect Component
**Location:** `frontend/src/components/Team/TeamSelect.tsx`

**Features:**
- Two team cards with cyberpunk styling
- Red Team and Blue Team selection
- Detailed team information including:
  - Team name and codename
  - Description and philosophy
  - Team images (RED TEAM.WEBP and BLUETEAM.WEBP)
  - Operational capabilities (5 per team)
  - Primary objectives (4 per team)
  - Stats visualization (4 stats per team)
- Interactive hover effects and animations
- Theme switching based on team selection
- Confirmation button to proceed to login

### 2. TeamSelect CSS
**Location:** `frontend/src/components/Team/TeamSelect.css`

**Styling Features:**
- Glitch effects on hover
- Pulse glow animations
- Shimmer effects on stat bars
- Hologram overlay effects
- Cyberpunk borders
- Smooth transitions

---

## Team Details

### Red Team (Offensive Security)
**Color:** `#FF1744` (Red)
**Theme:** Hacker theme
**Role:** Red Team

**Core Capabilities:**
1. Penetration Testing: Simulate real-world attacks to identify vulnerabilities
2. Exploit Development: Create and deploy custom exploits against target systems
3. Social Engineering: Manipulate human psychology to gain unauthorized access
4. Network Infiltration: Breach perimeter defenses and establish persistence
5. Vulnerability Research: Discover zero-day exploits and security flaws

**Primary Objectives:**
1. Identify and exploit security weaknesses
2. Test defensive capabilities under pressure
3. Simulate advanced persistent threats (APTs)
4. Provide actionable intelligence for defense improvements

**Stats:**
- Offense: 100
- Stealth: 85
- Exploitation: 95
- Reconnaissance: 80

**Philosophy:** "Think like an attacker. Break systems before the enemy does."

**Image:** `/assets/RED TEAM.WEBP`

---

### Blue Team (Defensive Security)
**Color:** `#00D4FF` (Cyan/Blue)
**Theme:** Infiltrator theme
**Role:** Blue Team

**Core Capabilities:**
1. Threat Detection: Monitor systems for suspicious activities and anomalies
2. Incident Response: Rapidly contain and remediate security breaches
3. Security Hardening: Implement defensive measures and security controls
4. Forensic Analysis: Investigate attacks and trace attacker methodologies
5. Security Operations: Maintain 24/7 vigilance over critical infrastructure

**Primary Objectives:**
1. Detect and prevent unauthorized access attempts
2. Minimize attack surface and exposure
3. Respond to incidents with speed and accuracy
4. Maintain system integrity and availability

**Stats:**
- Defense: 100
- Detection: 90
- Response: 95
- Analysis: 85

**Philosophy:** "Defend the perimeter. Detect the breach. Respond with precision."

**Image:** `/assets/BLUETEAM.WEBP`

---

## Technical Implementation

### GameContext Updates
**File:** `frontend/src/context/GameContext.tsx`

**Added:**
- `selectTeam(teamRole: string)` function
- `selectTeam` added to GameContextType interface
- `selectTeam` added to context provider value

**Usage:**
```typescript
const { selectTeam } = useGame();
selectTeam('Red Team'); // or 'Blue Team'
```

### Routing Updates
**File:** `frontend/src/App.tsx`

**Added:**
- Import for TeamSelect component
- New route: `/team-select`

**Route Definition:**
```tsx
<Route path="/team-select" element={<TeamSelect />} />
```

### Navigation Updates

**TrailerSequence.tsx:**
- Changed navigation from `/login` to `/team-select` after trailer completion
- Updated skip button to navigate to `/team-select`

**LandingPage.tsx:**
- Changed navigation from `/login` to `/team-select` when trailer is already shown

---

## UI/UX Features

### Visual Design
- Matches the agent selection page styling
- Cyberpunk aesthetic with neon accents
- Team-specific color schemes (red/blue)
- High-quality team images
- Gradient overlays and effects

### Interactions
- Click to select team
- Hover effects with glitch animations
- Selected state with ring and glow
- Smooth transitions and animations
- Disabled state for confirm button until selection

### Animations
- Pulse glow on selected card
- Glitch text effect on hover
- Shimmer effect on stat bars
- Hologram scanline overlay
- Border glow effects
- Scale transform on hover

### Responsive Design
- Mobile-first approach
- Grid layout: 1 column on mobile, 2 columns on desktop
- Centered content with max-width container
- Touch-friendly interactive elements

---

## Assets Used

### Images
- `/assets/RED TEAM.WEBP` - Red Team logo/image
- `/assets/BLUETEAM.WEBP` - Blue Team logo/image

### Colors
- Red Team: `#FF1744` (Crimson Red)
- Blue Team: `#00D4FF` (Cyan Blue)
- Background: `bg-arcane-dark`
- Text: `text-arcane-text`, `text-arcane-muted`
- Accent: `text-arcane-teal`

---

## State Management

### Team Selection Flow
1. User views team selection page
2. User clicks on a team card
3. Theme changes to match team (red → hacker, blue → infiltrator)
4. Selected state is visually indicated
5. Confirm button becomes enabled
6. User clicks confirm
7. Team role is saved to game state
8. User is navigated to login page

### Stored Data
- `gameState.currentTeam`: Stores selected team role ('Red Team' or 'Blue Team')
- Theme is automatically set based on team selection

---

## Integration Points

### With Agent Selection
The team selection complements agent selection:
- Red Team → typically pairs with Hacker agent
- Blue Team → typically pairs with Infiltrator agent
- Both selections are stored independently in game state

### With Mission System
Team selection affects:
- Available mission objectives (filtered by role)
- Mission briefing displays team-specific objectives
- Gameplay mechanics may differ based on team

---

## Accessibility

### Features
- Keyboard navigation support
- Focus states on interactive elements
- High contrast colors for readability
- Clear visual feedback for selections
- Descriptive alt text for images

### ARIA Support
- Semantic HTML structure
- Proper heading hierarchy
- Button roles and labels
- Status indicators

---

## Performance

### Optimizations
- CSS transitions for smooth animations
- Lazy loading of images
- Efficient state updates
- Minimal re-renders
- GPU-accelerated transforms

---

## Testing Checklist

- [ ] Team selection works correctly
- [ ] Navigation flow is correct (Trailer → Team Select → Login)
- [ ] Theme changes based on team selection
- [ ] Images load properly
- [ ] Hover effects work smoothly
- [ ] Selected state is visually clear
- [ ] Confirm button enables/disables correctly
- [ ] Mobile responsive design works
- [ ] Animations perform well
- [ ] Game state updates correctly

---

## Future Enhancements

### Potential Additions
1. Team statistics and leaderboards
2. Team-specific abilities preview
3. Team history and lore
4. Multiplayer team formation
5. Team badges and achievements
6. Team chat/communication
7. Team-based missions
8. Team vs Team competitions

---

## Files Modified/Created

### Created
- `frontend/src/components/Team/TeamSelect.tsx`
- `frontend/src/components/Team/TeamSelect.css`
- `TEAM_SELECTION_IMPLEMENTATION.md`

### Modified
- `frontend/src/App.tsx`
- `frontend/src/context/GameContext.tsx`
- `frontend/src/components/Trailer/TrailerSequence.tsx`
- `frontend/src/components/Landing/LandingPage.tsx`

---

## Summary

The team selection feature adds an important strategic layer to the NEXUS PROTOCOL experience, allowing players to choose their operational role before entering the game. The implementation follows the existing design patterns and maintains consistency with the cyberpunk aesthetic throughout the application.
