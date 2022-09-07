import "./App.css";
import { NavLink, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Pokemon from "./Components/pokemon";
import SinglePokemon from "./Components/singlepokemon";
import PokemonDetails from "./Components/details";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import PokemonNavbar from "./Components/Navbar";

const pImages = process.env.REACT_APP_POKEMON_IMAGES_URL;
console.log("This is Images", pImages);

function App() {
  //useState() will be truthly from very beginning
  const [pokemons, setPokemons] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [value, setValue] = useState({});


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
        // setSelectedOptions(json);
      }
    }
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);;
  
    // cancel any future `setData`
    return () => acceptValue = false;
  }, [])


  let options = pokemons.map((pokemon) => {
    return {label: pokemon.name.english, id: pokemon.id}
  });

  useEffect(() => {
    let results = pokemons;
    // setSelectedOptions(pokemons);
    // value empty and null and undefined
    if (
      value // 👈 null and undefined check
      && Object.keys(value).length !== 0
      && Object.getPrototypeOf(value) === Object.prototype
    ) {
      results = pokemons.filter((pokemon) => pokemon.id === value.id);
      console.log("from filter", results);
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
        renderInput={(params) => <TextField {...params} label="Search Pokemon" />}
      />
      </div>
      
      <Routes>
        <Route path="/" element={<Pokemon pokemons={selectedOptions} pImages={pImages}/>} />

        <Route
          path="pokemons"
          element={<Pokemon pokemons={selectedOptions} pImages={pImages}/>}
        />
        <Route
          path="pokemons/:id"
          element={<SinglePokemon pokemons={pokemons} pImages={pImages}/>}
        />
        <Route
          path="pokemons/:id/info"
          element={<PokemonDetails pokemons={pokemons} pImages={pImages}/>}
        />
      </Routes>
    </div>
  );
}

export default App;
