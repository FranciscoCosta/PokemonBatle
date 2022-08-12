const pcTeamArea = document.getElementById('team-display-pc');
const playerTeamArea = document.getElementById('team-display-player');
const pcTeam = document.getElementById('fight-pc');
const playerTeam = document.getElementById('fight-player');
const playerActivePokemonPCDIV = document.getElementById('player-active-pokemon')
const pcActivePokemonPCDIV = document.getElementById('pc-active-pokemon')

// Gera um array de lenght 6 de 1 a 151 para buscar os pokemons da primeira Geração
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
// Fim da randomPokemons

// Cria um array com objetos de Pokemons por equipe
const criaTeams = async (equipe) => {
  const team = await randomPokemons();
  const teamArray = await Promise.all(
    team.map((pokemon) => {
      const pokemonObj = criaObjectoPokemon(pokemon);
      return pokemonObj;
    })
  );
  teamArray.forEach(element => {
  const criaPokemonSide = document.createElement('img');
  criaPokemonSide.src = element.frontUrl;
  criaPokemonSide.innerText =element.nome;
  criaPokemonSide.className = 'side-pokemon';
  if(equipe==="pc"){
    pcTeamArea.appendChild(criaPokemonSide)
  }else if(equipe==="player"){
    playerTeamArea.appendChild(criaPokemonSide)
  }
  });
  return teamArray;
};
// Fim de criaTeams

// Faz a busca do Pokemon na API
const buscaPokemon = async (idPokemon) => {
  const objetoPokemon = await fetchJson(
    `https://pokeapi.co/api/v2/pokemon/`,
    idPokemon
  );
  return objetoPokemon;
};
// Fim de busca Pokemon

// Construção de um objecto Pokemon com dados necessários
const criaObjectoPokemon = async (pokemon) => {
  const objetoPokemon = await buscaPokemon(pokemon);
  const pokemonObjecto = {
    nome: objetoPokemon.name,
    frontUrl: objetoPokemon.sprites.front_default,
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
    let randomMove =
      Math.floor(Math.random() * (objetoPokemon.moves.length - 1 + 1)) + 1;
    movesP.push(randomMove);
  }
  pokemonObjecto.move1 = objetoPokemon.moves[movesP[0]];
  pokemonObjecto.move2 = objetoPokemon.moves[movesP[1]];
  pokemonObjecto.move3 = objetoPokemon.moves[movesP[2]];
  pokemonObjecto.move4 = objetoPokemon.moves[movesP[3]];

  let randomAbilities =
    Math.floor(Math.random() * (objetoPokemon.abilities.length - 1 + 1)) + 1;
  pokemonObjecto.ability = objetoPokemon.abilities[randomAbilities];

  return pokemonObjecto;
};
// Fim da criaObjecto Pokemons

const displayFirstPokemon = async()=>{
  // 1º Pokemon a ser enviado para da team PC
  const teamPc =await criaTeams('pc');
  const pcActivePokemonPC = document.createElement('img');
  pcActivePokemonPC.src = teamPc[0].frontUrl;
  pcActivePokemonPC.className = 'Pokemon-active-pc'
  pcActivePokemonPC.innerHTML = teamPc[0];
  displayVidas(teamPc[0],'pc')
  pcTeam.appendChild(pcActivePokemonPC);
 


  // 1º Pokemon a ser enviado para da team PLAYER
  const teamPlayer =await criaTeams('player');
  const playerActivePokemonPC = document.createElement('img');
  playerActivePokemonPC.src = teamPlayer[0].backUrl;
  playerActivePokemonPC.className = 'Pokemon-active-player'
  playerActivePokemonPC.innerHTML = teamPlayer[0];
  playerActivePokemonPCDIV.className = 'pokemon-ativo'
  displayVidas(teamPlayer[0],'player')
  playerActivePokemonPCDIV.appendChild(playerActivePokemonPC)
  // Adicionado Pokemon Player e a sua vida
 
  // Cria um array com os dados do Move (pp , power , accuracy , damage_class , priority)
  const move1S = await pegamovesDesd(teamPlayer[0].move1.move['url'],'')
  const move2S = await pegamovesDesd(teamPlayer[0].move2.move['url'],'')
  const move3S = await pegamovesDesd(teamPlayer[0].move3.move['url'],'')
  const move4S = await pegamovesDesd(teamPlayer[0].move4.move['url'],'')
  // Fim criaçao dos dados moves




  const areaBotoesPlayer = document.createElement('div');
  areaBotoesPlayer.className = 'moves-buttons'
  const move1BtnPlayer = document.createElement('button');
  move1BtnPlayer.innerHTML = `${teamPlayer[0].move1.move.name} :${move1S[0]} pp <br> Power: ${move1S[1]}`;
  const move2BtnPlayer = document.createElement('button');
  move2BtnPlayer.innerHTML = `${teamPlayer[0].move2.move.name} :${move2S[0]} pp <br> Power: ${move2S[1]}`;
  const move3BtnPlayer = document.createElement('button');
  move3BtnPlayer.innerHTML = `${teamPlayer[0].move3.move.name} :${move3S[0]} pp <br> Power: ${move3S[1]}`;
  const move4BtnPlayer = document.createElement('button');
  move4BtnPlayer.innerHTML = `${teamPlayer[0].move4.move.name} :${move4S[0]} pp <br> Power: ${move4S[1]}`;
  areaBotoesPlayer.appendChild(move1BtnPlayer);
  areaBotoesPlayer.appendChild(move2BtnPlayer);
  areaBotoesPlayer.appendChild(move3BtnPlayer);
  areaBotoesPlayer.appendChild(move4BtnPlayer);
  playerTeam.appendChild(areaBotoesPlayer)
  }

// Faz a busca dos moves do Pokemon na API e desconstrui-os
const pegamovesDesd = async (move, p) =>{
  const moveStats = await fetchJson(move ,p)
  const  {pp , power , accuracy , damage_class , priority} = moveStats
  console.log(moveStats)
  return [pp , power , accuracy , damage_class , priority]
}
//Fim do pegamovesDesd


// Cria as barras de vidas dos pokemons Ativos
const displayVidas = (pokemon,equipe)=>{
  const hpDisplay = document.createElement('progress');
  hpDisplay.setAttribute("max", pokemon.hp);
  hpDisplay.setAttribute("value", pokemon.hp);
  if(equipe==='player'){
    hpDisplay.classList = 'vida-display-player'
    playerActivePokemonPCDIV.appendChild(hpDisplay)
  }if(equipe==='pc'){
    hpDisplay.classList = 'vida-display-pc'
    pcActivePokemonPCDIV.appendChild(hpDisplay)
}}
// Fim da displayVidas


window.onload = ()=>{
  displayFirstPokemon ()
}