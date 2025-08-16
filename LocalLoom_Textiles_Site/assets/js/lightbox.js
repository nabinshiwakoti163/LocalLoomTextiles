
// Lightweight Lightbox for Gallery
(function(){
  const links = Array.from(document.querySelectorAll('[data-lightbox]'));
  if(!links.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.innerHTML = `
    <button class="close" aria-label="Close">✕</button>
    <button class="prev" aria-label="Previous image">◀</button>
    <img alt="Expanded gallery image">
    <button class="next" aria-label="Next image">▶</button>
  `;
  document.body.appendChild(overlay);
  const img = overlay.querySelector('img');
  const btnClose = overlay.querySelector('.close');
  const btnPrev = overlay.querySelector('.prev');
  const btnNext = overlay.querySelector('.next');

  let index = 0;

  function open(i){
    index = i;
    const href = links[index].getAttribute('href');
    const alt = links[index].querySelector('img')?.alt || 'Gallery image';
    img.src = href;
    img.alt = alt;
    overlay.classList.add('open');
    btnClose.focus();
  }
  function close(){ overlay.classList.remove('open'); }
  function prev(){ open((index - 1 + links.length) % links.length); }
  function next(){ open((index + 1) % links.length); }

  links.forEach((a, i) => {
    a.addEventListener('click', (e) => { e.preventDefault(); open(i); });
  });
  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);
  overlay.addEventListener('click', (e) => { if(e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => {
    if(!overlay.classList.contains('open')) return;
    if(e.key === 'Escape') close();
    if(e.key === 'ArrowLeft') prev();
    if(e.key === 'ArrowRight') next();
  });
})();
