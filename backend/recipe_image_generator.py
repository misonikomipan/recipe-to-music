import os
import json
import random
import base64
import boto3
from groq import Groq
from io import BytesIO
from PIL import Image
from XML_parser import parse_description


def recipe_description_generator(recipe_name):
    groq_client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
    )
    prompt = f"""
        回答は英語でおねがいします。あなたのタスクは、提供された料理名に基づいた画像をstable diffusionで生成するためのプロンプトを提案することです。私が料理名を提供するので、料理名から画像を生成するプロンプトを生成してください
        以下が使用できる食材です:
        <repcipe_name>{recipe_name}</repcipe_name>
        まず、料理名から画像を生成するプロンプトを生成してください。プロンプトを<prompt>タグ内に書き出してください。
        <prompt>
        ...
        </prompt>
        注意点：回答は英語でおねがいします。プロンプトは、料理名から画像を生成するための指示を提供する文章にしてください。画像のスタイルは指示しないでください。
        responseは<result>タグ内に提供し、タグの外には何も出力しないでください。
        <result>
        ...
        </result>
        """
    
    # Add the user's message to the chat history
    chat_history = [{"role": "user", "content": prompt}]

    # Create the completion request with the chat history
    stream = groq_client.chat.completions.create(
        messages=chat_history,
        model="llama3-70b-8192",
        temperature=0.99,
        max_tokens=10000,
        top_p=1,
        stop=None,
        stream=True,
    )

    # Print the incremental deltas returned by the LLM.
    ai_response = ""
    print(f"responce: ", end="")
    for chunk in stream:
        if chunk.choices[0].delta.content:
            ai_response += chunk.choices[0].delta.content
            print(chunk.choices[0].delta.content, end="")
        # last_time = time.time()
    
    recipe_image_prompt = parse_description(ai_response)
    return recipe_image_prompt


def recipe_image_generator(recipe_name):
    # initialize bedrock client
    bedrock_client = boto3.client('bedrock-runtime', region_name='us-east-1')
    # param settings
    model_id = "stability.stable-diffusion-xl-v1"
    image_style = "photographic"
    accept = '*/*'
    contentType = 'application/json'
    prompt = recipe_description_generator(recipe_name)
    seed = random.randint(0, 1000000)
    
    # Format the request payload using the model's native structure.
    native_request = {
        "text_prompts": [{"text": prompt}],
        "style_preset": image_style,
        "seed": seed,
        "cfg_scale": 10,
        "steps": 30,
    }
    # Convert the native request to JSON.
    request = json.dumps(native_request)
    # Invoke the model with the request.
    response = bedrock_client.invoke_model(
        modelId=model_id,
        body=request,
        accept=accept,
        contentType=contentType,)

    # Decode the response body.
    model_response = json.loads(response["body"].read())

    # Extract the image data.
    image_base64 = model_response["artifacts"][0]["base64"]
    image_bytes = base64.b64decode(image_base64)
    image = Image.open(BytesIO(image_bytes))
    image_path = "recipe_image.png"
    image.save(image_path)
    return image_path, image_base64


if __name__ == "__main__":
    img_path = recipe_image_generator("オムライス")
