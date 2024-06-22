import axios from 'axios';
import React, { useState } from 'react';
import '@/style/soma.css';

type MusicGenerateButtonProps = {
    onReceiveData: (data: string) => void;
    title: string;
    recipe: string;
    speech_file_name: string;
    onGenerateMusic: () => void;
};

export const MusicGenerateButton: React.FC<MusicGenerateButtonProps> = ({ title, recipe, onReceiveData, speech_file_name, onGenerateMusic }) => {
    const [isDelayed, setIsDelayed] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        onGenerateMusic();
        setIsDelayed(true);

        setTimeout(async () => {
            try {
                const response = await axios.post(`https://blooming-fjord-37050-ff0ae84ff432.herokuapp.com/recipes/recipe-to-speech?recipe=${recipe}&speech_file_name=${speech_file_name}`, {
                }, {
                    responseType: 'blob'
                });
                const blob = new Blob([response.data]);
                const speech_file_url = URL.createObjectURL(blob);
                onReceiveData(speech_file_url);
            } catch (error) {
                console.error('リクエストエラー:', error);
            } finally {
                setIsDelayed(false);
            }
        }, 5000); // 10秒遅延
    };

    return (
        <button className="up-margin button-1" onClick={handleSubmit} disabled={isDelayed}>
          {isDelayed ? (
            <div className="loading-text">
              <span>生成中</span><span className="dot-animation"></span>
            </div>
          ) : (
            '音楽生成'
          )}
        </button>
    );
};