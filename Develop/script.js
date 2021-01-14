$(document).ready(function () {
    console.log("ready!");

    // This function allows moment.js to display the current date & time to the page
    function curretDateAndTime() {
        // Instantiate a moment object	
        var NowMoment = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

        // Display value of moment object in #displayMoment div	
        var eDisplayMoment = document.getElementById('displayMoment');
        eDisplayMoment.innerHTML = NowMoment;

    };
    curretDateAndTime();

    // Primary function, which is responsible for making all API calls based on users input
    document.getElementById("searchCity").addEventListener("click", function searchCity() {

        // Variable responsible for holding user's text input
        var userInput = document.getElementById("userInput").value;

        // Variable responsible for holding the value of userInput
        var city = userInput;

        // This function is responsible for getting todays weather and appending it to the todaysWeather div element
        function getTodaysWeather(city) {

            // Variable to hold the API key for todaysWeather
            var APIKey = "178ad9e584c10611ec693eda4d905c79";

            // Variable to hold the API call
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "q=" + city + "&APPID=" + APIKey;

            $.ajax({
                url: queryURL,
                method: "GET"
            })
                // This will store all of the retrieved data inside of an object called "response"
                .then(function (response) {

                    // Log the queryURL
                    console.log(queryURL);

                    // Log the resulting object
                    console.log(response);

                    // Get the coordinates for the UV Index call
                    getUvIndex(response.coord.lat, response.coord.lon);

                    getForecast(response.coord.lat, response.coord.lon);

                    // Convert the temp to fahrenheit
                    var tempF = Math.floor((response.main.temp - 273.15) * 1.80 + 32);

                    // Transfer content to HTML 
                    $("#todaysWeather").html("<h1>" + response.name + " Temperature: " + tempF + " F</h1>");

                })
        }
        getTodaysWeather(city);

        // This function is responsible for getting todays UV Index and appending it to the uvIndex div element
        function getUvIndex(lat, lon) {

            // Variable to hold the API key for UvIndex
            var APIKey = "178ad9e584c10611ec693eda4d905c79";

            // Variable to hold the API call
            var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&appid=" + APIKey;

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
                    $("#uvIndex").html("<h1> UV Index: " + response.current.uvi + "</h1>");

                })
        }

        // This function is responsible for getting todays UV Index and appending it to the uvIndex div element
        function getForecast(lat, lon) {

            // Variable to hold the API key for UvIndex
            var APIKey = "178ad9e584c10611ec693eda4d905c79";

            // Variable to hold the API call
            // var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&appid=" + APIKey;
               var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                // We store all of the retrieved data inside of an object called "response"
                .then(function (response) {
                    console.log(getForecast);

                    // Log the queryURL
                    console.log(queryURL);

                    // Log the resulting object
                    console.log(response);

                    // Log the resulting object
                    console.log(response.list[0]);

                    // Use foreloop to loop through daily array of objects
                    for (var i = 0; i < 5 ; i++) {
                        // Transfer content to HTML 
                        var forecast = $("#forecast");
                        // $("#forecast").html("<h1> 5-Day Forecast: " + response.list[i].main.temp + "</h1>");
                        var title = $("<h1>").addClass("forecastTitle").text(response.list[i].main.temp);
                        
                        forecast.append(title);
                        // End for loop
                    };
                    
                })
        }
    });
});