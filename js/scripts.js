

// IIFE to limit the access to the pokemonList-array
let pokemonRepository = (function () {
    // creating an empty array to be able to push pokemons to it
    let pokemonList = [];
    // variable for the URL to the pokemon API
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';



    // function to add a pokemon to the pokemonList-array
    function add(item) {
        pokemonList.push(item);
    }


    // function to return the pokemonList-array
    function getAll() {
        return pokemonList;
    }


    function addListItem(pokemon) {
        // selecting the pokemon-list
        let pokemonList = document.querySelector('.pokemon-list');

        // creating the variables for the list-item and the button. Together with the pokemonRepository-forEach-function every pokemon will get it's own button.
        let listItem = document.createElement('li');
        let button = document.createElement('button');

        // add bootstrap class
        listItem.classList.add('list-group-item');


        // the text of the button gets the name of the pokemon
        button.innerText = pokemon.name;
        // the CSS class for the button is added
        button.classList.add('btn', 'btn-primary');

        
        //Set the data-toggle attribute. Tells Bootstrap that this button is a modal trigger.
        button.setAttribute("data-toggle", "modal");
        //Set the data-target attribute. Specifies which modal should be opened when the button is clicked.
        button.setAttribute("data-target", "#pokemonModal");

        // the button is now appended to the listItem variable
        listItem.appendChild(button);
        // the listItem is appended to the pokemonList variable. This is the ul in the html document.
        pokemonList.appendChild(listItem);


        // calls the showDetails function and passing the parameter 'pokemon' to it
        // the abscence of the pokemon parameter is not an error. It is being accessed from the surrounding scope of the function (closure behaviour). The value of the pokemon variable is "captured" at the moment the event listener is set up (when calling it).
        button.addEventListener('click', function (event) {
            showDetails(pokemon);
        })
    }



    // fetching the pokemon-data with the pokemon API
    // Important info: Within loadList, the .then() method is used to determine whether the API call was successful, and at the same time, the calling code can use the Promise returned by loadList to assess the completion of the entire operation.
    function loadList() {
        // fetches all pokemon data with the help of the pokemon api and gives back a json object
        // The fetch() function always returns a Promise, regardless of what happens during the course of the Promise chain.
        // The return statement is at the start to immediately return the entire Promise created by fetch() and the subsequent .then() methods, representing the completion of the asynchronous operation.
        return fetch(apiUrl).then(function (response) {
            // this returns a Promise(!) which resolves to a JSON object
            return response.json();
            // the parameter in the function "json" is the resulting JSON object from the resolved Promise returned by response.json()
        }).then(function (json) {
            // Accessing the results-array in the returned json-object
            // For each of the items create a pokemon variable (an object) with 2 keys. The keys in the pokemon object refer to the keys of the json-object.
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                // calling the add function to push the pokemon into the pokemonList array
                add(pokemon);
                // console.log(pokemon);
            });
            // catching errors if they occur
        }).catch(function (e) {
            console.error(e);
        })
    }




    // showDetails is called when the button of a specific pokemon is pressed
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            // show the name of the pokemon object in the console
            console.log(pokemon);
            // showing the pokemon and its features on the website
            showModal(pokemon);
        });
    }


    // loading details to the pokemon-object
    function loadDetails(pokemon) {
        // assigning the Url of the pokemon-object to the url variable
        let url = pokemon.detailsUrl;
        // fetching data from the url. This gives back a Promise.
        // then() waits for the result of the fetch call. Once the data is retrieved, it is converted from a JSON string to a JavaScript object using response.json(), which returns another Promise.
        return fetch(url).then(function (response) {
            return response.json();
            // When the Promise from response.json() is resolved, the relevant data from the resulting details object is written into the imageUrl, height, and types properties of the pokemon object.
        }).then(function (details) {
            // Now we add the details to the pokemon
            // assigning specific properties from the details object to the properties of the pokemon object. If the properties would be stored in a variable, they would only be accessible within the loadDetails-function. With this method they are stored in the pokemon object (which is the individual pokemon).
            pokemon.imageUrl = details.sprites.front_default;
            pokemon.height = details.height;
            pokemon.types = details.types;
            pokemon.weight = details.weight;
            // catching errors if they occur
        }).catch(function (e) {
            console.error(e);
        });
    }




    // showing the pokemon and its features on the website
    function showModal(pokemon) {


        let modalBody = document.querySelector('.modal-body');
        let modalTitle = document.querySelector('.modal-title');
        let modalHeader = $(".modal-header");


        // clearing modalTitle and modalBody
        modalBody.innerHTML = '';
        modalTitle.innerHTML = '';
        

        let myImage = document.createElement('img');
        // myImage.classList.add('modal-image');
        myImage.classList.add('modal-image');
        // setting "src" property to set the actual element's "src" attribute
        myImage.src = pokemon.imageUrl;


        // creating a h1 element to display the name of the pokemon
        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;

        // creating a p element to display the height of the pokemon
        let heightElement = document.createElement('p');
        // converting the number to meters
        heightElement.innerText = "Height: " + (pokemon.height / 10) + " m";

        // creating a p element to display the weight of the pokemon
        let weightElement = document.createElement('p');
        // converting the number to kilogram
        weightElement.innerText = "Weight: " + (pokemon.weight / 10) + " kg";


        // append the titleElement to the modal
        modalTitle.appendChild(titleElement);


        // appending the image to the image container
        modalBody.appendChild(myImage);



        // appending the heightElement to the modal
        modalBody.appendChild(heightElement);
        // appending the weightElement to the modal
        modalBody.appendChild(weightElement);

        // iterating over the types array in a single pokemon. Displaying the different types of one pokemon with p elements.
        pokemon.types.forEach(function (_, i, _) {
            let typesElement = document.createElement('p');
            typesElement.innerText = "Type: " + pokemon.types[i].type.name;
            modalBody.appendChild(typesElement);
        });

    }


    // Search function for pokemons
    // Attach an event listener to the search input field. Event type = 'input'
    // info: the whole code is activated every time the user enters a character.
    document.querySelector('#pokemon-search').addEventListener('input', function () {

        // Get the current value of the search input
        // Convert it to lowercase to ensure case-insensitive filtering
        let searchInput = document.querySelector('#pokemon-search');
        let value = searchInput.value.toLowerCase();

        // Get all pokemons from the repository
        let allPokemons = pokemonRepository.getAll();



        // Filter the pokemons based on the provided input value. filteredPokemons ist an array.
        // each function has its own scope: the parameter "pokemon" within the event listener function is scoped to that specific function and does not relate to "pokemon" parameters or variables outside of it (like e.g. function showModal(pokemon) {}).
        let filteredPokemons = allPokemons.filter(function (pokemon) {

            // Convert the pokemon's name to lowercase. This ensures that the filtering is case-insensitive
            let pokemonNameLowercase = pokemon.name.toLowerCase();

            // Check if the pokemon's name contains the provided value. If it does, the current pokemon passes the filter
            return pokemonNameLowercase.includes(value);
        });


        // Clear the currently displayed Pokemon list
        // This prepares for displaying the new filtered list
        let pokemonList = document.querySelector('.pokemon-list');
        pokemonList.innerHTML = '';


        // checking if the search was successful
        if (filteredPokemons.length > 0) {
            // if true, iterate over the filtered pokemon list
            filteredPokemons.forEach(function (pokemon) {
                // add each filtered pokemon to the display list
                pokemonRepository.addListItem(pokemon);
            });
        } else {
            // if false, show a message instead
            pokemonList.innerHTML = '<h4>Sorry, your search has returned no results.</h4>';
        }

    });



    // Returns an object with all functions assigned as keys. Only the functions that can be accessed with a key are available outside of pokemonRepository.
    // optional: if the key and the value have the exact same name, then you could only write it once
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,

        showDetails: showDetails,
        showModal: showModal
    };

})();



// When the asynchronous function loadList() is finished the function here is executed.
// Important info: Within loadList, the .then() method is used to determine whether the API call was successful, and at the same time, the calling code can use the Promise returned by loadList to assess the completion of the entire operation.
pokemonRepository.loadList().then(function () {
    //forEach-loop to iterate over every object in the pokemonList array starting at index 0.
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});


