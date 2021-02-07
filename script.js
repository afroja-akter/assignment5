
 const search_text = document.getElementById('search_text');
 const search_button = document.getElementById('search_button');
 const error_feedback = document.getElementById('error_feedback');
 const meal_container = document.getElementById('show_meals');


 function click_single(e) {

     let xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function () {
         if (this.status == 200) {
             let meal = JSON.parse(this.response).meals[0];

             document.getElementById('show_single').innerHTML = `
             <div class="card m-2">
                 <img src="${meal.strMealThumb}" class="card-img-top">
                 <div class="card-body">
                     <h5 class="card-title">${meal.strMeal}</h5>
                     <p class="card-text">${meal.strInstructions}</p>
                 </div>

                 <h3 class="text-dark mt-2 p-2">Ingredients:</h3>
                 <ul class="list-group list-group-flush">
                     <li class="list-group-item text-primary text-right">${meal.strIngredient1}</li>
                     <li class="list-group-item text-primary text-right">${meal.strIngredient2}</li>
                     <li class="list-group-item text-primary text-right">${meal.strIngredient3}</li>
                     <li class="list-group-item text-primary text-right">${meal.strIngredient4}</li>
                     <li class="list-group-item text-primary text-right">${meal.strIngredient5}</li>
                 </ul>
             </div>

         `;

         }
     };
     xhttp.open("GET", 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + e, true);
     xhttp.send();


 }


 // call the api
 function get(search_text) {

     meal_container.innerHTML = '';


     let xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function () {
         if (this.status == 200) {
             let meals = JSON.parse(this.response).meals;

             meals.map(value => {
                 meal_container.innerHTML += `
                     <div style='cursor: pointer;' onclick='click_single(${value.idMeal});' class='card col-md-3 border-0' data-mealId='${value.idMeal}'>
                         <img class="card-img-top" src="${value.strMealThumb}" alt="Card image cap">
                         <div class="card-body">
                             <h5 class="card-title">${value.strMeal}</h5>
                         </div>
                     </div>
                     `
             })


         } else {
             meal_container.innerHTML = `
                     <div class='col-md-12'>
                         <div class="alert alert-warning" role="alert">
                         Select your favourite food...
                         </div>
                     </div>
                     `
         }
     };
     xhttp.open("GET", 'https://www.themealdb.com/api/json/v1/1/search.php?f=' + search_text.split('')[0], true);
     xhttp.send();


 }

 search_button.onclick = (e) => {
     error_feedback.innerHTML = '';
     if (search_text.value) {
         get(search_text.value)
     } else {
         error_feedback.innerHTML = 'Search text is required!';
     }
 }

 search_text.onkeypress = (e) => {
     error_feedback.innerHTML = '';
     if (e.code == 'Enter') {
         error_feedback.innerHTML = '';
         if (search_text.value) {
             get(search_text.value)
         } else {
             error_feedback.innerHTML = 'Search text is required!';
         }
     }
 }