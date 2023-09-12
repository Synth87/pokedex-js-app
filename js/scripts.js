// Initializing an empty array
let pokemonList = [];

/* Array with all pokemon objects */
pokemonList = [
    {
        name: 'Bulbasaur',
        height: 0.7,
        types: ['grass', 'poison']
    },
    {
        name: 'Charmander',
        height: 0.6,
        types: ['fire']
    },
    {
        name: 'Squirtle',
        height: 0.5,
        types: ['water']
    },
    {
        name: 'Pidgey',
        height: 0.3,
        types: ['flying', 'normal']
    },
    {
        name: 'Rattata',
        height: 0.3,
        types: ['normal']
    },
    {
        name: 'Pikachu',
        height: 0.4,
        types: ['electric']
    },
    {
        name: 'Nidoking',
        height: 1.4,
        types: ['ground', 'poison']
    },
    {
        name: 'Zubat',
        height: 0.8,
        types: ['posion', 'flying']
    },
    {
        name: 'Golduck',
        height: 1.7,
        types: ['water']
    },
    {
        name: 'Poliwag',
        height: 0.6,
        types: ['water']
    },
];




// declaring variables for the name, height and types of the pokemons
let pokemonName = '';
let pokemonHeight = null;
let pokemonTypes = '';

//for loop to iterate over every object in the pokemonList array starting at index 0
for (i = 0; i < pokemonList.length; i++) {

    // initializing the variables for the name, height and types of the pokemons to make the code more readable
    pokemonName = pokemonList[i].name;
    pokemonHeight = pokemonList[i].height;
    pokemonTypes = pokemonList[i].types;

    // condition to check if the height of the pokemon is greater than 1.4 m
    if (pokemonList[i].height > 1.4) {
        // output on the website's DOM if the pokemon is greater than 1.4 m
        document.write(`<pre>Pokemon: ${pokemonName}    height: (${pokemonHeight})    types:(${pokemonTypes}) - Wow, that's big!</pre>`);
    } else {
        // output on the website's DOM if the pokemon is smaller or equal to 1.4 m
        document.write(`<pre>Pokemon: ${pokemonName}    height: (${pokemonHeight})    types:(${pokemonTypes})</pre>`);
    }
}
