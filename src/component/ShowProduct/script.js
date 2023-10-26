export function script(can_i_start){
    if (can_i_start){
        console.log("script started");
    const carousel = document.querySelector(".show-img ul");
  
    const firstCardWidth = carousel.querySelector(".show-img ul li").offsetWidth;
    const arrowBtns = document.querySelectorAll(".show-img i");
    let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
    
    
    
    
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