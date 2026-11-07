// =====================================================
// THEME TOGGLE (dark / light mode)
// =====================================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Apply saved theme on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

// Toggle theme on click
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');

    const isLight = body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeToggle.innerHTML = isLight
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
});

// =====================================================
// MOBILE NAVIGATION
// =====================================================
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");

    const isOpen = navLinks.classList.contains("show");

    menuBtn.setAttribute("aria-expanded", isOpen);
    menuBtn.innerHTML = isOpen
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

// Close menu after clicking a navigation link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// =====================================================
// ACTIVE NAVIGATION LINK
// =====================================================
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a:not([href='#'])");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// =====================================================
// AUTOMATIC COPYRIGHT YEAR
// =====================================================
document.getElementById("year").textContent = new Date().getFullYear();

// =====================================================
// SIMPLE TYPING EFFECT
// =====================================================
const typingText = document.querySelector(".typing-text");

const words = [
    "BSIT Student",
    "Web Developer",
    "Future IT Professional"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (deleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingText.textContent = currentWord.substring(0, charIndex);

    let speed = deleting ? 60 : 100;

    if (!deleting && charIndex === currentWord.length) {
        deleting = true;
        speed = 1500;
    } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();