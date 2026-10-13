import React from 'react';

/**
 * Full Apple Intelligence Assistant Pill Badge Logo
 * ViewBox: 0 0 320 96
 */
export const AssistantPillLogo = ({ className = "w-44 h-auto", isDark = false, ...props }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 320 96" 
      className={className}
      {...props}
    >
      <defs>
        {/* Background subtle gradient */}
        <linearGradient id="pill-bg-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={isDark ? "#24252c" : "#ffffff"} />
          <stop offset="100%" stopColor={isDark ? "#181920" : "#fbfbfd"} />
        </linearGradient>
        
        {/* Sparkle Apple Intelligence gradient */}
        <linearGradient id="sparkle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff9500" />
          <stop offset="45%" stopColor="#ff2d55" />
          <stop offset="100%" stopColor="#5856d6" />
        </linearGradient>

        {/* Pulsing active status glow */}
        <radialGradient id="status-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#34c759" stopOpacity="1" />
          <stop offset="70%" stopColor="#30d158" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#248a3d" stopOpacity="0.4" />
        </radialGradient>
        
        {/* Soft shadow filter for Apple card elevation */}
        <filter id="soft-shadow" x="-10%" y="-20%" width="120%" height="150%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000000" floodOpacity={isDark ? "0.35" : "0.07"} />
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000000" floodOpacity={isDark ? "0.2" : "0.04"} />
        </filter>
      </defs>

      {/* Container Pill Badge (Cathedral of White Space: 980px pill radius, hairline border) */}
      <rect 
        x="6" 
        y="10" 
        width="308" 
        height="76" 
        rx="38" 
        ry="38" 
        fill="url(#pill-bg-grad)" 
        stroke={isDark ? "rgba(255, 255, 255, 0.16)" : "#d6d6d6"} 
        strokeWidth="1.2" 
        filter="url(#soft-shadow)" 
      />

      {/* Inner Soft Wash Highlight */}
      <rect 
        x="8" 
        y="12" 
        width="304" 
        height="72" 
        rx="36" 
        ry="36" 
        fill="none" 
        stroke={isDark ? "rgba(255, 255, 255, 0.08)" : "#ffffff"} 
        strokeWidth="1.5" 
        strokeOpacity="0.9" 
      />

      {/* Left Icon Orb Container */}
      <g transform="translate(24, 23)">
        {/* Subtle circular wash */}
        <circle cx="25" cy="25" r="25" fill={isDark ? "#2a2b34" : "#f5f5f7"} />
        <circle cx="25" cy="25" r="24" fill="none" stroke={isDark ? "rgba(255, 255, 255, 0.1)" : "#e8e8ed"} strokeWidth="1" />

        {/* Apple Intelligence Multi-Star Sparkle Icon */}
        {/* Primary 4-pointed Star */}
        <path d="M 23 9 C 23 17 17 23 9 23 C 17 23 23 29 23 37 C 23 29 29 23 37 23 C 29 23 23 17 23 9 Z" fill="url(#sparkle-grad)" />
        
        {/* Secondary Small Star Upper Right */}
        <path d="M 33 11 C 33 13.8 30.8 16 28 16 C 30.8 16 33 18.2 33 21 C 33 18.2 35.2 16 38 16 C 35.2 16 33 13.8 33 11 Z" fill="url(#sparkle-grad)" opacity="0.85" />

        {/* Tiny Star Lower Left */}
        <path d="M 14 31 C 14 32.8 12.2 34 10.5 34 C 12.2 34 14 35.2 14 37 C 14 35.2 15.8 34 17.5 34 C 15.8 34 14 32.8 14 31 Z" fill="url(#sparkle-grad)" opacity="0.75" />
      </g>

      {/* Typographic Label: "Assistant" */}
      <text 
        x="88" 
        y="54" 
        fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif" 
        fontSize="24" 
        fontWeight="600" 
        letterSpacing="-0.3" 
        fill={isDark ? "#ffffff" : "#1d1d1f"}
      >
        Assistant
      </text>

      {/* Live Status Beacon Indicator */}
      <g transform="translate(254, 48)">
        {/* Outer ambient ring with CSS ping-like style */}
        <circle cx="0" cy="0" r="10" fill="#34c759" opacity="0.18" className="animate-pulse" />
        {/* Middle ring */}
        <circle cx="0" cy="0" r="7" fill="#34c759" opacity="0.3" />
        {/* Inner solid core dot */}
        <circle cx="0" cy="0" r="4.5" fill="url(#status-glow)" />
        <circle cx="-1" cy="-1" r="1.5" fill="#ffffff" opacity="0.7" />
      </g>
    </svg>
  );
};

/**
 * Multi-Star Apple Intelligence Sparkle Icon for Modal Header & Avatars
 */
export const AppleIntelligenceSparkle = ({ className = "w-6 h-6", ...props }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 50 50" 
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="header-sparkle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff9500" />
          <stop offset="45%" stopColor="#ff2d55" />
          <stop offset="100%" stopColor="#5856d6" />
        </linearGradient>
      </defs>
      {/* Primary 4-pointed Star */}
      <path d="M 23 9 C 23 17 17 23 9 23 C 17 23 23 29 23 37 C 23 29 29 23 37 23 C 29 23 23 17 23 9 Z" fill="url(#header-sparkle-grad)" />
      
      {/* Secondary Small Star Upper Right */}
      <path d="M 33 11 C 33 13.8 30.8 16 28 16 C 30.8 16 33 18.2 33 21 C 33 18.2 35.2 16 38 16 C 35.2 16 33 13.8 33 11 Z" fill="url(#header-sparkle-grad)" opacity="0.85" />

      {/* Tiny Star Lower Left */}
      <path d="M 14 31 C 14 32.8 12.2 34 10.5 34 C 12.2 34 14 35.2 14 37 C 14 35.2 15.8 34 17.5 34 C 15.8 34 14 32.8 14 31 Z" fill="url(#header-sparkle-grad)" opacity="0.75" />
    </svg>
  );
};
