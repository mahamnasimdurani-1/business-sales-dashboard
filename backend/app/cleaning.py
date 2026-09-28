import pandas as pd


# Load raw dataset
df = pd.read_csv("../data/sales_raw.csv")


print("ORIGINAL DATA")
print(df.head())


# -----------------------------
# 1. Check missing values
# -----------------------------

print("\nMISSING VALUES BEFORE CLEANING:")
print(df.isnull().sum())


# -----------------------------
# 2. Check duplicate rows
# -----------------------------

print("\nDUPLICATES BEFORE CLEANING:")
print(df.duplicated().sum())


# -----------------------------
# 3. Convert Order_Date
# -----------------------------

df["Order_Date"] = pd.to_datetime(df["Order_Date"])


# -----------------------------
# 4. Convert numeric columns
# -----------------------------

numeric_columns = [
    "Quantity",
    "Unit_Price",
    "Cost_Price"
]

for column in numeric_columns:
    df[column] = pd.to_numeric(df[column], errors="coerce")


# -----------------------------
# 5. Remove duplicate rows
# -----------------------------

df = df.drop_duplicates()


# -----------------------------
# 6. Check missing values
# -----------------------------

print("\nMISSING VALUES AFTER CLEANING:")
print(df.isnull().sum())


# -----------------------------
# 7. Check data types
# -----------------------------

print("\nDATA TYPES AFTER CLEANING:")
print(df.dtypes)


# -----------------------------
# 8. Calculate business metrics
# -----------------------------

df["Revenue"] = df["Quantity"] * df["Unit_Price"]

df["Cost"] = df["Quantity"] * df["Cost_Price"]

df["Profit"] = df["Revenue"] - df["Cost"]


# -----------------------------
# 9. Save cleaned dataset
# -----------------------------

df.to_csv("../data/sales_cleaned.csv", index=False)


print("\nCLEANING COMPLETE!")
print("Cleaned dataset saved successfully.")