import { Link, NavLink } from "react-router-dom";

const AppHeader = () => {
  return (
    <header className="header">
      <nav className="header__navigation">
        <h1 className="header__home">
          <Link to="/">Home</Link>
        </h1>
        <div className="header__right">
          <p className="header__login">
            <NavLink
              end
              style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
              to="/login"
            >
              Login
            </NavLink>
          </p>
          <p className="header__registration">
            <NavLink
              end
              style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
              to="/registration"
            >
              Registration
            </NavLink>
          </p>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
