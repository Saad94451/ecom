(function () {
  const track = document.querySelector('.testi-track');
  if (!track) return;

  const cards = Array.from(track.children);
  const prev = document.getElementById('testiPrev');
  const next = document.getElementById('testiNext');
  const dotsWrap = document.getElementById('testiDots');
  let index = 0;

  function perView() {
    const w = window.innerWidth;
    if (w <= 760) return 1;
    if (w <= 980) return 2;
    return 3;
  }

  function maxIndex() {
    return Math.max(0, cards.length - perView());
  }

  function step() {
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    return cards[0].getBoundingClientRect().width + gap;
  }

  function update() {
    const max = maxIndex();
    if (index > max) index = max;
    track.style.transform = 'translateX(' + (-index * step()) + 'px)';

    dotsWrap.innerHTML = '';
    for (let i = 0; i <= max; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'testi-dot' + (i === index ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
      dot.addEventListener('click', function () {
        index = i;
        update();
      });
      dotsWrap.appendChild(dot);
    }

    prev.disabled = index === 0;
    next.disabled = index === max;
  }

  prev.addEventListener('click', function () {
    if (index > 0) { index--; update(); }
  });
  next.addEventListener('click', function () {
    if (index < maxIndex()) { index++; update(); }
  });

  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(update, 120);
  });

  update();
})();
