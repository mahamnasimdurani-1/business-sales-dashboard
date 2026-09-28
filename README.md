📊 Business Sales Analytics Dashboard

A full-stack Business Sales Analytics Dashboard built to analyze and
visualize sales performance through an interactive, responsive analytics
interface.

The project transforms raw sales data into meaningful business insights
such as revenue, profit, orders, quantity sold, product performance,
category performance, regional performance, and monthly revenue
trends.

🚀 Features

💰 Total Revenue

📈 Total Profit

🛒 Total Orders

📦 Total Quantity Sold

📊 Monthly Revenue Chart

🏆 Product Performance Analysis

🗂️ Category Performance Analysis

🌍 Regional Sales Analysis

🔎 Region Filter

🔎 Category Filter

🔎 Product Filter

🔄 Reset Filters

🌙 Responsive Dark Analytics UI

⚡ Fast API-powered dashboard

🛠️ Tech Stack

Frontend

React

Vite

JavaScript

Recharts

CSS

Backend

Python

FastAPI

Pandas

Data Processing

CSV

Pandas

📁 Project Structure

business-sales-dashboard/
│
├── backend/
│   ├── app/
│   │   ├── cleaning.py
│   │   ├── main.py
│   │   └── visualization.py
│   └── venv/
│
├── data/
│   ├── sales_raw.csv
│   └── sales_cleaned.csv
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md

🔄 Project Workflow

Raw Sales Data
      ↓
Data Cleaning with Pandas
      ↓
Cleaned CSV Dataset
      ↓
FastAPI Backend
      ↓
REST API Endpoints
      ↓
React Frontend
      ↓
Recharts Visualization
      ↓
Interactive Sales Dashboard

⚙️ Installation & Setup

1. Clone the Repository

git clone <https://github.com/mahamnasimdurani-1/business-sales-dashboard>
cd business-sales-dashboard

2. Backend Setup

Go to the backend directory:

cd backend

Create/activate the virtual environment:

venv\Scripts\activate

Start the FastAPI development server:

fastapi dev app/main.py

Backend will be available at:

http://127.0.0.1:8000

FastAPI documentation:

http://127.0.0.1:8000/docs

3. Frontend Setup

Open a new terminal and go to the frontend directory:

cd frontend

Install dependencies:

npm install

Start the Vite development server:

npm run dev

Frontend will be available at:

http://localhost:5173

🔌 API Endpoints

Endpoint                 Description

GET /                  API status
GET /summary           Overall sales summary
GET /products          Product performance
GET /categories        Category performance
GET /regions           Regional performance
GET /monthly-revenue   Monthly revenue trends

🎛️ Dashboard Filters

The dashboard supports interactive filtering by:

Region

Category

Product

When filters are applied, the dashboard updates the relevant KPIs and
visualizations.

The Reset Filters option restores the complete dataset view.

📊 Dashboard Analytics

The dashboard provides insights into:

Key Performance Indicators

Total Revenue

Total Profit

Total Orders

Total Quantity Sold

Revenue Analysis

Monthly revenue trends

Product revenue

Category revenue

Regional revenue

Profit Analysis

Regional profit

Product performance

Category performance

These visualizations help users understand sales performance and
identify important business patterns.

🧹 Data Processing

The backend uses Pandas to process the sales dataset.

Typical processing workflow:

Raw CSV
  ↓
Data Cleaning
  ↓
Missing/Invalid Data Handling
  ↓
Data Transformation
  ↓
Aggregations
  ↓
Analytics
  ↓
API Response

The cleaned dataset is stored in:

data/sales_cleaned.csv

🎯 Project Goals

This project demonstrates practical experience with:

Full-stack development

REST API development

React frontend development

Python backend development

Data cleaning with Pandas

Data analysis

Data visualization

API integration

Interactive dashboard development

Git and GitHub workflow

🔮 Future Improvements

Planned improvements include:

📅 Date range filters

🗄️ Database integration

🔐 User authentication

📄 CSV/PDF report export

☁️ Cloud deployment

🤖 Automated business insights

📈 Advanced analytics

📊 More interactive visualizations

📱 Improved mobile responsiveness

📌 Skills Demonstrated

Frontend

React · JavaScript · Vite · Recharts · CSS

Backend

Python · FastAPI · Pandas

Data Analytics

Data Cleaning · Data Analysis · Data Visualization ·
Business Analytics

Tools

Git · GitHub · VS Code

👩‍💻 Author

Maham Nasim Durani
