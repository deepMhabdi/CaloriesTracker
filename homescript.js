// const startBtn = document.querySelectorAll (".start");
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const cursor = document.querySelector(".cursor");


circles.forEach(function (circle, index) {
    circle.x = 0;
    circle.y = 0;
    circle.style.backgroundColor = "white";
});

window.addEventListener("mousemove", function (e) {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    cursor.style.top = x;
    cursor.style.left = y;

    circles.forEach(function (circle, index) {
        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";

        circle.style.scale = (circles.length - index) / circles.length;

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });

    requestAnimationFrame(animateCircles);
}

animateCircles();

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];
let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});
// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});
// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");
// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});
const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}
const dragging = (e) => {
    if (!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}
const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}
const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
}
const autoPlay = () => {
    if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 1500);
}
autoPlay();
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

// script.js

const firstSvc = document.querySelector('.first-svc');
const bmiCalculator = document.querySelector('.bmi-calculator');
const resultElement = document.getElementById('result');
const backButton = document.getElementById('back-button');
const svcContainers = document.querySelectorAll('.svc-container'); // Store all svc-containers

// Initial display (uncomment based on your preference):
// bmiCalculator.classList.add('disappear'); // Start with everything hidden
firstSvc.classList.remove('disappear'); // Start with service containers

// Event listeners for button clicks
firstSvc.addEventListener('click', () => {
    svcContainers.forEach(container => container.classList.add('disappear')); // Hide all svc-containers
    bmiCalculator.classList.remove('disappear'); // Show BMI calculator
});

backButton.addEventListener('click', () => {
    // Show all svc-containers, except firstSvc (which might already be visible)
    svcContainers.forEach(container => {
        if (container !== firstSvc) {
            container.classList.remove('disappear');
        }
    });
    bmiCalculator.classList.add('disappear'); // Hide BMI calculator
    resultElement.innerText = "";
});

function calculateBMI() {
    const height = parseInt(document.getElementById('height').value) / 100; // Convert cm to meters
    const weight = parseInt(document.getElementById('weight').value);
    const bmi = weight / (height * height);

    const bmiText = interpretBMI(bmi);

    // Clear any previous result
    resultElement.innerText = "";

    // Display calculated BMI with text interpretation
    resultElement.innerText = `Your BMI is ${bmi.toFixed(2)}. ${bmiText}`;
}

function interpretBMI(bmi) {
    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi < 25) {
        return "Normal weight";
    } else if (bmi < 30) {
        return "Overweight";
    } else {
        return "Obese";
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.start').addEventListener('click', function () {
        var page4Section = document.querySelector('.page4');
        page4Section.scrollIntoView({ behavior: 'smooth' });
    });
});

const blogContents = {
    blog1: "Unlock the secrets to mastering your metabolism with our comprehensive calorie tracking guide. Learn how to optimize your calorie intake and expenditure to achieve your fitness and health goals. From understanding macronutrients to tracking your daily activity levels, this guide covers everything you need to know to take control of your metabolism and transform your body. Whether you're looking to lose weight, gain muscle, or simply improve your overall well-being, this ultimate calorie tracking guide will empower you to make informed choices and reach your desired results.",
    blog2: "Delve into the intricacies of calorie tracking with our insightful guide, 'Cracking the Calorie Code.' Unravel the mysteries behind effective calorie management and learn practical strategies for tracking your calorie intake with precision. From understanding portion sizes to deciphering food labels, this blog provides valuable tips and techniques to help you stay on top of your calorie goals. Whether you're a beginner or a seasoned calorie tracker, discover new methods and tools to optimize your dietary habits and achieve sustainable results. With our expert advice and proven strategies, you'll gain the knowledge and confidence to navigate the world of calorie tracking like a pro.",
    blog3: "Calories play a crucial role in our lives, influencing our health and well-being in profound ways. By understanding and tracking calories with precision, we can unlock the potential to transform our lives for the better.Calories aren't just units of energy; they're key players in our body's functioning. By paying attention to the quality and quantity of calories we consume, we gain insight into our dietary habits and their impact on our health.Precision in calorie tracking enables us to make informed choices about our nutrition. We learn to prioritize nutritious foods while minimizing empty calories, leading to better overall health.Tracking calories also helps us manage our weight effectively. By balancing calorie intake with expenditure, we can achieve our weight goals and maintain them over time."
};

// Add event listeners to each content box to show content on click
document.querySelectorAll(".content-box").forEach(box => {
    box.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default anchor tag behavior
        const blogId = box.id;
        showBlog(blogId);
    });
});

function showBlog(blogId) {
    const blogContent = document.getElementById("blogContent");
    const contentBox = document.getElementById(blogId);
    
    // Hide all other blog content containers
    document.querySelectorAll(".content-box").forEach(box => {
        if (box.id !== blogId) {
            box.classList.add("hidden");
        }
    });
    
    // Show the clicked blog content container
    blogContent.innerHTML = `<p>${blogContents[blogId]}</p>`;
    blogContent.classList.remove("hidden");
}




  
  

// Ensure the provided HTML structure has correct class names:
// - `.svc-container` for the main container
// - `.first-svc` for the first service section
// - `.bmi-calculator` for the BMI calculator section
// - `.disappear` class for hidden elements
// - Input elements with IDs `height` and `weight`
// - Button element with ID `back-button`



