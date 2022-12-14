import { useParams, Link, Outlet } from "react-router-dom";
import { getRandomInt, getBaseInfoHtml, getInitalValues, randomAttackInt } from "./game";
import { useState, useEffect } from "react";
import config from "../config.json";

let playInterval = undefined;
let systemPokemonId = -1;
let playerPokemonCalc = {};
let systemPokemonCalc = {};

const winPoint = 0;

const PokemonDetails = ({ pokemons, pImages }) => {
  const { id } = useParams();

  const [playerPokemon, setPlayerPokemon] = useState(null);
  const [systemPokemon, setSystemPokemon] = useState(null);

  const [winMessage, setWinMessage] = useState("");
  const [playerHp, setPlayerHp] = useState(0);
  const [systemHp, setSystemHp] = useState(0);

  useEffect(() => {
    const tempPokemon = pokemons?.filter((pokemon) => pokemon.id == id)[0];
    setPlayerPokemon(tempPokemon);
  }, [id, pokemons]);

  const startGame = () => {
    endGame();
    setWinMessage("New Game");
    // Initialize player data
    playerPokemonCalc = JSON.parse(JSON.stringify(playerPokemon));

    setPlayerHp(playerPokemonCalc.base["HP"]);
    // Initialize system data
    systemPokemonId = getRandomInt(pokemons.length);

    setSystemPokemon(pokemons[systemPokemonId]);

    systemPokemonCalc = JSON.parse(JSON.stringify(pokemons[systemPokemonId]));

    setSystemHp(systemPokemonCalc.base["HP"]);

    Object.assign(systemPokemonCalc, getInitalValues(systemPokemonCalc));

    playInterval = setInterval(play, config.timelapse);

  };

  const endGame = () => {

    clearInterval(playInterval);
  
  };

  const play = () => {

    //Damage done by player
    let apDamagePlayer =
      (randomAttackInt(playerPokemonCalc.base["Attack"])  - randomAttackInt(systemPokemonCalc.base["Defense"]) ) * config.slowmo;
    //82-90 = -8

  
    // Damaged done by system
    let apDamageSystem =
      (randomAttackInt(systemPokemonCalc.base["Attack"]) - randomAttackInt(playerPokemonCalc.base["Defense"])) * config.slowmo;


    apDamageSystem = apDamageSystem > 0 ? apDamageSystem : 0;

    playerPokemonCalc.base["HP"] = playerPokemonCalc.base["HP"] -apDamageSystem;

    
    apDamagePlayer = apDamagePlayer > 0 ? apDamagePlayer : 0
    systemPokemonCalc.base["HP"] = systemPokemonCalc.base["HP"] - apDamagePlayer;
   

    let message = "";
    if (
      systemPokemonCalc.base["HP"] <= winPoint &&
      playerPokemonCalc.base["HP"] > winPoint
    ) {
      message = `Congratulations ${playerPokemonCalc.name["english"]}, You won the match !!!`;
    } else if (
      playerPokemonCalc.base["HP"] <= winPoint &&
      systemPokemonCalc.base["HP"] > winPoint
    ) {
      message = `Sorry ${playerPokemonCalc.name["english"]}, You Loose the match !!!`;
    } else if (playerPokemonCalc.base["HP"] === systemPokemonCalc.base["HP"]) {
      message = "Match Draw";
    }
    // else message="New Game"

    if (message.length > 0) {
      setWinMessage(message);
      endGame();
    }
    setPlayerHp(playerPokemonCalc.base["HP"]);
    setSystemHp(systemPokemonCalc.base["HP"]);
  };


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 my-3">
            <button
              type="button"
              className="btn btn-info m-3"
              onClick={startGame}
            >
              Start Game
            </button>

            <button
              type="button"
              className="btn btn-info m-3"
              onClick={endGame}
            >
              End Game
            </button>
          </div>

          <div className="col-12 my-1">
            <p className="text-sucess">{winMessage}</p>
            <h3 className="text-danger">VS</h3>
          </div>
          <div className="col-6">
            <div className="row m-1">
              {/* <div className="col-12 p-3">
                <div className="progress">
                  <div className="progress-bar bg-success" role="progressbar" aria-label="Success example" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div> */}
              <div className="col-12">
                <div className="progress">
                  <div
                    class="progress-bar bg-success"
                    role="progressbar"
                    aria-label="Success example"
                    style={{width: playerHp + "%"}}
                    aria-valuenow={playerHp}
                    aria-valuemin= "0"
                    aria-valuemax="100"
                  ></div>
                </div>
                HP {playerHp.toFixed(2)}
              </div>
              <div className="col-12 p-3 hover-div bg-success">
                <div className="card card-top hover-card m-0">
                  <div className="card-body">
                    <div>
                      <img
                        src={`${pImages}/${playerPokemon?.id}.png`}
                        alt="Images"
                      />
                    </div>
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
              <div className="col-12">
              <div className="progress">
                  <div
                    class="progress-bar bg-warning"
                    role="progressbar"
                   
                    style={{width: systemHp + "%"}}
                    aria-label="Success example"
                    aria-valuenow={systemHp}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                HP {systemHp.toFixed(2)}</div>
              <div className="col-12 p-3 bg-warning">
                <div className="card card-top hover-card m-0">
                  <div className="card-body">
                    <div>
                      <img
                        src={`${pImages}/${systemPokemon?.id}.png`}
                        alt="Pokemon"
                      />
                    </div>
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
