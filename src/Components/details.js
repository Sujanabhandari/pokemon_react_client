import { useParams, Link, Outlet } from "react-router-dom";
import { getRandomInt, getBaseInfoHtml, getInitalValues } from "./game";
import { useState, useEffect } from "react";
import config from "../config.json";

let playInterval = undefined;
let playerAttackRate,
  systemAttackRate = 0;
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
    // playerPokemonCalc = JSON.parse(JSON.stringify(tempPokemon));
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
    systemPokemonCalc =  JSON.parse(JSON.stringify(pokemons[systemPokemonId]));
    setSystemHp(systemPokemonCalc.base["HP"]);

    Object.assign(playerPokemonCalc, getInitalValues(playerPokemonCalc));
    Object.assign(systemPokemonCalc, getInitalValues(systemPokemonCalc));

    playInterval = setInterval(play, config.timelapse);
    console.log(playInterval);
  };

  const endGame = () => {
    
    console.log("CLICKED");
    clearInterval(playInterval);
    // setWinMessage("New Game");
  };

  const play = () => {
    let apDamagePlayer =
      playerPokemonCalc.base["Attack"] - systemPokemonCalc.base["Defense"];
      //82-90 = -8

    let apDamageSystem =
      systemPokemonCalc.base["Attack"] - playerPokemonCalc.base["Defense"];

    playerPokemonCalc.base["HP"] =
      playerPokemonCalc.base["HP"] - apDamageSystem > 0 ? apDamageSystem : 0;
      
    systemPokemonCalc.base["HP"] =
    //110 - (-8)
      systemPokemonCalc.base["HP"] - apDamagePlayer > 0 ? apDamagePlayer : 0;

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
            <button type="button" className="btn btn-info" onClick={startGame}>
              Start Game
            </button>
            <button type="button" className="btn btn-info" onClick={endGame}>
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
                HP {playerHp}
              </div>
              <div className="col-12 p-3 hover-div bg-success">
                <div className="card card-top hover-card m-0">
                  <div className="card-body">
                  <div><img src={`${pImages}/${playerPokemon?.id}.png`}  alt="Images"/></div>
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
                HP {systemHp}
              </div>
              <div className="col-12 p-3 bg-primary">
                <div className="card card-top hover-card m-0">
                  <div className="card-body">
                  <div><img src={`${pImages}/${systemPokemon?.id}.png`}  alt="Images"/></div>
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
