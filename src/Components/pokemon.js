import { useParams, Link, Outlet } from "react-router-dom";

const Pokemon = ({ pokemons }) => {
  return (
    <>
      <div className="container">
        <div className="row ">
          <h2>List of Pokemons</h2>
          {pokemons?.map((pokemon, index) => (
            <div
              className="col-2 col-md-2 col-lg-2 hover-div mb-3 bg-light"
              key={index}
            >
              <div className="card card-top hover-card m-0 " >
                
                <div>
                  <a href="#" className="btn btn-light btn-sm">
                    <h4>{pokemon.name.english}</h4>
                  </a>
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



