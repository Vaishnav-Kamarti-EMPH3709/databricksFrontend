import { useEffect, useState } from "react";

const InsightsOfDay = () => {
  const [insights, setInsights] = useState({
    opened: 0,
    closed: 0,
    currently_open: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/dashboard/summary"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard summary");
        }

        const data = await response.json();

        setInsights({
          opened: data.opened ?? 0,
          closed: data.closed ?? 0,
          currently_open: data.currently_open ?? 0,
        });
      } catch (err) {
        console.error("Error fetching dashboard summary:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  if (loading) {
    return (
      <div className="insights-of-day">
        <div className="insight-card">
          <span className="insight-label">Opened</span>
          <span className="insight-value">...</span>
        </div>

        <div className="insight-card">
          <span className="insight-label">Closed</span>
          <span className="insight-value">...</span>
        </div>

        <div className="insight-card">
          <span className="insight-label">Currently Open</span>
          <span className="insight-value">...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="insights-of-day">
        <p>Unable to load incident data.</p>
      </div>
    );
  }

  return (
    <div className="insights-of-day">
      <div className="insight-card">
        <span className="insight-label">Opened</span>
        <span className="insight-value">{insights.opened}</span>
      </div>

      <div className="insight-card">
        <span className="insight-label">Closed</span>
        <span className="insight-value">{insights.closed}</span>
      </div>

      <div className="insight-card">
        <span className="insight-label">Currently Open</span>
        <span className="insight-value">{insights.currently_open}</span>
      </div>
    </div>
  );
};

export default InsightsOfDay;