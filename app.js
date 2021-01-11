//instanciate classes
const movie = new Movies()
const storage = new Storage()

//ui variables
const btn = document.querySelector("#btn")
const input = document.querySelector("#input")
const test = document.querySelector("#test")

//EVENT LISTENER

//Scroll
document.addEventListener("click", (e) => {
  const scroll = new Scroll()

  e.stopPropagation()
  if (e.target.classList.contains("carousel-img")) {
    scroll.scrolltoTop()
  }
})

//delete favorite
document.addEventListener("click", (e) => {
  const ui = new UI("carouselFav", "boxFav")

  if (e.target.classList.contains("remove")) {
    const favorites = document.querySelectorAll(".fav")

    for (let i = 0; i < favorites.length; i++) {
      if (e.target.parentElement === favorites[i]) {
        storage.deleteStorage(i)
        ui.removeFavoriteMovie(i)
      }
    }
  }
})

//get favorite
document.addEventListener("DOMContentLoaded", function (e) {
  const ui = new UI("carouselFav", "boxFav")

  //get data from local storaage end then print it on screen
  const savedStorage = storage.getStorage()
  ui.addFavoriteMovie(savedStorage, "favorite")

  sliders("carouselFav", "favorite")
})

//Add favorite
document.addEventListener("click", function (e) {
  const ui = new UI("carouselFav", "boxFav")
  const resByIdArr = {
    results: [],
  }

  //if the taarget clicked contains the button fav forite
  if (e.target.classList.contains("main_favorite")) {
    const btnFav = document.querySelector(".main_favorite")
    const idFavMovie = btnFav.getAttribute("data-id")
    let check

    //Get movie by id
    movie.getMovies(idFavMovie).then((data) => {
      resByIdArr.results.push(data.resById)

      //get local storage
      const savedStorage = storage.getStorage()

      //if the lS is empty add
      if (savedStorage.length <= 0) {
        storage.addStorage(data.resById)
        check = true
      } else {
        //check if LS has a fav
        for (let i = 0; i < savedStorage.length; i++) {
          //if the LS has set check to true
          if (savedStorage[i].id === data.resById.id) {
            check = true
            break
          } else {
            check = false
          }
        }
      }
      //if Ls does have it add to local storage
      if (!check) {
        storage.addStorage(data.resById)
      }
      ui.addFavoriteMovie(savedStorage, "favorite")
    })
  }
})

//Get popular Movie
document.addEventListener("DOMContentLoaded", function () {
  movie.getMovies().then((data) => {
    let ui = new UI("carouselPopular", "boxPopular")

    ui.allSearchMovie(data.resPopular, data.resGenres, "popular")
    sliders("carouselPopular", "popular")
  })
})

//Get popular Movie

document.addEventListener("DOMContentLoaded", function () {
  movie.getMovies().then((data) => {
    let ui = new UI("carouselTop", "boxTop")

    ui.allSearchMovie(data.resTopRated, data.resGenres, "top")
    sliders("carouselTop", "top")
  })
})

//Search movie
input.addEventListener("keyup", function () {
  const ui = new UI("carouselSearch", "boxSearch")
  let search = document.querySelector("#search")
  let inputVal = input.value.replace(/\W/g, "")
  if (inputVal !== "") {
    movie.getMovies(inputVal).then(function (data) {
      if (data.resSearchMovie.results.length === 0) {
        ui.clearChosenOne()
        ui.clearSearchMovie()
        ui.error()
        search.style.display = "none"
      } else {
        search.style.display = "block"
        ui.allSearchMovie(data.resSearchMovie, data.resGenres, "movie")

        sliders("carouselSearch", "movie")
      }
    })
  } else {
    search.style.display = "none"
    ui.clearChosenOne()
    ui.clearSearchMovie()
  }
})

//Arrow sliders
function sliders(carousel, section) {
  const scroll = new Scroll(carousel)

  //Arrow sliders
  const left = document.querySelector(`.switchLeft${section}`)
  const right = document.querySelector(`.switchRight${section}`)

  left.addEventListener("click", function () {
    scroll.sliderScrollLeft(section)
  })

  right.addEventListener("click", function () {
    scroll.sliderScrollRight(section)
  })
}
