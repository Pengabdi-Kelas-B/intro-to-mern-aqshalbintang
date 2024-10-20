const fs = require("fs");
const axios = require("axios").default

async function generateJsonDB() {
  // TODO: fetch data pokemon api dan buatlah JSON data sesuai dengan requirement.
  // json file bernama db.json. pastikan ketika kalian menjalankan npm run start
  // dan ketika akses url http://localhost:3000/pokemon akan muncul seluruh data
  // pokemon yang telah kalian parsing dari public api pokemon
  const pokemonApiURL = "https://pokeapi.co/api/v2/pokemon/?limit=100";

  const response = await axios.get(pokemonApiURL);
  const listPokemon = response.data.results;

  const pokemonData = [];

  for (const pokemon of listPokemon) {
    const detailPokemon = await axios.get(pokemon.url);
    const types = detailPokemon.data.types.map(
      (typeInfo) => typeInfo.type.name
    );
    const abilities = detailPokemon.data.abilities.map(
      (abilityInfo) => abilityInfo.ability.name
    );

    const infoPokemon = {
      id: detailPokemon.data.id,
      name: detailPokemon.data.name,
      types: types,
      abilities: abilities,
      height: detailPokemon.data.height,
      weight: detailPokemon.data.weight,
      image: detailPokemon.data.sprites.front_default,
    };
    pokemonData.push(infoPokemon);
  }
  console.log(pokemonData);

    const detail = {
      pokemon: pokemonData,
    };

    fs.writeFileSync("db.json", JSON.stringify(detail, null, 4));
}

generateJsonDB();
