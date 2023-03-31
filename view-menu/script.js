const button = document.querySelector(
  '.recommended-controls .recommended-next-btn'
);

button.onclick = () => {
  const nextBtn = document.querySelector('.recommended-slider');
  nextBtn.scroll({
    left: nextBtn.scrollLeft + 200,
    behavior: 'smooth',
  });
};
