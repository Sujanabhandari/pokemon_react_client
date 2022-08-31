
import './App.css';
import { NavLink, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import Pokemon from './Components/pokemon';

function App() {

  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch('https://pokemon-fight-app.onrender.com/pokemons').then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            console.log("Error Occured")
        }
    }).then((data) => {
      console.log("From Use Effect", data)
        setPokemons(data);
    }).catch((error) => {
      console.log(error)
    })
}, [])

  return (
    <div className="App">
      <h1>Pokemon App</h1>
      {/* <Box sx={{ minWidth: 275 }}> */}
      <Routes>
        <Route path='/' element={<Pokemon pokemons={pokemons}/>} />
      </Routes>
    </div>
  );
}

export default App;
