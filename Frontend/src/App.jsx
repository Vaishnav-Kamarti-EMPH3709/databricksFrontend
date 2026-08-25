import { useState } from "react";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Insights from "./pages/Insights";
import ThisWeek from "./pages/ThisWeek";
import Ask from "./pages/Ask";
import Actions from "./pages/Actions";
import Inbox from "./pages/Inbox";

import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState(
    window.location.pathname
  );

  const handleNavigation = (path) => {
    window.history.pushState({}, "", path);
    setCurrentPage(path);
  };

  return (
    <div className="app">

      <Sidebar onNavigate={handleNavigation} />

      <div className="main-content">

        {currentPage === "/insights" ? (
          <Insights />

        ) : currentPage === "/this-week" ? (
          <ThisWeek />

        ) : currentPage === "/ask" ? (
          <Ask />

        ) : currentPage === "/actions" ? (
          <Actions />

        ) : currentPage === "/inbox" ? (
          <Inbox />

        ) : (
          <Home />
        )}

      </div>

    </div>
  );
}

export default App;