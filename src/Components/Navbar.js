import { NavLink, Routes, Route, Link } from "react-router-dom";

const PokemonNavbar = () => {
  return (
    <>
      <div className="container">
        <div className="row mt-3">
          <div className="col-4">
            <img
              src="picalogo.png"
              alt="pokemon"
              className="image-design"
            ></img>
          </div>
          <div className="col-4">
            <Link to="/" className="text-decoration-none text-black">
              <h2>Pokemon Fight</h2>
            </Link>
          </div>
          <div className="col-4">
          <Link to="/" className="text-decoration-none text-black">
              <h2>Explore</h2>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonNavbar;
