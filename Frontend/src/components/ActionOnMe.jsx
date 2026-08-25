import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ActionOnMe = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedIncident, setSelectedIncident] = useState(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/incidents/group-open"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch incidents");
        }

        const data = await response.json();

        console.log("Action on me:", data);

        setIncidents(data);
      } catch (err) {
        console.error("Action on me error:", err);
        setError("Unable to load actions.");
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  if (loading) {
    return (
      <div className="action-on-me">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="action-on-me">
        <p>{error}</p>
      </div>
    );
  }

  if (incidents.length === 0) {
    return (
      <div className="action-on-me">
        <p>No pending actions.</p>
      </div>
    );
  }

  return (
    <>
      {/* ACTION ON ME LIST */}
      <div className="action-on-me">
        {incidents.map((incident) => (
          <div
            className="action-item"
            key={incident.incident_id}
            onClick={() => setSelectedIncident(incident)}
          >
            <div
              className={`action-priority ${
                incident.priority?.toLowerCase()
              }`}
            >
              {incident.priority || "N/A"}
            </div>

            <div className="action-details">
              <span className="action-id">
                {incident.incident_id}
              </span>

              <span className="action-title">
                {incident.ci_name || "Unknown CI"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* INCIDENT MODAL */}
      {selectedIncident &&
        createPortal(
          <div
            className="incident-modal-overlay"
            onClick={() => setSelectedIncident(null)}
          >
            <div
              className="incident-modal"
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER */}
              <div className="incident-modal-header">
                <h3>Incident Details</h3>

                <button
                  className="incident-modal-close"
                  onClick={() => setSelectedIncident(null)}
                >
                  ×
                </button>
              </div>

              {/* BODY */}
              <div className="incident-modal-body">

                <div className="incident-field">
                  <label>Incident ID</label>
                  <p>
                    {selectedIncident.incident_id || "N/A"}
                  </p>
                </div>

                <div className="incident-field">
                  <label>Title</label>
                  <p>
                    {selectedIncident.TTL_TXT || "N/A"}
                  </p>
                </div>

                <div className="incident-field">
                  <label>Description</label>
                  <p>
                    {selectedIncident.DESC_TXT || "N/A"}
                  </p>
                </div>

                <div className="incident-field">
                  <label>Open Date & Time</label>
                  <p>
                    {selectedIncident.OPN_DTM || "N/A"}
                  </p>
                </div>

                <div className="incident-field">
                  <label>Impact</label>
                  <p>
                    {selectedIncident.IMPCT_DESC || "N/A"}
                  </p>
                </div>

                <div className="incident-field">
                  <label>Urgency</label>
                  <p>
                    {selectedIncident.URGCY_DESC || "N/A"}
                  </p>
                </div>

                <div className="incident-field">
                  <label>Escalation</label>
                  <p>
                    {selectedIncident.ESCLTN_DESC || "N/A"}
                  </p>
                </div>

              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default ActionOnMe;