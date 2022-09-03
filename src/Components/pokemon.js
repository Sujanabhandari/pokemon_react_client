import { Link } from "react-router-dom";
import * as React from "react";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const Pokemon = ({ pokemons }) => {

  const [selectedOptions, setSelectedOptions] = useState([]);

  

  // const optionSelected = (events, value) => {
  //   setSelectedOptions(value);
  // }

  // console.log(selectedOptions);

  // let result=[]
  // pokemons.map(pokemons => result.push(pokemons.name.english))
  // console.log("from results", result);

  return (
    <>
      <div className="container">
        <div className="row ">
          <h2>List of Pokemons</h2>

          {/* <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={result}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <div>
                <TextField {...params} label="Pokemons" />
              </div>
            )}
            onChange={optionSelected}
          /> */}

          {pokemons?.map((pokemon, index) => (
            <div
              className="col-2 col-md-2 col-lg-2 hover-div bg-light border-style"
              key={index}
            >
              <div className="card card-top hover-card ">
                <div>
                  <Link
                    to={`/pokemons/${pokemon.id}`}
                    className="text-decoration-none"
                  >
                    <h4>{pokemon.name.english}</h4>
                  </Link>
                </div>

                <div className="card-body">
                  <div className="row">
                    {pokemon.type.map((pokemontype, index) => (
                      <p className="card-text p-height" key={index}>
                        <ul className="list-style-type: none">
                          <li>{pokemontype}</li>
                        </ul>
                      </p>
                    ))}

                    <br />
                    {/* <div>
                      <p>{clickedPokemon.base.HP}</p>
                    </div> */}
                  </div>
                </div>

                <div className="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
                  <Link to={`/pokemons/${pokemon.id}/info`}>
                    <h5>Details</h5>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Pokemon;
