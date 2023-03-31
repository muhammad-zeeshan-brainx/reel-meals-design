function showMore() {
  var moreText = document.getElementById('more');
  var showMore = document.querySelector('.show-more');
  console.log('clicked');
  console.log(moreText.style.display);
  console.log(showMore);
  console.log(moreText?.style?.display === 'none');
  if (moreText?.style?.display === 'none') {
    console.log('true');
    moreText.style.display = 'inline';
    showMore.innerHTML = 'Show Less';
  } else if (moreText?.style?.display === 'inline') {
    moreText.style.display = 'none';
    showMore.innerHTML = 'Show More';
  } else {
    moreText.style.display = 'inline';
    showMore.innerHTML = 'Show Less';
  }
}

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach((dot) => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    clearInterval(myTimer);
    myTimer = setInterval(autoNext, 3000);
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

let container = document.querySelector('.slider');
registerSwipeEvents(container);
container.addEventListener('swipe', (e) => {
  if (e.detail.name === 'swipeLeft') {
    console.log('left');
    const btnRight = document.querySelector('.slider__btn--right');
    btnRight.click();
  }
  if (e.detail.name === 'swipeRight') {
    console.log('right');
    const btnRight = document.querySelector('.slider__btn--left');
    btnRight.click();
  }
});

function autoNext() {
  console.log('autonext called');
  const btnRight = document.querySelector('.slider__btn--right');
  btnRight.click();
}

let myTimer = setInterval(autoNext, 3000);
// myTimer();

function registerSwipeEvents(container) {
  container.addEventListener('touchstart', handleTouchStart, false);
  container.addEventListener('touchmove', handleTouchMove, false);

  var xDown = null;
  var yDown = null;
  function getTouches(evt) {
    return (
      evt.touches || // browser API
      evt.originalEvent.touches
    ); // jQuery
  }
  function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }

  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        /* left swipe */
        const swipeLeft = new CustomEvent('swipe', {
          detail: {
            name: 'swipeLeft',
          },
        });

        container.dispatchEvent(swipeLeft);
      } else {
        /* right swipe */
        const swipeRight = new CustomEvent('swipe', {
          detail: {
            name: 'swipeRight',
          },
        });

        container.dispatchEvent(swipeRight);
      }
    } else {
      if (yDiff > 0) {
        /* up swipe */
        const swipeUp = new CustomEvent('swipe', {
          detail: {
            name: 'swipeUp',
          },
        });

        container.dispatchEvent(swipeUp);
      } else {
        /* down swipe */
        const swipeDown = new CustomEvent('swipe', {
          detail: {
            name: 'swipeDown',
          },
        });

        container.dispatchEvent(swipeDown);
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  }
}
