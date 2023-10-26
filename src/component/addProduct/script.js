export const script = ()=>{
    const scrollContainer = document.querySelector('.add-product-section form .image-div ul');
const scrollContent = document.querySelector('.add-product-section form .image-div ul li');

let isDragging = false;
let startX = 0;
let scrollLeft = 0;
console.log("enter");
scrollContainer.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - scrollContainer.offsetLeft;
  scrollLeft = scrollContainer.scrollLeft;
  scrollContainer.style.cursor = 'grabbing';
});

scrollContainer.addEventListener('mouseup', () => {
  isDragging = false;
  scrollContainer.style.cursor = 'grab';
});

scrollContainer.addEventListener('mouseleave', () => {
  isDragging = false;
  scrollContainer.style.cursor = 'grab';
});

scrollContainer.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const x = e.pageX - scrollContainer.offsetLeft;
  const walk = (x - startX) * 2; // Adjust the scrolling speed here
  scrollContainer.scrollLeft = scrollLeft - walk;
});

// For touch devices
scrollContainer.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].pageX - scrollContainer.offsetLeft;
  scrollLeft = scrollContainer.scrollLeft;
});

scrollContainer.addEventListener('touchend', () => {
  isDragging = false;
});

scrollContainer.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const x = e.touches[0].pageX - scrollContainer.offsetLeft;
  const walk = (x - startX) * 2; // Adjust the scrolling speed here
  scrollContainer.scrollLeft = scrollLeft - walk;
});


}