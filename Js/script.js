const pcTeamArea = document.getElementById("team-display-pc");
const playerTeamArea = document.getElementById("team-display-player");

const randomPokemons = () => {
  const Team = [];
  for (let index = 0; index < 6; index++) {
    let randomTeam = Math.floor(Math.random() * (151 - 1 + 1)) + 1;
    if (!Team.includes(randomTeam)) {
      Team.push(randomTeam);
    } else {
      index = index - 1;
    }
  }
  return Team;
};

const criaTeams =async() => {
  const pcTeam = [];
  const playerTeam = [];
  const pc = await randomPokemons();
  const player = await randomPokemons();
    const pcArray =  pc.forEach(async (pokemon) => {
      const pokemonObj = await criaObjectoPokemon(pokemon);
      const criaPokemonSide = document.createElement('img');
      criaPokemonSide.src = pokemonObj.imageUrl;
      criaPokemonSide.innerText =pokemonObj.nome;
      criaPokemonSide.className = 'side-pokemon';
      pcTeamArea.appendChild(criaPokemonSide)
      pcTeam.push(pokemonObj)
    });
    console.log(pcTeam.length,pcTeam)
  Promise.all(
  player.map(async (pokemon) => {
      const pokemonObj = await criaObjectoPokemon(pokemon);
      const criaPokemonSide = document.createElement('img');
      criaPokemonSide.src = pokemonObj.imageUrl;
      criaPokemonSide.innerText =pokemonObj.nome;
      criaPokemonSide.className = 'side-pokemon'
      playerTeamArea.appendChild(criaPokemonSide)
      playerTeam.push(pokemonObj)
    }));
    return [pcTeam, playerTeam]
};

const buscaPokemon = async (idPokemon) => {
  const objetoPokemon = await fetchJson(
    `https://pokeapi.co/api/v2/pokemon/`,
    idPokemon
  );
  return objetoPokemon;
};

const criaObjectoPokemon = async (pokemon) => {
  const objetoPokemon = await buscaPokemon(pokemon);
  const pokemonObjecto = {
    nome: objetoPokemon.name,
    imageUrl: objetoPokemon.sprites.front_default,
    backUrl: objetoPokemon.sprites.back_default,
    hp: objetoPokemon.stats[0].base_stat,
    attack: objetoPokemon.stats[1].base_stat,
    defense: objetoPokemon.stats[2].base_stat,
    specialAttack: objetoPokemon.stats[3].base_stat,
    specialDefense: objetoPokemon.stats[4].base_stat,
    tipo1: objetoPokemon.types[0],
  };
  if (objetoPokemon.types.length > 1) {
    pokemonObjecto.tipo2 = objetoPokemon.types[1];
  }
  const movesP = [];
  for (let index = 0; index < 4; index++) {
    let randomMove = Math.floor(Math.random() * (objetoPokemon.moves.length - 1 + 1)) + 1;
    movesP.push(randomMove);
  }
  pokemonObjecto.move1 = objetoPokemon.moves[movesP[0]];
  pokemonObjecto.move2 = objetoPokemon.moves[movesP[1]];
  pokemonObjecto.move3 = objetoPokemon.moves[movesP[2]];
  pokemonObjecto.move4 = objetoPokemon.moves[movesP[3]];

  let randomAbilities = Math.floor(Math.random() * (objetoPokemon.abilities.length - 1 + 1)) + 1;
  pokemonObjecto.abilities = randomAbilities

  return pokemonObjecto;
};

window.onload = () => {
  criaTeams()
};
