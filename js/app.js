// primer request
function dataRequest() {
    fetch(`https://swapi.co/api/films/?format=json`).then(function(data){
        return data.json().then(function(json){
            getSWInfo(json)
        });
    });
};
dataRequest()

function getSWInfo(json) {
    const arrayMovies = json.results;
    arrayMovies.forEach((movie, index) => {
        // console.log(index)
        const movieTitle = movie.title;
        const episode = movie.episode_id;        
        const movieDescription = movie.opening_crawl;     
        const arrayCharacters = movie.characters[0]
        console.log(arrayCharacters)
        // arrayCharacters.forEach((item, index) => {
        //     // charactersRequest(item)
        //     // console.log(index)
        // });
        paintMovies(movieTitle, movieDescription, episode, arrayCharacters)
    });
};

function paintMovies (movieTitle, movieDescription, episode, arrayCharacters){

    let templete = `<div class="panel panel-default col-md-3 col-md-offset-1">
    <div class="panel-heading">
        <h3 class="panel-title">Episodio: ${episode} - ${movieTitle}</h3>
    </div>
    <div class="panel-body">
        <div class="row">
            <h5 id="movie_description">${movieDescription}</h5>
        </div>
        <div class="row">
            <img class="col-md-12" src="https://dummyimage.com/300x300" alt="">
        </div>
        <div class="row">
            <p>Personajes</p>
            <ul id="characters" >
                <a class="character-modal" data-toggle="modal" data-target="#character_info" data-character="${arrayCharacters}" href=""><li>${arrayCharacters}</li></a>
            </ul>
        </div>
    </div>
</div>`

    const moviesContainer = document.getElementById('movie_container');
    moviesContainer.innerHTML += templete  
    // charactersRequest(arrayCharacters);  
};

$(document).on("click", ".character-modal", showModal);

function showModal() {
    let characterToShow = $(this).data("character");
    console.log(characterToShow)
    charactersRequest(characterToShow);  
   
};

function charactersRequest(characterToShow) {
        fetch(`${characterToShow}`).then(function(response){
            return response.json().then(function(jsonCharac){
                console.log(jsonCharac)
                // painCharacter(jsonCharac)
                getModalInfo(jsonCharac)
            });
        });
};

function getModalInfo(jsonCharac) {
    const name = jsonCharac.name;
    const height = jsonCharac.height;
    const hairColor = jsonCharac.hair_color;
    const mass = jsonCharac.mass;
    const skinColor = jsonCharac.skin_color;

    painModal(name, height, hairColor, mass, skinColor)
};

function painModal(name, height, hairColor, mass, skinColor) {
    const modalTemplete = `<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h1 id="character" class="modal-title text-center">${name}</h1>
</div>
<div class="modal-body">
    <div class="row">
        <div class="col-md-5">
            <img id="character_image" class="text-center" src="https://dummyimage.com/300x300" alt="">
        </div>
        <div class="col-md-7">
            <div class="row">
                <div class="col-md-6">
                    <div class="row">
                        <h5 class="col-md-6">Height: <span id="height">${height}</span></h5>
                        <h5 class="col-md-6">Weight: <span id="mass">${mass}</span></h5>
                        <h5 class="col-md-6">Hair: <span id="hair_color">${hairColor}</span></h5>
                        <h5 class="col-md-6">Skyn: <span id="skin_color">${skinColor}</span></h5>
                    </div>
                </div>
            </div>
        </div>
    </div>`

    const modalContainer = document.getElementById('modal_container');
    modalContainer.innerHTML = modalTemplete
};
// function painCharacter(jsonCharac) {
//     const characterName = jsonCharac.name;
//     templeteCharacter = `<li>${characterName}</li>`

//     const characterContainer = document.getElementById('characters')
//     characterContainer.innerHTML += characterName
// };