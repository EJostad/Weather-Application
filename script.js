$( document ).ready(function() {
    console.log( "ready!" );

// var searchCityBtn = $("#searchCity");
// searchCityBtn.click(city);

// var userInput = "#searchCity"
// var inputValue = document.getElementById("cityInput").value;
// var city = inputValue;

document.getElementById("searchCity").addEventListener("click", function searchCity() {
    console.log("click!")

    var userInput = document.getElementById("userInput").value;;

    var city = userInput; 

// This function is responsible for getting todays weather and appending it to the todaysWeather div element
function getTodaysWeather() {

    // Variable to to hold the API key for todaysWeather
    var APIKey = "178ad9e584c10611ec693eda4d905c79";

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "q=" + city + "&APPID=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {

            // Log the queryURL
            console.log(queryURL);

            // Log the resulting object
            console.log(response);

            // Transfer content to HTML 
            $("#todaysWeather").html("<h1>" + response.name + " Weather: " + response.main.temp + "K</h1>");
            $(".wind").text("Wind Speed: " + response.wind.speed);
            $(".humidity").text("Humidity: " + response.main.humidity);

            // Convert the temp to fahrenheit
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;

            // add temp content to html
            $(".temp").text("Temperature (K) " + response.main.temp);
            $(".tempF").text("Temperature (F) " + tempF.toFixed(2));
        })
}
getTodaysWeather();
});

// getTodaysWeather(city)

// // This function is responsible for getting todays UV Index and appending it to the uvIndex div element
// function getUvIndex(long, lat) {
//     var APIKey = "178ad9e584c10611ec693eda4d905c79";

//     var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "q=" + city + "&appid=" + APIKey;

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     })
//         // We store all of the retrieved data inside of an object called "response"
//         .then(function (response) {

//             // Log the queryURL
//             console.log(queryURL);

//             // Log the resulting object
//             console.log(response);

//             // Transfer content to HTML 
//             $("#uvIndex").html("<h1> UV Index: " + response.current.uvi + "K</h1>");
//             $(".wind").text("Wind Speed: " + response.wind.speed);
//             $(".humidity").text("Humidity: " + response.main.humidity);

//             // Convert the temp to fahrenheit
//             var tempF = (response.main.temp - 273.15) * 1.80 + 32;

//             // add temp content to html
//             $(".temp").text("Temperature (K) " + response.main.temp);
//             $(".tempF").text("Temperature (F) " + tempF.toFixed(2));
//         })
// }
// // getUvIndex(long, lat)
});