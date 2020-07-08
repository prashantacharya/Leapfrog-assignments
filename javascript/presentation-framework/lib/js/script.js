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
    this.intervalRef = null;
    this.config = config;
    this.theme = null;
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
        clearInterval(this.intervalRef);
      }

      if (event.key === 'ArrowRight' && x < this.horizontalSlides - 1) {
        this.selectedSlide = [x + 1, 0];
        clearInterval(this.intervalRef);
      }

      if (event.key === 'ArrowUp' && y > 0) {
        this.selectedSlide[1]--;
        clearInterval(this.intervalRef);
      }

      if (event.key === 'ArrowDown' && y < this.slides[x].length - 1) {
        this.selectedSlide[1]++;
        clearInterval(this.intervalRef);
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

    if (this.config.slideNumbers) this.updateSlideNumber();
  }

  autoSlide() {
    window.addEventListener('load', () => {
      let autoSlideInterval = this.config.autoSlideInterval || 5;
      let totalIntervalTime = autoSlideInterval * 1000;

      this.intervalRef = setInterval(() => {
        let [x, y] = this.selectedSlide;
        if (this.slides[x][y + 1]) {
          this.selectedSlide = [x, y + 1];
        } else if (this.slides[x + 1]) {
          this.selectedSlide = [x + 1, 0];
        }

        this.slide();
      }, totalIntervalTime);
    });
  }

  switchTheme() {
    if (!this.theme) {
      this.theme = 'dark';
      this.element.classList.add('dark');
      this.element.querySelector('#switch-theme button').innerText = '☀';
    } else {
      this.theme = null;
      this.element.classList.remove('dark');
      this.element.querySelector('#switch-theme button').innerText = '☽';
    }
  }

  setTheme() {
    this.theme = [...slide.element.classList].includes('dark') ? 'dark' : '';

    this.element.insertAdjacentHTML(
      'beforeend',
      `<div id="switch-theme">
        <button>☽</button>
      </div>`
    );

    this.element.querySelector('button').addEventListener('click', () => {
      this.switchTheme();
    });

    window.addEventListener('keydown', (event) => {
      if (event.key === 't') this.switchTheme();
    });
  }

  showSlideNumbers() {
    this.element.insertAdjacentHTML(
      'beforeend',
      `<div class="slide-number">
        1
      </div>`
    );
  }

  updateSlideNumber() {
    const [x, y] = this.selectedSlide;
    let pageNo = '';
    if (this.slides[x].length > 1) {
      pageNo = `${x + 1}.${y + 1}`;
    } else {
      pageNo = `${x + 1}`;
    }

    this.element.querySelector('.slide-number').innerText = pageNo;
  }

  setConfigurationOptions() {
    if (this.config.autoSlide) {
      this.autoSlide();
    }

    if (this.config.slideTime) {
      this.slidesContainer.style.transition = `${this.config.slideTime}s`;
    }

    if (this.config.allowDarkTheme) {
      this.setTheme();
    }

    if (this.config.slideNumbers) {
      this.showSlideNumbers();
    }
  }

  init() {
    this.getSlideDomElements();
    this.setDimensions();
    this.setKeyboardEvents();
    this.setConfigurationOptions();
  }
}
