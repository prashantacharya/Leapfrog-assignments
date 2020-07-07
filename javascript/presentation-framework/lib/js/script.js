class Swift {
  constructor(config) {
    this.element = document.querySelector(config.selector);
    this.slidesContainer = this.element.querySelector('.slides-container');
    this.slides = [];
    this.slidesHeight = 0;
    this.slidesWidth = 0;
    this.selectedSlide = [0, 0];
    this.horizontalSlides = 0;
    this.verticalSlides = 0;
  }

  setSlideDimentions() {
    //* Set the width of direct decendants of .slides-container
    [...this.element.querySelectorAll('section')]
      .filter((section) => section.parentNode.className === 'slides-container')
      .forEach((element) => {
        element.style.width = this.slidesWidth + 'px';
      });

    //* Set height and width of actual slide elements
    //* including vertical slides
    this.slides.flat().forEach((element) => {
      element.style.height = this.slidesHeight + 'px';
      element.style.width = this.slidesWidth + 'px';
      element.classList.add('slide');
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
      this.horizontalSlides = maxSlides;
      this.verticalSlides = maxVerticalSlides;

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

  setKeyboardEvents() {
    window.addEventListener('keydown', (event) => {
      let [x, y] = this.selectedSlide;
      if (event.key === 'ArrowLeft' && x > 0) {
        this.selectedSlide = [x - 1, 0];
      }

      if (event.key === 'ArrowRight' && x < this.horizontalSlides - 1) {
        this.selectedSlide = [x + 1, 0];
      }

      if (event.key === 'ArrowUp' && y > 0) {
        this.selectedSlide[1]--;
      }

      if (event.key === 'ArrowDown' && y < this.slides[x].length - 1) {
        this.selectedSlide[1]++;
      }

      if (event.key === 'f') {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          document.documentElement.requestFullscreen();
        }
      }

      this.slide();
    });
  }

  slide() {
    const [x, y] = this.selectedSlide;
    this.slidesContainer.style.left = `${x * -this.slidesWidth}px`;
    this.slidesContainer.style.top = `${y * -this.slidesHeight}px`;
  }

  init() {
    this.getSlideDomElements();
    this.setDimensions();
    this.setKeyboardEvents();
  }
}
