import boto3

def text_to_speech(text, output_file_path):
    polly = boto3.client('polly')
    
    try:
        # Pollyにリクエストを送信
        response = polly.synthesize_speech(
            Text=text,
            OutputFormat='mp3', 
            VoiceId='Mizuki'  # 'Takumi' or 'Mizuki'
        )
    except Exception as e:
        print("Error occurred while converting text to speech:", str(e))
        return None

    # 音声データをファイルに書き込み
    with open(output_file_path, 'wb') as file:
        file.write(response['AudioStream'].read())
    print("success: text_to_speech")
    return output_file_path


def main():
    text = "こんにちは、これはテストです。"
    output_file = "speech.mp3"
    text_to_speech(text, output_file)


if __name__ == "__main__":
    main()
    print("音声ファイルを作成しました。")