export function script(can_i_start){
    if (can_i_start){
        console.log("script started");
        const wrapper = document.querySelector(".show-img");
    const carousel = document.querySelector(".show-img ul");
  
    const firstCardWidth = carousel.querySelector(".show-img ul li").offsetWidth;
    const arrowBtns = document.querySelectorAll(".show-img i");
    const carouselChildrens = [...carousel.children];
    let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
    
    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
    
    
    
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
    
    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
        });
    });
    
  
const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    console.log(startX);
    startScrollLeft = carousel.scrollLeft;
   
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}  
    
    const infiniteScroll = () => {
     
        // If the carousel is at the beginning, scroll to the end
        // console.log(carousel.scrollLeft);
        if(carousel.scrollLeft === 0) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
            carousel.classList.remove("no-transition");
        }
        // If the carousel is at the end, scroll to the beginning
        else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
        }
    
        // Clear existing timeout & start autoplay if mouse is not hovering over carousel
        // clearTimeout(timeoutId);
        // if(!wrapper.matches(":hover")) autoPlay();
    }
    
    const autoPlay = () => {
        if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
        // Autoplay the carousel after every 2500 ms
        timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
    }
    autoPlay();
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("mouseleave", dragStop);

  
    
    }
    

    


    // const container = document.querySelector('.product-img .show-img ul li');
    // const image = document.querySelector('#img1');
    // let scale = 1;

    // container.addEventListener('mousemove', (e) => {
    //     const rect = container.getBoundingClientRect();
    //     const x = (e.clientX - rect.left) / scale;
    //     const y = (e.clientY - rect.top) / scale;
    //     image.style.transformOrigin = `${x}px ${y}px`;
    // });

    // container.addEventListener('wheel', (e) => {
    //     e.preventDefault();
    //     scale += e.deltaY * -0.01;
    //     scale = Math.min(Math.max(1, scale), 3); // Adjust the min and max zoom levels as needed
    //     image.style.transform = `scale(${scale})`;
    // });


    
}