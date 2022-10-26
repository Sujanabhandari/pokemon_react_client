import "./App.css";
import { NavLink, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState, CSSProperties } from "react";
import Pokemon from "./Components/pokemon";
import SinglePokemon from "./Components/singlepokemon";
import PokemonDetails from "./Components/details";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import PokemonNavbar from "./Components/Navbar";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { toast } from "react-toastify";
import { getUser } from "./utils/authUtils";
import PacmanLoader from "react-spinners/ClipLoader";

const pImages =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

const override = {
  display: "block",
  margin: "0 auto",
  position: "fixed",
  top: "50%",
  left: "50%",
  borderWidth: "3px"
};

function App() {
  //useState() will be truthly from very beginning
  const [pokemons, setPokemons] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [value, setValue] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  let [loading, setLoading] = useState(true);


  //validate Token
  useEffect(() => {
    const validateToken = async () => {
      try {
        const { data, error } = await getUser(token);
        if (error) {
          throw new Error(error.response?.data.error || error.message);
        }
        setUser(data);
        setIsAuthenticated(true);
      } catch (error) {
        toast.error("Invalid session, please login again");
        localStorage.removeItem("token");
        setToken(null);
      }
    };
    token && validateToken();
  }, [token]);

  useEffect(() => {
    let acceptValue = true;
    // declare the async data fetching function
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(
        `https://pokemon-fight-app.onrender.com/pokemons`
      );
      let json = await response.json();
      if (acceptValue) {
        setPokemons(json);
        setLoading(false);
      }
    };

    fetchData()
      .catch(console.error);
    return () => (acceptValue = false);
  }, []);

  let options = pokemons.map((pokemon) => {
    return { label: pokemon.name.english, id: pokemon.id };
  });

  useEffect(() => {
    let results = pokemons;
    if (
      value && // 👈 null and undefined check
      Object.keys(value).length !== 0 &&
      Object.getPrototypeOf(value) === Object.prototype
    ) {
      results = pokemons.filter((pokemon) => pokemon.id === value.id);
    }
    setSelectedOptions(results);
  }, [pokemons, value]);


  return (
    <div className="App">
      {/* <Link to="/" className="text-decoration-none text-black"><h1>Pokemon App</h1></Link> */}
      <PokemonNavbar />
      <div className="autoCenter">
        <Autocomplete
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          id="combo-box-demo"
          options={options}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Search Pokemon" />
          )}
        />
      </div>

      <Routes>
        <Route
          path="/"
          element={<Pokemon pokemons={selectedOptions} pImages={pImages} />}
        />

        <Route
          path="login"
          element={
            <Login
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
              setToken={setToken}
            />
          }
        />
        <Route
          path="register"
          element={
            <Register
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
              setToken={setToken}
            />
          }
        />
        <Route
          path="pokemons"
          element={<Pokemon pokemons={selectedOptions} pImages={pImages} />}
        />
        <Route
          path="pokemons/:id"
          element={<SinglePokemon pokemons={pokemons} pImages={pImages} />}
        />
        <Route
          path="pokemons/:id/info"
          element={<PokemonDetails pokemons={pokemons} pImages={pImages} />}
        />
      </Routes>
      <PacmanLoader
        color={"#e8dd61"}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default App;
