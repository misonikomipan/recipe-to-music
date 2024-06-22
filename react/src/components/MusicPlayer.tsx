import React from 'react';

type MusicPlayerProps = {
  musicPath: string;
};

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ musicPath }) => {
  return (
    <div>
        <audio src={musicPath} controls></audio>
    </div>
  );
};