function getSearchValue() {
  var searchValue = document.getElementById("search-value").value;

  searchWeather(searchValue);
}

function searchWeather(searchValue) {
  var apiKey = "3be86409614e60c4b052629fe253efcc";

  fetch("http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + apiKey)
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      var todayEl = document.getElementById("today");
      todayEl.textContent = "";

      var titleEl = document.createElement("h3");
      titleEl.classList.add("card-title");
      titleEl.textContent = data.name + " (" + new Date().toLocaleDateString() + ") ";

      var cardEl = document.createElement("div");
      cardEl.classList.add("card");
      
      var temperatureEl = document.createElement("p");
      temperatureEl.classList.add("card-text");
      temperatureEl.textContent = "Temperature: " + data.main.temp;

      var humidityEl = document.createElement("p");
      humidityEl.classList.add("card-text");
      humidityEl.textContent = "Humidity: " + data.main.humidity;

      var windEl = document.createElement("p");
      windEl.classList.add("card-text");
      windEl.textContent = "Wind Speed: " + data.wind.speed;

      var cardBodyEl = document.createElement("div");
      cardBodyEl.classList.add("card-body");

      var imageEl = document.createElement("img");
      imageEl.setAttribute("src", "http://openweathermap.org/img/w" + data.weather[0].icon + ".png");

      titleEl.appendChild(imageEl);

      cardBodyEl.appendChild(titleEl);
      cardBodyEl.appendChild(temperatureEl);
      cardBodyEl.appendChild(humidityEl);
      cardBodyEl.appendChild(windEl);
      cardEl.appendChild(cardBodyEl);
      todayEl.appendChild(cardEl);
    })
};



document.getElementById("search-btn").addEventListener("click", getSearchValue);