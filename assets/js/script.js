var forecast = document.querySelector('.forecast');
var searchButton = document.getElementById('searchbtn');
var input = document.querySelector("#searchbox")


function getApi() {
  // replace `octocat` with anyone else's GitHub username
  console.log("button pressed");
  var requestUrl = `api.openweathermap.org/data/2.5/forecast?q=${data}&appid={3301ee6fc116327db709dae75404298b}`;

searchButton.addEventListener('click', function () {
  var data = input.value;
  console.log("button pressed");
  console.log(data);
  // var requestUrl = `api.openweathermap.org/data/2.5/forecast?q=${data}&appid={3301ee6fc116327db709dae75404298b}`;

  // fetch(requestUrl)
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (data) {
  //     for (var i = 0; i < data.length; i++) {
  //       var listItem = document.createElement('li');
  //       listItem.textContent = data[i].html_url;
  //       repoList.appendChild(listItem);
  //     }
  //   });
});
//**other option below */
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