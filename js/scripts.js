
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



    function addListItem(pokemon) {

        // selecting the pokemon-list
        let pokemonList = document.querySelector('.pokemon-list');

        // creating the variables for the list-item and the button. Together with the pokemonRepository-forEach-function every pokemon will get it's own button.
        let listItem = document.createElement('li');
        let button = document.createElement('button');

        // the text of the button gets the name of the pokemon
        button.innerText = pokemon.name;
        // the CSS class for the button is added
        button.classList.add('button');

        // the button is now appended to the listItem variable
        listItem.appendChild(button);
        // the listItem is appended to the pokemonList variable. This is the ul in the html document.
        pokemonList.appendChild(listItem);

        
        // calls the showDetails function and passing the parameter 'pokemon' to it
        // the abscence of the pokemon parameter is not an error. It is being accessed from the surrounding scope of the function (closure behaviour). The value of the pokemon variable is "captured" at the moment the event listener is set up (when calling it).
        button.addEventListener('click', function(event){
            showDetails(pokemon);
        })

    }

    // show the name of the pokemon object in the console
    function showDetails(pokemon) {
        console.log(pokemon);
    }



    // returns an object with 2 functions assigned as keys
    // optional: if the key and the value have the exact same name, then you could only write it once

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    };

})();


console.log(pokemonRepository.getAll());

// Adding one pokemon to the pokemonList-array in the IIFE pokemonRepository
pokemonRepository.add(item);

console.log(pokemonRepository.getAll());



//forEach-loop to iterate over every object in the pokemonList array starting at index 0.
pokemonRepository.getAll().forEach(function (pokemon) {

    pokemonRepository.addListItem(pokemon);

});

