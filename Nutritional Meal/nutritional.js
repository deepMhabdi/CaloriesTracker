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

var app_id = '115c348d';
var api_key = 'e007d5f66ddded2d96d86f71db34eb4f';

var recipeArr = [];
var searchTerm = "";

$(document).ready(function () {
    // Event listener for the back button
    $('#back-button').click(function() {
        // Check if the localStorage has 'backClick' item
        if(localStorage.getItem('backClick')) {
            // Navigate to the main page
            window.location.href = '../Main_Web/home.html'; // Replace with the path to your main page
        } else {
            // Set the 'backClick' item in localStorage
            localStorage.setItem('backClick', true);
            // Refresh the page to clear the searched recipe
            location.reload();
        }
    });

    var searchFunction = function (searchTerm) {
        $("#display-recipe").empty();
        recipeArr = [];

        queryURL = "https://api.edamam.com/search?q=" + searchTerm + "&app_id=" + app_id + "&app_key=" + api_key;
        $.ajax({
            type: "GET",
            url: queryURL,
            success: function (response) {
                response.hits.forEach(function (element, i) {
                    var recipe = element.recipe;
                    var calories = Math.floor(recipe.calories / recipe.yield);
                    var addRecipe = '<div class="tile is-parent">' +
                        '<article class="tile is-child box">' +
                        '<div class="card">' +
                        '<div class="card-image">' +
                        '<figure class="image is-square">' +
                        '<img class="recipe-image" src="' + recipe.image + '" alt="Placeholder image">' +
                        '</figure>' +
                        '</div>' +
                        '<div class="card-content">' +
                        '<div class="content">' +
                        '<h3 class="title">' + recipe.label + '</h3>' +
                        '<p class="calories">' + calories + ' calories per serving.</p><p> Servings: ' + recipe.yield + '</p>' +
                        '<p class="ingredients">' +
                        '<a class="ingredients is-link" data-id=' + i + '>' + recipe.ingredients.length + ' Ingredients</span></p>' +
                        '<br>' +
                        '<p class="subtitle"><a href="' + recipe.url + '" target="_blank">Get the Recipe</a></p>' +
                        '</div>' +
                        '</div>' +
                        '<footer class="card-footer">' +
                        '</footer>' +
                        '</div>' +
                        '</article>' +
                        '</div>';
                    $("#display-recipe").append(addRecipe);
                    var ingredientsArr = [];
                    recipe.ingredients.forEach(element => {
                        ingredientsArr.push(element.text);
                    });
                    var recipeDBinfo = {
                        "image": recipe.image,
                        "title": recipe.label,
                        "caloriesPer": calories,
                        "servings": recipe.yield,
                        "numIngredients": recipe.ingredients.length,
                        "ingredients": ingredientsArr,
                        "url": recipe.url
                    };
                    recipeArr.push(recipeDBinfo);
                });
            }
        });
        $("#find-recipe").val("");
    };

    // Initial search on page load
    searchFunction("");

    $("#search-recipe").on("click", function (e) {
        if ($("#find-recipe").val() !== "") {
            searchTerm = $("#find-recipe").val().trim();
            searchFunction(searchTerm);
        } else {
            return false;
        }
    });

    $("#find-recipe").keypress(function (e) {
        if (e.which == 13) {
            $("#search-recipe").click();
        }
    });

    $(document).on("click", "#search-random-recipe", function () {
        var randomNum = Math.floor(Math.random() * (randomRecipe.length));
        searchTerm = randomRecipe[randomNum];
        searchFunction(searchTerm);
    });

    $(document).on("click", "a.ingredients", function () {
        var ingredientsNum = $(this).data("id");
        $("#show-ingredients-title").text(recipeArr[ingredientsNum].title + " Ingredients");
        $("#show-ingredients-body").empty();
        recipeArr[ingredientsNum].ingredients.forEach(function (ingredient) {
            $("#show-ingredients-body").append("<p>" + ingredient + "</p>");
        });
        $("#show-ingredients").addClass("is-active");
    });
});
