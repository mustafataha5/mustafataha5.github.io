let i_am_arr = ["Full Stack Developer.", "Flutter Developer.", "Web And Mobile App Developer.", "DevOps"];
let len = i_am_arr.length;
let count = 0;
let count_t = 0;
let isDeleting = false;
let speed = 500;
const i_am_text = document.querySelector("#home_i_am");

function typeEffect() {
    let currentText = i_am_arr[count % len];
    if (!isDeleting) {
        i_am_text.innerHTML = currentText.slice(0, count_t + 1);
        count_t++;
        if (count_t === currentText.length) {
            isDeleting = true;
            // speed = 500;
        }
    } else {
        i_am_text.innerHTML = currentText.slice(0, count_t - 1);
        count_t--;
        if (count_t === 0) {
            isDeleting = false;
            count++;
            // speed = 400;
        }
    }
    setTimeout(typeEffect, 120);
}

typeEffect();

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});