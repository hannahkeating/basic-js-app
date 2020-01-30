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
  function getAll(pokemon) {
    return repsitory;
  }
  function add(pokemon) {
    repsitory.push(pokemon);
  }

  return {
    add: add,
    getAll: getAll
  };
})();

pokemonRepository.forEach(function getAll(pokemon){
  document.write(pokemon.name + ': ' + pokemon.height + ', ' + '(' + pokemon.type + ')' + '<br>');
});
