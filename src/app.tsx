import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./app.css";
import AppHeader from "./components/Header/Header";
import "./index.css";
import Login from "./pages/login/login";
import Home from "./pages/main/main";
import Registration from "./pages/registration/registration";

function App() {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
