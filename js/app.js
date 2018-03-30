// primer request
function dataRequest() {
    fetch(`https://swapi.co/api/films/?format=json`, {method:"GET"}).then(function(data){
        data.json().then(function(json){
            getSWInfo(json)
        });
    });
};
dataRequest()

function getSWInfo(json) {
    const arrayMovies = json.results;
    ;
    arrayMovies.forEach((movie, index) => {
        console.log(movie.characters[0])
        const movieTitle = movie.title;
        const episode = movie.episode_id;        
        const movieDescription = movie.opening_crawl;     
        const arrayCharacters = movie.characters

        const moviePhotos = photos[index];
        // console.log(arrayCharacters)
        paintMovies(movieTitle, movieDescription, episode, arrayCharacters, moviePhotos)
    });
};

function paintMovies (movieTitle, movieDescription, episode, arrayCharacters,moviePhotos){
    
    let listCharacteres = ``
    arrayCharacters.forEach(character => {
        listCharacteres += `<li><a class="character-modal" data-toggle="modal" data-target="#character_info" data-character="${character}" href="">Descubre quien soy</a></li>`
    });

    let templete = `
    <div class="col-md-6 col-xs-12">
        <div class="media yellow-letter">
            <div class="media-left media-top">
                <img class="media-object movie-picture" src="${moviePhotos}" alt="${movieTitle}">
            </div>
            <div class="media-body">
                <h3 class="media-heading">Episodio: ${episode} - ${movieTitle}</h3>
                <p id="movie_description">${movieDescription}</p>
                <h5>Characters</h5>
                <ul id="characters">
                 ${listCharacteres}
                </ul>
            </div>
        </div>
    </div>`

    const moviesContainer = document.getElementById('movie_container');
    moviesContainer.innerHTML += templete  
};

$(document).on("click", ".character-modal", showModal);

function showModal() {
    let characterToShow = $(this).data("character");
    charactersRequest(characterToShow);     
};

function charactersRequest(characterToShow) {
        fetch(`${characterToShow}`, {answer: 5}).then(function(response){
            return response.json().then(function(jsonCharac){
                getModalInfo(jsonCharac)
            })
        });
};

function getModalInfo(jsonCharac) {
    console.log(jsonCharac)
    const name = jsonCharac.name;
    const height = jsonCharac.height;
    const hairColor = jsonCharac.hair_color;
    const mass = jsonCharac.mass;
    const skinColor = jsonCharac.skin_color;

    painModal(name, height, hairColor, mass, skinColor)
};

function painModal(name, height, hairColor, mass, skinColor) {
    const modalTemplete = `
    <div class="modal-header yellow-letter">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h1 id="character" class="modal-title text-center">${name}</h1>
    </div>
    <div class="modal-body yellow-letter">
        <div class="row">
            <div class="col-md-4 col-md-offset-2">
                <img id="character_image" class="text-center img-responsive" src="assets/sw.jpg" alt="">
            </div>
            <div class="col-md-4">
                <div class="row">
                    <h2 class="col-md-12 text-center">Height: <span id="height">${height}</span></h2>
                    <h2 class="col-md-12 text-center">Mass: <span id="mass">${mass}</span></h2>
                    <h2 class="col-md-12 text-center">Hair color: <span id="hair_color">${hairColor}</span></h2>
                    <h2 class="col-md-12 text-center">Skyn color: <span id="skin_color">${skinColor}</span></h2>
                </div>   
            </div>
        </div>`

    const modalContainer = document.getElementById('modal_container');
    modalContainer.innerHTML = modalTemplete
};