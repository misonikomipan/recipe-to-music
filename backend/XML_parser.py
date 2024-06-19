import xml.etree.ElementTree as ET
import json

def parser(xml_data):
    # create ElementTree object
    root = ET.fromstring(xml_data)

    # store the result
    result = {
        "brainstorming": [],
        "recipes": []
    }

    # parse brainstorming element
    brainstorming_text = root.find("brainstorming").text.strip()
    brainstorming_items = brainstorming_text.split('\n')
    for item in brainstorming_items:
        result["brainstorming"].append(item.split('. ')[1])

    # parse recipe elements
    for recipe in root.findall("recipe"):
        recipe_data = {
            "recipe_name": recipe.find("recipe_name").text,
            "recipe_description": recipe.find("recipe_description").text.strip(),
            "ingredients": recipe.find("ingredients").text.strip().split('\n'),
            "instructions": recipe.find("instructions").text.strip().split('\n')
        }
        result["recipes"].append(recipe_data)

    # convert to JSON format
    json_result = json.dumps(result, ensure_ascii=False, indent=4)
    return json_result


def main():
    # 入力データ
    xml_data = """
    <result>
    <brainstorming>
    1. にんじんとジャガイモのクリームシチュー
    2. 玉ねぎとにんじんのオムレツ
    3. ジャガイモと玉ねぎのハッシュドポテト
    4. にんじんとジャガイモのカレー
    5. 玉ねぎとジャガイモのグラタン
    </brainstorming>
    <recipe>
    <recipe_name>にんじんとジャガイモのクリームシチュー</recipe_name>
    <recipe_description>
    クリーミーで濃厚なシチュー。にんじんとジャガイモがたっぷり入っていて、体も心も温まる一品です。
    </recipe_description>
    <ingredients>
    - にんじん (2本, 輪切り)
    - ジャガイモ (3個, 一口大に切る)
    - 玉ねぎ (1個, みじん切り)
    - 鶏もも肉 (300g, 一口大に切る)
    - バター (30g)
    - 小麦粉 (3大さじ)
    - 牛乳 (500ml)
    - チキンブイヨン (2カップ)
    - 塩 (小さじ1)
    - コショウ (適量)
    - パセリ (適量, みじん切り)
    </ingredients>
    <instructions>
    1. 大きな鍋にバターを入れて中火で溶かし、玉ねぎを加えて透明になるまで炒める (約5分)。
    2. 鶏もも肉を加え、表面が白くなるまで炒める (約5分)。
    3. にんじんとジャガイモを加え、さらに3分ほど炒める。
    4. 小麦粉を加え、全体にまぶすように混ぜ合わせる。2分ほど炒めて小麦粉の香ばしさを引き出す。
    5. チキンブイヨンを少しずつ加えながら混ぜ、ダマができないようにする。すべてのブイヨンを加えたら中火で煮る (約15分)。
    6. 牛乳を加え、弱火にしてさらに10分ほど煮込む。塩とコショウで味を調える。
    7. 器に盛り付け、パセリを散らして完成。
    </instructions>
    </recipe>
    <recipe>
    <recipe_name>玉ねぎとにんじんのオムレツ</recipe_name>
    <recipe_description>
    簡単に作れる栄養たっぷりのオムレツ。朝食や軽食に最適です。
    </recipe_description>
    <ingredients>
    - 玉ねぎ (1個, みじん切り)
    - にんじん (1本, みじん切り)
    - 卵 (4個)
    - 牛乳 (大さじ2)
    - 塩 (小さじ1/2)
    - コショウ (適量)
    - バター (20g)
    </ingredients>
    <instructions>
    1. ボウルに卵を割り入れ、牛乳、塩、コショウを加えてよく混ぜる。
    2. フライパンにバターを入れて中火で溶かし、玉ねぎとにんじんを加えてしんなりするまで炒める (約5分)。
    3. 炒めた野菜をボウルの卵液に加えて混ぜ合わせる。
    4. フライパンを再び中火で熱し、卵液を流し入れて全体に広げる。
    5. フライパンを軽く揺らしながら卵が半熟になるまで焼く (約3分)。
    6. オムレツを二つ折りにし、さらに1分ほど焼いて中まで火を通す。
    7. 皿に移して完成。
    </instructions>
    </recipe>
    <recipe>
    <recipe_name>ジャガイモと玉ねぎのハッシュドポテト</recipe_name>
    <recipe_description>
    カリッとした食感が楽しめるハッシュドポテト。朝食やおやつにぴったりです。
    </recipe_description>
    <ingredients>
    - ジャガイモ (3個, すりおろし)
    - 玉ねぎ (1個, みじん切り)
    - 小麦粉 (大さじ2)
    - 塩 (小さじ1/2)
    - コショウ (適量)
    - サラダ油 (適量, 揚げる用)
    </ingredients>
    <instructions>
    1. ジャガイモをすりおろし、水気をしっかり絞る。
    2. ボウルにすりおろしたジャガイモ、みじん切りの玉ねぎ、小麦粉、塩、コショウを入れてよく混ぜる。
    3. フライパンにサラダ油を適量熱し、混ぜた材料をスプーンで適量取り、平たく成形して入れる。
    4. 中火で両面がカリッと黄金色になるまで揚げ焼きにする (各面約3分)。
    5. キッチンペーパーの上に取り出し、余分な油を切る。
    6. 皿に盛り付けて完成。
    </instructions>
    </recipe>
    </result>
    """
    res = parser(xml_data)
    print(res)

if __name__ == "__main__":
    main()
