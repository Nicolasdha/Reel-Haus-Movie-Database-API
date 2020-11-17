// Array of objects to match all genre ids provided from API to correct genre string
const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ];
const randomNum = Math.floor(Math.random() * 500);
const APIURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${randomNum}`;
const IMGPATH = "https://image.tmdb.org/t/p/w1280/"
const main = document.querySelector('main');
const form = document.querySelector('form');
const search = document.querySelector('.search');
const logo = document.querySelector('#logo');
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';
let i = 0;


// Initally fill page with 20 random movies
getMovies(APIURL);


// Function to get JSON of random or requested movies
async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    showMovies(respData.results);
}


// Function to fill page with each movie card
function showMovies(movies){
  let i = 0;
    //Clear main so when user searches only search results display
    main.innerHTML = '';
    // Loop for each movie
    for(const movie of movies) {
        i = i +1;
        // Destructuring movie API labels
        let { poster_path, title, vote_average, overview, release_date} = movie;
        // To create each movie card and add a class
        const movieEl = document.createElement('div');
        movieEl.classList.add("movie");

        //For missing vote_average in API so it doesnt show 0
        if(vote_average != 0){
            vote_average = vote_average;
        } else {
            vote_average = 'Unrated';
        }

        //For missing poster_path in API
        if(poster_path){
            poster_path =  IMGPATH + poster_path;
        } else {
            poster_path = "404.png";
        }
            
        // To fill in movie card and append to page
        movieEl.innerHTML = `
            <img src=${poster_path} alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview" id="overview${i}">
                ${overview}<br><br>
                <h4>Released: ${release_date}</h4>
              </div>`
        
            main.appendChild(movieEl);
            getGenres(movie);
        }
}


// Function to loop through each movie's genre ids, compare them to the genre id keys located in genres array, and place them in the corresponding movie's overview box
function getGenres(movies) {

// Iterator variable to match the genres to the correct movie card
  i=i+1
  const genresEl = document.getElementById(`overview${i}`);
  let items = movies.genre_ids.length;

// Loop to extrapolate each genre for each movie provided from API
    for (let n = 0; n < items; n++) {

// Loop to match each of the movie genres to the genre key array and provide the ids with the correct name
      for (let j = 0; j < genres.length; j++) {
        if (movies.genre_ids[n] == genres[j].id) {
          let genreName = genres[j].name
            const genreEl = document.createElement('span');
            genreEl.classList.add("genre");
            genreEl.innerText = genreName;
            genresEl.appendChild(genreEl)
        }
      }
    }
}


// Function to color the rating section of the movie card depending on its rating
function getClassByRate(vote) {
  switch(true){
    case vote >= 8:
      return "green";
    case vote >=5:
      return "yellow";
    case vote >=0.1:
      return "red";
    }
}


// For search bar to operate
form.addEventListener('submit', async (e) => {
    e.preventDefault();
  searchTerm = search.value
    if(searchTerm){
      //Clear out search bar once used
        search.value = '';
      // Reset increment counter for genres
        i=0;
        getMovies(SEARCHAPI + searchTerm)
    }
});


// Reload page upon logo click
logo.addEventListener('click', () => {
    location.reload();
});