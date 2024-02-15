from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from model.nltk_sentiment_analysis import sentiment_analyzer_scores
from pydantic import BaseModel


class Item(BaseModel):
    text: str


app = FastAPI()

origins = [
    "http://localhost:5173",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/api/sentiment/nltk/")
def read_root(text: Item):
    answer = sentiment_analyzer_scores(text.text)
    return {"Sentiment": answer}

@app.post("/sentiment/srv/")
def read_root(text: str):
    answer = sentiment_analyzer_scores(text)
    return {"Sentiment": answer}


@app.post("/sentiment/")
def read_root(text: str):
    answer = sentiment_analyzer_scores(text)
    return {"Sentiment": answer}


