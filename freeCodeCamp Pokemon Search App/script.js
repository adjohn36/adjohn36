const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pName = document.getElementById("pokemon-name");
const pId = document.getElementById("pokemon-id");
const pWeight = document.getElementById("weight");
const pHeight = document.getElementById("height");
const pTypes = document.getElementById("types");
const pHp = document.getElementById("hp");
const pAttack = document.getElementById("attack");
const pDefense = document.getElementById("defense");
const pSpecialAttack = document.getElementById("special-attack");
const pSpecialDefense = document.getElementById("special-defense");
const pSpeed = document.getElementById("speed");
const pSpriteContainer = document.getElementById("sprite-container");

const getPokemon = async () => {
  try {
    const pNameOrId = searchInput.value.toLowerCase()
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pNameOrId}`);
    const data = await res.json();

    setPokemonInfo(data);
  } catch (err) {
    alert("Pokémon not found")
  }
};

const setPokemonInfo = data => {
  const { name, id, weight, height, types, sprites, stats } = data;

  pName.innerHTML = `<h3>${name[0].toUpperCase() + name.slice(1)}</h3>`;
  pId.innerHTML = `<p>#${id}</p>`;
  pWeight.innerHTML = `<p>Weight: ${weight}</p>`;
  pHeight.innerHTML = `<p>Height: ${height}</p>`;

  pSpriteContainer.innerHTML = `<img id="sprite" src="${sprites.front_default}" alt="${name}"></img>`;
  pHp.innerHTML = `<p>${stats[0].base_stat}</p>`;
  pAttack.innerHTML = `<p>${stats[1].base_stat}</p>`;
  pDefense.innerHTML = `<p>${stats[2].base_stat}</p>`;
  pSpecialAttack.innerHTML = `<p>${stats[3].base_stat}</p>`;
  pSpecialDefense.innerHTML = `<p>${stats[4].base_stat}</p>`;
  pSpeed.innerHTML = `<p>${stats[5].base_stat}</p>`;

  pTypes.innerHTML = types.map(obj => `
    <span>${obj.type.name[0].toUpperCase() + obj.type.name.slice(1)}</span>
  `)
};

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  getPokemon();
  
});

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    getPokemon();
  }});
