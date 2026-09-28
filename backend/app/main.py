# from fastapi import FastAPI

# app= FastAPI()

# @app.get("/")
# def home():
#     return{
#         "message":"Business Sales Analytics API is running"
#     }

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load cleaned sales data
df = pd.read_csv("../data/sales_cleaned.csv")
df["Order_Date"] = pd.to_datetime(df["Order_Date"])


@app.get("/")
def home():
    return {
        "message": "Business Sales Analytics API is running"
    }


@app.get("/summary")
def get_summary():

    total_revenue = float(df["Revenue"].sum())
    total_cost = float(df["Cost"].sum())
    total_profit = float(df["Profit"].sum())
    total_quantity = int(df["Quantity"].sum())
    total_orders = int(df["Order_ID"].nunique())

    return {
        "total_revenue": total_revenue,
        "total_cost": total_cost,
        "total_profit": total_profit,
        "total_quantity": total_quantity,
        "total_orders": total_orders
    }

@app.get("/products")
def get_products():

    product_data = (
        df.groupby("Product")[["Quantity", "Revenue", "Profit"]]
        .sum()
        .sort_values("Revenue", ascending=False)
    )

    return product_data.reset_index().to_dict(orient="records")

@app.get("/regions")
def get_regions():

    region_data = (
        df.groupby("Region")[["Quantity", "Revenue", "Profit"]]
        .sum()
        .sort_values("Revenue", ascending=False)
    )

    return region_data.reset_index().to_dict(orient="records")

@app.get("/categories")
def get_categories():

    category_data = (
        df.groupby("Category")[["Quantity", "Revenue", "Profit"]]
        .sum()
        .sort_values("Revenue", ascending=False)
    )

    return category_data.reset_index().to_dict(orient="records")

@app.get("/monthly-revenue")
def get_monthly_revenue():

    monthly_data = (
        df.groupby(df["Order_Date"].dt.to_period("M"))["Revenue"]
        .sum()
    )

    monthly_data.index = monthly_data.index.astype(str)

    return [
        {
            "month": month,
            "revenue": float(revenue)
        }
        for month, revenue in monthly_data.items()
    ]