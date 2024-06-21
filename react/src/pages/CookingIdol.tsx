import { Header } from '@/components/Header'
import { MakingDisplay } from '@/components/MakingDisplay';
import { RecipiDisplay } from '@/components/RecipiDisplay'
import axios from 'axios';
import React,{useState, useEffect} from 'react';
import { text } from 'stream/consumers';


 const TestDate = [
    {
      img: "https://images.dog.ceo/breeds/spaniel-brittany/n02101388_6057.jpg",
      title : "タイトルテキスト",
      text : "ここにはレシピ紹介の文が入ります。"
    },
    {
      img: "https://images.dog.ceo/breeds/spaniel-brittany/n02101388_6057.jpg",
      title : "Title2",
      text : "Text2"
    }
  ];
  const TestData2 = [
    {
      title: "Title",
      text1:"Text",
      text2:"text"
    }
  ];

const Cookingidol = () => {
  const[content,setcontent]=useState(TestDate);
  const[maikingcontent,setmaikingcontent]=useState(TestData2);
  useEffect(() => {
    const fetchData = async () => {
      try{// レシピデータの取得
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/recipes`);
        setcontent(response.data);
        setmaikingcontent(response.data)
      }catch(error){
        console.error('リクエストエラー:', error); 
      }
    };
  fetchData();
  },[]);
    return (
      <div>
        <Header />
        <RecipiDisplay content={content}/>
        <MakingDisplay maikingcontent={maikingcontent}/>
      </div>
    )
  }

  export default Cookingidol