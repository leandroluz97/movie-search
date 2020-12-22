class Storage {
  constructor() {
    this.favorites = [];
  }

  getStorage() {
    //check if LS is empty
    if (localStorage.getItem('favorite') === null) {
      this.favorites = [];
    } else {
      this.favorites = JSON.parse(localStorage.getItem('favorite'));
    }

    return this.favorites;
  }
  addStorage(movie) {
    this.favorites.push(movie);
    localStorage.setItem('favorite', JSON.stringify(this.favorites));
  }
  deleteStorage(index) {
    this.favorites.splice(index, 1);
    localStorage.setItem('favorite', JSON.stringify(this.favorites));
  }
}
