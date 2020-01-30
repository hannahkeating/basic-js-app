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
  ];
  function getAll() {
    return repository;
  }
  function add(pokemon) {
    repository.push(pokemon);
  }

  return {
    add: add,
    getAll: getAll
  };
})();

pokemonRepository.getAll().forEach(function(pokemon){
  document.write(pokemon.name + ': ' + pokemon.height + ', ' + '(' + pokemon.type + ')' + '<br>');
})
