
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
	pokemon.photo = pokeDetail.sprites.versions["generation-vi"]["x-y"].front_default;

    pokemon.abilities = pokeDetail.abilities.map(abilitySlot => 
        abilitySlot.is_hidden ? abilitySlot.ability.name + ' (*)' : abilitySlot.ability.name
    
    )

    pokemon.held_items = pokeDetail.held_items.map((itemsSlot) => itemsSlot.item.name)

    const stats = pokeDetail.stats.map((statSlot) => statSlot.base_stat)
    const[HP, ATK, DEF, SPA, SPD, SPE] = stats
    pokemon.hp = HP
    pokemon.attack = ATK
    pokemon.defense = DEF
    pokemon.specialAttack = SPA
    pokemon.specialDefense = SPD
    pokemon.speed = SPE

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
