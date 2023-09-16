
// pokemon that gets added with the add-function
let item = {
    name: 'Snorlax',
    height: 2.1,
    types: ['normal']
};


// IIFE to limit the access to the pokemonList-array
let pokemonRepository = (function () {

    /* Array with all pokemon objects */
    let pokemonList = [
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

    // function to return the pokemonList-array
    function getAll() {
        return pokemonList;
    }

    // function to add a pokemon to the pokemonList-array
    function add(item) {
        pokemonList.push(item);
    }

    // returns an object with 2 functions assigned as keys
    return {
        getAll: getAll,
        add: add
    };

})();


console.log(pokemonRepository.getAll());

pokemonRepository.add(item);

console.log(pokemonRepository.getAll());



//forEach-loop to iterate over every object in the pokemonList array starting at index 0.
pokemonRepository.getAll().forEach(function (pokemon) {

    if (pokemon.height > 1.7) {
        // output on the website's DOM if the pokemon is greater than 1.4 m
        document.write(`<pre>Pokemon: ${pokemon.name}    height: (${pokemon.height})    types:(${pokemon.types}) - Wow, that's big!</pre>`);
    } else {
        // output on the website's DOM if the pokemon is smaller or equal to 1.4 m
        document.write(`<pre>Pokemon: ${pokemon.name}    height: (${pokemon.height})    types:(${pokemon.types})</pre>`);
    }
});
