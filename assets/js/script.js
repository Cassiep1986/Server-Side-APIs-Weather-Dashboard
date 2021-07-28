var forecast = document.querySelector(".forecast");
var searchButton = document.getElementById("searchbtn");
var input = document.querySelector("#searchbox");
var cityList = document.querySelector("#cityList");
var savedcities = JSON.parse(localStorage.getItem("cities")) || [];

function getWeather() {
  savedcities.push(input.value);
  localStorage.setItem("cities", JSON.stringify(savedcities));
  logCities();

  var city = input.value;

  var weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3301ee6fc116327db709dae75404298b&units=imperial`;

  fetch(weatherurl)
    .then(function (response) {
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var Cityname = document.querySelector("#cityname");
      Cityname.textContent = data.name;
      var img = document.querySelector("#icon");
      img.src = 'http://openweathermap.org/img/w/' + data.weather[0].icon + ".png";
      console.log(img.src);
      var Temp = document.querySelector("#temp");
      Temp.textContent = "Temp: " + Math.round(data.main.temp) + " \xB0 F";
      var Wind = document.querySelector("#wind");
      Wind.textContent = "Wind: " + data.wind.speed + " mph";
      var Humidity = document.querySelector("#humidity");
      Humidity.textContent = "Humidity: " + data.main.humidity + " %";

      let lat = data.coord.lat;
      let lon = data.coord.lon;

      var onecallurl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=3301ee6fc116327db709dae75404298b&units=imperial`;

      fetch(onecallurl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // console.log(data);
          var Uvindex = document.querySelector("#uv_index");
          Uvindex.textContent = "UV Index " + data.current.uvi;
          forecastFive(data);
          getdates();
          document.querySelector("input").value = "";
        });
    });
}

function forecastFive(data) {

  for (let i = 0; i < 5; i++) {
    var dayofweek = "#dayofweek" + [i];
    var smtwtfs = document.querySelector(dayofweek);
    var img = document.createElement("img");
    img.src =  'http://openweathermap.org/img/w/' + data.daily[i].weather[0].icon + ".png";
    smtwtfs.append(img);

  }

  for (let i = 0; i < 5; i++) {
    var day = "#day" + [i];
    var dailyfive = document.querySelector(day);

    var hightemp = document.createElement("li");
    hightemp.textContent = "High: " + data.daily[i].temp.max + "	\xB0 F";

    var lowtemp = document.createElement("li");
    lowtemp.textContent = "Low: " + data.daily[i].temp.min + " \xB0 F";

    dailyfive.append(hightemp);
    dailyfive.append(lowtemp);
  }

  for (let i = 0; i < 5; i++) {
    var day = "#day" + [i];
    var dailyfive = document.querySelector(day);

    var dailywind = document.createElement("li");
    dailywind.textContent = "Wind:   " + data.daily[i].wind_speed + " mph";

    dailyfive.append(dailywind);
  }

  for (let i = 0; i < 5; i++) {
    var day = "#day" + [i];
    var dailyfive = document.querySelector(day);

    var dailyhumidity = document.createElement("li");
    dailyhumidity.textContent = "Humidity:   " + data.daily[i].humidity + " %";

    dailyfive.append(dailyhumidity);
  }
}

function getdates() {
  for (let i = 0; i < 5; i++) {
    var dayofweek = "#dayofweek" + [i];
    var smtwtfs = document.querySelector(dayofweek);
    var newday = moment().add([i]).format("dddd");
    // var newday = ("moment()" + ".add" + ([i]))
    var SMTWTFS = document.createElement("p");
    SMTWTFS.textContent = newday;

    smtwtfs.append(SMTWTFS);

  }
}

function logCities() {
  savedcities.forEach(function (city) {
    var cityList = document.querySelector("#cityList");
    var prevbutton = document.createElement("button");
    prevbutton.innerHTML += `${city}`;
    prevbutton.setAttribute("id", `${city}`);
    cityList.append(prevbutton);
    recallInfo(prevbutton);
  });
}

function recallInfo(prevbutton) {
  prevbutton.addEventListener("click", function (e) {
    city = this.getAttribute("id");
    var weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3301ee6fc116327db709dae75404298b&units=imperial`;

    fetch(weatherurl)
      .then(function (response) {
        // console.log(response);
        return response.json();
      })
      .then(function (data) {
        // console.log(data);
        var Cityname = document.querySelector("#cityname");
        Cityname.textContent = data.name;
        var Temp = document.querySelector("#temp");
        Temp.textContent = "Temp: " + Math.round(data.main.temp) + " \xB0 F";
        var Wind = document.querySelector("#wind");
        Wind.textContent = "Wind " + data.wind.speed + " mph";
        var Humidity = document.querySelector("#humidity");
        Humidity.textContent = "Humidity " + data.main.humidity + " %";

        let lat = data.coord.lat;
        let lon = data.coord.lon;

        var onecallurl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=3301ee6fc116327db709dae75404298b&units=imperial`;

        fetch(onecallurl)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);
            var Uvindex = document.querySelector("#uv_index");
            Uvindex.textContent = "UV Index " + data.current.uvi;
            forecastFive(data);
            getdates();
            document.querySelector("input").value = "";
          });
      });
  });
}
window.addEventListener("load", function(event) {
  localStorage.getItem("cities", JSON.stringify(savedcities));
});



searchButton.addEventListener("click", getWeather);
