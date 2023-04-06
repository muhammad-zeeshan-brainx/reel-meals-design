let currentVideo;
let currentSlide;
let currentVideoDuration;
const playPauseHandler = () => {
  console.log('play pause handler executed');
  console.log(currentVideo, currentSlide);
  playPause(currentVideo, currentSlide);
};

// videoSlide.addEventListener('click', playPauseHandler);

const playPause = (video, slideNumber) => {
  console.log('inside playpause');
  // console.log('duration', video.duration);
  const currentDot = document.querySelector(
    `.dots__dot[data-slide="${slideNumber}"] .in`
  );
  // console.log(currentDot);
  if (video.paused || video.ended) {
    console.log('if');
    currentDot.style.animationPlayState = 'running';
    // video.muted = false;
    video.play();
  } else {
    console.log('else');
    currentDot.style.animationPlayState = 'paused';
    // video.muted = false;
    video.pause();
  }
};

const playVideo = (video, slideNumber) => {
  console.log('inside play video');
  console.log('duration', video.duration);
  const currentDot = document.querySelector(
    `.dots__dot[data-slide="${slideNumber}"] .in`
  );
  currentDot.style.animation = `fill ${
    currentVideoDuration || video.duration
  }s linear 1`;
  video.play();
};

const stopVideo = (video, slideNumber) => {
  console.log('inside stop video');
  console.log('video is', video);
  video.pause();
  video.currentTime = 0;
};

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
        `<button class="dots__dot" data-slide="${i}"><div class='in'></div></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach((dot) => {
      dot.classList.remove('dots__dot--active');
    });

    let el = document.querySelector(`.dots__dot[data-slide="${slide}"]`);
    el.classList.add('dots__dot--active');
    let progressBar = el.querySelector('.in');
    const progressBarClone = progressBar.cloneNode(true);
    progressBar.remove();
    console.log('clone is', progressBarClone);

    el.appendChild(progressBarClone);
  };

  const goToSlide = function (slide) {
    console.log('inside goto slide');
    console.log('go to slide number = ', slide);
    const videoSlide = document.querySelector(
      `.slide[data-slideNumber="${slide}"] video`
    );

    videoSlide.addEventListener('pause', () => {
      playPause(videoSlide, slide);
    });
    videoSlide.addEventListener('timeupdate', () => {
      console.log('======time update====');
      if (!currentVideoDuration) {
        currentVideoDuration = videoSlide.duration;
      }
    });

    currentSlide = slide;
    currentVideo = videoSlide;
    videoSlide.controls = false;
    playVideo(videoSlide, slide);
    console.log('videoSlide', videoSlide);
    if (slide > 0) {
      const previousSlide = document.querySelector(
        `.slide[data-slideNumber="${slide - 1}"] video`
      );
      stopVideo(previousSlide, slide - 1);
    }
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
      s.addEventListener('click', playPauseHandler);
    });
  };

  // Next slide
  const nextSlide = function () {
    // clearInterval(myTimer);
    // myTimer = setInterval(autoNext, 3000);
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
    createDots();
    goToSlide(0);

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

function playNextVideo() {
  console.log('play the next one');
  const btnRight = document.querySelector('.slider__btn--right');
  btnRight.click();
}

const progressLoop = () => {
  const progress = document.getElementById('progress');
  const video = document.querySelector('.slide-0 video');
  setInterval(function () {
    progress.value = Math.round((video.currentTime / video.duration) * 100);
  });
};
