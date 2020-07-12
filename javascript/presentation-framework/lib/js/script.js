class Swift {
  constructor(config) {
    this.element = document.querySelector(config.selector);
    this.slidesContainer =
      this.element.querySelector('.slides-container') || null;
    this.slides = [];
    this.slidesHeight = 0;
    this.slidesWidth = 0;
    this.selectedSlide = [0, 0];
    this.horizontalSlides = 0;
    this.verticalSlides = 0;
    this.intervalRef = null;
    this.config = config;
    this.theme = null;
    this.zoomedOut = false;
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
      if (this.zoomedOut) return;

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

  setSwipeEvents() {
    let xDown = null;
    let yDown = null;

    this.element.addEventListener(
      'touchstart',
      (event) => {
        xDown = event.touches[0].clientX;
        yDown = event.touches[0].clientY;
      },
      false
    );

    this.element.addEventListener(
      'touchmove',
      (event) => {
        let [x, y] = this.selectedSlide;

        if (!xDown || !yDown) {
          return;
        }

        let xUp = event.touches[0].clientX;
        let yUp = event.touches[0].clientY;

        let xDiff = xDown - xUp;
        let yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
          if (xDiff > 0 && x < this.horizontalSlides - 1) {
            this.selectedSlide = [x + 1, 0];
            clearInterval(this.intervalRef);
          } else if (x > 0) {
            this.selectedSlide = [x - 1, 0];
            clearInterval(this.intervalRef);
          }
        } else {
          if (yDiff > 0 && y < this.slides[x].length - 1) {
            this.selectedSlide[1]++;
            clearInterval(this.intervalRef);
          } else if (y > 0) {
            this.selectedSlide[1]--;
            clearInterval(this.intervalRef);
          }
        }
        /* reset values */
        xDown = null;
        yDown = null;

        this.slide();
      },
      false
    );
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
      if (event.key.toLowerCase() === 't') this.switchTheme();
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

  zoomOut() {
    this.element.insertAdjacentHTML(
      'beforeend',
      `<div class="zoom-out-view"></div>`
    );
    this.element.querySelector(
      '.zoom-out-view'
    ).innerHTML = this.slidesContainer.innerHTML;

    let zoomOutElement = this.element.querySelector('.zoom-out-view');

    window.addEventListener('keydown', (event) => {
      let display = window.getComputedStyle(zoomOutElement).display;

      if (event.key.toLowerCase() === 'z') {
        if (display === 'none') {
          zoomOutElement.style.display = 'block';
          this.zoomedOut = true;
        } else {
          zoomOutElement.style.display = 'none';
          this.zoomedOut = false;
        }
      }
    });

    zoomOutElement.addEventListener('click', () => {
      zoomOutElement.style.display = 'none';
      this.zoomOut = false;
    });
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

  getEachSection(data) {
    if (data.markdown) {
      return `
        <section class='markdown'>
          ${data.markdown}
        </section>
      `;
    }

    return `
      <section>
        <h1>${data.title}</h1>
        <p>${data.content}</p>
      </section>
    `;
  }

  insertDataToDOM() {
    this.element.insertAdjacentHTML(
      'afterbegin',
      '<div class="slides-container"></div>'
    );

    this.slidesContainer = this.element.querySelector('.slides-container');
    let domElement = '';

    this.config.data.forEach((slide) => {
      let section = '';
      if (slide.length) {
        let verticalSlideDOM = '';
        slide.forEach((verticalSlide) => {
          verticalSlideDOM += this.getEachSection(verticalSlide);
        });

        section += `
          <section>
            ${verticalSlideDOM}
          </section>
        `;
      } else {
        section += this.getEachSection(slide);
      }

      domElement += section;
    });

    this.slidesContainer.innerHTML = domElement;
  }

  convertMarkdown() {
    const markdownSections = this.element.querySelectorAll('.markdown');
    markdownSections.forEach((section) => {
      const text = section.innerHTML;
      section.innerHTML = parseMarkdown(text);
    });
  }

  init() {
    if (this.config.data) {
      this.insertDataToDOM();
    }

    if (this.config.zoomedOutView) {
      this.zoomOut();
    }

    this.convertMarkdown();

    this.getSlideDomElements();
    this.setDimensions();
    this.setKeyboardEvents();
    this.setSwipeEvents();
    this.setConfigurationOptions();
  }
}

function parseMarkdown(text) {
  const trimmedText = text
    .split('\n')
    .map((str) => str.trim())
    .join('\n');

  const html = trimmedText
    .replace(/^###(.*$)/gim, '<h3>$1</h3>')
    .replace(/^##(.*$)/gim, '<h2>$1</h2>')
    .replace(/^#(.*$)/gim, '<h1>$1</h1>')
    .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
    .replace(/\*(.*)\*/gim, '<i>$1</i>')
    .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
    .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2' target='_blank'>$1</a>")
    .replace(/\s\n$/gim, '<br />');

  return html;
}
