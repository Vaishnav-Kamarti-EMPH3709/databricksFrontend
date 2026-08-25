const Sidebar = ({ onNavigate }) => {
  const currentPath = window.location.pathname;

  const handleClick = (path) => {
    onNavigate(path);
  };

  return (
    <aside className="sidebar">

      {/* =========================
          INCIDENTS
      ========================= */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">
          INCIDENTS
        </div>

        <button
          className={`sidebar-link ${
            currentPath === "/" ? "active" : ""
          }`}
          onClick={() => handleClick("/")}
        >
          <span className="sidebar-bullet">•</span>
          <span>All</span>
        </button>
      </div>


      {/* =========================
          INTELLIGENCE
      ========================= */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">
          INTELLIGENCE
        </div>

        <button
          className={`sidebar-link ${
            currentPath === "/this-week" ? "active" : ""
          }`}
          onClick={() => handleClick("/this-week")}
        >
          <span className="sidebar-bullet">•</span>
          <span>This Week</span>
        </button>

        <button
          className={`sidebar-link ${
            currentPath === "/insights" ? "active" : ""
          }`}
          onClick={() => handleClick("/insights")}
        >
          <span className="sidebar-bullet">•</span>
          <span>Insights</span>
        </button>

        <button
          className={`sidebar-link ${
            currentPath === "/ask" ? "active" : ""
          }`}
          onClick={() => handleClick("/ask")}
        >
          <span className="sidebar-bullet">•</span>
          <span>Ask</span>
        </button>

        <button
          className={`sidebar-link ${
            currentPath === "/actions" ? "active" : ""
          }`}
          onClick={() => handleClick("/actions")}
        >
          <span className="sidebar-bullet">•</span>
          <span>Actions</span>
        </button>
      </div>


      {/* =========================
          WORKSPACE
      ========================= */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">
          WORKSPACE
        </div>

        <button
          className={`sidebar-link ${
            currentPath === "/inbox" ? "active" : ""
          }`}
          onClick={() => handleClick("/inbox")}
        >
          <span className="sidebar-bullet">•</span>
          <span>Inbox</span>
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;