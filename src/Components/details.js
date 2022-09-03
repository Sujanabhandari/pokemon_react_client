import { useParams, Link, Outlet } from "react-router-dom";

const PokemonDetails = ({ pokemons }) => {
  const { id } = useParams();


  const clickedPokemon = pokemons?.filter((pokemon) => pokemon.id == id);


  let nameResults = [];
  let baseResults = [];
  let typeResults = [];

  clickedPokemon.map((pokeName) => {
    for (const [key, value] of Object.entries(pokeName.name)) {
      nameResults.push(key + ":" + value);
    }
  });

  clickedPokemon.map((pokeBase) => {
    for (const [key, value] of Object.entries(pokeBase.base)) {
      baseResults.push(key + ":" + value);
    }
  });
  console.log(clickedPokemon.type);

  clickedPokemon.map((pokeType) => {
    typeResults.push(pokeType.type);
  });

  console.log("Type", typeResults);


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-6 col-md-6 col-lg-4 hover-div mb-3 bg-light border-style">
            <div className="card card-top hover-card m-0">
              <div className="card-body">
                <div className="row">
                  <h3>Base</h3>

                  {baseResults.map((pok, index) => (
                    <p className="card-text p-height" key={index}>
                      <ul className="list-style-type: none">
                        <li>{pok}</li>
                      </ul>
                    </p>
                  ))}
                  <br />
                </div>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-6 col-lg-4 hover-div b- mb-3 bg-light border-style">
            <div className="card card-top hover-card m-0">
              <div className="card-body">
                <div className="row">
                  <h3>Names in Different Languages</h3>
                  {nameResults.map((pok, index) => (
                    <p className="card-text p-height" key={index}>
                      <ul className="list-style-type: none">
                        <li>{pok}</li>
                      </ul>
                    </p>
                  ))}
                  <h2>Type</h2>
                  
                    <ul className="list-style-type: none">
                      <li>{typeResults}</li>
                    </ul> 
                  <br />
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
