import React, { useState } from 'react';
import '@/style/soma.css';
import { MusicGenerateButton } from './MusicGenerateButton';
import { MusicPlayer } from './MusicPlayer';

type IngredientData = {
  name: string;
  amount: string;
};

type ContentData = {
  title: string;
  text: string;
  ingredients: IngredientData[];
  instructions: string[];
};

type MakingDisplayProps = {
  maikingcontent: ContentData[];
};

type MusicData = {
  music: string;
};

export const MakingDisplay: React.FC<MakingDisplayProps> = ({ maikingcontent }) => {
  const [musicUrl, setMusicUrl] = useState<string>('');

  const handleReceiveData = (url: string) => {
    setMusicUrl(url);
  };

  return (
    <>
      {maikingcontent.map((item, index) => (
        <div key={index}>
          <h3 className="center title-jp">{item.title}</h3>
          <p>{item.text}</p>
          <hr />
          <h3 className="center title-jp">材料</h3>
          <ul>
            {item.ingredients.map((ingredient, i) => (
              <li key={i}>{ingredient.name}: {ingredient.amount}</li>
            ))}
          </ul>
          <h3 className="center title-jp">手順</h3>
          <ol>
            {item.instructions.map((instruction, i) => (
              <li key={i}>{instruction}</li>
            ))}
          </ol>
          <MusicGenerateButton title={item.title} onReceiveData={handleReceiveData} url={'react/public/Sunlit_Puddles.mp3'} />
          {musicUrl && <MusicPlayer musicPath={musicUrl} />}
        </div>
      ))}
    </>
  );
};
