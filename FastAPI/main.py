from fastapi import FastAPI
from typing import Optional
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    desc: Optional[str] = None
    price: int

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/items/")
async def putItem(item:Item):
    return item

@app.get("/items/{item_id}")
async def getItem(item_id: int):
    return({"item": item_id})