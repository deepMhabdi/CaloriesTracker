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





document.addEventListener('DOMContentLoaded', function() {
    const selectElement = document.getElementById('unit');
    const resultElement = document.getElementById('result');

    // Function to toggle the dropdown arrow
    function toggleArrow() {
        selectElement.classList.toggle('open');
    }

    // Event listener to toggle the arrow when the select element is clicked
    selectElement.addEventListener('click', toggleArrow);

    // Event listener to close the dropdown when an option is selected
    selectElement.addEventListener('change', function() {
        selectElement.classList.remove('open');
    });

    // Event listener to show the result in a more user-friendly way
    resultElement.addEventListener('click', function() {
        resultElement.classList.toggle('show-result');
    });
});
