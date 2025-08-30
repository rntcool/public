// Smooth active nav highlight
    const links = document.querySelectorAll('.navlink');
    const sections = [...links].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const setActive = () => {
      const y = window.scrollY + 120;
      let current = sections[0];
      for(const s of sections){ if(s.offsetTop <= y) current = s; }
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current.id));
    };
    document.addEventListener('scroll', setActive); setActive();

    // Reveal on scroll
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in-view'); io.unobserve(e.target);} })
    }, {threshold:.12});
    document.querySelectorAll('.reveal').forEach(el=> io.observe(el));

    // ROI Calculator
    const fmt = (n)=> n.toLocaleString('ru-RU', {style:'currency', currency:'KZT', maximumFractionDigits:0});
    const hours = document.getElementById('hours');
    const people = document.getElementById('people');
    const rate = document.getElementById('rate');
    const days = document.getElementById('days');
    const out = document.getElementById('savings');
    const calc = () => {
      const h = Math.max(0, parseFloat(hours.value||0));
      const p = Math.max(1, parseInt(people.value||1));
      const r = Math.max(0, parseFloat(rate.value||0));
      const d = Math.max(1, parseInt(days.value||22));
      const val = h * p * r * d;
      out.textContent = fmt(isFinite(val)? val : 0);
    };
    [hours, people, rate, days].forEach(i => i.addEventListener('input', calc));
    calc();

    // Phone input mini‑mask for +7
    const phone = document.getElementById('phone');
    phone.addEventListener('input', (e)=>{
      let v = e.target.value.replace(/\D/g, '');
      if(!v.startsWith('7')) v = '7' + v;
      v = v.slice(0, 11);
      const p1 = v.slice(1,4); const p2 = v.slice(4,7); const p3 = v.slice(7,9); const p4 = v.slice(9,11);
      e.target.value = `+7 ${p1? '('+p1+') ':''}${p2}${p3? '-'+p3:''}${p4? '-'+p4:''}`.trim();
    });

    // Lead form (Telegram integration)
    const form = document.getElementById('leadForm');
    const msg = document.getElementById('leadMsg');
    form.addEventListener('submit', async (e)=>{ // Added 'async' here
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());

      if(!data.name || !data.phone){
        msg.style.display='block';
        msg.textContent='Заполните имя и телефон';
        return;
      }

      const token = '6946537315:AAH22nLd65eT9y_41e8aB5yqUe4yY_gHk3w'; // NOTE: For a production environment, store this securely (e.g., server-side, environment variables)
      const chatId = '-4252956923'; // NOTE: For a production environment, store this securely
      const url = `https://api.telegram.org/bot${token}/sendMessage`;

      const messageText = `
Новая заявка с сайта:
Имя: ${data.name || 'Не указано'}
Телефон: ${data.phone || 'Не указан'}
Email: ${data.email || 'Не указан'}
Бизнес-ниша: ${data.niche || 'Не указана'}
Удобное время звонка: ${data.time || 'Не указано'}
Что бесит больше всего: ${data.pain || 'Не указано'}
Хочу демо на моём примере: ${document.getElementById('wantDemo').checked ? 'Да' : 'Нет'}
`;

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: messageText
          })
        });

        const result = await response.json();

        if (result.ok) {
          msg.style.display='block';
          msg.textContent = 'Спасибо! Мы свяжемся с вами в ближайшее время.';
          form.reset();
        } else {
          msg.style.display='block';
          msg.textContent = 'Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.';
          console.error('Telegram API error:', result);
        }
      } catch (error) {
        msg.style.display='block';
        msg.textContent = 'Произошла ошибка сети. Пожалуйста, попробуйте еще раз.';
        console.error('Error sending to Telegram:', error);
      }
    });

    // Back to top
    const toTop = document.getElementById('toTop');
    const toggleTop = () => { toTop.classList.toggle('show', window.scrollY > 800); };
    document.addEventListener('scroll', toggleTop); toggleTop();

    // Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // FAQ Accordion
    document.querySelectorAll('#faq details').forEach((detail) => {
      const summary = detail.querySelector('summary');
      const content = detail.querySelector('div');

      summary.addEventListener('click', (event) => {
        event.preventDefault();

        if (detail.open) {
          const closingAnimation = content.animate(
            { height: [content.offsetHeight + 'px', '0px'] },
            { duration: 200, easing: 'ease-out' }
          );
          closingAnimation.onfinish = () => {
            detail.removeAttribute('open');
          };
        } else {
          detail.setAttribute('open', 'true');
          const openingAnimation = content.animate(
            { height: ['0px', content.offsetHeight + 'px'] },
            { duration: 200, easing: 'ease-in' }
          );
        }
      });
    });

// Mobile Menu
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('menu-toggle');
  const nav = document.querySelector('header nav');

  if (!toggleButton || !nav) return;

  toggleButton.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('mobile-nav-open');
    toggleButton.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is clicked
  nav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      document.body.classList.remove('mobile-nav-open');
      toggleButton.setAttribute('aria-expanded', 'false');
    }
  });
});
