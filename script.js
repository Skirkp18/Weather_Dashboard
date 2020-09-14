// vars
var searchInput = $("input");
var searchBtn = $("button");
var searchHistoryEL = $("#searchhistory");
var cityInput = "";
var savedSearches = ["New York City", "Boston", "Los Angeles", "San Francisco", "Chicago", "Miami", "Pheonix", "Milwaake", "Washington D.C"];

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
    



    for (i = 0; i < 9; i++) {

    var listEL = $("<li>" + savedSearches[i] + "</li>").attr("class", "list-group-item");
    
    
    searchHistoryEL.append(listEL);

      }

    
}

function writeToLocalStorage() {

    var cityInput = searchInput.val();
    console.log(cityInput);
    savedSearches.unshift(cityInput);
    console.log(savedSearches);
    var stringifiedSavedSearches = JSON.stringify(savedSearches);
    console.log(stringifiedSavedSearches);
    localStorage.setItem("searches", stringifiedSavedSearches);


}


// button click
$("button").on("click" , function(event) {

    writeToLocalStorage();
    loadSavedSearches();

});


// function calls

loadSavedSearches()

// event listner


