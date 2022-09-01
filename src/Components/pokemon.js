import { useParams, Link, Outlet } from "react-router-dom";

const Pokemon = ({ pokemons }) => {
  return (
    <>
      <div className="container">
        <div className="row ">
          <h2>List of Pokemons</h2>
          {pokemons?.map((pokemon, index) => (
            <div
              className="col-2 col-md-2 col-lg-2 hover-div bg-light border-style"
              key={index}
            >
              <div className="card card-top hover-card " >
                
                <div>
                <Link to={`/pokemons/${pokemon.id}`} className="text-decoration-none"><h4>{pokemon.name.english}</h4></Link>
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

                {/* <div className="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
                  <div className="views">Name is {pokemon.name.french}</div>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Pokemon;



