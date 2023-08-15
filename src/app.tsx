import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PrivateRoute from "./helpers/private-router";
import Page404 from "./pages/404/404";
import Login from "./pages/login/login";
import Home from "./pages/main/main";
import Registration from "./pages/registration/registration";

import "./app.scss";
import "./index.scss";

const App = () => {
  return (
    <Router>
      <div className="app">
        <main className="main">
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
