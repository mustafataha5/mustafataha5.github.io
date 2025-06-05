let i_am_arr = ["Full Stack Developer.", "Flutter Developer.", "Web And Mobile App Developer.", "DevOps"];
let len = i_am_arr.length;
let count = 0;
let count_t = 0;
let isDeleting = false;
let speed = 500; // This 'speed' variable is currently unused in your typeEffect function, consider if you want to integrate it.
const i_am_text = document.querySelector("#home_i_am");

function typeEffect() {
    let currentText = i_am_arr[count % len];
    if (!isDeleting) {
        i_am_text.innerHTML = currentText.slice(0, count_t + 1);
        count_t++;
        if (count_t === currentText.length) {
            isDeleting = true;
            // You can reintroduce speed = 500 here if you want a pause before deleting
        }
    } else {
        i_am_text.innerHTML = currentText.slice(0, count_t - 1);
        count_t--;
        if (count_t === 0) {
            isDeleting = false;
            count++;
            // You can reintroduce speed = 400 here if you want to speed up typing after deletion
        }
    }
    // The current speed is fixed at 120ms. If you want dynamic speed,
    // you'll need to use the 'speed' variable here.
    setTimeout(typeEffect, 120);
}

// Start the typing effect when the script loads
typeEffect();

// --- Smooth scrolling ---
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

// --- Mobile Menu Toggle ---
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuButton && mobileMenu) { // Check if elements exist before adding listeners
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when a link is clicked
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}


// --- Dark Mode Toggle ---
const darkModeToggle = document.getElementById('darkModeToggle');

 // Check if the dark mode toggle button exists
darkModeToggle.addEventListener('click', () => {
        console.log("click dark")
        document.documentElement.classList.toggle('dark');

        // Save user's preference
        if (document.documentElement.classList.contains('dark')) {
            localStorage.theme = 'dark';
        } else {
            localStorage.theme = 'light';
        }
    });


// --- Initialize theme based on localStorage or system preference ---
// This part was in your HTML <head> previously, but placing it here
// after the DOM content loads ensures all elements are ready.
// However, for immediate visual feedback on page load, keeping it in the <head>
// as you had it is often better to prevent a "flash of unstyled content."
// I'll leave it out of this script.js for now, assuming it's in the <head>.
// If you want to move it all here, remove it from the <head> completely.
/*
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
} else {
    document.documentElement.classList.remove('dark')
}
*/

 // --- Image Modal (Lightbox) Logic ---
  const imageModal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const closeModal = document.getElementById('closeModal');

  function openModal(imageSrc, imageAlt) {
    modalImage.src = imageSrc;
    modalImage.alt = imageAlt;
    imageModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  }

  function closeAndResetModal() {
    imageModal.classList.add('hidden');
    document.body.style.overflow = ''; // Restore scrolling
    modalImage.src = ''; // Clear image src to save memory
    modalImage.alt = '';
  }

  closeModal.addEventListener('click', closeAndResetModal);

  imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal || e.target === modalImage) {
      closeAndResetModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !imageModal.classList.contains('hidden')) {
      closeAndResetModal();
    }
  });


  // --- Image Slider Logic ---
  const slidesContainer = document.getElementById('slidesContainer');
  const slides = slidesContainer.children; // Get all the direct children (image wrappers)
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('dotsContainer'); // For pagination dots

  let currentIndex = 0;
  const totalSlides = slides.length;

  // Function to show a specific slide
  function showSlide(index) {
    if (index < 0) {
      currentIndex = totalSlides - 1; // Loop to last slide
    } else if (index >= totalSlides) {
      currentIndex = 0; // Loop to first slide
    } else {
      currentIndex = index;
    }
    const offset = -currentIndex * 100; // Calculate percentage offset
    slidesContainer.style.transform = `translateX(${offset}%)`;

    // Update pagination dots (if enabled)
    if (dotsContainer) {
      Array.from(dotsContainer.children).forEach((dot, i) => {
        if (i === currentIndex) {
          dot.classList.add('bg-white'); // Active dot color
          dot.classList.remove('bg-gray-400');
        } else {
          dot.classList.remove('bg-white');
          dot.classList.add('bg-gray-400'); // Inactive dot color
        }
      });
    }
  }

  // Go to the next slide
  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  // Go to the previous slide
  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  // Add event listeners to navigation buttons
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  // Initialize dots (create them dynamically)
  function createDots() {
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('span');
      dot.classList.add('w-3', 'h-3', 'rounded-full', 'bg-gray-400', 'cursor-pointer', 'transition-colors', 'duration-300');
      dot.addEventListener('click', () => showSlide(i));
      dotsContainer.appendChild(dot);
    }
    showSlide(0); // Show the first slide and activate its dot
  }

  // Add click event listeners to images within the slider to open the modal
  Array.from(slides).forEach(slideDiv => {
    const img = slideDiv.querySelector('img');
    if (img) {
      img.addEventListener('click', () => {
        openModal(img.src, img.alt);
      });
    }
  });


  // Initialize the slider and dots when the page loads
  document.addEventListener('DOMContentLoaded', createDots);