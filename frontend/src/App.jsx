
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./App.css";

const API_URL = "http://127.0.0.1:8000";

function App() {
  const [summary, setSummary] = useState(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [regions, setRegions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          summaryResponse,
          monthlyResponse,
          productsResponse,
          categoriesResponse,
          regionsResponse,
        ] = await Promise.all([
          fetch(`${API_URL}/summary`),
          fetch(`${API_URL}/monthly-revenue`),
          fetch(`${API_URL}/products`),
          fetch(`${API_URL}/categories`),
          fetch(`${API_URL}/regions`),
        ]);

        if (
          !summaryResponse.ok ||
          !monthlyResponse.ok ||
          !productsResponse.ok ||
          !categoriesResponse.ok ||
          !regionsResponse.ok
        ) {
          throw new Error("Failed to fetch dashboard data");
        }

        const [
          summaryData,
          monthlyData,
          productsData,
          categoriesData,
          regionsData,
        ] = await Promise.all([
          summaryResponse.json(),
          monthlyResponse.json(),
          productsResponse.json(),
          categoriesResponse.json(),
          regionsResponse.json(),
        ]);

        setSummary(summaryData);
        setMonthlyRevenue(monthlyData);
        setProducts(productsData);
        setCategories(categoriesData);
        setRegions(regionsData);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Unable to connect with the backend.");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <h2>Loading Dashboard...</h2>
        <p>Fetching your sales analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <p>Make sure your FastAPI backend is running on port 8000.</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Business Sales Analytics</h1>
          <p>Monitor your business performance and sales insights</p>
        </div>
      </header>

      <main className="dashboard-content">

        {/* KPI CARDS */}
        <section className="stats-grid">

          <div className="stat-card">
            <span className="stat-label">Total Revenue</span>
            <h2>{summary.total_revenue}</h2>
            <p>Overall sales revenue</p>
          </div>

          <div className="stat-card">
            <span className="stat-label">Total Profit</span>
            <h2>{summary.total_profit}</h2>
            <p>Overall business profit</p>
          </div>

          <div className="stat-card">
            <span className="stat-label">Total Orders</span>
            <h2>{summary.total_orders}</h2>
            <p>Total number of orders</p>
          </div>

          <div className="stat-card">
            <span className="stat-label">Total Quantity</span>
            <h2>{summary.total_quantity}</h2>
            <p>Products sold</p>
          </div>

        </section>

        {/* MONTHLY REVENUE */}
        <section className="chart-card">

          <div className="chart-header">
            <h2>Monthly Revenue</h2>
            <p>Revenue performance over time</p>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={monthlyRevenue}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />

            </LineChart>
          </ResponsiveContainer>

        </section>

        {/* PRODUCT + CATEGORY */}
        <section className="charts-grid">

          {/* TOP PRODUCTS */}
          <div className="chart-card">

            <div className="chart-header">
              <h2>Top Products</h2>
              <p>Revenue by product</p>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={products}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="Product" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="Revenue"
                  name="Revenue"
                  fill="#6366f1"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>

          {/* CATEGORY PERFORMANCE */}
          <div className="chart-card">

            <div className="chart-header">
              <h2>Category Performance</h2>
              <p>Revenue by category</p>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categories}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="Category" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="Revenue"
                  name="Revenue"
                  fill="#22c55e"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>

        </section>

        {/* REGIONAL SALES */}
        <section className="chart-card">

          <div className="chart-header">
            <h2>Regional Sales</h2>
            <p>Revenue and profit performance by region</p>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={regions}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="Region" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="Revenue"
                name="Revenue"
                fill="#9333ea"
                radius={[6, 6, 0, 0]}
              />

              <Bar
                dataKey="Profit"
                name="Profit"
                fill="#f59e0b"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>
          </ResponsiveContainer>

        </section>

      </main>
    </div>
  );
}

export default App;
