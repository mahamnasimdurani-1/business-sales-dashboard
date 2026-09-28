import pandas as pd
import matplotlib.pyplot as plt

# Load cleaned dataset
df = pd.read_csv("../data/sales_cleaned.csv")

# Convert Order_Date to datetime
df["Order_Date"] = pd.to_datetime(df["Order_Date"])

# Product-wise revenue
product_revenue = (
    df.groupby("Product")["Revenue"]
    .sum()
    .sort_values(ascending=False)
)

# Create chart
plt.figure(figsize=(10, 6))

product_revenue.plot(kind="bar")

plt.title("Revenue by Product")
plt.xlabel("Product")
plt.ylabel("Revenue")

plt.xticks(rotation=45)
plt.tight_layout()

plt.show()

# -----------------------------
# PROFIT BY PRODUCT
# -----------------------------

product_profit = (
    df.groupby("Product")["Profit"]
    .sum()
    .sort_values(ascending=False)
)

plt.figure(figsize=(10, 6))

product_profit.plot(kind="bar")

plt.title("Profit by Product")
plt.xlabel("Product")
plt.ylabel("Profit")

plt.xticks(rotation=45)
plt.tight_layout()

plt.show()


# -----------------------------
# MONTHLY REVENUE
# -----------------------------

monthly_revenue = (
    df.groupby(df["Order_Date"].dt.to_period("M"))["Revenue"]
    .sum()
)

# Convert Period to string for plotting
monthly_revenue.index = monthly_revenue.index.astype(str)

plt.figure(figsize=(10, 6))

monthly_revenue.plot(kind="line", marker="o")

plt.title("Monthly Revenue")
plt.xlabel("Month")
plt.ylabel("Revenue")

plt.grid(True)
plt.tight_layout()

plt.show()

# -----------------------------
# REVENUE BY REGION
# -----------------------------

region_revenue = (
    df.groupby("Region")["Revenue"]
    .sum()
    .sort_values(ascending=False)
)

plt.figure(figsize=(10, 6))

region_revenue.plot(kind="bar")

plt.title("Revenue by Region")
plt.xlabel("Region")
plt.ylabel("Revenue")

plt.xticks(rotation=0)
plt.tight_layout()

plt.show()


# -----------------------------
# REVENUE BY CATEGORY
# -----------------------------

category_revenue = (
    df.groupby("Category")["Revenue"]
    .sum()
    .sort_values(ascending=False)
)

plt.figure(figsize=(8, 6))

category_revenue.plot(kind="bar")

plt.title("Revenue by Category")
plt.xlabel("Category")
plt.ylabel("Revenue")

plt.xticks(rotation=0)
plt.tight_layout()

plt.show()