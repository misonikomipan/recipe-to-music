import { Header } from '@/components/Header'
import InputForm from '@/components/InputForm';
import { MakingDisplay } from '@/components/MakingDisplay';
import { RecipiDisplay } from '@/components/RecipiDisplay'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { text } from 'stream/consumers';


const TestDate = [
  {
    img: "https://images.dog.ceo/breeds/spaniel-brittany/n02101388_6057.jpg",
    title: "タイトルテキスト",
    text: "ここにはレシピ紹介の文が入ります。"
  },
  {
    img: "https://images.dog.ceo/breeds/spaniel-brittany/n02101388_6057.jpg",
    title: "Title2",
    text: "Text2"
  }
];
const TestData2 = [
  {
    title: "Title",
    text1: "Text",
    text2: "text"
  }
];

const Cookingidol = () => {
  const [content, setContent] = useState(TestDate);
  const [maikingcontent, setMaikingcontent] = useState(TestData2);
  const [ingredients, setIngredients] = useState<string>('');


  return (
    <div>
      <Header />
      <InputForm setContent={setContent} />
      <RecipiDisplay content={content} />
      <MakingDisplay maikingcontent={maikingcontent} />
    </div>
  )
}

export default Cookingidol