var pokemonRepository = (function(){
  var repository = [
    {
      name: 'Squirtle',
      height: 0.5,
      type: ['water'],
    },
    {
      name: 'Umbreon',
      height: 1,
      type: ['dark'],
    },
    {
      name: 'Venomoth',
      height: 1.5,
      type: ['bug, poison'],
    },
    {
      name: 'Jolteon',
      height: 0.8,
      type: ['electric'],
    }
  ]
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
    $button.innerText = pokemon.name;
    $button.classList.add('button');
    $listItem.classList.add('li-style');
    $pokemonList.appendChild($listItem);
    $listItem.appendChild($button);
    $button.addEventListener('click', function (event){
      showDetails(pokemon);
    })
  }
  function showDetails(pokemon){
    console.log(pokemon);
  }
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
  };
})();

pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon);
})
