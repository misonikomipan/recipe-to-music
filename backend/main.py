import os
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from recipi_generator import generate_recipi
from XML_parser import parse_recipi
from text_to_speech import text_to_speech


class Ingredients(BaseModel):
    ingredients: list[str]


origins = [
    "http://localhost",
    "http://localhost:5173",
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


@app.post("/recipes/recipe-to-speech")
async def recipe_to_speech(recipe: str, speech_file_name: str):
    file_path = "speech.mp3"
    text_to_speech(recipe, file_path)
    if os.path.exists(file_path):
        return FileResponse(file_path, media_type='audio/mpeg', filename=speech_file_name)
    else:
        return {"error": "File not found"}