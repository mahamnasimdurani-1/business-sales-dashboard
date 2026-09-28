import pandas as pd


# Load dataset
df = pd.read_csv("../data/sales.csv")

# Display first 5 rows
print("FIRST 5 ROWS:")
print(df.head())

# Dataset shape
print("\nDATASET SHAPE:")
print(df.shape)

# Column names
print("\nCOLUMNS:")
print(df.columns.tolist())

# Data types
print("\nDATA TYPES:")
print(df.dtypes)

# Missing values
print("\nMISSING VALUES:")
print(df.isnull().sum())

# Duplicate rows
print("\nDUPLICATES:")
print(df.duplicated().sum())

# Statistical summary
print("\nSTATISTICAL SUMMARY:")
print(df.describe())


# Calculate Revenue
df["Revenue"] = df["Quantity"] * df["Unit_Price"]

# Calculate Cost
df["Cost"] = df["Quantity"] * df["Cost_Price"]

# Calculate Profit
df["Profit"] = df["Revenue"] - df["Cost"]


# Display calculated columns
print("\nSALES DATA WITH CALCULATIONS:")
print(df.head())


# Business metrics
print("\nBUSINESS METRICS:")

print("Total Revenue:", df["Revenue"].sum())
print("Total Cost:", df["Cost"].sum())
print("Total Profit:", df["Profit"].sum())
print("Total Quantity Sold:", df["Quantity"].sum())
print("Total Orders:", df["Order_ID"].nunique())