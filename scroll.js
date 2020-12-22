class Scroll {
  constructor(carousel) {
    this.carousel = document.querySelector(`#${carousel}`); //carouselSearch
    this.scroollAmount = 0;
  }

  //Scroll left
  sliderScrollLeft(classMovie) {
    //check which carousel to scroll
    let scrollPerClick =
      document.querySelector(`.${classMovie}`).clientWidth * 3;

    this.carousel.scrollTo({
      top: 0,
      left: (this.scroollAmount -= scrollPerClick),
      behavior: 'smooth',
    });

    if (this.scroollAmount < 0) {
      this.scroollAmount = 0;
    }
  }

  //Scroll right
  sliderScrollRight(classMovie) {
    //check which carousel to scroll
    let scrollPerClick =
      document.querySelector(`.${classMovie}`).clientWidth * 3;

    //check if Scroll right is at the end scroll to start point
    if (
      this.scroollAmount <=
      this.carousel.scrollWidth - this.carousel.clientWidth
    ) {
      this.scroollAmount = this.scroollAmount + scrollPerClick;
    } else {
      this.scroollAmount = 0;
    }

    this.carousel.scrollTo({
      top: 0,
      left: this.scroollAmount,
      behavior: 'smooth',
    });
  }
}
