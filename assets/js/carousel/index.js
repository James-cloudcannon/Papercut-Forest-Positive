const carousel = document.querySelector('.c-carousel__wrapper');
	const carouselContent = document.querySelector('.c-carousel__slides');
	let slides = document.querySelectorAll('.c-slide-card');
	const arrayOfSlides = Array.from(slides)
	let carouselDisplaying;
	let screenSize;
	setScreenSize();
	let lengthOfSlide;
	let visibleScreen;

	function addClone() {
		const lastSlide = carouselContent.lastElementChild.cloneNode(true);
		lastSlide.style.left = (-lengthOfSlide) + "px";
		carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
		
	}


	function removeClone() {
		const firstSlide = carouselContent.firstElementChild;
		firstSlide.parentNode.removeChild(firstSlide);
	}

	function updateSlideStatus() {
		slides = document.querySelectorAll('.c-slide-card');
		mobileQuery();

		
		for (let i = 0; i < slides.length; i++) {
			const slidePosition = slides[i].getBoundingClientRect();
			const containerWidth = carouselContent.getBoundingClientRect().width;

			if (slidePosition.right > carouselContent.getBoundingClientRect().right) {
				slides[i].classList.add("offscreen");
			} else if (slidePosition.left < 0) {
				slides[i].classList.add("offscreen");
			} else {
				slides[i].classList.remove("offscreen");
			}

			if (containerWidth >= 1154) {
				if (slidePosition.right < (carouselContent.getBoundingClientRect().left + 400) ||
					slidePosition.left < 0) {
					slides[i].classList.add("offscreen");
				}
				if (slidePosition.left < (carouselContent.getBoundingClientRect().left - 100)) {
					slides[i].classList.add("hidden");
				} else if (slidePosition.left > (carouselContent.getBoundingClientRect().right + 150)) {
					slides[i].classList.add("hidden");
				} else {
					slides[i].classList.remove("hidden");
				}
			}
		} 
	}

	function moveSlidesRight() {
		const slides = document.querySelectorAll('.c-slide-card');
		const slidesArray = Array.from(slides)
		let width = 0;

		slidesArray.forEach(function(el, i){
			el.style.left = width + "px";
			width += lengthOfSlide;
		});
		addClone();
		updateSlideStatus();
	}
	
	function moveSlidesLeft() {
		const slides = document.querySelectorAll('.c-slide-card');
		let slidesArray = Array.from(slides)
		slidesArray = slidesArray.reverse();
		let maxWidth = (slidesArray.length - 1) * lengthOfSlide;

		slidesArray.forEach(function(el, i){
			maxWidth -= lengthOfSlide;
			el.style.left = maxWidth + "px";
		}); 
	}

	window.addEventListener('resize', setScreenSize);


  function setScreenSize() {
    const windowWidth = window.innerWidth;

    switch (true) {
      case (windowWidth >= 500):
        carouselDisplaying = 3;
        break;
      case (windowWidth >= 300):
        carouselDisplaying = 2;
        break;
      default:
        carouselDisplaying = 1;
    }
    
    visibleScreen = Math.min(1400, windowWidth);
    // Remove hidden class from slides
    slides.forEach(slide => slide.classList.remove('hidden'));

    requestAnimationFrame(() => {
      updateSlideStatus();
      getScreenSize();
      
    });
}


const debounceSetScreenSize = debounce(setScreenSize, 200);


function debounce(func, delay) {
	let timeoutId;
	return function(...args) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			func.apply(this, args);
		}, delay);
	}
}

	function getScreenSize() {
		const slides = document.querySelectorAll('.c-slide-card');
		const slidesArray = Array.from(slides)

		lengthOfSlide = 342;
		let initialWidth = -lengthOfSlide;
		slidesArray.forEach(function(el) {
			el.style.width = lengthOfSlide + "px";
			el.style.left = initialWidth + "px";
			initialWidth += (lengthOfSlide);
		});
	}

	function mobileQuery() {
		if (window.innerWidth <= 478) {
			slides = document.querySelectorAll('.c-slide-card');

			for (let i = 0; i < slides.length; i++) {
				slides[i].classList.remove('offscreen');
				slides[i].style.left = "unset";
			}
		}
	}
	
	mobileQuery();


	const rightNav = document.querySelector('.c-carousel__button--right');
	rightNav.addEventListener('click', moveLeft);

	let moving = true;
	function moveRight() {
		if ( moving ) {
			moving = false;
			let lastSlide = carouselContent.lastElementChild;
			lastSlide.parentNode.removeChild(lastSlide);
			carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
			removeClone();
			let firstSlide = carouselContent.firstElementChild;
			firstSlide.addEventListener('transitionend', activateAgain);
			moveSlidesRight();
		}
	}

	function activateAgain() {
		const firstSlide = carouselContent.firstElementChild;
		moving = true;
		firstSlide.removeEventListener('transitionend', activateAgain);
		updateSlideStatus();
	}

	const leftNav = document.querySelector('.c-carousel__button--left');
	leftNav.addEventListener('click', moveRight);

	
	function moveLeft() {
		if ( moving ) {
			moving = false;
			removeClone();
			const firstSlide = carouselContent.firstElementChild;
			firstSlide.addEventListener('transitionend', replaceToEnd);
			moveSlidesLeft();
		}
	}

	function replaceToEnd() {
		const firstSlide = carouselContent.firstElementChild;
		firstSlide.parentNode.removeChild(firstSlide);
		carouselContent.appendChild(firstSlide);
		firstSlide.style.left = ( (arrayOfSlides.length -1) * lengthOfSlide) + "px";
		addClone();
		moving = true;
		firstSlide.removeEventListener('transitionend', replaceToEnd);
		updateSlideStatus();
	}

	carouselContent.addEventListener('mousedown', seeMovement);

	let initialX;
	let initialPos;
	function seeMovement(e) {
		initialX = e.clientX;
		getInitialPos();
		carouselContent.addEventListener('mousemove', slightMove);
		document.addEventListener('mouseup', moveBasedOnMouse);
	}

	function slightMove(e) {
		if ( moving ) {
			let movingX = e.clientX;
			let difference = initialX - movingX;
			if ( Math.abs(difference) < (lengthOfSlide/4) ) {
				slightMoveSlides(difference);
			}  
		}
	}

	function getInitialPos() {
		const slides = document.querySelectorAll('.c-slide-card');
		let slidesArray = Array.from(slides)
		initialPos = [];
		slidesArray.forEach(function(el){
			let left = Math.floor( parseInt( el.style.left.slice(0, -2 ) ) ); 
			initialPos.push( left );
		});
	}

	function slightMoveSlides(newX) {
		const slides = document.querySelectorAll('.c-slide-card');
		const slidesArray = Array.from(slides)
		slidesArray.forEach(function(el, i){
			let oldLeft = initialPos[i];
			el.style.left = (oldLeft + newX) + "px";
		});
	}

	function moveBasedOnMouse(e) { 
		let finalX = e.clientX;
		if ( initialX - finalX > 0) {
			moveRight();
		} else if ( initialX - finalX < 0 ) {
			moveLeft();
		}
		document.removeEventListener('mouseup', moveBasedOnMouse);
		carouselContent.removeEventListener('mousemove', slightMove);
	}

moveSlidesRight();
window.addEventListener('load', updateSlideStatus);

