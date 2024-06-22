//音楽にするまで
import React from 'react'
import '@/style/soma.css'

  
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

  type MakingDisplayProps = {
    maikingcontent: ContentData[];
  };

export const MakingDisplay: React.FC<MakingDisplayProps> = ({maikingcontent}) => {
    return(
        <>
      {maikingcontent.map((item, index) => (
        <div>
          <h3 className='center title-jp' key={index}>{item.title}</h3>
          <p>{item.text}</p>
          <hr />
          <h3 className='center title-jp'>材料</h3>
          <ul>
            {item.ingredients.map((ingredient, i) => (
              <li key={i}>{ingredient.name}: {ingredient.amount}</li>
            ))}
          </ul>
          <h3 className='center title-jp'>手順</h3>
          <ol>
            {item.instructions.map((instruction, i) => (
              <li key={i}>{instruction}</li>
            ))}
          </ol>
        </div>
      ))}
        <button className="button-1 lastbutton text-jp">レシピ検索</button>
        </>
    )
}