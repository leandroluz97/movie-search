class Scroll {
  constructor() {
    this.carouselSearch = document.querySelector('#carouselSearch');
    this.scroollAmount = 0;
  }

  //Scroll left
  sliderScrollLeft() {
    let scrollPerClick = document.querySelector('.movie').clientWidth * 3;

    this.carouselSearch.scrollTo({
      top: 0,
      left: (this.scroollAmount -= scrollPerClick),
      behavior: 'smooth',
    });

    if (this.scroollAmount < 0) {
      this.scroollAmount = 0;
    }
  }

  //Scroll right
  sliderScrollRight() {
    let scrollPerClick = document.querySelector('.movie').clientWidth * 3;

    if (
      this.scroollAmount <=
      this.carouselSearch.scrollWidth - this.carouselSearch.clientWidth
    ) {
      this.scroollAmount = this.scroollAmount + scrollPerClick;
    } else {
      this.scroollAmount = 0;
    }

    this.carouselSearch.scrollTo({
      top: 0,
      left: this.scroollAmount,
      behavior: 'smooth',
    });
  }
}
