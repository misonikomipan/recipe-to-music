//レシピ一覧のとこ
import React,{useState, useEffect} from 'react';
import '@/pages/CookingIdol'
import '@/style/soma.css'

type ContentData = {
  img: string;
  title: string;
  text: string;
};

type RecipiDisplayProps = {
  content: ContentData[];
};

export const RecipiDisplay: React.FC<RecipiDisplayProps> = ({content}) => {
  return( 
  <>
      <main>
      {content.map((item,index) => {
        return(
           <div className="content" key={index}>
                <div className="item">
                    <img className="itemimg" src={item.img} alt=""></img>
                </div>
                <div className="item">
                    <h2 className="title">{item.title}</h2>
                    <p className="text">{item.text}</p>
                </div>
           </div>
      );
      })}
    </main>
  </>
  )
}