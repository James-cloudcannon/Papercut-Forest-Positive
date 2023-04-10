export default () => {
    return {
        position: 0,
        activeIndex: 1,
        slideMovement: 260,
        carouselContainer: null,
        containerSize: 500,
        startingPos: 0,
        timer: null,
        mouseDown: null,
        mouseUp: null,
        mouseMove: null,
        mouseDrag: false,
        posBeforeMouseMove: null,
        carouselImageHeight: 300,
        screenSize: (window.innerWidth > 0) ? window.innerWidth : screen.width,

        carouselNavForward(){
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                if(this.activeIndex < this.carouselContainer.children.length - 3){
                    let scope = this;
                    this.activeIndex+= 1;
                    this.position = this.startingPos + ((this.activeIndex -1) * this.slideMovement);
                    this.posBeforeMouseMove = this.position;
                    setTimeout(function() {
                        document.getElementById(`slide-${scope.activeIndex-1}`).classList.remove('active-tile');
                        document.getElementById(`slide-${scope.activeIndex}`).classList.add('active-tile');
                        document.getElementById(`slide-${scope.carouselContainer.children.length - 1}`).classList.add('active-tile');
                        }, 400);

                    setTimeout(function() {
                        if(scope.activeIndex >= scope.carouselContainer.children.length - 3){
                            scope.carouselContainer.style.transition = 'transform 0ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s' 
                            scope.position = scope.startingPos;
                            scope.posBeforeMouseMove = scope.position;
                            document.getElementById(`slide-${scope.activeIndex-1}`).classList.remove('active-tile');
                            document.getElementById(`slide-${scope.activeIndex}`).classList.remove('active-tile');
                            document.getElementById(`slide-${scope.carouselContainer.children.length - 1}`).classList.remove('active-tile');

                            document.getElementById(`slide-1`).classList.add('active-tile');
                            setTimeout(function() {
                                scope.activeIndex = 1;
                                scope.carouselContainer.style.transition = 'transform 400ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s';
                                clearTimeout(this.timer);

                            },100);

                            }
                        }, 420);

                }        
                clearTimeout(this.timer);
            }, 200);
        },
        carouselNavBack(){
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                if(this.activeIndex > 0 && (this.activeIndex - 1) > 0){
                    this.activeIndex-=1;
                    this.position = (this.startingPos + ((this.activeIndex -1) * this.slideMovement));
                    this.posBeforeMouseMove = this.position;
                    let scope = this;
                    document.getElementById(`slide-${scope.carouselContainer.children.length - 1}`).classList.remove('active-tile');
                    setTimeout(function() {
                        document.getElementById(`slide-${scope.activeIndex+1}`).classList.remove('active-tile');
                        document.getElementById(`slide-${scope.activeIndex}`).classList.add('active-tile');
                        }, 400);

                }
                else{
                    let scope = this;
                    this.activeIndex-=1;
                    this.position = (this.startingPos + ((this.activeIndex -1) * this.slideMovement));
                    this.posBeforeMouseMove = this.position;
                    setTimeout(function() {
                        document.getElementById(`slide-${scope.activeIndex+1}`).classList.remove('active-tile');
                        document.getElementById(`slide-${scope.carouselContainer.children.length - 1}`).classList.add('active-tile');
                        document.getElementById(`slide-${scope.carouselContainer.children.length - 4}`).classList.add('active-tile');

                    }, 400);
                    setTimeout(function() {
                        scope.activeIndex = scope.carouselContainer.children.length - 4;
                        scope.carouselContainer.style.transition = 'transform 0ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s' 
                        scope.position = scope.startingPos;                
                        scope.position = scope.startingPos + ((scope.activeIndex -1) * scope.slideMovement);
                        scope.posBeforeMouseMove = scope.position;
                        setTimeout(function() {
                            scope.carouselContainer.style.transition = 'transform 400ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s';

                        }, 100);
                    }, 520);                
                }
                clearTimeout(this.timer);

            }, 200);     

        },

  

        setupCarousel() {
            this.carouselContainer = document.getElementById('threeTileCarousel');
            this.containerSize = document.getElementsByClassName('c-three-tile-carousel')[0].offsetWidth;
            let carouselSlides = this.carouselContainer.children;
          
            this.resizeCarousel();
          
            // display 5 slides at a time
            this.position = this.startingPos;

            let firstClone = carouselSlides[0].cloneNode(true);
            let secondClone = carouselSlides[1].cloneNode(true);
            let lastClone = carouselSlides[carouselSlides.length - 1].cloneNode(true);
            let secondTolastClone = carouselSlides[carouselSlides.length - 2].cloneNode(true);

            firstClone.classList.add('clone-slide');
            secondClone.classList.add('clone-slide');
            lastClone.classList.add('clone-slide');
            secondTolastClone.classList.add('clone-slide');

            this.carouselContainer.insertBefore(firstClone, this.carouselContainer.lastChild.nextSibling);
            this.carouselContainer.insertBefore(secondClone, this.carouselContainer.lastChild.nextSibling);

            this.carouselContainer.insertBefore(lastClone, this.carouselContainer.firstChild);
            this.carouselContainer.insertBefore(secondTolastClone, this.carouselContainer.firstChild);

            let scope = this;

            setTimeout(function() {
                document.getElementById('slide-1').classList.add('active-tile');
            }
            , 50);
            this.posBeforeMouseMove = this.position;
            // this.carouselContainer.addEventListener("pointerdown", function(e){ scope.carouselTouchMovement(e, scope) });



          
          },
          
        



        carouselManualNavigation(pos){
            let scope = this;
            clearTimeout(this.timer);
                scope.timer = setTimeout(() => {
                    var tempIndex = scope.activeIndex;
                    scope.activeIndex = pos;
                    scope.position = scope.startingPos + ((scope.activeIndex -1) * scope.slideMovement);
                        document.getElementById(`slide-${tempIndex}`).classList.remove('active-tile');
                        document.getElementById(`slide-${scope.activeIndex}`).classList.add('active-tile');
                        if(pos !== 1){
                            document.getElementById(`slide-${scope.carouselContainer.children.length - 1}`).classList.add('active-tile');
                        }
                        else{
                            document.getElementById(`slide-${scope.carouselContainer.children.length - 1}`).classList.remove('active-tile');
                        }
                    clearTimeout(this.timer);
                },100);

        },

        carouselTouchMovement(evt, scope, deviceType){
            const el = evt.currentTarget;
            let deviceMove, deviceUp, deviceDown;
            if(deviceType === "desktop"){
                deviceMove = "mousemove";
                deviceUp = "mouseup";
                deviceDown = "mousedown";
                el.style.touchAction = "none";
            }
            // else{
            //     deviceMove = "touchmove";
            //     deviceUp = "touchend";
            //     deviceDown = "touchstart";
            // }
            const move = (evt) => {
                scope.position -= el.offsetLeft + evt.movementX;
                let currentMove = (scope.posBeforeMouseMove - scope.position);
                if((currentMove) >= scope.slideMovement / 3 && currentMove > 0){
                    scope.carouselNavBack();
                    up;
                }
                else if(-currentMove >= scope.slideMovement / 3 && currentMove < 0){
                    scope.carouselNavForward();
                    up;
                }
                else{
                    up;
                }
            };
            const up = () => {
                removeEventListener(deviceMove, move);
                removeEventListener(deviceUp, up);
                setTimeout(() => {
                    if(scope.position % scope.slideMovement != 0){
                        scope.position = scope.posBeforeMouseMove;
                    }
                }, 200);
            };
            addEventListener(deviceMove, move);
            addEventListener(deviceUp, up);


        },

        resizeCarousel(){
            this.screenSize = (window.innerWidth > 0) ? window.innerWidth : screen.width;
            if(this.screenSize < 800){
                // Mobile
                this.slideMovement = this.containerSize * 0.9;
                this.startingPos = this.containerSize * 1.75;
                this.position = this.startingPos + ((this.activeIndex -1) * this.slideMovement);

            }
            else if(this.screenSize >= 800 && this.screenSize < 1000){
                // Tablet
                this.slideMovement = this.containerSize * 0.8;
                this.startingPos = this.containerSize * 1.5;
                this.position = this.startingPos + ((this.activeIndex -1) * this.slideMovement);

            }
            else{
                // Desktop
                this.slideMovement = this.containerSize * 0.5 ;
                this.startingPos = this.containerSize * 0.75;
                this.position = this.startingPos + ((this.activeIndex -1) * this.slideMovement);

            }

        }

    }
}


