let input = document.querySelector('.meal-input');
let mealList = document.querySelector('#list');
let error_msg = document.querySelector('#error_msg');
let submit = document.querySelector('.search');
let random = document.querySelector('.random');
let favList = document.querySelector('.fav-list');
let greet = document.querySelector('#greet');

// when user click on search this function run..
submit.addEventListener('click', function () {
    if (input.value.length === 0) {
        error_msg.innerHTML = "Input cannot be empty!! please Enter Meal Name..."
        input.innerHTML = "";
        greet.innerHTML = "";
        // return;
    }else{
        console.log("wait...");
        getMealList();
    }
    // input.value="awsome";
});
// this will get the meals if present in mealdb
function getMealList() {
    // let searchInput = input.value.trim();
    let searchInput = input.value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
        .then(Response => Response.json())
        .then(data => {
            let html = "";

            if (data.meals) {
                data.meals.forEach(meal => {

                    html += `
                    <div class="meal-item" data-id="${meal.idmeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="food">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <button class="add" onclick="addList(${meal.idMeal})">
                            Add to Favorite <i class="fa-regular fa-heart"></i> </button>
                            <p id="inst">${meal.strInstructions}<p>

                        </div>

                    </div>

                    `
                });
                greeting();
                error_msg.innerHTML = "";
                mealList.classList.remove('notFount');
            }
            else {
                error_msg.innerHTML = "";
                html = "!! Sorry we did't get Any Meal !!";
                mealList.classList.add('notFound');
            }

            mealList.innerHTML = html;
        });
}

function greeting() {
    greet.innerHTML = 'ThankYou for using our site :)';
    return;
}

random.addEventListener('click', function (e) {
    e.preventDefault();
    mealList.innerHTML = "";
    input.value = "";
    error_msg.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        fetch('https://www.themealdb.com/api/json/v1/1/random.php')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                let html = '';
                console.log(data.meals);
                if (data.meals) {
                    data.meals.forEach(meal => {
                        html += `<div class="meal-item" data-id="${meal.idmeal}">
                                    <div class="meal-img">
                                        <img src="${meal.strMealThumb}" alt="food">
                                    </div>
                                    <div class="meal-name" id="back">
                                        <h3>${meal.strMeal}</h3>
                                        <button class="add" onclick="addList(${meal.idMeal})">
                                        Add to favorite <i class="fa-regular fa-heart"></i>
                                        </button>
                                        <p id="inst">${meal.strInstructions}</p>
                                    </div>
                                 </div>

                                `;

                    });
                }

                greeting();
                mealList.innerHTML += html;
            });
    }
});

// now favorite button list starts here

function addList(meal) {

    // console.log(meal); //this is meal id passing
    // here this meal is the id of the meal

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            let html = '';
            data.meals.forEach(meal => {
                html += ` <li class="list-item" id="${meal.idmeal}">
                    <div class="meal-item" data-id="${meal.idmeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="food">
                        </div>
                        <div class="meal-name" id="back">
                            <h3>${meal.strMeal}</h3>
                            <button class="delete" onclick="deleteList(${meal.idmeal})">
                            Delete <i class="fa-regular fa-trash"></i>
                            </button>
                            <p id="inst">${meal.strInstructions}</p>
                        </div>
                    </div>
                    </li>
            `;
                favList.innerHTML += html;
                alert('Item added to favorite');
            });
        });
}

// delete from favorite list
function deleteList(meal) {
    let delList = document.getElementById(`${meal}`);//this meal contains meal id 
    favList.removeChild(delList);
}