
// const getFoodData = food => {
//     fetch('https://www.themealdb.com/api/json/v1/1/random.php')
//         .then(response => response.json())
//         .then(data => console.log('data'))
// }

// const searchBtn = document.getElementById('search_button');
// searchBtn.addEventListener('click', () => {
//     const foodName = document.getElementById('food-name').value;
//     getFoodData(foodName)
// })


fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata')
        .then(res => res.json())
        .then(data => {
              const mealName = data.meals[0];
              console.log(mealName);

        } );