import { useParams, Link, Outlet } from "react-router-dom";

const SinglePokemon = ({ pokemons }) => {

  const { id } = useParams();
  const clickedPokemon = pokemons?.filter((pokemon) => pokemon.id == id);


return (
    <>
      <div className="container">
        <div className="row ">
          <h2>Your Pokemon</h2>
          {clickedPokemon?.map((pokemon, index) => (
            <div
              className="col-2 col-md-2 col-lg-2 hover-div bg-light border-style"
              key={index}
            >
              <div className="card card-top hover-card " >
                
                <div>
                  <h4>{pokemon.name.english}</h4>
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
                    <div>
                      <p>{pokemon.base.Attack}</p>
                    </div>
                    <Link to={`/pokemons/${pokemon.id}/info`}><h3>Details</h3></Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SinglePokemon;