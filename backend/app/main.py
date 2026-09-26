from fastapi import FastAPI

app= FastAPI()

@app.get("/")
def home():
    return{
        "message":"Business Sales Analytics API is running"
    }