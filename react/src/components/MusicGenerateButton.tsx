import axios from 'axios';
import React from 'react';



type MusicGenerateButtonProps = {
    onReceiveData: (data: string) => void;
    title: string;
    url: string;
};

export const MusicGenerateButton: React.FC<MusicGenerateButtonProps> = ({ title, onReceiveData, url }) => {
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            // const tmp = "test.mp3";
            const response = await axios.post('https://blooming-fjord-37050-ff0ae84ff432.herokuapp.com/recipes/recipe-to-speech?recipe=1.%20%E3%81%AB%E3%82%93%E3%81%98%E3%82%93%E3%82%92%E3%81%BF%E3%81%98%E3%82%93%E5%88%87%E3%82%8A%E3%81%AB%E3%80%81%E3%82%B8%E3%83%A3%E3%82%AC%E3%82%A4%E3%83%A2%E3%82%92%E7%9A%AE%E3%82%92%E3%82%80%E3%81%84%E3%81%A6%E3%81%BF%E3%81%98%E3%82%93%E5%88%87%E3%82%8A%E3%81%AB%E3%81%97%E3%81%BE%E3%81%99%E3%80%822.%20%E3%83%95%E3%83%A9%E3%82%A4%E3%83%91%E3%83%B3%E3%81%AB%E3%83%90%E3%82%BF%E3%83%BC%E3%82%92%E7%86%B1%E3%81%97%E3%81%A6%E3%80%81%E3%81%AB%E3%82%93%E3%81%98%E3%82%93%E3%81%A8%E3%82%B8%E3%83%A3%E3%82%AC%E3%82%A4%E3%83%A2%E3%82%92%E7%82%92%E3%82%81%E3%81%BE%E3%81%99%E3%80%823.%20%E3%83%81%E3%82%AD%E3%83%B3%E3%83%96%E3%83%AD%E3%82%B9%E3%82%92%E5%8A%A0%E3%81%88%E3%81%A6%E3%80%81%E3%82%B9%E3%83%BC%E3%83%97%E3%82%92%E4%BD%9C%E3%82%8A%E4%B8%8A%E3%81%92%E3%81%BE%E3%81%99%E3%80%824.%20%E5%A1%A9%E3%82%92%E5%8A%A0%E3%81%88%E3%81%A6%E3%80%81%E5%91%B3%E3%82%92%E8%AA%BF%E6%95%B4%E3%81%97%E3%81%BE%E3%81%99%E3%80%82&speech_file_name=test.wav', {
                // recipe: "これはテストです",
                //speech_file_name: "test.mp3"
            }, {
                responseType: 'blob'
            });
            const blob = new Blob([response.data]);
            const speech_file_url = URL.createObjectURL(blob);
            onReceiveData(speech_file_url);

            //const mp3File = new File([response.data], 'recipe.mp3', { type: 'audio/mp3' });
            //onReceiveData({ music: mp3File });
        } catch (error) {
            console.error('リクエストエラー:', error);
        }
    };

    return (
        <button onClick={handleSubmit}>
            音楽生成
        </button>
    );
};
