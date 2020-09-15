// vars
var searchInput = $("input");
var searchBtn = $("button");
var searchHistoryEL = $("#searchhistory");
var searchCity = "New York City";
var savedSearches = ["New York City", "Boston", "Los Angeles", "San Francisco", "Chicago", "Miami", "Pheonix", "Milwaake", "Washington D.C", "Orlando", "Seattle"];

console.log(searchCity);



// functions

// load saved searches

function loadSavedSearches() {

    searchHistoryEL.empty();
    searchCity = localStorage.getItem("searchCity")
    console.log(searchCity);
    var localSearches = localStorage.getItem("searches");
    var parsedLocalSearches = JSON.parse(localSearches);
    console.log(parsedLocalSearches);
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
    console.log(savedSearches);
    var stringifiedSavedSearches = JSON.stringify(savedSearches);
    console.log(stringifiedSavedSearches);
    localStorage.setItem("searches", stringifiedSavedSearches);
    localStorage.setItem("searchCity", searchCity);
    }

}


// button click
$("#button-addon2").on("click" , function(event) {

    writeToLocalStorage();
    loadSavedSearches();
    getCurrentWeather();

});

// history clicked
$("#searchhistory").on("click", function(event) {

    searchCity = event.target.innerHTML
    console.log(searchCity);
    localStorage.setItem("searchCity", searchCity);
    loadSavedSearches();
    getCurrentWeather();

});


// openWeather API AJAX Call
function getCurrentWeather () {
    var key = "2fd6a7c1addf009b30af95d20e54bde2";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + key;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response);
    });
};

// function calls

loadSavedSearches()

// event listner


