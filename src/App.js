import "./App.css";
import { NavLink, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Pokemon from "./Components/pokemon";
import SinglePokemon from "./Components/singlepokemon";
import PokemonDetails from "./Components/details";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";


function App() {
  const [pokemons, setPokemons] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [query, setQuery] = useState("");


  useEffect(() => {
    let acceptValue = true;
  
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const response = await fetch(`https://pokemon-fight-app.onrender.com/pokemons`);
      // console.log(response)
      // convert the data to json
      const json = await response.json();
      console.log("from results", json);
      if (acceptValue) {
        setPokemons(json);
      }
    }
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);;
  
    // cancel any future `setData`
    return () => acceptValue = false;
  }, [])

  let result = [];
  pokemons.map((pokemons) => result.push(pokemons.name.english));

  useEffect(() => {
    const results = [];
    pokemons.filter((pokemon) => {
      if (query == "") {
        //if query is empty
        console.log("empty");
        return setSelectedOptions(pokemons);
      } else if (pokemon.name.english.includes(query)) {
        results.push(pokemon);
        return setSelectedOptions(results);
      }
    });
  }, [query]);

  return (
    <div className="App">
      <Link to="/"><h1>Pokemon App</h1></Link>

      <Autocomplete
    
        onInputChange={(event, newInputValue) => {
          setQuery(newInputValue);
        }}

        isOptionEqualToValue={(option, value) => option.code === value}
        id="combo-box-demo"
        options={result}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Controllable" />}
      />

      <Routes>
        <Route path="/" element={<Pokemon pokemons={selectedOptions} />} />
        <Route
          path="pokemons"
          element={<Pokemon pokemons={selectedOptions} />}
        />
        <Route
          path="pokemons/:id"
          element={<SinglePokemon pokemons={pokemons} />}
        />
        <Route
          path="pokemons/:id/:info"
          element={<PokemonDetails pokemons={pokemons} />}
        />
      </Routes>
    </div>
  );
}

export default App;
