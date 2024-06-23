import { Header } from '@/components/Header';
import { InputForm } from '@/components/InputForm';
import { MakingDisplay } from '@/components/MakingDisplay';
import { MusicPlayer } from '@/components/MusicPlayer';
import { RecipiDisplay } from '@/components/RecipiDisplay';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

type IngredientData = {
  name: string;
  amount: string;
};

type ContentData = {
  title: string; // レシピ名
  text: string; // レシピの説明
  ingredients: IngredientData[]; // 材料名
  instructions: string[]; // 手順
};

type TitleData = {
  title: string;
};

const Cookingidol = () => {
  const [content, setContent] = useState<ContentData[]>([]);
  const [makingContents, setMakingContent] = useState<ContentData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searched,setSearched] = useState<boolean>(false);

  const handleReceiveData = (data: TitleData[]) => {
    const selectedRecipe = content.find(recipe => recipe.title === data[0].title);
    console.log(selectedRecipe)
    if (selectedRecipe) {
      setMakingContent([selectedRecipe]);
    }
  };

  const handleGenerateInput = () => {
    setIsLoading(false);
  };

  return (
    <div>
      <Header />
      <InputForm setContent={setContent} onGenerateInput={handleGenerateInput} setIsLoading={setIsLoading} setIsSearched={setSearched}/>
      {
        searched && (
          <>
            <RecipiDisplay content={content} onReceiveData={handleReceiveData} isLoading={isLoading} />
            <MakingDisplay makingContent={makingContent} />
          </>
        )
      }
    </div>
  );
};
export default Cookingidol;