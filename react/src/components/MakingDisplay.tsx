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
        
        <div>
        <div className='making width center'>
          <h3 className='center title-jp textcenter' key={index}>{item.title}</h3>
          <p className='text center  width'>{item.text}</p>
          <h3 className='center title-jp textcenter'>材料</h3>
          <div className=''>
            <ul className='wrap width center'>
              {item.ingredients.map((ingredient, i) => (
                <li key={i} className='text two'>{ingredient.name}: {ingredient.amount}</li>
              ))}
             </ul>
          </div>
          <h3 className='center title-jp textcenter'>手順</h3>
          <div>
            <ol className='center width'>
              {item.instructions.map((instruction, i) => (
                <li key={i} className='text'>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
          <MusicGenerateButton title={item.title} recipe={item.instructions.join()} onReceiveData={handleReceiveData} speech_file_name={'react/public/Sunlit_Puddles.mp3'} />
          {musicUrl && <MusicPlayer musicPath={musicUrl} />}
        </div>
      ))}
    </>
  );
};
