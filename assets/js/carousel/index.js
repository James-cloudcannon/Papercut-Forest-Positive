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
      this.prevButton.addEventListener('click', () => {
        this.moveCarousel('prev');
      });
      this.nextButton.addEventListener('click', () => {
        this.moveCarousel('next');
      });
    },
  
    setupSlides() {
      this.slides.forEach((slide, index) => {
        if (!slide) return;
        slide.setAttribute('data-index', index + 1);
        slide.style.width = `${this.cardWidth}px`;
        if (index === 0) {
          slide.style.left = `${-this.cardWidth / this.CAROUSEL_LEFT_OFFSET_FACTOR}px`;
          slide.classList.add(this.CAROUSEL_BLUR_CLASS);
        } else if (index === this.slides.length - 1) {
          slide.style.left = `${this.width - this.cardWidth / this.CAROUSEL_RIGHT_OFFSET_FACTOR}px`;
          slide.classList.add(this.CAROUSEL_BLUR_CLASS);
        } else {
          slide.style.left = `${this.cardWidth * (index - this.CAROUSEL_NORMAL_OFFSET_FACTOR)}px`;
        }
      });
    },
  
    moveCarousel(direction) {
      if (direction === 'next') {
        console.log('Move the carousel to the right');
       //TODO: move the carousel to the right
      }
      if (direction === 'prev') {
        console.log('Move the carousel to the left');
       // TODO: move the carousel to the left
      }
    }
   
      
  };

  carousel.init()
    
