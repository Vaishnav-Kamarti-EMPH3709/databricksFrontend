import { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedIncident, setSelectedIncident] = useState(null);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/incidents/home"
        );

        if (!response.ok) {
          throw new Error("Failed to load home data");
        }

        const result = await response.json();

        console.log("Home API:", result);

        setData(result);
      } catch (error) {
        console.error("Home Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  // Close popup with Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedIncident(null);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  if (loading) {
    return (
      <div className="home-page">
        <div className="home-loading">
          <div className="loading-spinner"></div>
          <span>Loading Incident Command Center...</span>
        </div>
      </div>
    );
  }

  const open = data?.summary?.open ?? 0;
  const high = data?.summary?.high ?? 0;
  const onHold = data?.summary?.on_hold ?? 0;

  const incidents = data?.ai_prioritized ?? [];

  const formatDate = (value) => {
    if (!value) return "N/A";

    try {
      return new Date(value).toLocaleString();
    } catch {
      return value;
    }
  };

  return (
    <div className="home-page">

      {/* =========================
          HEADER
      ========================== */}

      <div className="home-header">

        <div>
          <h1>Incident Command Center</h1>

          <p>
            Monitor incidents and focus on issues that
            require immediate attention.
          </p>
        </div>

      </div>


      {/* =========================
          TABS
      ========================== */}

      <div className="incident-tabs">

        <button className="incident-tab active">
          <span>All</span>
          <strong>{open}</strong>
        </button>

        <button className="incident-tab critical">
          <span>High</span>
          <strong>{high}</strong>
        </button>

        <button className="incident-tab onhold-tab">
          <span>On Hold</span>
          <strong>{onHold}</strong>
        </button>

      </div>


      {/* =========================
          SUMMARY CARDS
      ========================== */}

      <div className="home-overview">

        <div className="overview-card open-card">
          <div className="overview-value">
            {open}
          </div>

          <div className="overview-label">
            Open
          </div>
        </div>


        <div className="overview-card critical-card">
          <div className="overview-value">
            {high}
          </div>

          <div className="overview-label">
            High Priority
          </div>
        </div>


        <div className="overview-card onhold-card">
          <div className="overview-value">
            {onHold}
          </div>

          <div className="overview-label">
            On Hold
          </div>
        </div>

      </div>


      {/* =========================
          HIGH PRIORITY SECTION
      ========================== */}

      <section className="priority-section">

        <div className="section-header">

          <div>
            <div className="section-heading">

              <span className="section-icon">
                !
              </span>

              <h2>
                HIGH PRIORITY INCIDENTS
              </h2>

            </div>

            <p>
              High priority incidents requiring attention
            </p>
          </div>

          <span className="priority-section-badge">
            HIGH PRIORITY
          </span>

        </div>


        {/* =========================
            INCIDENT LIST
        ========================== */}

        <div className="incident-list">

          {incidents.map((incident) => (

            <div
              className="incident-card"
              key={incident.incident_id}
            >

              {/* TOP ROW */}

              <div className="incident-card-top">

                <div className="incident-heading">

                  <span className="incident-dot"></span>

                  <strong className="incident-id">
                    {incident.incident_id}
                  </strong>

                  <span className="incident-title">
                    {incident.title || "No title available"}
                  </span>

                </div>

                <span className="priority-badge">
                  {incident.priority || "HIGH"}
                </span>

              </div>


              {/* DESCRIPTION */}

              


              {/* DETAILS GRID */}

              <div className="incident-info-grid">

                <div className="info-item">
                  <span>Impact</span>
                  <strong>
                    {incident.impact || "N/A"}
                  </strong>
                </div>

                <div className="info-item">
                  <span>Urgency</span>
                  <strong>
                    {incident.urgency || "N/A"}
                  </strong>
                </div>

                <div className="info-item">
                  <span>State</span>
                  <strong>
                    {incident.state || "N/A"}
                  </strong>
                </div>

                <div className="info-item">
                  <span>Category</span>
                  <strong>
                    {incident.category || "N/A"}
                  </strong>
                </div>

                <div className="info-item">
                  <span>Assignment Group</span>
                  <strong>
                    {incident.group || "N/A"}
                  </strong>
                </div>

                <div className="info-item">
                  <span>CI</span>
                  <strong>
                    {incident.ci_name || "N/A"}
                  </strong>
                </div>

              </div>


              {/* FOOTER */}

              <div className="incident-card-footer">

                <span className="opened-date">
                  Opened: {formatDate(incident.opened_at)}
                </span>

                <button
                  type="button"
                  className="view-details-btn"
                  onClick={() => setSelectedIncident(incident)}
                >
                  View Details
                  <span className="arrow">
                    →
                  </span>
                </button>

              </div>

            </div>

          ))}


          {/* EMPTY STATE */}

          {incidents.length === 0 && (

            <div className="empty-incidents">
              No high-priority incidents available.
            </div>

          )}

        </div>

      </section>


      {/* =========================
          INCIDENT DETAILS POPUP
      ========================== */}

      {selectedIncident && (

        <div
          className="incident-modal-overlay"
          onClick={() => setSelectedIncident(null)}
        >

          <div
            className="incident-modal"
            onClick={(event) => event.stopPropagation()}
          >

            {/* MODAL HEADER */}

            <div className="modal-header">

              <div>
                <span className="modal-label">
                  INCIDENT DETAILS
                </span>

                <h2>
                  {selectedIncident.incident_id}
                </h2>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() => setSelectedIncident(null)}
              >
                ×
              </button>

            </div>


            {/* MODAL BODY */}

            <div className="modal-body">

              <div className="modal-title-row">

                <h3>
                  {selectedIncident.title || "No title available"}
                </h3>

                <span className="modal-priority">
                  {selectedIncident.priority || "N/A"}
                </span>

              </div>


              {selectedIncident.description && (

                <div className="modal-description-section">

                  <span>Description</span>

                  <p>
                    {selectedIncident.description}
                  </p>

                </div>

              )}


              <div className="modal-details-grid">

                <div className="modal-detail">
                  <span>Priority</span>
                  <strong>
                    {selectedIncident.priority || "N/A"}
                  </strong>
                </div>

                <div className="modal-detail">
                  <span>Impact</span>
                  <strong>
                    {selectedIncident.impact || "N/A"}
                  </strong>
                </div>

                <div className="modal-detail">
                  <span>Urgency</span>
                  <strong>
                    {selectedIncident.urgency || "N/A"}
                  </strong>
                </div>

                <div className="modal-detail">
                  <span>State</span>
                  <strong>
                    {selectedIncident.state || "N/A"}
                  </strong>
                </div>

                <div className="modal-detail">
                  <span>Category</span>
                  <strong>
                    {selectedIncident.category || "N/A"}
                  </strong>
                </div>

                <div className="modal-detail">
                  <span>Subcategory</span>
                  <strong>
                    {selectedIncident.subcategory || "N/A"}
                  </strong>
                </div>

                <div className="modal-detail">
                  <span>Assignment Group</span>
                  <strong>
                    {selectedIncident.group || "N/A"}
                  </strong>
                </div>

                <div className="modal-detail">
                  <span>CI Name</span>
                  <strong>
                    {selectedIncident.ci_name || "N/A"}
                  </strong>
                </div>

                <div className="modal-detail">
                  <span>Opened For</span>
                  <strong>
                    {selectedIncident.opened_for || "N/A"}
                  </strong>
                </div>

                <div className="modal-detail">
                  <span>Assigned To</span>
                  <strong>
                    {selectedIncident.assigned_to || "N/A"}
                  </strong>
                </div>

                <div className="modal-detail">
                  <span>Opened At</span>
                  <strong>
                    {formatDate(selectedIncident.opened_at)}
                  </strong>
                </div>

                <div className="modal-detail">
                  <span>Resolved At</span>
                  <strong>
                    {formatDate(selectedIncident.resolved_at)}
                  </strong>
                </div>

                <div className="modal-detail">
                  <span>Closed At</span>
                  <strong>
                    {formatDate(selectedIncident.closed_at)}
                  </strong>
                </div>

                <div className="modal-detail">
                  <span>Hold Reason</span>
                  <strong>
                    {selectedIncident.hold_reason || "N/A"}
                  </strong>
                </div>

                <div className="modal-detail">
                  <span>Closure Code</span>
                  <strong>
                    {selectedIncident.closure_code || "N/A"}
                  </strong>
                </div>

                <div className="modal-detail">
                  <span>Closure Sub Code</span>
                  <strong>
                    {selectedIncident.closure_sub_code || "N/A"}
                  </strong>
                </div>

                <div className="modal-detail">
                  <span>Sector</span>
                  <strong>
                    {selectedIncident.sector || "N/A"}
                  </strong>
                </div>

                <div className="modal-detail">
                  <span>Division</span>
                  <strong>
                    {selectedIncident.division || "N/A"}
                  </strong>
                </div>

                <div className="modal-detail">
                  <span>Region</span>
                  <strong>
                    {selectedIncident.region || "N/A"}
                  </strong>
                </div>

              </div>

            </div>


            {/* MODAL FOOTER */}

            <div className="modal-footer">

              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedIncident(null)}
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Home;