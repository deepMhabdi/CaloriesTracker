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

document.addEventListener("DOMContentLoaded", function () {
    // Add event listener to the "Back" button
    document.getElementById("backBtn").addEventListener("click", function () {
        // Redirect to the main page of the website
        window.location.href = "../Main_Web/home.html"; 
    });
});

// script.js
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
script.onload = function () {
    // jQuery has loaded, you can now use it
    $(document).ready(function () {
        $('#getCaloriesBtn').click(function () {
            var query = $('#foodInput').val();
            if (query.trim() !== '') {
                $.ajax({
                    method: 'GET',
                    url: 'https://api.api-ninjas.com/v1/nutrition?query=' + encodeURIComponent(query),
                    headers: { 'X-Api-Key': 'WngvebSkSO6pBNLQMGdhzw==419UE29Z9gfXIpOE' },
                    contentType: 'application/json',
                    success: function (result) {
                        displayNutritionalInfo(result);
                    },
                    error: function ajaxError(jqXHR) {
                        console.error('Error: ', jqXHR.responseText);
                    }
                });
            } else {
                alert('Please enter a food item.');
            }
        });

        function displayNutritionalInfo(data) {
            var resultDiv = $('#caloriesResult');
            resultDiv.empty(); // Clear previous results
            if (data && data.length > 0) {
                var foodInfo = data[0]; // Assuming API returns data for the first food item only
                var html = '<h2>Nutritional Information for ' + foodInfo.name + '</h2>';
                html += '<ul>';
                html += '<li>Calories: ' + foodInfo.calories + '</li>';
                html += '<li>Serving Size: ' + foodInfo.serving_size_g + 'g</li>';
                html += '<li>Total Fat: ' + foodInfo.fat_total_g + 'g</li>';
                html += '<li>Saturated Fat: ' + foodInfo.fat_saturated_g + 'g</li>';
                html += '<li>Protein: ' + foodInfo.protein_g + 'g</li>';
                html += '<li>Sodium: ' + foodInfo.sodium_mg + 'mg</li>';
                html += '<li>Potassium: ' + foodInfo.potassium_mg + 'mg</li>';
                html += '<li>Cholesterol: ' + foodInfo.cholesterol_mg + 'mg</li>';
                html += '<li>Total Carbohydrates: ' + foodInfo.carbohydrates_total_g + 'g</li>';
                html += '<li>Fiber: ' + foodInfo.fiber_g + 'g</li>';
                html += '<li>Sugar: ' + foodInfo.sugar_g + 'g</li>';
                html += '</ul>';
                resultDiv.html(html);

                // GSAP animation
                gsap.from(resultDiv, { duration: 0.5, y: -50, opacity: 0, ease: 'power2.out' });
                resultDiv.addClass('show');
            } else {
                resultDiv.text('No nutritional information found for the specified food item.');
            }
        }
    });
};
document.head.appendChild(script);
