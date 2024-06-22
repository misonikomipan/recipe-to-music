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
        <div className='making width center'>
          <h3 className='center title-jp textcenter' key={index}>{item.title}</h3>
          <p className='text center  width'>{item.text}</p>
          <h3 className='center title-jp textcenter'>材料</h3>
          <div className=''>
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
        </div>
      ))}
        <button className="button-1 lastbutton text-jp width">音楽にする</button>
        </>
    )
}