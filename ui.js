class UI {
  constructor() {
    this.carouselSearch = document.querySelector('#carouselSearch');
    this.boxSearch = document.querySelector('#boxSearch');
    this.main = document.querySelector('#main');
    this.bg = document.querySelector('.bg');
  }

  //Display all movies
  allSearchMovie(movies, genre) {
    console.log(movies.results);
    let movieArr = [...movies.results];
    let movieGen = [...genre.genres];

    this.clearSearchMovie();

    this.boxSearch.innerHTML += `
    <i class="fas fa-chevron-right switchRight sliderButton"></i>
    <i class="fas fa-chevron-left switchLeft sliderButton"></i>
`;
    movies.results.forEach((movie, index) => {
      this.carouselSearch.innerHTML += ` <img src="http://image.tmdb.org/t/p/original/${movie.poster_path}" class="carousel-img movie"/>`;
    });

    this.chosenOne(movieArr, 0, movieGen);
    const allDisplayedMovies = document.querySelectorAll('.movie');
    allDisplayedMovies.forEach((chosen, index) => {
      chosen.addEventListener('click', (e) => {
        this.chosenOne(movieArr, index, movieGen);
      });
    });
  }

  //Display chosen one
  chosenOne(movieArr, index, genres) {
    let numGen;

    //Check the genre id of the movie
    for (let i = 0; i < genres.length; i++) {
      if (genres[i].id === movieArr[index].genre_ids[0]) {
        numGen = genres[i];
        break;
      }
    }

    this.bg.style.backgroundImage = `url('http://image.tmdb.org/t/p/original/${movieArr[index].poster_path}')`;
    //display the chosen movie
    this.main.innerHTML = `
    <div class="main__photo" >
        <img src="http://image.tmdb.org/t/p/original/${movieArr[index].poster_path}" alt="movie poster" class="main__img" />
    </div>
    <div class="main__content">
        <div class="main__header">
          <h2 class="main__title">${movieArr[index].title}</h2>
          <p class="main__overview">
          ${movieArr[index].overview}
          </p>
        </div>
    <button class="main_favorite">
        Add Favorite <i class="fas fa-star"></i>
    </button>
    <div class="main__info">
        <p>Genre: <b>${numGen.name}</b></h5>
        <p>Language: <b>${movieArr[index].original_language}</b></h5>
        <p>Release: <b>${movieArr[index].release_date}</b></h5>
        <p>Rating: <b>${movieArr[index].vote_average}</b></h5>
    </div>
  </div>`;
  }

  //clear the chosen display
  clearChosenOne() {
    this.main.innerHTML = '';
    this.bg.style.backgroundImage = '';
  }

  //clear the movie display
  clearSearchMovie() {
    this.carouselSearch.innerHTML = '';
    this.boxSearch.innerHTML = '';
  }

  //display the error sms
  error() {
    const error = document.querySelector('#error');
    error.innerHTML = 'Sorry, The Movie Data Base doesnt contain this movie';
    setTimeout(() => {
      error.innerHTML = '';
    }, 2000);
  }
}