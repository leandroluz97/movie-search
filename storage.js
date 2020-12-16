class Storage {
  constructor() {
    this.favorites;
  }

  getStorage() {
    if (localStorage.getItem('fav') === null) {
      this.favorites = [];
    } else {
      this.favorites = JSON.parse(localStorage.getItem('fav'));
    }

    return this.favorites;
  }
  addStorage(movie) {
    this.favorites.push(movie);
    localStorage.setItem('fav', JSON.stringify(this.favorites));
  }
}
