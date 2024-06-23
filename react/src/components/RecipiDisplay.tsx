//レシピ一覧のとこ
import React,{useState, useEffect} from 'react';
import { SkeletonRecipe } from './SkeletonRecipe';
import '@/pages/CookingIdol'
import '@/style/soma.css'
import '@/style/inori.css'
import axios from 'axios';

type ContentData = {
  title: string; // レシピ名
  text: string; // レシピの説明
  ingredients: IngredientData[]; // 材料名
  instructions: string[]; // 手順
};

type IngredientData = {
  name: string;
  amount: string;
};

type TitleData = {
  title: string;
};

type ImageUrlObj = {
  sample: string;
  newProp?: string;  // 新しいプロパティをオプショナル（必須ではない）として追加
};

type RecipiDisplayProps = {
  content: ContentData[];
  recipeImageUrls: ImageUrlObj;
  onReceiveData: (data: TitleData[]) => void;
  isLoading: boolean;
};

export const RecipiDisplay: React.FC<RecipiDisplayProps> = ({ content, recipeImageUrls, onReceiveData, isLoading }) => {
  const handleClick = (index: number) => {
    const { title } = content[index];
    onReceiveData([{ title }]); // 取得したデータを親コンポーネントに渡す
  };

  if (!isLoading) {
    return <SkeletonRecipe />;
  }

  return (
    <>
      {content.map((item, index) => (
        <div className="content" key={index} onClick={() => handleClick(index)}>
          <div className="item">
            <h2 className="title">{item.title}</h2>
            <p className="text">{item.text}</p>
          </div>
        </div>
      ))}
    </>
  );
};
