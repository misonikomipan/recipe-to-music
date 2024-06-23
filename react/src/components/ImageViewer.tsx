import axios from 'axios';
import React, { useState } from 'react';
import '@/style/inori.css';

type ImageViewerProps = {
    recipe_name: string;
};
type ImageSrc={
    [key:string]: string;//keyがレシピ名
}
function base64StrToImageSrc(base64_str: string) {
    return 'data:image/png;base64,' + base64_str;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ recipe_name }) => {
    const [isDelayed, setIsDelayed] = useState<boolean>(false);
    //const [imageSrc, setImageSrc] = useState<string>('');
    const [imageSrc, setImageSrc] = useState<ImageSrc>({});

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsDelayed(true);
        if(!imageSrc){
            setTimeout(async () => {
                try {
                    //const response = await axios.post(`http://localhost:8000/recipes/recipe-image?recipe_title=${recipe_name}&is_base64=true`, {
                    const response=await axios.get('',{
                    
                    });
                    const image_base64 = response.data.recipe_image_base64;
                    //setImageSrc(base64StrToImageSrc(image_base64));
                    const newImageSrc = { [recipe_name]: base64StrToImageSrc(image_base64) };
                    setImageSrc(newImageSrc);
                } catch (error) {
                    console.error('リクエストエラー:', error);
                } finally {
                    setIsDelayed(false);
                }
            }, 5000); // 5秒遅延
        };
    
        }
        
    return (
        <>
            <button className="up-margin button-1" onClick={handleSubmit} disabled={isDelayed}>
            {isDelayed ? (
                <div className="loading-text">
                <span>画像生成中</span><span className="dot-animation"></span>
                </div>
            ) : (
                '画像生成'
            )}
            </button>
            {imageSrc && (
                <img className='recipi-image' src={imageSrc[recipe_name]} alt="レシピ画像"  />
            )}
        </>
    );
};