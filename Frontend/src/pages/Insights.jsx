import { useEffect, useState } from "react";
import "./Insights.css";

const Insights = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 useEffect(() => {
  const dummyData = {
    executive_summary:
      "Incident volume increased compared with last week, while closure performance improved. The open backlog remains concentrated in a few assignment groups.",

    highlights: [
      "Closure rate improved by 8% compared with last week.",
      "Critical incidents decreased by 12%.",
      "Average resolution time improved from 5.2 hours to 4.6 hours."
    ],

    lowlights: [
      "Open incident backlog increased by 14%.",
      "Network-related incidents continue to represent a large portion of the backlog.",
      "Two assignment groups have significantly higher open volumes."
    ],

    open_incident_backlog:
      "There are 428 open incidents. This is an increase of 14% compared with the previous week.",

    resolution_closure_performance:
      "Closure rate increased from 72% to 78%. Average resolution time decreased by 11%.",

    key_metrics:
      "Open Incidents: 428 | Closed Incidents: 512 | Closure Rate: 78% | Average Resolution Time: 4.6 hours",

    assignment_group_analysis:
      "NETWORK SUPPORT has the highest open incident volume, followed by DATA PLATFORM and APPLICATION SUPPORT.",

    category_analysis:
      "Network incidents are the largest category, followed by Application and Data-related incidents.",

    notable_incidents: [
      "INC17742778 - Network interface availability issue",
      "INC17742891 - Power BI refresh failure",
      "INC17742912 - Databricks pipeline failure"
    ],

    areas_to_watch: [
      "Increasing network incident backlog",
      "High workload in NETWORK SUPPORT",
      "Recurring Power BI incidents"
    ],

    recommended_actions: [
      "Review the network incident backlog and prioritize aging incidents.",
      "Rebalance workload across assignment groups.",
      "Investigate recurring Power BI failures.",
      "Review incidents that have remained open for more than 7 days."
    ]
  };

  setData(dummyData);
  setLoading(false);
}, []);

  if (loading) {
    return (
      <div className="insights-page">
        <div className="insights-loading">
          Loading insights...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="insights-page">
        <div className="insights-error">
          {error}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="insights-page">
        <div className="insights-error">
          No insights available.
        </div>
      </div>
    );
  }

  const highlights = Array.isArray(data.highlights)
    ? data.highlights
    : [];

  const lowlights = Array.isArray(data.lowlights)
    ? data.lowlights
    : [];

  const notableIncidents = Array.isArray(data.notable_incidents)
    ? data.notable_incidents
    : [];

  const areasToWatch = Array.isArray(data.areas_to_watch)
    ? data.areas_to_watch
    : [];

  const recommendedActions = Array.isArray(
    data.recommended_actions
  )
    ? data.recommended_actions
    : [];

  return (
    <div className="insights-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="insights-header">

        <div>
          <h1>Incident Insights</h1>

          <p>
            AI-generated analysis of incident trends,
            patterns and operational signals.
          </p>
        </div>

        <div className="insights-period">
          <span className="period-label">
            ANALYSIS
          </span>

          <span className="period-value">
            Current Period
          </span>
        </div>

      </div>


      {/* =====================================================
          ATTENTION
      ===================================================== */}

      <section className="attention-section">

        <div className="section-label">
          ATTENTION
        </div>

        <div className="attention-card">

          <div className="attention-icon">
            !
          </div>

          <div className="attention-content">

            <h2>
              Executive Summary
            </h2>

            <p>
              {data.executive_summary ||
                "No executive summary available."}
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          PATTERNS + OPERATIONAL SIGNALS
      ===================================================== */}

      <div className="insights-two-column">

        {/* PATTERNS */}

        <section className="insight-section">

          <div className="section-heading-row">

            <div>
              <span className="section-label">
                PATTERNS
              </span>

              <h2>
                Highlights
              </h2>
            </div>

            <span className="section-count">
              {highlights.length}
            </span>

          </div>

          <div className="insight-list">

            {highlights.length > 0 ? (
              highlights.map((item, index) => (
                <div
                  className="insight-item positive"
                  key={index}
                >

                  <div className="item-icon">
                    ↑
                  </div>

                  <div className="item-content">
                    {item}
                  </div>

                </div>
              ))
            ) : (
              <div className="empty-item">
                No highlights available.
              </div>
            )}

          </div>

        </section>


        {/* OPERATIONAL SIGNALS */}

        <section className="insight-section">

          <div className="section-heading-row">

            <div>
              <span className="section-label">
                OPERATIONAL SIGNALS
              </span>

              <h2>
                Lowlights
              </h2>
            </div>

            <span className="section-count">
              {lowlights.length}
            </span>

          </div>

          <div className="insight-list">

            {lowlights.length > 0 ? (
              lowlights.map((item, index) => (
                <div
                  className="insight-item negative"
                  key={index}
                >

                  <div className="item-icon">
                    !
                  </div>

                  <div className="item-content">
                    {item}
                  </div>

                </div>
              ))
            ) : (
              <div className="empty-item">
                No operational issues available.
              </div>
            )}

          </div>

        </section>

      </div>


      {/* =====================================================
          KEY METRICS
      ===================================================== */}

      <section className="metrics-section">

        <div className="section-heading-row">

          <div>
            <span className="section-label">
              PERFORMANCE
            </span>

            <h2>
              Key Metrics
            </h2>
          </div>

        </div>

        <div className="metric-card">

          <p>
            {data.key_metrics ||
              "No key metrics available."}
          </p>

        </div>

      </section>


      {/* =====================================================
          OPEN INCIDENT BACKLOG
      ===================================================== */}

      <section className="analysis-section">

        <div className="section-heading-row">

          <div>
            <span className="section-label">
              BACKLOG
            </span>

            <h2>
              Open Incident Backlog
            </h2>
          </div>

        </div>

        <div className="analysis-card">

          <p>
            {data.open_incident_backlog ||
              "No backlog analysis available."}
          </p>

        </div>

      </section>


      {/* =====================================================
          RESOLUTION & CLOSURE
      ===================================================== */}

      <section className="analysis-section">

        <div className="section-heading-row">

          <div>
            <span className="section-label">
              RESOLUTION
            </span>

            <h2>
              Resolution & Closure Performance
            </h2>
          </div>

        </div>

        <div className="analysis-card">

          <p>
            {data.resolution_closure_performance ||
              "No resolution analysis available."}
          </p>

        </div>

      </section>


      {/* =====================================================
          ASSIGNMENT GROUP
      ===================================================== */}

      <section className="analysis-section">

        <div className="section-heading-row">

          <div>
            <span className="section-label">
              OWNERSHIP
            </span>

            <h2>
              Assignment Group Analysis
            </h2>
          </div>

        </div>

        <div className="analysis-card">

          <p>
            {data.assignment_group_analysis ||
              "No assignment group analysis available."}
          </p>

        </div>

      </section>


      {/* =====================================================
          CATEGORY
      ===================================================== */}

      <section className="analysis-section">

        <div className="section-heading-row">

          <div>
            <span className="section-label">
              CLASSIFICATION
            </span>

            <h2>
              Category & Subcategory Analysis
            </h2>
          </div>

        </div>

        <div className="analysis-card">

          <p>
            {data.category_analysis ||
              "No category analysis available."}
          </p>

        </div>

      </section>


      {/* =====================================================
          NOTABLE INCIDENTS
      ===================================================== */}

      <section className="list-section">

        <div className="section-heading-row">

          <div>
            <span className="section-label">
              INCIDENTS
            </span>

            <h2>
              Notable Incidents
            </h2>
          </div>

          <span className="section-count">
            {notableIncidents.length}
          </span>

        </div>

        <div className="white-list">

          {notableIncidents.length > 0 ? (
            notableIncidents.map((item, index) => (
              <div
                className="white-list-item"
                key={index}
              >
                <span className="list-number">
                  {index + 1}
                </span>

                <span>
                  {item}
                </span>
              </div>
            ))
          ) : (
            <div className="empty-item">
              No notable incidents.
            </div>
          )}

        </div>

      </section>


      {/* =====================================================
          AREAS TO WATCH
      ===================================================== */}

      <section className="list-section">

        <div className="section-heading-row">

          <div>
            <span className="section-label">
              MONITOR
            </span>

            <h2>
              Areas to Watch
            </h2>
          </div>

          <span className="section-count">
            {areasToWatch.length}
          </span>

        </div>

        <div className="white-list">

          {areasToWatch.length > 0 ? (
            areasToWatch.map((item, index) => (
              <div
                className="white-list-item watch"
                key={index}
              >
                <span className="watch-dot" />

                <span>
                  {item}
                </span>
              </div>
            ))
          ) : (
            <div className="empty-item">
              No areas to watch.
            </div>
          )}

        </div>

      </section>


      {/* =====================================================
          RECOMMENDED ACTIONS
      ===================================================== */}

      <section className="actions-section">

        <div className="section-heading-row">

          <div>
            <span className="section-label">
              NEXT STEPS
            </span>

            <h2>
              Recommended Actions
            </h2>
          </div>

          <span className="action-badge">
            AI
          </span>

        </div>

        <div className="actions-list">

          {recommendedActions.length > 0 ? (
            recommendedActions.map((action, index) => (
              <div
                className="action-item"
                key={index}
              >

                <div className="action-number">
                  {index + 1}
                </div>

                <div className="action-text">
                  {action}
                </div>

              </div>
            ))
          ) : (
            <div className="empty-item">
              No recommended actions.
            </div>
          )}

        </div>

      </section>

    </div>
  );
};

export default Insights;