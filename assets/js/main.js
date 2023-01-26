const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const limit = 10; let offset = 151;
const maxRecords = 721;
// ALL X-Y pokémons starting from Johto

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>

            <div id="modal-${pokemon.number}" class="modal">
                <div class="modal-content">
                    <h2 class="titles"> #${pokemon.number} - ${pokemon.name} </h2>
                    <span class="close" onclick="alterModal('modal-${pokemon.number}')" >X</span>
                    
                    <p> Habilidades </p>
                    <ol class="types">
                        ${pokemon.abilities.map((type) => `<li class="titles">${type}</li>`).join('')}
                    </ol>

                    <p> Held Items </p>
                    <ol class="types">
                        ${pokemon.held_items.map((type) => `<li class="titles">${type}</li>`).join('')}
                    </ol>

                    <p>Estatísticas</p>
                    <p> 
                        HP: ${pokemon.hp}<br>
                        Attack: ${pokemon.attack}<br>
                        Defense: ${pokemon.defense}<br>
                        Special Attack: ${pokemon.specialAttack}<br>
                        Special Defense: ${pokemon.specialDefense}<br>
                        Speed: ${pokemon.speed}
                    </p>
                </div>

            </div>

            <button id="${pokemon.number}" class="popup-btn" href="${pokemon.number}"
                onclick="alterModal('modal-${pokemon.number}') ">
                Open Modal
            </button>
        </li>
        
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('');
    })
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
})

function alterModal(id) {
    
    var a = document.getElementById(id);
    console.log(a);
    if (a.style.display != "block"){
        a.style.display = "block";
    }
    else{
        a.style.display = "none";
    }
}