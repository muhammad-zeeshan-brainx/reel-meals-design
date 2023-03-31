const button = document.querySelector('.recommended-controls .next-btn');

button.onclick = () => {
  const nextBtn = document.querySelector('.recommended-slider');
  nextBtn.scroll({
    left: nextBtn.scrollLeft + 200,
    behavior: 'smooth',
  });
};
