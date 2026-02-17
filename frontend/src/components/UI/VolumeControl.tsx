/**
 * NEXUS PROTOCOL - YouTube-Style Volume Control
 * Advanced volume control with hover slider
 * Version: 1.0.0
 * Last Updated: February 17, 2026
 */

import { useState, useRef, useEffect } from 'react';
import { useAudio } from '../../context/AudioContext';
import './VolumeControl.css';

export default function VolumeControl() {
  const { isMuted, volume, toggleMute, setVolume, audioStarted } = useAudio();
  const [showSlider, setShowSlider] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Show slider on hover
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowSlider(true);
  };

  // Hide slider after delay
  const handleMouseLeave = () => {
    if (!isDragging) {
      timeoutRef.current = setTimeout(() => {
        setShowSlider(false);
      }, 500);
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const height = rect.height;
    const newVolume = Math.max(0, Math.min(1, 1 - (y / height)));
    
    setVolume(newVolume);
  };

  // Handle mouse down on slider
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleVolumeChange(e);
  };

  // Handle mouse move while dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && sliderRef.current) {
        const rect = sliderRef.current.getBoundingClientRect();
        const y = e.clientY - rect.top;
        const height = rect.height;
        const newVolume = Math.max(0, Math.min(1, 1 - (y / height)));
        setVolume(newVolume);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, setVolume]);

  // Get volume icon based on level
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return (
        <svg className="volume-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
        </svg>
      );
    } else if (volume < 0.3) {
      return (
        <svg className="volume-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 9v6h4l5 5V4l-5 5H7z"/>
        </svg>
      );
    } else if (volume < 0.7) {
      return (
        <svg className="volume-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
        </svg>
      );
    } else {
      return (
        <svg className="volume-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
      );
    }
  };

  // Don't show until audio is started
  if (!audioStarted) return null;

  return (
    <div 
      className="volume-control-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Volume Slider */}
      <div className={`volume-slider-container ${showSlider ? 'visible' : ''}`}>
        <div className="volume-slider-wrapper">
          <div 
            ref={sliderRef}
            className="volume-slider"
            onMouseDown={handleMouseDown}
          >
            <div className="volume-slider-track">
              <div 
                className="volume-slider-fill"
                style={{ height: `${isMuted ? 0 : volume * 100}%` }}
              />
            </div>
            <div 
              className="volume-slider-thumb"
              style={{ bottom: `${isMuted ? 0 : volume * 100}%` }}
            />
          </div>
          <div className="volume-percentage">
            {Math.round((isMuted ? 0 : volume) * 100)}%
          </div>
        </div>
      </div>

      {/* Volume Button */}
      <button 
        className="volume-button"
        onClick={toggleMute}
        title={isMuted ? "Unmute" : "Mute"}
      >
        {getVolumeIcon()}
        <div className="volume-button-glow" />
      </button>
    </div>
  );
}
