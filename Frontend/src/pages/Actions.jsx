import "./Actions.css";

const ACTIONS = [
  {
    id: "INC0012345",
    priority: "HIGH PRIORITY",
    title: "Escalate INC0012345 to Data Platform",
    reason:
      "Similar incidents were resolved by the Data Platform team and the current SLA breach probability is high.",
    confidence: "94%",
    similar: "7",
    improvement: "38 min",
  },
  {
    id: "INC0012346",
    priority: "HIGH PRIORITY",
    title: "Assign INC0012346 to Analytics Team",
    reason:
      "The incident matches recurring Supply Chain dashboard issues previously handled by the Analytics Team.",
    confidence: "87%",
    similar: "4",
    improvement: "27 min",
  },
];

const Actions = () => {
  return (
    <div className="actions-page">

      <div className="actions-header">
        <h1>Actions</h1>
        <p>
          AI-recommended actions prepared for your approval.
        </p>
      </div>

      <section className="recommended-section">

        <div className="section-heading">
          <h2>Recommended — Prepared for Your Approval</h2>
        </div>

        <div className="actions-list">

          {ACTIONS.map((action) => (
            <div className="action-card" key={action.id}>

              <div className="action-card-header">
                <span className="action-severity high">
                  ●
                </span>

                <span className="action-priority">
                  {action.priority}
                </span>
              </div>

              <h3>
                {action.title}
              </h3>

              <p className="action-reason">
                {action.reason}
              </p>

              <div className="action-details">

                <div>
                  <span>AI Confidence</span>
                  <strong>{action.confidence}</strong>
                </div>

                <div>
                  <span>Similar incidents</span>
                  <strong>{action.similar}</strong>
                </div>

                <div>
                  <span>Estimated resolution improvement</span>
                  <strong>{action.improvement}</strong>
                </div>

              </div>

              <div className="action-buttons">

                <button className="approve-btn">
                  Approve
                </button>

                <button className="adjust-btn">
                  Adjust
                </button>

                <button className="rerun-btn">
                  Re-run with Agent
                </button>

              </div>

            </div>
          ))}

        </div>

      </section>

    </div>
  );
};

export default Actions;