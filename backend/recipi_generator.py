import os
# import time
from groq import Groq

client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)


ja_prompt = f"""
あなたは料理のレシピを提案するAIアシスタントです。ユーザーから材料のリストが与えられるので、その材料を使って作ることができる料理を提案してください。
また、その料理の作り方も教えてください。

以下の材料リストが与えられました:
<ingredients>
{{INGREDIENTS}}
</ingredients>

まず、<scratchpad>タグの中で、与えられた材料から作ることができるレシピを順を追って考えてください。その際、これらの材料以外の食材が必要になるレシピは除外してください。

次に、<recipes>タグの中で、考えたレシピを1行に1工程ずつ出力してください。

出力は日本語でお願いします。
"""

def chat_with_groq():
    print("Welcome to the Groq Chatbot! Type 'exit' to end the conversation.")

    # Initialize chat history with the initial prompt
    chat_history = [
        {"role": "system", "content": ja_prompt}
    ]

    while True:
        user_input = input(f"材料を「、」区切りで入力: ")

        if user_input.lower() == 'exit':
            print("Goodbye!")
            break

        # Add the user's message to the chat history
        chat_history.append({"role": "user", "content": user_input})

        # Record the start time
        # last_time = time.time()

        # Create the completion request with the chat history
        stream = client.chat.completions.create(
            messages=chat_history,
            model="llama3-70b-8192",
            temperature=0.5,
            max_tokens=1024,
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
        print()
        print()

        # Add the AI's response to the chat history
        chat_history.append({"role": "assistant", "content": ai_response})

if __name__ == "__main__":
    chat_with_groq()
