// vars
var searchInput = $("input");
var searchBtn = $("button");
var searchHistoryEL = $("#searchhistory");
var searchCity = "";
var savedSearches = ["New York City", "Boston", "Los Angeles", "San Francisco", "Chicago", "Miami", "Pheonix", "Milwaake", "Washington D.C", "Orlando", "Seattle"];

console.log(searchInput);

// functions

// load saved searches

function loadSavedSearches() {

    searchHistoryEL.empty();
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
    savedSearches.unshift(cityInput);
    console.log(savedSearches);
    var stringifiedSavedSearches = JSON.stringify(savedSearches);
    console.log(stringifiedSavedSearches);
    localStorage.setItem("searches", stringifiedSavedSearches);
    }

}


// button click
$("#button-addon2").on("click" , function(event) {

    writeToLocalStorage();
    loadSavedSearches();

});

// history clicked
$("#searchhistory").on("click", function(event) {

    searchCity = event.target.innerHTML
    console.log(searchCity);

});


// function calls

loadSavedSearches()

// event listner


