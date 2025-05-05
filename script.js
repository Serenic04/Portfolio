// Animation du menu de navigation
document.addEventListener('DOMContentLoaded', function() {
    // Animation du menu
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            link.style.transform = 'scale(1.1)';
            link.style.transition = 'transform 0.3s ease';
        });
        link.addEventListener('mouseout', () => {
            link.style.transform = 'scale(1)';
        });
    });

    // Animation des sections au scroll
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });

    // Animation des projets
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        project.addEventListener('mouseover', () => {
            project.style.transform = 'scale(1.05)';
            project.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
            project.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        project.addEventListener('mouseout', () => {
            project.style.transform = 'scale(1)';
            project.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });

    // Animation du header au scroll
    let lastScroll = 0;
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            header.style.boxShadow = 'none';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
        lastScroll = currentScroll;
    });
});

// Animation d'apparition au scroll
function handleFadeIn() {
    const fadeEls = document.querySelectorAll('.fade-in');
    fadeEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
            el.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', handleFadeIn);
window.addEventListener('DOMContentLoaded', () => {
    // Ajout de la classe fade-in sur les sections, cartes et projets
    document.querySelectorAll('.section:not(#skills):not(#tools), .project, .skill-card').forEach(el => {
        el.classList.add('fade-in');
    });
    handleFadeIn();
});

// Bouton retour en haut
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Loader d'attente
window.addEventListener('load', () => {
    const loader = document.getElementById('loader-bg');
    if(loader) loader.classList.add('hide');
}); 