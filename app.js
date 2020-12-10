
//instanciate classes
const movie = new Movies();
const ui = new UI();
const scroll = new Scroll();

//ui variables
const btn = document.querySelector('#btn');
const input = document.querySelector('#input');
const test = document.querySelector('#test');

//event listeners 
input.addEventListener('keyup', function () {
  if (input.value !== '') {
    
    movie.getMovies(input.value).then(function (data) {
      if (!data.resSearchMovie.results) {
        ui.clearChosenOne();
        ui.clearSearchMovie();
        ui.error();
        console.log('Falha nenhum item');
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
