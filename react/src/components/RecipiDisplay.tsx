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
/*勉強メモ
//importに{}　複数の細かいやつ
//export default RecipiDisplay import{}いらない 一つのでかいやつ
mapを使うと関数を繰り返し読み込ませることができる的な奴
例
1回目
```
item:
{
  img: "https://images.dog.ceo/breeds/spaniel-brittany/n02101388_6057.jpg",
  title: "タイトルテキスト",
  text: "ここにはレシピ紹介の文が入ります。"
}
  index: 0
```
2回目
```
item:
{
  img: "https://images.dog.ceo/breeds/spaniel-brittany/n02101388_6057.jpg",
  title: "Title2",
  text: "Text2"
}
  index: 1
```
React.FC<RecipiDisplayProps> はRecipiDisplayコンポーネントがRecipiDisplayPropsの型のpropsを受け取れる
RecipiDisplayProps型はcontentプロパティがContentData型の配列であることを定義
``` RecipiDisplayProps 型の定義
type RecipiDisplayProps = {
  content: ContentData[];
};
```
なぜmapでkeyがあったほうがいい？
パフォーマンス向上など
*/