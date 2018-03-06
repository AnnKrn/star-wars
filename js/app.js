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
    arrayMovies.forEach(movie => {
        const movieTitle = movie.title;
        const movieDescription = movie.opening_crawl;     
        const arrayCharacters = movie.characters   
        
        console.log(arrayCharacters)
        paintMovies(movieTitle, movieDescription)
        charactersRequest(arrayCharacters)
    });
};

function paintMovies (movieTitle, movieDescription){
    let templete = `<div class="panel panel-default col-md-3 col-md-offset-1">
    <div class="panel-heading">
        <h3 class="panel-title">${movieTitle}</h3>
    </div>
    <div class="panel-body">
        <div class="row">
            <h5 id="movie_description">${movieDescription}</h5>
        </div>
        <div class="row">
            <img src="" alt="">
        </div>
        <div class="row">
            <p>Personajes</p>
            <ul id="characters" >
            </ul>
        </div>
    </div>
</div>`

    const moviesContainer = document.getElementById('movie_container');
    moviesContainer.innerHTML += templete
};

function charactersRequest(arrayCharacters) {
    arrayCharacters.forEach(character => {
        fetch(`${character}`).then(function(response){
        return response.json().then(function(jsonCharac){
            painCharacter(jsonCharac)
            });
        });
    });
};

function painCharacter(jsonCharac) {
    const characterName = jsonCharac.name;
    templeteCharacter = `<li>${characterName}</li>`

    const charcterContainer = document.getElementById('characters')
    charcterContainer.innerHTML += characterName
};