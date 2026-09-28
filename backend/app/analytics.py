import pandas as pd

# Load cleaned dataset
df = pd.read_csv("../data/sales_cleaned.csv")

# Convert Order_Date to datetime
df["Order_Date"] = pd.to_datetime(df["Order_Date"])

print("DATA LOADED SUCCESSFULLY")
print(df.head())

# -----------------------------
# PRODUCT ANALYSIS
# -----------------------------

product_analysis = (
    df.groupby("Product")
    [["Quantity", "Revenue", "Profit"]]
    .sum()
    .sort_values("Revenue", ascending=False)
)

print("\nPRODUCT ANALYSIS:")
print(product_analysis)


# -----------------------------
# REGION ANALYSIS
# -----------------------------

region_analysis = (
    df.groupby("Region")
    [["Quantity", "Revenue", "Profit"]]
    .sum()
    .sort_values("Revenue", ascending=False)
)

print("\nREGION ANALYSIS:")
print(region_analysis)

# -----------------------------
# CATEGORY ANALYSIS
# -----------------------------

category_analysis = (
    df.groupby("Category")
    [["Quantity", "Revenue", "Profit"]]
    .sum()
    .sort_values("Revenue", ascending=False)
)

print("\nCATEGORY ANALYSIS:")
print(category_analysis)

# -----------------------------
# MONTHLY REVENUE ANALYSIS
# -----------------------------

monthly_revenue = (
    df.groupby(df["Order_Date"].dt.to_period("M"))["Revenue"]
    .sum()
)

print("\nMONTHLY REVENUE:")
print(monthly_revenue)


# -----------------------------
# BEST-SELLING PRODUCT
# -----------------------------

best_selling_product = (
    df.groupby("Product")["Quantity"]
    .sum()
    .sort_values(ascending=False)
)

print("\nBEST-SELLING PRODUCTS:")
print(best_selling_product)


# -----------------------------
# MOST PROFITABLE PRODUCT
# -----------------------------

most_profitable_product = (
    df.groupby("Product")["Profit"]
    .sum()
    .sort_values(ascending=False)
)

print("\nMOST PROFITABLE PRODUCTS:")
print(most_profitable_product)

# -----------------------------
# AVERAGE ORDER VALUE
# -----------------------------

total_revenue = df["Revenue"].sum()
total_orders = df["Order_ID"].nunique()

average_order_value = total_revenue / total_orders

print("\nAVERAGE ORDER VALUE:")
print(round(average_order_value, 2))