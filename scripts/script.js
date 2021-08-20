const renderPokemon = (pokemon) => {
    const {types} = pokemon;
    const cardContainer = document.querySelector('.card-container');
    const card = document.createElement('div');
    card.className = 'd-flex justify-content-center'
    card.innerHTML = '<div class="card" style="width: 18rem;"><img src="..." class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title"></h5><p class="card-text"></p></div></div>';
    cardContainer.appendChild(card);
    const cardBackGround = document.querySelector('.card-body');
    cardBackGround.classList = `card-body ${types[0].type.name}`
    document.querySelector('.card-img-top').src = `https://img.pokemondb.net/artwork/${pokemon.name}.jpg`;
    document.querySelector('.card-title').innerHTML = `${pokemon.name[0].toUpperCase()+pokemon.name.slice(1)}`;
    document.querySelector('.card-text').innerHTML = `Type 1: ${types[0].type.name[0].toUpperCase()+types[0].type.name.slice(1)} `;
}

const renderPokemonList = (res) => {
    res.results.forEach((pokemon, index) => {
        const li = document.createElement('li');
        li.classList.add(`pokemon-${index+1}`, "list-group-item", "col-3", "border-0")
        document.querySelector('.list-group').appendChild(li)
        li.innerHTML= `<button class="btn btn-link">${pokemon.name[0].toUpperCase()+pokemon.name.slice(1)}</button>`
        document.querySelector(`.pokemon-${index+1}`).onclick = () => searchPokemon(index+1)
    })
}

const notFoundPokemon = (pokemon) => {
    const cardContainer = document.querySelector('.card-container');
    const card = document.createElement('div');
    card.className = 'd-flex justify-content-center';
    card.innerHTML = '<div class="alert alert-danger" role="alert"></div>';
    cardContainer.appendChild(card);
    document.querySelector('.alert-danger').innerHTML = `We can not find your pokemon: ${pokemon}`
}

const clearElement = () => {
    const cardContainer = document.querySelector('.card-container');
    const input = document.querySelector('input');
    cardContainer.innerHTML = '';
    input.value = '';
}

const mySpinner = () => {
    const cardContainer = document.querySelector('.card-container'); 
    const spiner = document.createElement('div');
    spiner.className = 'd-flex justify-content-center'
    spiner.innerHTML = '<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>';
    cardContainer.appendChild(spiner);
}

const getAllPokemons = async () => {
    clearElement();

    mySpinner();

    try {
        let url = `https://pokeapi.co/api/v2/pokemon/`
        let res = await fetch(url);
        let jsonRes = await res.json();
        clearElement();
        renderPokemonList(jsonRes);
    } catch (error) {
        console.log(error)
    }
}

const searchPokemon = async (pokemon) => {
    clearElement();
    
    const valPokemon = typeof pokemon === 'string' ? pokemon.toLowerCase() : pokemon; 

    mySpinner();

    try{
        const url = `https://pokeapi.co/api/v2/pokemon/${valPokemon}`;
        const fetchUrl = await fetch(url);
        const resJson = await fetchUrl.json();
        clearElement();
        renderPokemon(resJson);
    }catch(error){
        clearElement();
        notFoundPokemon(valPokemon);
    }
}

window.onload = () => {

    const btnPrimary = document.querySelector('#btnSearch');
    const lookAllPokemon = document.querySelector('#fetch-all');

    btnPrimary.addEventListener('click', () => {
        const inputValue = document.querySelector('.form-control').value;
        inputValue && searchPokemon(inputValue);
    })

    lookAllPokemon.addEventListener('click', () => {
    
        document.querySelector('ul').innerHTML='';
        getAllPokemons();
    })
}