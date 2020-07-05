class Swift {
  constructor(config) {
    this.element = document.querySelector(config.selector);
    this.slidesContainer = this.element.querySelector('.slides-container');
    this.slides = [];
    this.slidesHeight = 0;
    this.slidesWidth = 0;
    this.selectedSlide = [0, 0];
  }

  setSlideDimentions() {
    [...this.element.querySelectorAll('section')]
      .filter((section) => section.parentNode.className === 'slides-container')
      .forEach((element) => {
        element.style.width = this.slidesWidth + 'px';
      });

    this.slides.flat().forEach((element) => {
      element.style.height = this.slidesHeight + 'px';
      element.style.width = this.slidesWidth + 'px';
      element.style.border = '1px solid black';
    });

    this.element.style.position = 'relative';
  }

  setDimensions() {
    window.addEventListener('load', () => {
      this.slidesWidth = parseInt(window.getComputedStyle(this.element).width);
      this.slidesHeight = parseInt(
        window.getComputedStyle(this.element).height
      );

      const maxSlides = this.slides.length;
      const verticalSlidesLengths = this.slides.map(
        (verticalSlide) => verticalSlide.length
      );
      const maxVerticalSlides = Math.max.apply(null, verticalSlidesLengths);

      this.slidesContainer.style.height =
        maxVerticalSlides * this.slidesHeight + 'px';
      this.slidesContainer.style.width = maxSlides * this.slidesWidth + 'px';

      this.setSlideDimentions();
      this.element.style.overflow = 'hidden';
    });
  }

  getSlideDomElements() {
    const sections = [...this.element.querySelectorAll('section')];
    const childSections = sections.filter(
      (section) => section.parentNode.className === 'slides-container'
    );

    childSections.forEach((section) => {
      const elements = section.querySelectorAll('section');
      if (elements.length) this.slides.push([...elements]);
      else this.slides.push([section]);
    });
  }

  slide() {
    const [x, y] = this.selectedSlide;
    this.slidesContainer.style.left = `${x * -this.slidesWidth}px`;
    this.slidesContainer.style.top = `${y * -this.slidesWidth}px`;
  }

  init() {
    this.getSlideDomElements();
    this.setDimensions();
  }
}
