var weather = {
	cityName: "",
	temperature: "",
	celsius: true,
	humidity: "",
	pressure: "",
	clouds: "",
	description: "",
	windSpeed: "",
	windDirection: "",
	type: "",
	icon: "",
	convertToFahrenheit:function() {
		this.temperature = (this.temperature * 1.8 + 32).toFixed(1);
	},
	convertToCelsius: function() {
		this.temperature = ((this.temperature - 32) * 0.5556).toFixed(1);
	}		
};

$(document).ready(function() {
	init()
});

function init() {
	setupUnitsButton();
	navigator.geolocation.getCurrentPosition(success, errorLocation);
};

function success(position){
    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;

    var link = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;

	
	$.getJSON(link)
		.done(updateWeatherData)
		.fail(errorWeather);

}

function updateWeatherData(data) {
	
	weather.cityName = data.name;
	weather.temperature = data.main.temp.toFixed(1);
	weather.pressure = data.main.pressure.toFixed(1)+" mb";
	weather.humidity = data.main.humidity.toFixed(1)+"%";
	weather.clouds = data.clouds.all+"%";
	weather.windSpeed = data.wind.speed + " km/h";
	weather.type = data.weather[0].main;
	weather.description = toTitleCase(data.weather[0].description);
	weather.icon = data.weather[0].icon;

	updateCityName();
	updateWeatherDescription();
	updateTemperature();
	updatePressure();
	updateHumidity();
	updateClouds();
	updateWind();
	updateWeatherIcon();
	updatedBackgroundImage();
};

function updatedBackgroundImage(){
	var imageUrl;
	if(weather.type === "Clear"){
		imageUrl = "https://images.unsplash.com/photo-1464866691624-e6bdc728bedd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=50e93d23e430eaa4aa54cfd5a054df8f&auto=format&fit=crop&w=1950&q=80";
	} else if (weather.type === "Clouds") {
		imageUrl = "https://images.unsplash.com/photo-1518277748204-ba05cb84d9f5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9ea3b1a82b08a4ba9764a8788c9cdaaa&auto=format&fit=crop&w=1949&q=80";
	} else if (weather.type === "Thunderstorm") {
		imageUrl = "https://images.unsplash.com/photo-1525897174292-dbe24620b264?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=95cc2c20eea46f8f8cd2a09196b234fe&auto=format&fit=crop&w=1950&q=80";
	}  else if (weather.type === "Rain") {
		imageUrl = "https://images.unsplash.com/photo-1438449805896-28a666819a20?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=950c1c30e781da5fa29e7db2f185c360&auto=format&fit=crop&w=1950&q=80";
	}  else if (weather.type === "Snow") {
		imageUrl = "https://images.unsplash.com/photo-1489342876263-7a7244dcaad0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f61ce224ffe87d301013b32c3e68f5f9&auto=format&fit=crop&w=1950&q=80";
	}
	$("body").css("background-image", "url(" + imageUrl + ")")
	
}

function updateCityName(){
	$("#cityName").html(weather.cityName);
}

function updateWeatherDescription(){
	$("#weather").html(weather.description);
}

function updateClouds(){
	$("#clouds").html(weather.clouds);
}

function updateWind(){
	$("#windSpeed").html(weather.windSpeed);
	$("#windDirection").removeClass("wi-na");
	$("#windDirection").addClass("wi-wind","towards-" + weather.windDirection + "-deg");
}

function updateTemperature(){
	$("#temperature").html(weather.temperature);
}

function updatePressure(){
	$("#pressure").html(weather.pressure);
}

function updateHumidity(){
	$("#humidity").html(weather.humidity);
}

function updateWeatherIcon(){
	$("#weatherIcon").attr({"src": weather.icon,
							"alt": weather.type + " Icon"});
}

function setupUnitsButton() {
	$("#units").click(function(){
		if(weather.celsius){
			$("#units i").removeClass("wi-celsius")
			$("#units i").addClass("wi-fahrenheit");
			weather.convertToFahrenheit();
		} else {
			$("#units i").removeClass("wi-fahrenheit");
			$("#units i").addClass("wi-celsius")
			weather.convertToCelsius();
		};
		weather.celsius = !weather.celsius;

		updateTemperature();
	});
};

function errorWeather() {
	alert("Unable to retrieve weather");
};

function errorLocation() {
    alert("Unable to retrieve your location");
};

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}