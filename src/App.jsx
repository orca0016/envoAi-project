import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import BugHunt from "./pages/BugHunt";
import LayoutChallenge from "./pages/LayoutChallenge";
import DialogProvider from "./providers/DialogProvider";
import DataProvider from "./providers/DataProvider";

function App() {
  return (
    <Router>
      <DataProvider>
      <DialogProvider>
        <div className="app-container">
          <nav className="navigation">
            <h1>Junior Frontend Developer Assessment</h1>
            <div className="nav-links">
              <Link to="/" className="nav-link">
                Challenge 1: Layout Fix
              </Link>
              <Link to="/bug-hunt" className="nav-link">
                Challenge 2: Bug Hunt
              </Link>
            </div>
          </nav>

          <main className="main-content">
            <Routes>
              <Route path="/" element={<LayoutChallenge />} />
              <Route path="/bug-hunt" element={<BugHunt />} />
            </Routes>
          </main>
        </div>
      </DialogProvider>

      </DataProvider>
    </Router>
  );
}

export default App;
