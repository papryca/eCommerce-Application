import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "./components/header/header";
import Login from "./pages/login/login";
import Home from "./pages/main/main";
import Registration from "./pages/registration/registration";

import "./app.css";
import "./index.css";

const App = () => {
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
};

export default App;
