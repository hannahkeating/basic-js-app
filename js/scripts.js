var pokemonRepository = (function(){
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function loadDetails(pokemon) {
  var url = pokemon.detailsUrl;
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (details) {
    // Now we add the details to the item
    pokemon.imageUrl = details.sprites.front_default;
    pokemon.height = details.height;
    pokemon.types = Object.keys(details.types);
  }).catch(function (e) {
    console.error(e);
  });
}
  function getAll() {
    return repository;
  }
  function add(pokemon) {
    repository.push(pokemon);
  }
  function addListItem(pokemon){
    var $pokemonList = document.querySelector('.pokemon-list');
    var $listItem = document.createElement('li');
    var $button = document.createElement('button');
    $button.addEventListener('click', function (event){
      showDetails(pokemon);
    })
    $button.innerText = pokemon.name;
    $button.classList.add('button');
    $listItem.classList.add('li-style');
    $pokemonList.appendChild($listItem);
    $listItem.appendChild($button);
  }
  function showDetails(pokemon){
    pokemonRepository.loadDetails(pokemon).then(function(){
      showModal(pokemon);
    });
  }
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

  //function to show modal for pokemon data
  function showModal(pokemon) {
    $modalContainer.innerHTML = '';

    var modal = document.createElement('div');
    modal.classList.add('modal');

    var closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-clsoe');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    var nameElement = document.createElement('h1');
    nameElement.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    var imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl;
    imageElement.classList.add('modal-img');

    var heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + pokemon.height + 'm';

    var typesElement = document.createElement('p');
    typesElement.innerText = 'Type(s): ' + pokemon.types;

    modal.appendChild(closeButtonElement);
    modal.appendChild(nameElement);
    modal.appendChild(imageElement);
    modal.appendChild(heightElement);
    modal.appendChild(typesElement);
    $modalContainer.appendChild(modal);

    $modalContainer.classList.add('is-visible');
  }

  //function to close the modal
function hideModal() {
  $modalContainer.classList.remove('is-visible');
}

//escape key to close modal
window.addEventListener('keydown', (e) => {
  if (e.key === 'escape' && $modalContainer.classList.contains('is-visible')){
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

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
