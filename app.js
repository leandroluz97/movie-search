//instanciate classes
const movie = new Movies();
const storage = new Storage();

//ui variables
const btn = document.querySelector('#btn');
const input = document.querySelector('#input');
const test = document.querySelector('#test');

//EVENT LISTENER

//get favorite
document.addEventListener('DOMContentLoaded', function () {
  const ui = new UI('carouselFav', 'boxFav');

  //get data from local storaage end then print it on screen

  const savedStorage = storage.getStorage();
  ui.addFavoriteMovie(savedStorage, 'favorite');

  //delete favorite
  let carousel = document.querySelector('#carouselFav');
  carousel.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove')) {
      let favs = document.querySelectorAll('.remove');
      favs.forEach((fav, index) => {
        storage.deleteStorage(index);
        ui.removeFavoriteMovie(index);
      });
    }
  });
});

//Add favorite
document.addEventListener('click', function (e) {
  const ui = new UI('carouselFav', 'boxFav');
  const resByIdArr = {
    results: [],
  };

  //if the taarget clicked contains the button fav forite
  if (e.target.classList.contains('main_favorite')) {
    const btnFav = document.querySelector('.main_favorite');
    const idFavMovie = btnFav.getAttribute('data-id');
    let check;

    //Get movie by id
    movie.getMovies(idFavMovie).then((data) => {
      resByIdArr.results.push(data.resById);

      //get local storage
      const savedStorage = storage.getStorage();

      //if the lS is empty add
      if (savedStorage.length <= 0) {
        storage.addStorage(data.resById);
        check = true;
      } else {
        //check if LS has a fav
        for (let i = 0; i < savedStorage.length; i++) {
          //if the LS has set check to true
          if (savedStorage[i].id === data.resById.id) {
            check = true;
            break;
          } else {
            check = false;
          }
        }
      }
      //if Ls does have it add to local storage
      if (!check) {
        storage.addStorage(data.resById);
      }
      ui.addFavoriteMovie(savedStorage, 'favorite');
    });
  }
});

//Get popular Movie
document.addEventListener('DOMContentLoaded', function () {
  movie.getMovies().then((data) => {
    let ui = new UI('carouselPopular', 'boxPopular');

    ui.allSearchMovie(data.resPopular, data.resGenres, 'popular');
    sliders('carouselPopular', 'popular');
  });
});

//Get popular Movie

document.addEventListener('DOMContentLoaded', function () {
  movie.getMovies().then((data) => {
    let ui = new UI('carouselTop', 'boxTop');

    ui.allSearchMovie(data.resTopRated, data.resGenres, 'top');
    sliders('carouselTop', 'top');
  });
});

//Search movie
input.addEventListener('keyup', function () {
  const ui = new UI('carouselSearch', 'boxSearch');
  let search = document.querySelector('#search');
  let inputVal = input.value.replace(/\W/g, '');
  if (inputVal !== '') {
    movie.getMovies(inputVal).then(function (data) {
      if (data.resSearchMovie.results.length === 0) {
        ui.clearChosenOne();
        ui.clearSearchMovie();
        ui.error();
        search.style.display = 'none';
      } else {
        search.style.display = 'block';
        ui.allSearchMovie(data.resSearchMovie, data.resGenres, 'movie');
        //console.log(data.resGenres.genres);
        sliders('carouselSearch', 'movie');
      }
    });
  } else {
    search.style.display = 'none';
    ui.clearChosenOne();
    ui.clearSearchMovie();
  }
});

//Arrow sliders
function sliders(carousel, section) {
  const scroll = new Scroll(carousel);

  //Arrow sliders
  const left = document.querySelector(`.switchLeft${section}`);
  const right = document.querySelector(`.switchRight${section}`);

  left.addEventListener('click', function () {
    scroll.sliderScrollLeft(section);
  });

  right.addEventListener('click', function () {
    scroll.sliderScrollRight(section);
  });
}
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
