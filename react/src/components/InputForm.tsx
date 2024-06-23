import React, { Dispatch, SetStateAction, useState } from 'react';
import axios from 'axios';
import '@/style/inori.css';

interface IngredientData {
  name: string;
  amount: string;
}

interface ContentData {
  title: string;
  text: string;
  ingredients: IngredientData[];
  instructions: string[];
}

interface InputFormProps {
  setContent: (ingredients: ContentData[]) => void;
  onGenerateInput: () => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setIsSearched: Dispatch<SetStateAction<boolean>>
}

export const InputForm: React.FC<InputFormProps> = ({ setContent, onGenerateInput,setIsLoading,setIsSearched}) => {
  const [input, setInput] = useState<string>('');
  const [isDelayed, setIsDelayed] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    setIsSearched(true)
    event.preventDefault();
    onGenerateInput();
    setIsDelayed(true);
    const ingredients_list: Array<string> = input.split('、').map(item => item.trim());

    setTimeout(async () => {
      try {
        const response = await axios.post(`https://blooming-fjord-37050-ff0ae84ff432.herokuapp.com/recipes/search-by-ingredients`, {
          ingredients: ingredients_list
        });
        const apiRecipes = response.data.recipes.map((recipe: any) => ({
          title: recipe.recipe_name,
          text: recipe.recipe_description,
          ingredients: recipe.ingredients.map((ing: any) => ({
            name: ing.ingredient_name,
            amount: ing.ingredient_amount
          })),
          instructions: recipe.instructions
        }));
        setIsLoading(true)
        setContent(apiRecipes);
      } catch (error) {
        console.error('リクエストエラー:', error);
      } finally {
        setIsDelayed(false);
      }
    }, 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="材料（例：にんじん、じゃがいも、牛肉）"
        className="textarea-input"
      />
      <button type="submit" className="submit-button width" disabled={isDelayed}>
        {isDelayed ? <span className='find'>検索中</span> : <span>レシピ検索</span>}
      </button>
    </form>
  );
};