import React, { useState } from 'react';
import '@/style/soma.css';
import '@/style/inori.css';
import { MusicGenerateButton } from './MusicGenerateButton';
import { MusicPlayer } from './MusicPlayer';
import { SkeletonGallery } from './SkeletonGallery';

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

export const MakingDisplay: React.FC<MakingDisplayProps> = ({ maikingcontent }) => {
  const [musicUrl, setMusicUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleReceiveData = (url: string) => {
    setMusicUrl(url);
    setIsLoading(false);
  };

  const handleGenerateMusic = () => {
    setIsLoading(true);
  };

  return (
    <>
      {maikingcontent.map((item, index) => (
        <>
          <div key={index} className='making-container'>
            <h3 className="center title-jp">{item.title}</h3>
            <p>{item.text}</p>
            
            <h3 className="center title-jp">材料</h3>
            <ul className="ingredients-list">
              {item.ingredients.map((ingredient, i) => (
                <li key={i}>{ingredient.name}: {ingredient.amount}</li>
              ))}
            </ul>
            <h3 className="center title-jp">手順</h3>
            <ol className="process-list">
              {item.instructions.map((instruction, i) => (
                <li key={i}>{instruction}</li>
              ))}
            </ol>
          </div>
          <div>
            <MusicGenerateButton title={item.title} recipe={item.instructions.join()} onReceiveData={handleReceiveData} speech_file_name={'react/public/Sunlit_Puddles.mp3'} />
            {musicUrl && <MusicPlayer musicPath={musicUrl} />}
          </div>
        </>
        
          <div key={index} className='making-container'>
            <h3 className="center title-jp">{item.title}</h3>
            <p>{item.text}</p>
            
            <h3 className="center title-jp">材料</h3>
            <ul className="ingredients-list">
              {item.ingredients.map((ingredient, i) => (
                <li key={i}>{ingredient.name}: {ingredient.amount}</li>
              ))}
            </ul>
            <h3 className="center title-jp">手順</h3>
            <ol className="process-list">
              {item.instructions.map((instruction, i) => (
                <li key={i}>{instruction}</li>
              ))}
            </ol>
          </div>
          <MusicGenerateButton 
            title={item.title} 
            recipe={item.instructions.join()} 
            onReceiveData={handleReceiveData} 
            speech_file_name={'react/public/Sunlit_Puddles.mp3'} 
            onGenerateMusic={handleGenerateMusic}
          />
          <div className="gallery__grid">
            {isLoading ? (
              <SkeletonGallery />
            ) : (
              musicUrl && <MusicPlayer musicPath={musicUrl} />
            )}
          </div>
        </div>\
      ))}
    </>
  );
};