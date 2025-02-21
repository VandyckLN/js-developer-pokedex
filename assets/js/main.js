const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `
                        <li class="type ${type}">
                            ${type}
                            <div class="power-bar">
                                <div class="power-fill ${type}" style="width: ${getPowerLevel(type)}%"></div>
                            </div>
                        </li>
                    `).join('')}
                </ol>
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function getPowerLevel(type) {
    // Valores de poder para cada tipo (você pode ajustar conforme desejar)
    const powerLevels = {
        normal: 60,
        fire: 85,
        water: 80,
        electric: 75,
        grass: 70,
        ice: 65,
        fighting: 90,
        poison: 70,
        ground: 75,
        flying: 70,
        psychic: 85,
        bug: 60,
        rock: 80,
        ghost: 75,
        dragon: 95,
        dark: 80,
        steel: 85,
        fairy: 75
    };
    return powerLevels[type] || 70;
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})