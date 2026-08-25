import { useState } from "react";
import "./Ask.css";

const suggestedQuestions = [
  "Show critical incidents from this week",
  "Find incidents similar to INC0012345",
  "What are the top recurring issues?",
  "Which incidents should be escalated?",
  "Show incidents impacting Supply Chain",
];

const Ask = () => {
  const [question, setQuestion] = useState("");

  const handleSuggestedQuestion = (text) => {
    setQuestion(text);
  };

  const handleAsk = () => {
    console.log("Question:", question);
  };

  return (
    <div className="ask-page">

      {/* Header */}
      <div className="ask-header">
        <div>
          <h2>Ask Incident AI</h2>
          <p>Ask questions about your incident data</p>
        </div>
      </div>

      {/* Question Area */}
      <section className="ask-question-section">

        <h3>What would you like to know?</h3>

        <div className="ask-input-wrapper">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAsk();
              }
            }}
            placeholder="Which incidents are likely to breach SLA today?"
          />

          <button onClick={handleAsk}>
            Ask
          </button>
        </div>

      </section>

      {/* Suggested Questions */}
      <section className="suggested-section">

        <h3>Suggested questions</h3>

        <div className="suggested-list">

          {suggestedQuestions.map((item) => (
            <button
              key={item}
              className="suggested-question"
              onClick={() => handleSuggestedQuestion(item)}
            >
              {item}
            </button>
          ))}

        </div>

      </section>

      {/* AI Response */}
      <section className="ai-response-section">

        <div className="ai-response-header">
          <div className="ai-response-icon">
            ✦
          </div>

          <div>
            <span>AI RESPONSE</span>
            <p>Latest incident analysis</p>
          </div>
        </div>

        <div className="ai-response-body">

          <p>
            There are <strong>7 incidents</strong> currently at
            high risk of SLA breach.
          </p>

          <p>
            <strong>5</strong> are related to Data Platform
            issues.
          </p>

          <div className="urgent-incident">

            <span className="urgent-label">
              Immediate Attention
            </span>

            <h4>INC0012345</h4>

            <div className="urgent-details">

              <div>
                <span>SLA remaining</span>
                <strong>1h 12m</strong>
              </div>

              <div>
                <span>AI breach probability</span>
                <strong>91%</strong>
              </div>

            </div>

            <button className="open-incident-button">
              Open Incident
              <span>→</span>
            </button>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Ask;