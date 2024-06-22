import React, { useEffect } from 'react';
import { Howl } from 'howler';

type MusicPlayerProps = {
  musicPath: string;
};

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ musicPath }) => {
  useEffect(() => {
    if (musicPath) {
      const playDynamicMusic = () => {
        const sound = new Howl({
          src: [musicPath], // 音楽データのURLを指定する
          loop: false, // ループ再生を無効にする場合は false
          volume: 1.0, // 音量を設定する（0〜1の範囲）
          format: ["mp3"],
          onplay: () => {
            console.log("再生中");
          },
          onstop: () => {
            console.log("停止");
          },
          onpause: () => {
            console.log("一時停止");
          },
          onend: () => {
            console.log("終了");
          }
        });

        // 再生開始
        sound.play();

        // 一定時間後に停止する例
        setTimeout(() => {
          sound.stop();
        }, 10000); // 10秒後に停止

        // クリーンアップ関数を返して、コンポーネントのアンマウント時にリソースを解放する
        return () => {
          sound.unload();
        };
      };

      playDynamicMusic();
    }
  }, [musicPath]);

  return (
    <div>
        <audio src={musicPath}></audio>
        <p>音楽を再生中...</p>
    </div>
  );
};