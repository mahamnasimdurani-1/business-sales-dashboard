
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

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      if (selectedRegion) {
        params.append("region", selectedRegion);
      }

      if (selectedCategory) {
        params.append("category", selectedCategory);
      }

      if (selectedProduct) {
        params.append("product", selectedProduct);
      }

      const query = params.toString();
      const suffix = query ? `?${query}` : "";

      const [
        summaryResponse,
        monthlyResponse,
        productsResponse,
        categoriesResponse,
        regionsResponse,
      ] = await Promise.all([
        fetch(`${API_URL}/summary${suffix}`),
        fetch(`${API_URL}/monthly-revenue${suffix}`),
        fetch(`${API_URL}/products${suffix}`),
        fetch(`${API_URL}/categories${suffix}`),
        fetch(`${API_URL}/regions${suffix}`),
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

  useEffect(() => {
    fetchDashboardData();
  }, [selectedRegion, selectedCategory, selectedProduct]);

  if (loading && !summary) {
    return (
      <div className="loading-screen">
        <h2>Loading Dashboard...</h2>
        <p>Fetching your sales analytics...</p>
      </div>
    );
  }

  if (error && !summary) {
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

      {/* HEADER */}
      <header className="dashboard-header">
        <div>
          <h1>Business Sales Analytics</h1>
          <p>Monitor your business performance and sales insights</p>
        </div>
      </header>

      <main className="dashboard-content">

        {/* FILTERS */}
        <section className="filters-card">

          <div className="filters-title">
            <h2>Dashboard Filters</h2>
            <p>Filter your sales analytics</p>
          </div>

          <div className="filters">

            {/* REGION */}
            <div className="filter-group">
              <label>Region</label>

              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="">All Regions</option>
                <option value="North">North</option>
                <option value="East">East</option>
                <option value="South">South</option>
                <option value="West">West</option>
              </select>
            </div>

            {/* CATEGORY */}
            <div className="filter-group">
              <label>Category</label>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            {/* PRODUCT */}
            <div className="filter-group">
              <label>Product</label>

              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                <option value="">All Products</option>
                <option value="Laptop">Laptop</option>
                <option value="Monitor">Monitor</option>
                <option value="Mouse">Mouse</option>
                <option value="Headphones">Headphones</option>
                <option value="Keyboard">Keyboard</option>
              </select>
            </div>

            {/* RESET */}
            <button
              className="reset-button"
              onClick={() => {
                setSelectedRegion("");
                setSelectedCategory("");
                setSelectedProduct("");
              }}
            >
              Reset Filters
            </button>

          </div>

        </section>

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
                name="Revenue"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />

            </LineChart>
          </ResponsiveContainer>

        </section>

        {/* PRODUCTS + CATEGORIES */}
        <section className="charts-grid">

          {/* PRODUCTS */}
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

          {/* CATEGORIES */}
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

