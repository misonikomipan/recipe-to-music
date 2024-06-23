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

type ImageUrlObj = {
  sample: string;
  newProp?: string;  // 新しいプロパティをオプショナル（必須ではない）として追加
};


const Cookingidol = () => {
  const [content, setContent] = useState<ContentData[]>([]);
  const [makingContent, setMakingContent] = useState<ContentData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searched,setSearched] = useState<boolean>(false);
  const [recipeImageUrls, setRecipeImageUrls] = useState<ImageUrlObj>({sample:"hoge"})

  const handleReceiveData = async (data: TitleData[]) => {
    const selectedRecipe = content.find(recipe => recipe.title === data[0].title);
    if (selectedRecipe) {
      setMakingContent([selectedRecipe]);
      if (selectedRecipe.title in recipeImageUrls) {
        return;
      } else {
          try {
            console.log("start")
            const response = await axios.post(`https://blooming-fjord-37050-ff0ae84ff432.herokuapp.com/recipes/recipe-image?recipe_title=${selectedRecipe.title}&is_base64=true`);
            const image_base64 = response.data.recipe_image_base64;
            const image_url = "data:image/jpeg;base64," + image_base64;
            setRecipeImageUrls(prevState => ({
              ...prevState,
              [selectedRecipe.title]: image_url  // `newProp`を追加
            }))
            console.log(recipeImageUrls)
          } catch (error) {
            console.error('リクエストエラー:', error);
          }
        }
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
            <RecipiDisplay content={content} recipeImageUrls={recipeImageUrls} onReceiveData={handleReceiveData} isLoading={isLoading} />
            <MakingDisplay makingContent={makingContent} recipeImageUrls={recipeImageUrls} />
          </>
        )
      }
    </div>
  );
};
export default Cookingidol;