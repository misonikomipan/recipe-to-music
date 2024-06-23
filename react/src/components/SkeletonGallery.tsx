import React from 'react';
import '@/style/soma.css'

export const SkeletonGallery = () => {
  return (
  <div className="audio-player-skeleton center">
    <div className="play-button-skeleton"></div>
    <div className="progress-bar-skeleton"></div>
    <div className="volume-button-skeleton"></div>
  </div>
  );
};

