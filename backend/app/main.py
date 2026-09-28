
from fastapi import FastAPI, Query
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


# =========================================
# HELPER FUNCTION
# =========================================

def apply_filters(
    data,
    region=None,
    category=None,
    product=None
):
    filtered_data = data.copy()

    if region:
        filtered_data = filtered_data[
            filtered_data["Region"] == region
        ]

    if category:
        filtered_data = filtered_data[
            filtered_data["Category"] == category
        ]

    if product:
        filtered_data = filtered_data[
            filtered_data["Product"] == product
        ]

    return filtered_data


# =========================================
# SUMMARY
# =========================================

@app.get("/summary")
def get_summary(
    region: str | None = Query(default=None),
    category: str | None = Query(default=None),
    product: str | None = Query(default=None)
):

    filtered_df = apply_filters(
        df,
        region,
        category,
        product
    )

    total_revenue = float(filtered_df["Revenue"].sum())
    total_cost = float(filtered_df["Cost"].sum())
    total_profit = float(filtered_df["Profit"].sum())
    total_quantity = int(filtered_df["Quantity"].sum())
    total_orders = int(filtered_df["Order_ID"].nunique())

    return {
        "total_revenue": total_revenue,
        "total_cost": total_cost,
        "total_profit": total_profit,
        "total_quantity": total_quantity,
        "total_orders": total_orders
    }


# =========================================
# PRODUCTS
# =========================================

@app.get("/products")
def get_products(
    region: str | None = Query(default=None),
    category: str | None = Query(default=None),
    product: str | None = Query(default=None)
):

    filtered_df = apply_filters(
        df,
        region,
        category,
        product
    )

    product_data = (
        filtered_df.groupby("Product")[["Quantity", "Revenue", "Profit"]]
        .sum()
        .sort_values("Revenue", ascending=False)
    )

    return product_data.reset_index().to_dict(orient="records")


# =========================================
# REGIONS
# =========================================

@app.get("/regions")
def get_regions(
    region: str | None = Query(default=None),
    category: str | None = Query(default=None),
    product: str | None = Query(default=None)
):

    filtered_df = apply_filters(
        df,
        region,
        category,
        product
    )

    region_data = (
        filtered_df.groupby("Region")[["Quantity", "Revenue", "Profit"]]
        .sum()
        .sort_values("Revenue", ascending=False)
    )

    return region_data.reset_index().to_dict(orient="records")


# =========================================
# CATEGORIES
# =========================================

@app.get("/categories")
def get_categories(
    region: str | None = Query(default=None),
    category: str | None = Query(default=None),
    product: str | None = Query(default=None)
):

    filtered_df = apply_filters(
        df,
        region,
        category,
        product
    )

    category_data = (
        filtered_df.groupby("Category")[["Quantity", "Revenue", "Profit"]]
        .sum()
        .sort_values("Revenue", ascending=False)
    )

    return category_data.reset_index().to_dict(orient="records")


# =========================================
# MONTHLY REVENUE
# =========================================

@app.get("/monthly-revenue")
def get_monthly_revenue(
    region: str | None = Query(default=None),
    category: str | None = Query(default=None),
    product: str | None = Query(default=None)
):

    filtered_df = apply_filters(
        df,
        region,
        category,
        product
    )

    monthly_data = (
        filtered_df.groupby(
            filtered_df["Order_Date"].dt.to_period("M")
        )["Revenue"]
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
