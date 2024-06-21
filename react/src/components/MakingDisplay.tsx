//音楽にするまで
import React from 'react'
import '@/style/soma.css'

type ContentData = {
    img: string;
    title: string;
    text: string;
  };
  
  type MakingDisplayProps = {
    maikingcontent: ContentData[];
  };

export const MakingDisplay: React.FC<MakingDisplayProps> = ({maikingcontent}) => {
    return(
        <>
        <h3 className='center title-jp'>作り方</h3>
        <hr />        
        
            
        <button className="button-1 lastbutton text-jp">レシピ検索</button>
        </>
    )
}