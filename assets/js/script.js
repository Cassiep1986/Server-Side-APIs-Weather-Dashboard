var forecast = document.querySelector('.forecast');
var searchButton = document.getElementById('searchbtn');
var input = document.querySelector("#searchbox");
var Cityname = document.querySelector("#cityname");
var Temp = document.querySelector("#temp");
var Wind = document.querySelector("#wind");
var Humidity = document.querySelector("#humidity");
var Uvindex= document.querySelector("#uv_index");

searchButton.addEventListener('click', function () {
  var city = input.value;

  var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=3301ee6fc116327db709dae75404298b&units=imperial`;

  fetch(requestUrl)
    .then(function (response) {
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      Cityname.append(data.city.name);
      console.log(data.list)
      }
    );
});

//** Other fetch syntax */
// function getApi() {

//   console.log("button pressed");
//   var requestUrl = `api.openweathermap.org/data/2.5/forecast?q=${data}&appid={3301ee6fc116327db709dae75404298b}`;

//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       for (var i = 0; i < data.length; i++) {
//         var listItem = document.createElement('li');
//         listItem.textContent = data[i].html_url;
//         repoList.appendChild(listItem);
//       }
//     });
// }