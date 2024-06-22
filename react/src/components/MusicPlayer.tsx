import React from 'react';
import '@/style/soma.css'

type MusicPlayerProps = {
  musicPath: string;
};

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ musicPath }) => {
  return (
    <div >
        <audio className="center flex" src={musicPath} controls></audio>
    </div>
  );
};