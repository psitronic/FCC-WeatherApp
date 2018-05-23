var celsius = true;
var weatherData = {
	cityName: "",
	temperature: "",
	weather: "",
	icon: ""	
};

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
	
	weather.cityName = data.name;
	weather.temperature = data.main.temp.toFixed(1);
	weather.weather = data.weather[0].main
	weather.icon = data.weather[0].icon;

	updateCityName();
	updateMainWeather();
	updateTemperature();
	updateWeatherIcon();
};

function updateCityName(){
	$("#cityName").html(weather.cityName);
}

function updateMainWeather(){
	$("#temperature").html(weather.temperature);
}

function updateTemperature(){
	$("#weather").html(weather.weather);
}

function updateWeatherIcon(){
	$("#weatherIcon").attr({"src": weather.icon,
							"alt": weather.weather + " Icon"});
}

function setupUnitsButton() {
	$("#units").click(function(){
		if(celsius){
			$("#units").html("F");
			weather.temperature = convertToFahrenheit(weather.temperature);
		} else {
			$("#units").html("C")
			weather.temperature = convertToCelsius(weather.temperature);
		};
		celsius = !celsius;
		$("#temperature").html(weather.temperature);
	});
};

function convertToFahrenheit(temperature) {
	return (temperature * 1.8 + 32).toFixed(1);
};

function convertToCelsius(temperature) {
	return ((temperature - 32) * 0.5556).toFixed(1);
};

function errorWeather() {
	alert("Unable to retrieve weather");
};

function errorLocation() {
    alert("Unable to retrieve your location");
};
