import { Header } from '@/components/Header'
import InputForm from '@/components/InputForm';
import { MakingDisplay } from '@/components/MakingDisplay';
import { RecipiDisplay } from '@/components/RecipiDisplay'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { text } from 'stream/consumers';

type IngredientData = {
  name: string;
  amount: string;
};

type ContentData = {
  title: string;//レシピ名
  text: string;//レシピの説明
  ingredients: IngredientData[];//材料名
  instructions: string[];//手順
};

type TitleData = {
  title:string;
};



const Cookingidol = () => {
  const [ingredients, setIngredients] = useState<string>('');
  const [content, setContent] = useState<ContentData[]>([]);
  const [maikingcontent, setmaikingcontent] = useState<ContentData[]>([]);
  const [item, setitem] = useState<ContentData[]>([]);
const handleReceiveData = (data: TitleData[]) => {
  const selectedRecipe = content.find(recipe => recipe.title === data[0].title);
  if (selectedRecipe) {
    setmaikingcontent([selectedRecipe]);
  }
};

  return (
    <div>
      <Header />
      <InputForm setContent={setContent} />
      <RecipiDisplay content={content} onReceiveData={handleReceiveData}/>
      <MakingDisplay maikingcontent={maikingcontent} />
    </div>
  )
}

export default Cookingidol