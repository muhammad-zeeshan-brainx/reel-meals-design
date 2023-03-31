const button = document.querySelector('.most-popular-scroll-btn');

button.onclick = () => {
  const nextBtn = document.querySelector('.media-scroller');
  nextBtn.scroll({
    left: nextBtn.scrollLeft + 200,
    behavior: 'smooth',
  });
};
