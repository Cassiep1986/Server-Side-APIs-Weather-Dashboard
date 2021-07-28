var forecast = document.querySelector(".forecast");
var searchButton = document.getElementById("searchbtn");
var input = document.querySelector("#searchbox");
var Cityname = document.querySelector("#cityname");
var Temp = document.querySelector("#temp");
var Wind = document.querySelector("#wind");
var Humidity = document.querySelector("#humidity");
var Uvindex = document.querySelector("#uv_index");
var test = document.querySelector("#test");
var savedCities = JSON.parse(localStoreage.getItem())

  function getWeather() {
    var city = input.value;
  
    var weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3301ee6fc116327db709dae75404298b&units=imperial`;
  
    fetch(weatherurl)
      .then(function (response) {
        // console.log(response);
        return response.json();
      })
      .then(function (data) {
        // console.log(data);
        Cityname.append(data.name);
        Temp.append("   " + (Math.round(data.main.temp)) + " \xB0 F") ;
        Wind.append("   " + (data.wind.speed) + " mph");
        Humidity.append("   " + (data.main.humidity) + " %") ;
  
        let lat = data.coord.lat;
        let lon = data.coord.lon;
  
        var onecallurl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=3301ee6fc116327db709dae75404298b&units=imperial`
  
        fetch(onecallurl)
        .then(function (response){
          return response.json();
        })
        .then(function (data){
          console.log(data);
          Uvindex.append("   " + (data.current.uvi));
          forecastFive(data);
          getdates();
        })
      });
  };

    function forecastFive(data) {
      for (let i = 0; i < 5; i++) {
        var day = "#day" + [i]; 
        var dailyfive = document.querySelector(day);
        
        var hightemp = document.createElement("li"); 
        hightemp.textContent= "High: " + data.daily[i].temp.max + "	\xB0 F";

        var lowtemp = document.createElement("li"); 
        lowtemp.textContent= "Low: " + data.daily[i].temp.min + " \xB0 F"; 

        dailyfive.append(hightemp);
        dailyfive.append(lowtemp);
    };

    for (let i = 0; i < 5; i++) {
      var day = "#day" + [i]; 
      var dailyfive = document.querySelector(day);
      
      var dailywind = document.createElement("li"); 
      dailywind.textContent= "Wind:   " + data.daily[i].wind_speed + " mph";

      dailyfive.append(dailywind);
  };

  for (let i = 0; i < 5; i++) {
    var day = "#day" + [i]; 
    var dailyfive = document.querySelector(day);
    
    var dailyhumidity = document.createElement("li"); 
    dailyhumidity.textContent= "Humidity:   " + data.daily[i].humidity + " %";

    dailyfive.append(dailyhumidity);
};
    };
  
    function getdates() {
      for (let i = 0; i < 5; i++) {
        var dayofweek = "#dayofweek" + [i]; 
        var smtwtfs = document.querySelector(dayofweek);
        var newday = (moment().add([i]).format("dddd"));
        // var newday = ("moment()" + ".add" + ([i]))
        var SMTWTFS = document.createElement("p"); 
        SMTWTFS.textContent= newday;
    
        smtwtfs.append(SMTWTFS);
    }; 
    }


  searchButton.addEventListener("click", getWeather);

