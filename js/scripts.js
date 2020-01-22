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

for( var i = 0; i < 4; i++){
  const pokemon = repository[i]
  let message = `${pokemon.name} (height: ${pokemon.height})`
  if (pokemon.height === 1.5) {
    message = message + "-Wow, that's big!"
  }

  document.write(`<div>${message}</div>`)
}
