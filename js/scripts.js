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
      console.log(pokemon);
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
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
