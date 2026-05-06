let i_am_arr = [
  "AI Engineer",
  "Data Analyst",
  "Full Stack Developer",
  "Machine Learning Engineer",
  "Web & Mobile App Developer",
  "DevOps Enthusiast"
];

let len = i_am_arr.length;
let count = 0;
let count_t = 0;
let isDeleting = false;

const i_am_text = document.querySelector("#home_i_am");

function typeEffect() {
  let currentText = i_am_arr[count % len];

  if (!isDeleting) {
    i_am_text.innerHTML = currentText.slice(0, count_t + 1);
    count_t++;

    if (count_t === currentText.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    i_am_text.innerHTML = currentText.slice(0, count_t - 1);
    count_t--;

    if (count_t === 0) {
      isDeleting = false;
      count++;
    }
  }

  setTimeout(typeEffect, isDeleting ? 60 : 120);
}

typeEffect();


// ---------------------------
// Smooth Scrolling
// ---------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});


// ---------------------------
// Mobile Menu Toggle
// ---------------------------
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuButton && mobileMenu) {

  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  const mobileMenuLinks = mobileMenu.querySelectorAll('a');

  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}


// ---------------------------
// Dark Mode Toggle
// ---------------------------
const darkModeToggle = document.getElementById('darkModeToggle');

if (darkModeToggle) {

  darkModeToggle.addEventListener('click', () => {

    document.documentElement.classList.toggle('dark');

    if (document.documentElement.classList.contains('dark')) {
      localStorage.theme = 'dark';
    } else {
      localStorage.theme = 'light';
    }
  });
}


// ---------------------------
// Scroll Progress Bar
// ---------------------------
const progressBar = document.getElementById('progressBar');

window.addEventListener('scroll', () => {

  if (!progressBar) return;

  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const scrollPercent = (scrollTop / scrollHeight) * 100;

  progressBar.style.width = `${scrollPercent}%`;
});


// ---------------------------
// Reveal Animations
// ---------------------------
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {

  const triggerBottom = window.innerHeight * 0.85;

  revealElements.forEach(el => {

    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < triggerBottom) {
      el.classList.add('active');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);


// ---------------------------
// Image Modal (Lightbox)
// ---------------------------
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');

function openModal(imageSrc, imageAlt) {

  modalImage.src = imageSrc;
  modalImage.alt = imageAlt;

  imageModal.classList.remove('hidden');

  document.body.style.overflow = 'hidden';
}

function closeAndResetModal() {

  imageModal.classList.add('hidden');

  document.body.style.overflow = '';

  modalImage.src = '';
  modalImage.alt = '';
}

if (closeModal) {

  closeModal.addEventListener('click', closeAndResetModal);
}

if (imageModal) {

  imageModal.addEventListener('click', (e) => {

    if (e.target === imageModal || e.target === modalImage) {
      closeAndResetModal();
    }
  });
}

document.addEventListener('keydown', (e) => {

  if (
    e.key === 'Escape' &&
    imageModal &&
    !imageModal.classList.contains('hidden')
  ) {
    closeAndResetModal();
  }
});


// ---------------------------
// Image Slider
// ---------------------------
const slidesContainer = document.getElementById('slidesContainer');

if (slidesContainer) {

  const slides = slidesContainer.children;

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('dotsContainer');

  let currentIndex = 0;
  const totalSlides = slides.length;

  function showSlide(index) {

    if (index < 0) {
      currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    const offset = -currentIndex * 100;

    slidesContainer.style.transform = `translateX(${offset}%)`;

    if (dotsContainer) {

      Array.from(dotsContainer.children).forEach((dot, i) => {

        if (i === currentIndex) {
          dot.classList.add('bg-white');
          dot.classList.remove('bg-gray-400');
        } else {
          dot.classList.remove('bg-white');
          dot.classList.add('bg-gray-400');
        }
      });
    }
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
  }

  function createDots() {

    if (!dotsContainer) return;

    for (let i = 0; i < totalSlides; i++) {

      const dot = document.createElement('span');

      dot.classList.add(
        'w-3',
        'h-3',
        'rounded-full',
        'bg-gray-400',
        'cursor-pointer',
        'transition-colors',
        'duration-300'
      );

      dot.addEventListener('click', () => showSlide(i));

      dotsContainer.appendChild(dot);
    }

    showSlide(0);
  }

  Array.from(slides).forEach(slideDiv => {

    const img = slideDiv.querySelector('img');

    if (img) {

      img.addEventListener('click', () => {
        openModal(img.src, img.alt);
      });
    }
  });

  document.addEventListener('DOMContentLoaded', createDots);


  // Auto Slide
  setInterval(nextSlide, 5000);
}


// ---------------------------
// Back To Top Button
// ---------------------------
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {

  if (!backToTop) return;

  if (window.scrollY > 400) {
    backToTop.classList.remove('hidden');
  } else {
    backToTop.classList.add('hidden');
  }
});

if (backToTop) {

  backToTop.addEventListener('click', () => {

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}