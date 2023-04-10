const carousel = {
  wrapper: document.querySelector('.c-carousel__wrapper'),
  slides: null,
  width: null,
  gapPxl: 16, // gap between cards in px
  currentIndex: 0,
  cardWidth: null,
  cardArray: null,
  CAROUSEL_LEFT_OFFSET_FACTOR: 1.5, // offset factor for the leftmost card
  CAROUSEL_RIGHT_OFFSET_FACTOR: 2.5, // offset factor for the rightmost card
  CAROUSEL_NORMAL_OFFSET_FACTOR: 0.6, // offset factor for the cards in the middle
  CAROUSEL_BLUR_CLASS: 'blur',
  prevButton: document.querySelector('.c-carousel__button--right'),
  nextButton: document.querySelector('.c-carousel__button--left'),

  init() {
    this.slides = this.wrapper.querySelectorAll('.c-slide-card');
    this.width = this.wrapper.offsetWidth;
    this.cardWidth = this.slides[0].offsetWidth + this.gapPxl;
    this.cardArray = Array.from(this.slides);
    this.wrapper.style.width = `${this.width}px`;
    this.setupSlides();
    this.prevButton.addEventListener('click', this.debounce(this.moveCarouselPrev.bind(this), 500));
    this.nextButton.addEventListener('click', this.debounce(this.moveCarouselNext.bind(this), 500));
  },

  debounce(func, delay) {
    let timeoutId;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  },

  setupSlides() {
    this.slides.forEach((slide, index) => {
      if (!slide) return;
      slide.setAttribute('data-index', index + 1);
      slide.style.width = `${this.cardWidth}px`;
      this.positionSlide(slide, index);
    });
  },

  positionSlide(slide, index) {
    if (index === 0) {
      slide.style.left = `${-this.cardWidth / this.CAROUSEL_LEFT_OFFSET_FACTOR}px`;
      slide.classList.add(this.CAROUSEL_BLUR_CLASS);
      slide.style.zIndex = -1;
      slide.style.transition = 'all 0.05s start';
    } else if (index === this.slides.length - 1) {
      slide.style.left = `${this.width - this.cardWidth / this.CAROUSEL_RIGHT_OFFSET_FACTOR}px`;
      slide.classList.add(this.CAROUSEL_BLUR_CLASS);
      
      
      slide.style.transition = 'all 0.05s end';
    }  else {
      slide.style.zIndex = 0;
      slide.style.transition = 'all 0.75s ease';
      slide.style.left = `${this.cardWidth * (index - this.CAROUSEL_NORMAL_OFFSET_FACTOR)}px`;
    }
  },
 








  moveCarouselPrev() {
    console.log('Move the carousel to the left');
    const firstCard = this.cardArray.shift();
    this.cardArray.push(firstCard);
    this.updateSlidePositions();
  },

  moveCarouselNext() {
    console.log('Move the carousel to the right');
    const lastCard = this.cardArray.pop();
    this.cardArray.unshift(lastCard);
    this.updateSlidePositions();
  },

  updateSlidePositions() {
    this.cardArray.forEach((card, index) => {
      this.positionSlide(card, index);
      if (index === 0 || index === this.cardArray.length - 1) {
        card.classList.add(this.CAROUSEL_BLUR_CLASS);
      } else {
        card.classList.remove(this.CAROUSEL_BLUR_CLASS);
      }
    });
  }
};

carousel.init();