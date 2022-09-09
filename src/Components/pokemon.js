import { Link } from "react-router-dom";
import * as React from "react";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const Pokemon = ({ pokemons, pImages }) => {


  return (
    <>
      <div className="container">
        <div className="row ">
          <h4 className="mt-3">Choose your pokemon</h4>
          {pokemons?.map((pokemon, index) => (
            <div
              className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 p-2 mt-2 hover-div bg-light border-style"
              key={index}
            >

              <div className="card card-top hover-card card-height p-3">
                <div>
                  <Link
                    to={`/pokemons/${pokemon.id}`}
                    className="text-decoration-none"
                  >
                    <h5 className="text-dark">{pokemon.name.english}</h5>

                  </Link>
                  
                  <div><img src={`${pImages}/${pokemon.id}.png`}  alt="Images"/></div>

                </div>

                <div className="card-body">
                  <div className="row">
                    
                  
                    {pokemon.type.map((pokemontype, index) => (
                      <div className="card-text p-height" key={index}>
                        <ul className="list-style-type: none p-0">
                          <li>{pokemontype}</li>
                        </ul>
                      </div>
                    ))}

                    <br />
                    
                  </div>
                </div>

                <div className="card-footer text-muted d-flex justify-content-center bg-transparent border-top-0">
                  <Link to={`/pokemons/${pokemon.id}/info`} className="btn btn-primary-design">
                    Choose
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
