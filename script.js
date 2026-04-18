// ========================
// LOADER
// ========================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader-bg');
    if (loader) loader.classList.add('hide');
});

// ========================
// CANVAS — PARTICLES
// ========================
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = document.getElementById('hero').offsetHeight || window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas, { passive: true });

const PARTICLE_COUNT = 70;
const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
    x:  Math.random() * canvas.width,
    y:  Math.random() * canvas.height,
    r:  Math.random() * 1.4 + 0.3,
    vx: (Math.random() - 0.5) * 0.28,
    vy: (Math.random() - 0.5) * 0.28,
    a:  Math.random() * 0.45 + 0.08,
}));

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${p.a})`;
        ctx.fill();
    });

    // connections
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx   = particles[i].x - particles[j].x;
            const dy   = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 110) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(0,229,255,${0.07 * (1 - dist / 110)})`;
                ctx.lineWidth   = 0.5;
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(drawParticles);
}
drawParticles();

// ========================
// HEADER SCROLL
// ========================
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ========================
// HAMBURGER MENU
// ========================
const hamburger = document.getElementById('hamburger');
const mainNav   = document.getElementById('main-nav');

hamburger.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
});

mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// ========================
// ACTIVE NAV ON SCROLL
// ========================
const sections = document.querySelectorAll('section[id]');

function updateNav() {
    const scrollY = window.scrollY + 80;
    sections.forEach(s => {
        const id   = s.getAttribute('id');
        const link = document.querySelector(`#main-nav a[href="#${id}"]`);
        if (!link) return;
        link.classList.toggle(
            'active',
            scrollY >= s.offsetTop && scrollY < s.offsetTop + s.offsetHeight
        );
    });
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ========================
// BACK TO TOP
// ========================
const btt = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    btt.classList.toggle('visible', window.scrollY > 300);
}, { passive: true });
btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ========================
// FADE IN OBSERVER
// ========================
const fadeObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            fadeObs.unobserve(e.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
    '.stat-card, .bento-item, .skill-category, .veille-card, .contact-item, .formation-card, .veille-sources-bar'
).forEach(el => {
    el.classList.add('fade-in');
    fadeObs.observe(el);
});

// ========================
// TYPING ANIMATION
// ========================
const typedEl = document.getElementById('typed');
const phrases = [
    'Data Science & Machine Learning',
    'Analyse & Modélisation de données',
    'Développement Python & IA',
    'Future Data Scientist',
];

let pIdx = 0, cIdx = 0, deleting = false, speed = 70;

function type() {
    const phrase = phrases[pIdx];
    typedEl.textContent = deleting
        ? phrase.slice(0, cIdx - 1)
        : phrase.slice(0, cIdx + 1);

    deleting ? cIdx-- : cIdx++;

    if (!deleting && cIdx === phrase.length) {
        deleting = true;
        speed = 2200;
    } else if (deleting && cIdx === 0) {
        deleting = false;
        pIdx = (pIdx + 1) % phrases.length;
        speed = 320;
    } else {
        speed = deleting ? 35 : 65;
    }

    setTimeout(type, speed);
}
setTimeout(type, 1000);

// ========================
// COUNTER ANIMATION
// ========================
const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const numEl  = entry.target.querySelector('.stat-num');
        if (!numEl) return;
        const target = parseInt(numEl.getAttribute('data-count'), 10);
        let current  = 0;
        const step   = Math.max(1, Math.ceil(target / 40));

        const tick = setInterval(() => {
            current = Math.min(current + step, target);
            numEl.textContent = current;
            if (current >= target) clearInterval(tick);
        }, 40);

        counterObs.unobserve(entry.target);
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => counterObs.observe(card));
