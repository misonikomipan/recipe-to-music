import os
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from recipi_generator import generate_recipi
from recipe_image_generator import recipe_image_generator
from XML_parser import parse_recipi
from text_to_speech import text_to_speech


class Ingredients(BaseModel):
    ingredients: list[str]


origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://0.0.0.0",
    "http://0.0.0.0:5173",
]


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/recipes/search-by-ingredients")
async def search_by_ingredients(ingredeints: Ingredients):
    recipis_xml = generate_recipi(ingredeints.ingredients)
    recipis_json = parse_recipi(recipis_xml)
    return recipis_json


@app.post("/recipes/recipe-image")
async def recipe_image(recipe_title: str, return_file_name: str = "recipe_image.png", is_base64: bool = False):
    file_path, recipe_image_base64 = recipe_image_generator(recipe_title)
    if is_base64:
        return {"recipe_image_base64": recipe_image_base64}
    else:
        if os.path.exists(return_file_name):
            return FileResponse(file_path, media_type='image/png', filename=f"{return_file_name}.png")
        else:
            return {"error": "File not found"}


@app.get("/recipes/sample_image")
async def sample_image_base64():
    # sample_image_base54.txtを読み取る
    with open("sample_image_base64.txt", "r") as f:
        sample_image_base64 = f.read()
        print(sample_image_base64)
    return {"recipe_image_base64": sample_image_base64}



@app.post("/recipes/recipe-to-speech")
async def recipe_to_speech(recipe: str, speech_file_name: str):
    file_path = "speech.mp3"
    text_to_speech(recipe, file_path)
    if os.path.exists(file_path):
        return FileResponse(file_path, media_type='audio/mpeg', filename=speech_file_name)
    else:
        return {"error": "File not found"}

