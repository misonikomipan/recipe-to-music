import xml.etree.ElementTree as ET
import json
from pydantic import BaseModel
from typing import List


class Ingredient(BaseModel):
    ingredient_name: str
    ingredient_amount: str


class Recipe(BaseModel):
    recipe_name: str
    recipe_description: str
    ingredients: List[Ingredient]
    instructions: List[str]


class RecipeBook(BaseModel):
    brainstorming: str
    recipes: List[Recipe]


def parse_description(xml_data):
    # create ElementTree object
    root = ET.fromstring(xml_data)

    # parse brainstorming element
    prompt = root.find('prompt').text.strip()   
    return prompt


def parse_recipi(xml_data):
    # create ElementTree object
    root = ET.fromstring(xml_data)

    # parse brainstorming element
    brainstorming = root.find('brainstorming').text.strip()

    # parse recipe elements
    recipes = []
    for recipe_elem in root.findall('recipe'):
        recipe_name = recipe_elem.find('recipe_name').text
        recipe_description = recipe_elem.find('recipe_description').text

        ingredients = []
        for ingredient_elem in recipe_elem.find('ingredients').findall('ingredient'):
            ingredient_name = ingredient_elem.find('ingredient_name').text
            ingredient_amount = ingredient_elem.find('ingredient_amount').text
            ingredients.append(
                Ingredient(
                    ingredient_name=ingredient_name,
                    ingredient_amount=ingredient_amount
                )
            )

        instructions = recipe_elem.find('instructions').text.strip().split('\n')

        recipes.append(
            Recipe(
                recipe_name=recipe_name,
                recipe_description=recipe_description,
                ingredients=ingredients,
                instructions=instructions
            )
        )

    # create RecipeBook
    recipe_book = RecipeBook(
        brainstorming=brainstorming,
        recipes=recipes
    )

    # convert to JSON format
    # json_result = json.dumps(recipe_book, ensure_ascii=False, indent=2, default=lambda o: o.__dict__)

    return recipe_book.dict()


def main():
    # 入力データ
    xml_data = """
    <result>

    <brainstorming>
    以下のようなレシピのアイデアが考えられます。
    1. にんじんとジャガイモのスープ
    2. 玉ねぎとにんじんのサラダ
    3. ジャガイモと玉ねぎのグラタン
    4. にんじんとジャガイモのフリッター
    5. 玉ねぎとにんじんのスープクレーム
    </brainstorming>

    以下は各レシピの詳細です。

    <recipe>
    <recipe_name>にんじんとジャガイモのスープ</recipe_name>
    <recipe_description>
    このスープは、にんじんとジャガイモを主役に据えた、温かみのあるスープです。冬の季節にぴったりのレシピです。
    </recipe_description>
    <ingredients>
    <ingredient>
    <ingredient_name>にんじん</ingredient_name>
    <ingredient_amount>2本</ingredient_amount>
    </ingredient>
    <ingredient>
    <ingredient_name>ジャガイモ</ingredient_name>
    <ingredient_amount>2個</ingredient_amount>
    </ingredient>
    <ingredient>
    <ingredient_name>玉ねぎ</ingredient_name>
    <ingredient_amount>1個</ingredient_amount>
    </ingredient>
    <ingredient>
    <ingredient_name>チキンスープのスープストック</ingredient_name>
    <ingredient_amount>4カップ</ingredient_amount>
    </ingredient>
    <ingredient>
    <ingredient_name>塩</ingredient_name>
    <ingredient_amount>適量</ingredient_amount>
    </ingredient>
    <ingredient>
    <ingredient_name>ブラックペッパー</ingredient_name>
    <ingredient_amount>適量</ingredient_amount>
    </ingredient>
    </ingredients>
    <instructions>
    1. にんじんとジャガイモを洗い、皮をむき、1cmの大きさに切る。
    2. 玉ねぎをみじん切りにする。
    3. 大きなポットに、にんじん、ジャガイモ、玉ねぎを加える。
    4. チキンスープのスープストックを加え、塩とブラックペッパーで味を整える。
    5. 中火で20分間煮込み、にんじんとジャガイモが柔らかくなったら、スープが完成です。
    </instructions>
    </recipe>

    <recipe>
    <recipe_name>玉ねぎとにんじんのサラダ</recipe_name>
    <recipe_description>
    このサラダは、玉ねぎとにんじんを主役に据えた、フレッシュなサラダです。春の季節にぴったりのレシピです。
    </recipe_description>
    <ingredients>
    <ingredient>
    <ingredient_name>玉ねぎ</ingredient_name>
    <ingredient_amount>1個</ingredient_amount>
    </ingredient>
    <ingredient>
    <ingredient_name>にんじん</ingredient_name>
    <ingredient_amount>1本</ingredient_amount>
    </ingredient>
    <ingredient>
    <ingredient_name>オリーブオイル</ingredient_name>
    <ingredient_amount>2テーブルスプーン</ingredient_amount>
    </ingredient>
    <ingredient>
    <ingredient_name>レモンジュース</ingredient_name>
    <ingredient_amount>1テーブルスプーン</ingredient_amount>
    </ingredient>
    <ingredient>
    <ingredient_name>塩</ingredient_name>
    <ingredient_amount>適量</ingredient_amount>
    </ingredient>
    <ingredient>
    <ingredient_name>ブラックペッパー</ingredient_name>
    <ingredient_amount>適量</ingredient_amount>
    </ingredient>
    </ingredients>
    <instructions>
    1. 玉ねぎをみじん切りにする。
    2. にんじんを洗い、皮をむき、1cmの大きさに切る。
    3. 玉ねぎとにんじんをボウルに加える。
    4. オリーブオイル、レモンジュース、塩、ブラックペッパーを加え、味を整える。
    5. サラダを完成したら、すぐに食べるようにしてください。
    </instructions>
    </recipe>

    </result>
    """
    res = parse_recipi(xml_data)
    print(res)


def main2():
    txt = '''
    <result>
    Understood
    <prompt>
    A photograph of Shogayaki, a popular Japanese dish. The image features slices of pork tenderly fried in a hot skillet, showcasing a crispy exterior and a juicy interior. The pork is seasoned with finely sliced ginger and a light soy sauce-based glaze. The dish is served on a white plate, accompanied by a side of fresh green salad, enhancing the homey and appetizing atmosphere. The setting includes a warm, well-lit dining table, evoking a sense of a comforting meal at home.
    </prompt>
    </result>
    '''
    res = parse_description(txt)
    print(res)

if __name__ == "__main__":
    main2()
