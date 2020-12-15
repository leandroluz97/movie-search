class Movies {
  constructor() {
    this.apiKey = '873b4aef885fdcaedae06604fa590269';
  }

  //fetch data
  async getMovies(movieSearch) {
    //fetch movies
    const fetchMovieSearch = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=en-US&query=${movieSearch}&page=1`
    );

    //fetch genres
    const fetchGenres = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=en-US`
    );

    //fetch popular
    const fetchPopular = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=en-US&page=1`
    );

    const resSearchMovie = await fetchMovieSearch.json();
    const resGenres = await fetchGenres.json();
    const resPopular = await fetchPopular.json();
    return {
      resSearchMovie: resSearchMovie,
      resGenres: resGenres,
      resPopular: resPopular,
    };
  }
}
