const slide = new Swift({ selector: '#my-presentation' });
slide.init();

console.log(slide.slides);
setTimeout(() => {
  console.log(slide.slidesHeight, slide.slidesWidth);
}, 1000);
