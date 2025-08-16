
// LocalLoom Textiles — Main JS (No frameworks)

// Mark active nav link based on current page
(function(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(a => {
    const href = a.getAttribute('href');
    if ((path === '' && href.endsWith('index.html')) || href.endsWith(path)) {
      a.setAttribute('aria-current', 'page');
    }
  });
})();

// Product filters
(function(){
  const container = document.querySelector('[data-products]');
  const buttons = document.querySelectorAll('[data-filter]');
  if(!container || !buttons.length) return;
  const cards = Array.from(container.querySelectorAll('[data-category]'));

  function applyFilter(category){
    cards.forEach(c => {
      const match = category === 'all' || c.dataset.category === category;
      c.style.display = match ? '' : 'none';
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      applyFilter(btn.dataset.filter);
    });
  });
})();

// Contact form validation (progressive enhancement)
(function(){
  const form = document.querySelector('#contactForm');
  if(!form) return;
  const fields = form.querySelectorAll('[data-validate]');

  form.addEventListener('submit', (e) => {
    let ok = true;
    fields.forEach(f => {
      const error = f.parentElement.querySelector('.error-msg');
      if(error) error.textContent = '';
      if(!f.checkValidity()){
        ok = false;
        if(error){
          if(f.validity.valueMissing) error.textContent = 'This field is required.';
          else if(f.validity.typeMismatch) error.textContent = 'Please enter a valid value.';
          else if(f.validity.tooShort) error.textContent = `Please use at least ${f.minLength} characters.`;
        }
      }
    });
    if(!ok){
      e.preventDefault();
      const firstInvalid = form.querySelector(':invalid');
      if(firstInvalid) firstInvalid.focus();
    } else {
      // For static prototype: show a friendly confirmation message
      e.preventDefault();
      const msg = document.querySelector('#formSuccess');
      if(msg){
        msg.classList.remove('hidden');
        form.reset();
      }
    }
  });
})();

// Smooth scroll for internal anchor links (progressive enhancement)
(function(){
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el){
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
