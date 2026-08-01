/**
 * BlackOps Arena — Premium Homepage Scripts
 * Original vanilla JS — particles, counters, timers, tilt, reveal
 */

(() => {
  'use strict';

  // ========== PARTICLE SYSTEM ==========
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.reset(true);
      }
      reset(init = false) {
        this.x = Math.random() * w;
        this.y = init ? Math.random() * h : h + 10;
        this.size = Math.random() * 1.8 + 0.4;
        this.speedY = Math.random() * 0.4 + 0.1;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.7
          ? `rgba(212, 175, 55, ${this.opacity})`
          : `rgba(0, 200, 255, ${this.opacity})`;
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        if (this.y < -10 || this.x < -10 || this.x > w + 10) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const initParticles = () => {
      const count = Math.min(Math.floor((w * h) / 18000), 80);
      particles = Array.from({ length: count }, () => new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 200, 255, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    };

    resize();
    initParticles();
    animate();

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        initParticles();
      }, 150);
    });
  }

  // ========== HEADER SCROLL ==========
  const header = document.getElementById('header');
  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ========== MOBILE NAV ==========
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('open', !open);
      document.body.style.overflow = open ? '' : 'hidden';
    });

    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ========== ACTIVE NAV LINK ==========
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const updateActiveNav = () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
        });
      }
    });
  };
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ========== COUNTER ANIMATION ==========
  const animateCounter = (el, target, duration = 2000) => {
    const start = 0;
    const startTime = performance.now();
    const isLarge = target > 1000;

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * eased);
      el.textContent = isLarge ? current.toLocaleString('en-IN') : current;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = isLarge ? target.toLocaleString('en-IN') : target;
    };
    requestAnimationFrame(step);
  };

  // ========== COUNTDOWN TIMERS ==========
  const initCountdowns = () => {
    document.querySelectorAll('.countdown').forEach(el => {
      let remaining = parseInt(el.dataset.time, 10) || 3600;

      const update = () => {
        if (remaining <= 0) {
          el.querySelectorAll('.time-val').forEach(v => (v.textContent = '00'));
          return;
        }
        const h = Math.floor(remaining / 3600);
        const m = Math.floor((remaining % 3600) / 60);
        const s = remaining % 60;
        el.querySelector('[data-unit="h"]').textContent = String(h).padStart(2, '0');
        el.querySelector('[data-unit="m"]').textContent = String(m).padStart(2, '0');
        el.querySelector('[data-unit="s"]').textContent = String(s).padStart(2, '0');
        remaining--;
      };
      update();
      setInterval(update, 1000);
    });
  };

  // ========== SCROLL REVEAL ==========
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Stats counter
  const statsEl = document.querySelector('.hero-stats');
  if (statsEl) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          statsEl.querySelectorAll('.stat-value').forEach(el => {
            if (!el.dataset.counted) {
              el.dataset.counted = '1';
              animateCounter(el, parseInt(el.dataset.target, 10));
            }
          });
          statsObserver.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    statsObserver.observe(statsEl);
  }

  // ========== CARD TILT ==========
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      const rotX = ((y - midY) / midY) * -6;
      const rotY = ((x - midX) / midX) * 6;

      if (card.classList.contains('game-card')) {
        const inner = card.querySelector('.game-card-inner');
        if (inner) {
          inner.style.transform = `perspective(1000px) rotateX(\( {rotX}deg) rotateY( \){rotY}deg) scale3d(1.02,1.02,1.02)`;
        }
      } else {
        card.style.transform = `perspective(1000px) rotateX(\( {rotX}deg) rotateY( \){rotY}deg) scale3d(1.02,1.02,1.02)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      if (card.classList.contains('game-card')) {
        const inner = card.querySelector('.game-card-inner');
        if (inner) inner.style.transform = '';
      } else {
        card.style.transform = '';
      }
    });
  });

  // ========== RIPPLE BUTTONS ==========
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ========== LEADERBOARD DATA ==========
  const players = [
    { rank: 1, name: 'ShadowStrike', wins: 248, earnings: '₹1,85,400', seed: 'shadow' },
    { rank: 2, name: 'NeonViper', wins: 231, earnings: '₹1,62,200', seed: 'neon' },
    { rank: 3, name: 'PhantomAce', wins: 219, earnings: '₹1,48,900', seed: 'phantom' },
    { rank: 4, name: 'BlazeHunter', wins: 197, earnings: '₹1,21,500', seed: 'blaze' },
    { rank: 5, name: 'CyberWolf', wins: 184, earnings: '₹98,700', seed: 'cyber' },
  ];

  const lbBody = document.getElementById('leaderboardBody');
  if (lbBody) {
    lbBody.innerHTML = players.map(p => `
      <div class="lb-row">
        <span class="lb-rank rank-\( {p.rank}"># \){p.rank}</span>
        <div class="lb-player">
          <img class="lb-avatar" src="https://api.dicebear.com/7.x/avataaars/svg?seed=\( {p.seed}" alt=" \){p.name}" width="36" height="36" loading="lazy">
          <span class="lb-name">${p.name}</span>
        </div>
        <span class="lb-wins">${p.wins}</span>
        <span class="lb-earnings">${p.earnings}</span>
      </div>
    `).join('');
  }

  // ========== AUTH TOGGLE (DEMO) ==========
  const loginBtn = document.getElementById('loginBtn');
  const registerBtn = document.getElementById('registerBtn');
  const authButtons = document.getElementById('authButtons');
  const userMenu = document.getElementById('userMenu');

  const simulateLogin = () => {
    authButtons?.classList.add('hidden');
    userMenu?.classList.remove('hidden');
  };

  loginBtn?.addEventListener('click', simulateLogin);
  registerBtn?.addEventListener('click', simulateLogin);

  // ========== INIT ==========
  initCountdowns();

  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  });
})();
