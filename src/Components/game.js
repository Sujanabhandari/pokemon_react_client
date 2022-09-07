// Let user choose pokemon from the UI
// System randomly chooses one pokemon to fight against
// Inizialize all the parameters for each Pokemon
// player: Pokemon that user chooses
// system: Random Pokemon
// spAttackRate: 3 means After 3 normal attacks the pokemon will use special attack 
// spDefenceRate: 3 means Every 3 special attacks the probability of using normal defecence is 1/3
// attackRate: The rate at which the pokemon can attack for example , A pokemon with speed 85 = 1/23 attacks per ms = 1 attack every 85/3600 s = 1 attack every 85*1000/3600
// let's calculate apDamage for player
// apDamagePlayer: player.base["Attack"] - system.base["Defence"]
// apDamageSystem: system.base["Attack"] - player.base["Defence"]
// setHp for both

import config from '../config.json'

console.log("config",config)



export const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

export const getBaseInfoHtml = (pokemon) => {
    return (
        <>
            {pokemon && Object.entries(pokemon?.base).map((info, index) => (
                <div className="card-text p-height" key={index}>
                    <ul className="list-style-type: none">
                        <li>{info[0]}: {info[1]}</li>
                    </ul>
                </div>
            ))}
        </>
    )
}
const timelapseSecond = 3600 * config.timelapse;

export const getInitalValues = (pokemon) => {
    let attackRate = Math.floor((pokemon.base["Speed"] * 1000) / timelapseSecond);
    return {
        attackRate: attackRate
    }
}

