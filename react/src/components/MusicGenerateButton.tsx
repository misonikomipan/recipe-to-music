import axios from 'axios';
import React from 'react';



type MusicGenerateButtonProps = {
    onReceiveData: (data: string) => void;
    title: string;
    recipe: string;
    speech_file_name: string;
};

export const MusicGenerateButton: React.FC<MusicGenerateButtonProps> = ({ title, recipe, onReceiveData, speech_file_name }) => {
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            // const tmp = "test.mp3";
            const response = await axios.post(`https://blooming-fjord-37050-ff0ae84ff432.herokuapp.com/recipes/recipe-to-speech?recipe=${recipe}&speech_file_name=${speech_file_name}`, {
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
