//レシピ一覧のとこ
import React,{useState, useEffect} from 'react';
import '@/pages/CookingIdol'
import '@/style/soma.css'
import axios from 'axios';

type ContentData = {
  title: string;//レシピ名
  text: string;//レシピの説明
  ingredients: IngredientData[];//材料名
  instructions: string[];//手順
};
type IngredientData = {
  name: string;
  amount: string;
};
type TitleData = {
  title: string;
};
type RecipiDisplayProps = {
  content: ContentData[];
  onReceiveData: (data: TitleData[]) => void;
};


export const RecipiDisplay: React.FC<RecipiDisplayProps> = ({content,onReceiveData}) => {
  const handleClick = (index: number) => {
      const{title}=content[index];
      onReceiveData([{title}]); // 取得したデータを親コンポーネントに渡す
  };

  return( 
  <>
        {content.map((item,index) => {
          return(
            <div className="content" key={index} onClick={() => handleClick(index)}>
                  <div className="item">
                      <h2 className="title">{item.title}</h2>
                      <p className="text">{item.text}</p>
                  </div>
            </div>
        );
        })}
  </>
  )
}
/*
                <div className="item">
                    <img className="itemimg" src={item.img} alt=""></img>
                </div>*/