import React from 'react';
import '@/style/inori.css'

type MusicPlayerProps = {
  musicPath: string;
};

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ musicPath }) => {
  return (
    <div className="player-container">
        <audio src={musicPath} controls></audio>
    </div>
  );
};