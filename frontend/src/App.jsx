
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/summary")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
        return response.json();
      })
      .then((data) => {
        setSummary(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to connect with the backend.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <h2>Loading Dashboard...</h2>
        <p>Fetching your sales analytics</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <p>
          Make sure your FastAPI backend is running on port 8000.
        </p>
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
        <section className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Total Revenue</span>
            <h2>${summary.total_revenue}</h2>
            <p>Overall sales revenue</p>
          </div>

          <div className="stat-card">
            <span className="stat-label">Total Profit</span>
            <h2>${summary.total_profit}</h2>
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

        <section className="welcome-card">
          <h2>Sales Performance Overview</h2>
          <p>
            Your business analytics are connected successfully.
            More detailed charts and product, category, and regional
            insights will appear here in the next steps.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;

