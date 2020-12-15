//instanciate classes
const movie = new Movies();

//ui variables
const btn = document.querySelector('#btn');
const input = document.querySelector('#input');
const test = document.querySelector('#test');

//EVENT LISTENER

//Get popular Movie
document.addEventListener('DOMContentLoaded', function () {
  movie.getMovies().then((data) => {
    const ui = new UI('carouselPopular', 'boxPopular');
    const scroll = new Scroll('carouselPopular');
    //console.log(data.resPopular.results);
    ui.allSearchMovie(data.resPopular, data.resGenres, 'polular');

    //Arrow sliders
    const left = document.querySelector('.switchLeft');
    const right = document.querySelector('.switchRight');

    left.addEventListener('click', function () {
      scroll.sliderScrollLeft('polular');
    });

    right.addEventListener('click', function () {
      scroll.sliderScrollRight('polular');
    });
  });
});

//Search movie
input.addEventListener('keyup', function () {
  const ui = new UI('carouselSearch', 'boxSearch');
  const scroll = new Scroll('carouselSearch');
  if (input.value !== '') {
    movie.getMovies(input.value).then(function (data) {
      if (!data.resSearchMovie.results) {
        ui.clearChosenOne();
        ui.clearSearchMovie();
        ui.error();
      } else {
        ui.allSearchMovie(data.resSearchMovie, data.resGenres, 'movie');

        //Arrow sliders
        const left = document.querySelector('.switchLeft');
        const right = document.querySelector('.switchRight');

        left.addEventListener('click', function () {
          scroll.sliderScrollLeft('movie');
        });

        right.addEventListener('click', function () {
          scroll.sliderScrollRight('movie');
        });
      }
    });
  } else {
    ui.clearChosenOne();
    ui.clearSearchMovie();
  }
});

/*

//instanciate classes
const movie = new Movies();
const ui = new UI();
const scroll = new Scroll();

//ui variables
const btn = document.querySelector('#btn');
const input = document.querySelector('#input');
const test = document.querySelector('#test');

//EVENT LISTENER

//Get popular Movie
document.addEventListener('DOMContentLoaded', function () {
  movie.getMovies().then((data) => {
    //console.log(data.resPopular.results);
    // ui.allSearchMovie(data.resPopular, data.resGenres);
  });
});

//Search movie
input.addEventListener('keyup', function () {
  if (input.value !== '') {
    movie.getMovies(input.value).then(function (data) {
      if (!data.resSearchMovie.results) {
        ui.clearChosenOne();
        ui.clearSearchMovie();
        ui.error();
      } else {
        ui.allSearchMovie(data.resSearchMovie, data.resGenres);

        //Arrow sliders
        const left = document.querySelector('.switchLeft');
        const right = document.querySelector('.switchRight');

        left.addEventListener('click', function () {
          scroll.sliderScrollLeft();
        });

        right.addEventListener('click', function () {
          scroll.sliderScrollRight();
        });
      }
    });
  } else {
    ui.clearChosenOne();
    ui.clearSearchMovie();
  }
});

*/
