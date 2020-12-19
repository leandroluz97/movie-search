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

    //fetch popular
    const fetchTopRated = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&language=en-US&page=1`
    );

    //fetch by id
    const fetchById = await fetch(
      `https://api.themoviedb.org/3/movie/${movieSearch}?api_key=${this.apiKey}&language=en-US`
    );

    const resSearchMovie = await fetchMovieSearch.json();
    const resGenres = await fetchGenres.json();
    const resPopular = await fetchPopular.json();
    const resTopRated = await fetchTopRated.json();
    const resById = await fetchById.json();
    return {
      resSearchMovie: resSearchMovie,
      resGenres: resGenres,
      resPopular: resPopular,
      resTopRated: resTopRated,
      resById: resById,
    };
  }
}
