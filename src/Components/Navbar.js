import { NavLink, Routes, Route, Link } from "react-router-dom";

const PokemonNavbar = () => {
  return (
    <>
      <div className="container-fluid p-0">
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-3">
          <div className="container">
            <Link to="/" className="navbar-brand">
              <img
                src="picalogo.png"
                alt="pokemon"
                className="image-design" 
              ></img>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              {/* <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link active">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link active">
                      Register
                    </Link>
                  </li>
                </>
                <>
                  <li className="nav-item">
                    <p
                      className="nav-link active"
                      style={{ cursor: "pointer" }}
                    >
                      Logout
                    </p>
                  </li>
                </>
              </ul> */}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default PokemonNavbar;
