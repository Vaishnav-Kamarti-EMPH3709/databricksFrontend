import { useEffect, useState } from "react";
import "./Inbox.css";

const Inbox = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedIncident, setSelectedIncident] = useState(null);

  useEffect(() => {
    const loadIncidents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://127.0.0.1:8000/api/incidents/inbox"
        );

        if (!response.ok) {
          throw new Error("Failed to load incidents");
        }

        const data = await response.json();

        console.log("Inbox API:", data);

        setIncidents(data.incidents || []);
      } catch (err) {
        console.error("Inbox Error:", err);
        setError("Unable to load incidents.");
      } finally {
        setLoading(false);
      }
    };

    loadIncidents();
  }, []);

  const handleViewDetails = (incident) => {
    setSelectedIncident(incident);
  };

  const closeModal = () => {
    setSelectedIncident(null);
  };

  if (loading) {
    return (
      <div className="inbox-page">
        <div className="inbox-loading">
          Loading incidents...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="inbox-page">
        <div className="inbox-error">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="inbox-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="inbox-header">

        <div className="inbox-header-left">
          <h1>Inbox</h1>

          <p>
            All currently open incidents requiring attention.
          </p>
        </div>

        <div className="inbox-count-badge">
          <span className="inbox-count-number">
            {incidents.length}
          </span>

          <span>
            Open Incidents
          </span>
        </div>

      </div>


      {/* =========================
          SECTION HEADER
      ========================= */}

      <div className="inbox-section-header">

        <h2>
          Open Incidents
        </h2>

        <span className="inbox-section-count">
          {incidents.length} incidents
        </span>

      </div>


      {/* =========================
          INCIDENT LIST
      ========================= */}

      {incidents.length === 0 ? (

        <div className="inbox-empty">
          No incidents found.
        </div>

      ) : (

        <div className="inbox-list">

          {incidents.map((incident) => (

            <div
              className="inbox-card"
              key={incident.INCDNT_ID}
            >

              {/* CARD TOP */}

              <div className="inbox-card-top">

                <div className="inbox-incident-id">

                  <span className="inbox-status-dot"></span>

                  <span>
                    {incident.INCDNT_ID}
                  </span>

                </div>

                <span className="inbox-priority">
                  {incident.PRRTY_DESC || "N/A"}
                </span>

              </div>


              {/* DETAILS */}

              <div className="inbox-details">

                <div className="inbox-detail">
                  <span className="inbox-detail-label">
                    State
                  </span>

                  <span className="inbox-detail-value">
                    {incident.INC_STATE_DESC || "N/A"}
                  </span>
                </div>


                <div className="inbox-detail">
                  <span className="inbox-detail-label">
                    Category
                  </span>

                  <span className="inbox-detail-value">
                    {incident.CTGY_DESC || "N/A"}
                  </span>
                </div>


                <div className="inbox-detail">
                  <span className="inbox-detail-label">
                    Assignment Group
                  </span>

                  <span className="inbox-detail-value">
                    {incident.GRP_NM || "N/A"}
                  </span>
                </div>


                <div className="inbox-detail">
                  <span className="inbox-detail-label">
                    CI
                  </span>

                  <span className="inbox-detail-value">
                    {incident.CI_NM || "N/A"}
                  </span>
                </div>


                <div className="inbox-detail">
                  <span className="inbox-detail-label">
                    Impact
                  </span>

                  <span className="inbox-detail-value">
                    {incident.IMPCT_DESC || "N/A"}
                  </span>
                </div>


                <div className="inbox-detail">
                  <span className="inbox-detail-label">
                    Urgency
                  </span>

                  <span className="inbox-detail-value">
                    {incident.URGCY_DESC || "N/A"}
                  </span>
                </div>


                <div className="inbox-detail">
                  <span className="inbox-detail-label">
                    Opened
                  </span>

                  <span className="inbox-detail-value">
                    {incident.OPN_DTM || "N/A"}
                  </span>
                </div>

              </div>


              {/* FOOTER */}

              <div className="inbox-card-footer">

                <span className="inbox-open-date">
                  Opened {incident.OPN_DTM || "N/A"}
                </span>

                <button
                  className="inbox-view-details"
                  onClick={() =>
                    handleViewDetails(incident)
                  }
                >
                  View Details
                  <span>→</span>
                </button>

              </div>

            </div>

          ))}

        </div>

      )}


      {/* =========================
          DETAILS MODAL
      ========================= */}

      {selectedIncident && (

        <div
          className="inbox-modal-overlay"
          onClick={closeModal}
        >

          <div
            className="inbox-modal"
            onClick={(e) => e.stopPropagation()}
          >

            {/* MODAL HEADER */}

            <div className="inbox-modal-header">

              <div>
                <div className="inbox-modal-id">
                  {selectedIncident.INCDNT_ID}
                </div>

                <h2>
                  Incident Details
                </h2>
              </div>

              <button
                className="inbox-modal-close"
                onClick={closeModal}
              >
                ×
              </button>

            </div>


            {/* TITLE */}

            <div className="inbox-modal-title-section">

              <span className="modal-label">
                Title
              </span>

              <div className="modal-title">
                {selectedIncident.TTL_TXT || "N/A"}
              </div>

            </div>


            {/* DETAILS GRID */}

            <div className="inbox-modal-grid">

              <div className="modal-detail">
                <span>Incident ID</span>
                <strong>
                  {selectedIncident.INCDNT_ID || "N/A"}
                </strong>
              </div>

              <div className="modal-detail">
                <span>State</span>
                <strong>
                  {selectedIncident.INC_STATE_DESC || "N/A"}
                </strong>
              </div>

              <div className="modal-detail">
                <span>Priority</span>
                <strong>
                  {selectedIncident.PRRTY_DESC || "N/A"}
                </strong>
              </div>

              <div className="modal-detail">
                <span>Category</span>
                <strong>
                  {selectedIncident.CTGY_DESC || "N/A"}
                </strong>
              </div>

              <div className="modal-detail">
                <span>Impact</span>
                <strong>
                  {selectedIncident.IMPCT_DESC || "N/A"}
                </strong>
              </div>

              <div className="modal-detail">
                <span>Urgency</span>
                <strong>
                  {selectedIncident.URGCY_DESC || "N/A"}
                </strong>
              </div>

              <div className="modal-detail">
                <span>Assignment Group</span>
                <strong>
                  {selectedIncident.GRP_NM || "N/A"}
                </strong>
              </div>

              <div className="modal-detail">
                <span>Configuration Item</span>
                <strong>
                  {selectedIncident.CI_NM || "N/A"}
                </strong>
              </div>

              <div className="modal-detail">
                <span>Opened</span>
                <strong>
                  {selectedIncident.OPN_DTM || "N/A"}
                </strong>
              </div>

              <div className="modal-detail">
                <span>Opened By</span>
                <strong>
                  {selectedIncident.OPN_BY_FULLNM || "N/A"}
                </strong>
              </div>

              <div className="modal-detail">
                <span>Assigned To</span>
                <strong>
                  {selectedIncident.ASGNE_FULL_NM || "N/A"}
                </strong>
              </div>

              <div className="modal-detail">
                <span>Region</span>
                <strong>
                  {selectedIncident.RGN_LST || "N/A"}
                </strong>
              </div>

            </div>


            {/* DESCRIPTION */}

            <div className="modal-description-section">

              <span className="modal-label">
                Description
              </span>

              <div className="modal-description">
                {selectedIncident.DESC_TXT || "No description available."}
              </div>

            </div>


            {/* WORK NOTES */}

            <div className="modal-description-section">

              <span className="modal-label">
                Work Notes
              </span>

              <div className="modal-description">
                {selectedIncident.WORK_NOTES &&
                selectedIncident.WORK_NOTES !== "null"
                  ? selectedIncident.WORK_NOTES
                  : "No work notes available."}
              </div>

            </div>


            {/* MODAL FOOTER */}

            <div className="inbox-modal-footer">

              <button
                className="modal-close-button"
                onClick={closeModal}
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

export default Inbox;