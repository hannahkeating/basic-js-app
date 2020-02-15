//begins IIFE
var pokemonRepository = (function () {
  var repository = [];
  //creates variable for 'ul'
  var $pokemonList = document.querySelector('ul');
  var $modalContainer = document.querySelector('#modal-container');
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //Adds new pokemon to repository
  function add(pokemon) {
    repository.push(pokemon);
  }

  //function to return pokemon object array
  function getAll() {
    return repository;
  }

  //function to add list for each pokemon
  function addListItem(pokemon) {
    var $pokemonList = document.querySelector('.pokemon-list');
    var $listItem = document.createElement('li');
    var $button = document.createElement('button');
    $pokemonList.appendChild($listItem);
    $listItem.appendChild($button);
    $listItem.classList.add('li');
    $button.innerText = pokemon.name;
    $button.classList.add('button');

    $button.addEventListener('click', function(event) {
      showDetails(pokemon);
    });
  }

  //function to show details of each pokemon
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  //function to load pokemon list from API
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (pokemon) {
        var pokemon = {
          name: pokemon.name,
          detailsUrl: pokemon.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }
    function loadDetails(pokemon) {
    var url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      //to add details to each object
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      //pokemon.types = Object.keys(details.types);
      if (details.types.length == 2) {
        pokemon.types = [details.types[0].type.name, details.types[1].type.name];
      } else {
        pokemon.types = [details.types[0].type.name];
      }
    }).catch(function (e) {
      console.error(e);
    });
  }

  //function to show modal
  function showModal(pokemon) {
    //clear all existing modal content
    $modalContainer.innerHTML = '';

    var modal = document.createElement('div');
    modal.classList.add('modal');

    var closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    var nameElement = document.createElement('h1');
    nameElement.innerText = pokemon.name;

    var imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl;
    imageElement.classList.add('modal-img');

    var heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + pokemon.height + 'm';

    var typesElement = document.createElement('p');
    typesElement.innerText = 'Types: ' + pokemon.types;

    modal.appendChild(closeButtonElement);
    modal.appendChild(nameElement);
    modal.appendChild(imageElement);
    modal.appendChild(heightElement);
    modal.appendChild(typesElement);
    $modalContainer.appendChild(modal);

    $modalContainer.classList.add('is-visible');
  }

  //function to close modal
  function hideModal() {
    $modalContainer.classList.remove('is-visible');
  }

  //Escape key to close modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  })

  //click outside of the modal to close
  $modalContainer.addEventListener('click', (e) => {
    //only want the modal to close if the user clicks directly on the overlay
    var target = e.target;
    if (target === $modalContainer) {
      hideModal();
    }
  })

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
  };
})();
//end of IIFE

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
