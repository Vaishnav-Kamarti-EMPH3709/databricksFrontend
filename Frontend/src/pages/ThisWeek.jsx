import { useEffect, useState } from "react";
import "./ThisWeek.css";

const ThisWeek = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchThisWeek = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/incidents/this-week"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch this week data");
        }

        const result = await response.json();

        console.log("This Week API:", result);

        setData(result);
      } catch (err) {
        console.error("This Week Error:", err);
        setError("Unable to load this week data.");
      } finally {
        setLoading(false);
      }
    };

    fetchThisWeek();
  }, []);

  /* ================================
     LOADING
  ================================= */

  if (loading) {
    return (
      <div className="this-week-page">
        <p>Loading this week...</p>
      </div>
    );
  }

  /* ================================
     ERROR
  ================================= */

  if (error) {
    return (
      <div className="this-week-page">
        <p>{error}</p>
      </div>
    );
  }

  /* ================================
     NO DATA
  ================================= */

  if (!data) {
    return (
      <div className="this-week-page">
        <p>No data available.</p>
      </div>
    );
  }

  return (
    <div className="this-week-page">

      {/* =================================
          HEADER
      ================================== */}

      <div className="this-week-header">
        <div>
          <h2>This Week</h2>

          <p>
            Incident activity from{" "}
            {data.period?.start_date || "N/A"} to{" "}
            {data.period?.end_date || "N/A"}
          </p>
        </div>
      </div>


      {/* =================================
          OVERVIEW CARDS
      ================================== */}

      <div className="week-overview">

        {/* TOTAL */}

        <div className="week-card total-card">
          <span>Total Incidents</span>

          <strong>
            {data.overview?.total_incidents ?? 0}
          </strong>
        </div>


        {/* HIGH PRIORITY */}

        <div className="week-card high-card">
          <span>High Priority</span>

          <strong>
            {data.overview?.critical ?? 0}
          </strong>
        </div>


        {/* CLOSED */}

        <div className="week-card closed-card">
          <span>Closed</span>

          <strong>
            {data.overview?.closed ?? 0}
          </strong>
        </div>


        {/* REOPENED */}

        <div className="week-card reopened-card">
          <span>Reopened</span>

          <strong>
            {data.overview?.reopened ?? 0}
          </strong>
        </div>

      </div>


      {/* =================================
          INCIDENT TREND
      ================================== */}

      <div className="week-section trend-section">

        <div className="section-header">

          <div>
            <h3>Incident Trend</h3>

            <p>
              Daily incident movement during the week
            </p>
          </div>


          {/* LEGEND */}

          <div className="trend-legend">

            <span>
              <i className="legend-dot opened"></i>
              Opened
            </span>

            <span>
              <i className="legend-dot closed"></i>
              Closed
            </span>

            <span>
              <i className="legend-dot remaining"></i>
              Remaining
            </span>

          </div>

        </div>


        {/* TREND TABLE */}

        <div className="trend-table">

          {/* HEADER */}

          <div className="trend-row trend-header">

            <span>Date</span>

            <span>Opened</span>

            <span>Closed</span>

            <span>Remaining</span>

          </div>


          {/* DATA */}

          {(data.trend || []).map((item) => (

            <div
              className="trend-row"
              key={item.date}
            >

              <span className="trend-date">
                {item.date}
              </span>

              <span className="trend-number opened-number">
                {item.opened ?? 0}
              </span>

              <span className="trend-number closed-number">
                {item.closed ?? 0}
              </span>

              <span className="trend-number remaining-number">
                {item.remaining ?? 0}
              </span>

            </div>

          ))}

        </div>

      </div>


      {/* =================================
          INCIDENT CATEGORIES
      ================================== */}

      <div className="week-section category-section">

        <div className="section-header">

          <div>

            <h3>Incident Categories</h3>

            <p>
              Incident movement by category
            </p>

          </div>

        </div>


        {/* CATEGORY TABLE */}

        <div className="trend-table category-table">

          {/* HEADER */}

          <div className="trend-row trend-header category-row category-header">

            <span>Category</span>

            <span>Opened</span>

            <span>Closed</span>

            <span>Remaining</span>

          </div>


          {/* CATEGORY DATA */}

          {(data.categories || []).map((item) => (

            <div
              className="trend-row category-row"
              key={item.category}
            >

              <span className="trend-date category-name">
                {item.category}
              </span>

              <span className="trend-number category-number opened-number">
                {item.opened ?? 0}
              </span>

              <span className="trend-number category-number closed-number">
                {item.closed ?? 0}
              </span>

              <span className="trend-number category-number remaining-number">
                {item.remaining ?? 0}
              </span>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default ThisWeek;