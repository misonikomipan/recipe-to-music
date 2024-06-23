import React, { useState } from 'react';
import '@/style/soma.css';
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
  makingContent: ContentData[];
};

interface ImageUrlObj {
  [prop: string]: any
}


export const MakingDisplay: React.FC<MakingDisplayProps> = ({ makingContent }) => {
  const [musicUrl, setMusicUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recipeImageUrl, setRecipeImageUrl] = useState<ImageUrlObj>({})

  const handleReceiveData = (url: string) => {
    setMusicUrl(url);
    setIsLoading(false);
  };

  const handleGenerateMusic = () => {
    setIsLoading(true);
  };

  return (
    <>
      {makingContent.map((item, index) => (
        <div key={index}>
<<<<<<< Updated upstream
          <div className='making width center'>
            <h3 className='center title-jp textcenter'>{item.title}</h3>
            <p className='text center width'>{item.text}</p>
            <h3 className='center title-jp textcenter'>材料</h3>
            <div>
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
=======
          {recipeImageUrl[item.title] && <img src={recipeImageUrl[item.title]}></img>}
          <div className='making-container'>
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
>>>>>>> Stashed changes
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
        </div>
      ))}
    </>
  );
};