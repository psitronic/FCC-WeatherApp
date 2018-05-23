var celcius = true;
var weatherData = {};

init()

function init() {
	$(document).ready(function() {
		setupUnitsButton();
		navigator.geolocation.getCurrentPosition(success, errorLocation);
	});
};

function success(position){
        var longitude = position.coords.longitude;
        var latitude = position.coords.latitude;

        var link = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;

		$.getJSON(link)
			.done(showWeatherData)
			.fail(errorWeather);

}

function showWeatherData(data) {
	
	var cityName = data.name;
	var temperature = data.main.temp.toFixed(1);
	var weather = data.weather[0].main
	var icon = data.weather[0].icon;

	if(!celcius){
		temperature = convertToFahrenheit(temperature);
	}

	$("#cityName").html(cityName);
	$("#temperature").html(temperature);
	$("#weather").html(weather);
	$("#weatherIcon").attr({"src": icon,
							"alt": weather + " Icon"});
};

function setupUnitsButton() {
	$("#units").click(function(){
		if(celcius){
			$("#units").html("F");
		} else {
			$("#units").html("C")
		};
		celcius = !celcius;
	});
};

function convertToFahrenheit(temperature) {
	return (temperature * 1.8 + 32)
};

function errorWeather() {
	alert("Unable to retrieve weather");
};

function errorLocation() {
    alert("Unable to retrieve your location");
};
