// vars
var searchInput = $("input");
var searchBtn = $("button");
var searchHistoryEL = $("#searchhistory");
var currentWeatherEL = $("#currentWeatherBody")
var searchCity = "New York City";
var currentWeatherObj;
var savedSearches = ["New York City", "Boston", "Los Angeles", "San Francisco", "Chicago", "Miami", "Pheonix", "Milwaake", "Washington D.C", "Orlando", "Seattle"];




// button click
$("#button-addon2").on("click" , function(event) {

    writeToLocalStorage();
    loadSavedSearches();
    getCurrentWeather();
    getFiveDayForcast();

});

// history clicked
$("#searchhistory").on("click", function(event) {

    searchCity = event.target.innerHTML
    console.log(searchCity);
    localStorage.setItem("searchCity", searchCity);
    loadSavedSearches();
    getCurrentWeather();
    getFiveDayForcast();

});


// openWeather API AJAX Call
function getCurrentWeather () {

    var key = "2fd6a7c1addf009b30af95d20e54bde2";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&units=imperial&appid=" + key;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response);
        currentWeatherObj = response
        console.log(currentWeatherObj);
        currentWeatherIcon = currentWeatherObj.weather[0].icon;
        console.log(currentWeatherIcon);
        displayCurrentWeather();

    });
};

function getFiveDayForcast () {
    var key = "2fd6a7c1addf009b30af95d20e54bde2";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&units=imperial&appid=" + key;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response);
    });
};

// functions

// load saved searches

function loadSavedSearches() {

    searchHistoryEL.empty();
    searchCity = localStorage.getItem("searchCity")
    var localSearches = localStorage.getItem("searches");
    var parsedLocalSearches = JSON.parse(localSearches);
    if (parsedLocalSearches !== null) {
    savedSearches = parsedLocalSearches;
    }




    for (i = 0; i < 11; i++) {

    var listEL = $("<button>" + savedSearches[i] + "</button>").attr("class", "btn btn-outline-dark").attr("id", "savedcitybtn");
    
    
    searchHistoryEL.append(listEL);

      }

    
}

function writeToLocalStorage() {

    var cityInput = searchInput.val();
    if (cityInput !== "") {
    console.log(cityInput);
    var searchCity = cityInput;
    savedSearches.unshift(cityInput);
    var stringifiedSavedSearches = JSON.stringify(savedSearches);
    localStorage.setItem("searches", stringifiedSavedSearches);
    localStorage.setItem("searchCity", searchCity);
    }

}

function displayCurrentWeather() {
    $(citynamedateandweather).empty();
    $(temperature).empty();
    $(humidityPercent).empty();
    $(windspeed).empty();


    var currentTemp = currentWeatherObj.main.temp;
    var currentHumidity = currentWeatherObj.main.humidity;
    var currentWindSpeed = currentWeatherObj.wind.speed;
    var weatherIconEl = $("<img>").attr("src", "http://openweathermap.org/img/w/" + currentWeatherIcon + ".png");
    var cityNameAndDate = $("<h5>").text(searchCity + " (" + currentDate + ") ");
    var tempatureEl = $("<h6>").text("Temperature: " + currentTemp + " \u00B0F");
    var humidityEl = $("<h6>").text("Humidity: " + currentHumidity + " %");
    var windSpeedEl = $("<h6>").text("Wind Speed: " + currentWindSpeed + " MPH");

    $("#citynamedateandweather").append(cityNameAndDate);
    $("#citynamedateandweather").append(weatherIconEl);
    $("#temperature").append(tempatureEl);
    $("#humidityPercent").append(humidityEl);
    $("#windspeed").append(windSpeedEl);

    

}

function getCurrentDate () {
    var fullDate = new Date()
console.log(fullDate);
//Thu May 19 2011 17:25:38 GMT+1000 {}
 
//convert month to 2 digits
var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
 
currentDate = twoDigitMonth + "/" + fullDate.getDate() + "/" + fullDate.getFullYear();
console.log(currentDate);
}




// function calls
getCurrentDate();
getCurrentWeather();
loadSavedSearches();
getFiveDayForcast();



