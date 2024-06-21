from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from recipi_generator import generate_recipi
from XML_parser import parse_recipi


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
