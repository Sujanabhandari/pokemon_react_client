import { useParams, Link, Outlet } from "react-router-dom";
import { getRandomInt, getBaseInfoHtml, getInitalValues } from './game';
import { useState, useEffect } from "react";
import config from '../config.json';


const PokemonDetails = ({ pokemons }) => {
  const playerInfo = {};
  const systemInfo = {};
  let playInterval = undefined;
  
  const { id } = useParams();
  const [systemPokemon, setSystemPokemon ] = useState(null);
  // const { }
  // let systemPokemon
  let playerAttackRate, systemAttackRate = 0;
  
  let systemPokemonId = -1;

  const playerPokemon = pokemons?.filter((pokemon) => pokemon.id == id)[0];


  const startGame = () => {
    endGame();
    systemPokemonId = getRandomInt(pokemons.length);
    setSystemPokemon(pokemons[systemPokemonId]);

    Object.assign(playerInfo, getInitalValues(playerPokemon));
    Object.assign(systemInfo, getInitalValues(pokemons[systemPokemonId]));

    playInterval = setInterval(play, config.timelapse);
    console.log(playInterval);
  }

  // console.log(playerPokemon.base["HP"])

  const endGame = () => {

    // if(playerPokemon?.name.english==="Venusaur") alert ("You are winner");   
    // console.log("System", systemPokemon.base.HP)
    // console.log("Player", playerPokemon.base["HP"])

    // if(playerPokemon.base["HP"] > systemPokemon.base["HP"]) alert ("You are winner your type is greater");
    // else alert("System Wins");

    console.log("CLICKED");
    clearInterval(playInterval);
  }

  const play = () => {
    console.log("play");
  }


  // console.log("playerPokemon", playerPokemon);
  // console.log("systemPokemon", systemPokemon);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 my-3">
            <button type="button" className="btn btn-info" onClick={startGame} >Start Game</button>
            <button type="button" className="btn btn-info" onClick={endGame} >End Game</button>
          </div>
          <div className="col-12 my-1">
            <h3 className="text-red">VS</h3>
          </div>
          <div className="col-6">
            <div className="row m-1">
              <div className="col-12 p-3 hover-div bg-success">
                <div className="card card-top hover-card m-0">
                  <div className="card-body">
                    <div className="row">
                      <h3>{playerPokemon?.name.english}</h3>
                      {getBaseInfoHtml(playerPokemon)}
                      <h4>Type</h4>
                      {playerPokemon?.type.map((info, index) => (
                          <div className="card-text p-height" key={index}>
                              <ul className="list-style-type: none">
                                  <li>{info}</li>
                              </ul>
                          </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row m-1">
              <div className="col-12 p-3 bg-primary">
                <div className="card card-top hover-card m-0">
                  <div className="card-body">
                    <h3>{systemPokemon?.name.english}</h3>
                    {getBaseInfoHtml(systemPokemon)}
                    <h4>Type</h4>
                    {systemPokemon?.type.map((info, index) => (
                        <div className="card-text p-height" key={index}>
                            <ul className="list-style-type: none">
                                <li>{info}</li>
                            </ul>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonDetails;
