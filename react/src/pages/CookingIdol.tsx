import { Header } from '@/components/Header'
import { MakingDisplay } from '@/components/MakingDisplay';
import { RecipiDisplay } from '@/components/RecipiDisplay'
import axios from 'axios';
import React,{useState, useEffect} from 'react';
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
  const [content, setcontent] = useState<ContentData[]>([]);
  const [maikingcontent, setmaikingcontent] = useState<ContentData[]>([]);
  const [item, setitem] = useState<ContentData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try{// レシピデータの取得
        //const response = await axios.get('http://localhost:8000/');
        const response = await axios.post(`http://localhost:8000/recipes/search-by-ingredients`,{
          ingredients:["じゃがいも","にんじん"]
        });
        const apiRecipes = response.data.recipes.map((recipe: any) => ({
          title: recipe.recipe_name,//レシピ名
          text: recipe.recipe_description,//レシピの説明
          ingredients: recipe.ingredients.map((ing: any) => ({
            name: ing.ingredient_name,
            amount: ing.ingredient_amount
          })),
          instructions:recipe.instructions//手順
        }));
        setcontent(apiRecipes);
        setitem(apiRecipes);
        //setmaikingcontent(response.data)
      }catch(error){
        console.error('リクエストエラー:', error); 
      }
    };
  fetchData();
  },[]);

  const handleReceiveData = (data: TitleData[]) => {
    const selectedRecipe = content.find(recipe => recipe.title === data[0].title);
    if (selectedRecipe) {
      setmaikingcontent([selectedRecipe]);
    }
  };
    return (
      <div>
        <Header />
        <RecipiDisplay content={content} onReceiveData={handleReceiveData}/>
        <MakingDisplay maikingcontent={maikingcontent}/>
      </div>
    )
  }

  export default Cookingidol