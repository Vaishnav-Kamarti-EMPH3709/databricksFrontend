import { useEffect, useState } from "react";

const cardColors = [
  {
    background: "#eaf3ff",
    color: "#1769e0",
  },
  {
    background: "#edf9e9",
    color: "#218c3a",
  },
  {
    background: "#fff0e3",
    color: "#e8750c",
  },
  {
    background: "#f3eaff",
    color: "#7438d4",
  },
  {
    background: "#fff8dc",
    color: "#b88600",
  },
  {
    background: "#ffe9e9",
    color: "#d93636",
  },
];

const DomainTickets = () => {
  const [domains, setDomains] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOngoingIncidents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://127.0.0.1:8000/api/incidents/ongoing"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch ongoing incidents");
        }

        const data = await response.json();

        console.log("Ongoing incidents:", data);

        setDomains(data);
      } catch (err) {
        console.error("Ongoing incidents error:", err);
        setError("Unable to load ongoing incidents.");
      } finally {
        setLoading(false);
      }
    };

    fetchOngoingIncidents();
  }, []);

  if (loading) {
    return (
      <div className="domain-tickets">
        <div className="domain-loading">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="domain-tickets">
        <div className="domain-error">
          {error}
        </div>
      </div>
    );
  }

  if (!domains || Object.keys(domains).length === 0) {
    return (
      <div className="domain-tickets">
        <div className="domain-empty">
          No ongoing incidents found.
        </div>
      </div>
    );
  }

  return (
    <div className="domain-tickets">
      {Object.entries(domains).map(
        ([domain, count], index) => {
          const color =
            cardColors[index % cardColors.length];

          return (
            <div
              className="domain-item"
              key={domain}
              style={{
                backgroundColor: color.background,
                color: color.color,
              }}
            >
              <span className="domain-name">
                {domain}
              </span>

              <span
                className="domain-count"
                style={{
                  color: color.color,
                }}
              >
                {count}
              </span>
            </div>
          );
        }
      )}
    </div>
  );
};

export default DomainTickets;