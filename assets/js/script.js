var apiKey = "3be86409614e60c4b052629fe253efcc";

function getSearchValue() {
  var searchValue = document.getElementById("search-value").value;

  searchWeather(searchValue);
}

function searchWeather(searchValue) {
  fetch("http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + apiKey)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var todayEl = document.getElementById("today");
      todayEl.textContent = "";

      var titleEl = document.createElement("h3");
      titleEl.classList.add("card-title");
      titleEl.textContent = data.name + " (" + new Date().toLocaleDateString() + ") ";

      var cardEl = document.createElement("div");
      cardEl.classList.add("card");

      var temperatureEl = document.createElement("p");
      temperatureEl.classList.add("card-text");
      temperatureEl.textContent = "Temperature: " + data.main.temp + "°F";

      var humidityEl = document.createElement("p");
      humidityEl.classList.add("card-text");
      humidityEl.textContent = "Humidity: " + data.main.humidity + "%";

      var windEl = document.createElement("p");
      windEl.classList.add("card-text");
      windEl.textContent = "Wind Speed: " + data.wind.speed;

      var cardBodyEl = document.createElement("div");
      cardBodyEl.classList.add("card-body");

      var imageEl = document.createElement("img");
      imageEl.setAttribute("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

      titleEl.appendChild(imageEl);

      cardBodyEl.appendChild(titleEl);
      cardBodyEl.appendChild(temperatureEl);
      cardBodyEl.appendChild(humidityEl);
      cardBodyEl.appendChild(windEl);
      cardEl.appendChild(cardBodyEl);
      todayEl.appendChild(cardEl);

      getForecast(searchValue);
      getUVIndex(data.coord.lon, data.coord.lat);
    })
};

function getForecast(searchValue) {
  fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=" + apiKey)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var forecastEl = document.getElementById("forecast");
      var forecastRowEl = document.createElement("div");
      forecastRowEl.classList.add("row");
      for (var i = 0; i < data.list.length; i++) {
        if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
          var columnEl = document.createElement("div");
          columnEl.classList.add("col-md-2");
          console.log(columnEl);
          var cardEl = document.createElement("div");
          cardEl.classList.add("card", "bg-primary", "text-white");

          var cardBodyEl = document.createElement("div");
          cardBodyEl.classList.add("card-body", "p-2");

          var titleEl = document.createElement("h5");
          titleEl.classList.add("card-title");
          titleEl.textContent = new Date(data.list[i].dt_txt).toLocaleDateString();

          var temperatureEl = document.createElement("p");
          temperatureEl.classList.add("card-text");
          temperatureEl.textContent = "Temp: " + data.list[i].main.temp + "°F";

          var humidityEl = document.createElement("p");
          humidityEl.classList.add("card-text");
          humidityEl.textContent = "Humidity: " + data.list[i].main.humidity + "%";

          var imageEl = document.createElement("img");
          imageEl.setAttribute("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
          
          forecastEl.appendChild(forecastRowEl);
          forecastRowEl.appendChild(columnEl);
          columnEl.appendChild(cardEl);
          cardEl.appendChild(cardBodyEl);
          cardBodyEl.appendChild(titleEl);
          cardBodyEl.appendChild(temperatureEl);
          cardBodyEl.appendChild(humidityEl);
          cardBodyEl.appendChild(imageEl);
        }
      }
    })
};

function getUVIndex(lon, lat) {
  
}

document.getElementById("search-btn").addEventListener("click", getSearchValue);