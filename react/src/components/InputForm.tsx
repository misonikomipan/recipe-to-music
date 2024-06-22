import React, { useState } from 'react';
import axios from 'axios';
import '@/style/inori.css'

interface InputFormProps {
  setContent: (ingredients: string) => void;
}

export const InputForm: React.FC<InputFormProps> = ({ setContent }) => {
  const [input, setInput] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const ingredients_list: Array<string> = input.split("、").map(item => item.trim());
    //console.log(ingredients_list)

    try {// レシピデータの取得
      //console.log("fetch開始")
      const response = await axios.post(`http://localhost:8000/recipes/search-by-ingredients`, {
        ingredients: ingredients_list
      });
      const apiRecipes = response.data.recipes.map((recipe: any) => ({
        title: recipe.recipe_name,
        text: recipe.recipe_description,
      }));
      setContent(apiRecipes);
      //console.log("fetch終了")
      //setmaikingcontent(response.data)
    } catch (error) {
      console.error('リクエストエラー:', error);
    }
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="材料（例：にんじん、じゃがいも、牛肉）"
        className="textarea-input"
      />
      <button
        type="submit"
        className="submit-button"
      >
        レシピ検索
      </button>
    </form>
  );
};

export default InputForm;
