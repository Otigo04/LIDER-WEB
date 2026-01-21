document.addEventListener('DOMContentLoaded', () => {
    // Öffnungszeiten: Aktuellen Tag hervorheben
    const day = new Date().getDay(); // 0 = Sonntag, 1 = Montag, ..., 6 = Samstag
    let activeRowId = '';

    if (day >= 1 && day <= 5) {
        activeRowId = 'hours-weekday'; // Mo - Fr
    } else if (day === 6) {
        activeRowId = 'hours-saturday'; // Samstag
    } else if (day === 0) {
        activeRowId = 'hours-sunday'; // Sonntag
    }

    if (activeRowId) {
        const activeRow = document.getElementById(activeRowId);
        if (activeRow) {
            activeRow.classList.add('today-highlight');
            // Optional: Kleinen Text "(Heute)" an die Uhrzeit anhängen
            const timeCell = activeRow.cells[1];
            if (timeCell) timeCell.innerHTML += ' <span style="font-size:0.8em;">(Heute)</span>';
        }
    }

    // Hamburger Menü Logik
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');
        });
    }

    // Menü schließen, wenn ein Link geklickt wird
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            hamburger.classList.remove('toggle');
        });
    });

    // Announcement Bar schließen
    const announcementBar = document.querySelector('.announcement-bar');
    const closeButton = document.querySelector('.close-announcement');
    const heroSection = document.querySelector('.hero');

    if (announcementBar && closeButton) {
        closeButton.addEventListener('click', () => {
            announcementBar.classList.add('closed');
            // Margin der Hero-Section anpassen, da der Header nun kleiner ist (nur noch 80px Nav)
            if (heroSection) heroSection.style.marginTop = '80px';
        });
    }

    // Smooth Scrolling für Anker-Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Offset für den fixierten Header berechnen
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Lightbox Funktionalität
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const newsImages = document.querySelectorAll('.news-image');

    // Klick auf ein Bild -> Lightbox öffnen
    newsImages.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = "block";
            lightboxImg.src = img.src; // Bildquelle übernehmen
            lightboxImg.alt = img.alt;
            if (lightboxCaption) lightboxCaption.textContent = img.alt; // Bildunterschrift setzen
        });
    });

    // Schließen beim Klick auf das X oder außerhalb des Bildes
    if (lightbox) {
        closeBtn.addEventListener('click', () => lightbox.style.display = "none");
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = "none";
            }
        });
    }

    // Back to Top Button Logik
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
