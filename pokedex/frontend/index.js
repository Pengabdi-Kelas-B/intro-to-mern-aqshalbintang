let pokemonData = [];

// Fetch data from mock server
async function fetchPokemon() {
  try {
    const response = await fetch("http://localhost:3000/pokemon");
    if (!response.ok) {
      throw new Error("http call failed");
    }
    const data = await response.json();
    pokemonData = data;
    renderApp();
  } catch (error) {
    console.error("Failed to fetch Pokemon data:", error);
    renderApp();
  }
}

// Card component
function PokemonCard(props) {
  return React.createElement(
    "div",
    { className: "bg-white p-4 rounded-lg shadow-md m-4 w-52 h-70 justify-between text-center" },
    React.createElement("p", { className: "text-xs flex justify-between text-left "}, `#${props.identify}`),
    React.createElement("img", { className: "w-28 h-28 object-cover mx-auto", src: props.image, alt: props.name }),
    React.createElement("h2", { className: "mb-4 text-2xl font-bold capitalize"}, props.name),
    React.createElement("p", { className: "mb-1 bg-green-500 p-2 rounded-full text-sm text-white capitalize"}, `Type : ${props.types}`),
    React.createElement("p", { className: "mb-1 bg-blue-500 p-2 rounded-full text-sm text-white capitalize"}, `Ability : ${props.abilities}`),
    React.createElement("p", { className: "mb-1 bg-yellow-500 p-2 rounded-full text-sm text-white capitalize"}, `Height : ${props.height}`),
    React.createElement("p", { className: "mb-1 bg-gray-500 p-2 rounded-full text-sm text-white capitalize"}, `Weight : ${props.weight}`),

  );
}

// List component
function PokemonList() {
  if (pokemonData.length === 0) {
    return React.createElement(
      "p",
      { className: "text-center" },
      "Loading Pokemon data..."
    );
  }

  return React.createElement(
    "div",
    { className: "flex flex-wrap justify-center p-4 bg-[linear-gradient(to_right,rgb(255,0,0),rgb(0,0,255))]" },
    pokemonData.map((pokemon) =>
      React.createElement(PokemonCard, {
        identify: pokemon.id,
        name: pokemon.name,
        types: pokemon.types ? pokemon.types.join(" / ") : "",
        abilities: pokemon.abilities ? pokemon.abilities.join(" / ") : "",
        height: pokemon.height,
        weight: pokemon.weight,
        image: pokemon.image,
      })
    )
  );
};

// App component wrap header and list
function App() {
  return React.createElement(
    "div",
    { className: "p-0" },
    React.createElement(
      "header",
      { className: "p-6 bg-[linear-gradient(to_right,rgb(255,0,0),rgb(0,0,255))]" },
      React.createElement(
        "h1",
        { className: "text-5xl text-center font-bold text-white" },
        "Pokedex",
      )
    ),
    React.createElement(PokemonList, null)
  );
}

// Function to render the app
function renderApp() {
  ReactDOM.render(React.createElement(App), document.getElementById("root"));
}

// Initial render
renderApp();

// Fetch and display the Pokemon data
fetchPokemon();
