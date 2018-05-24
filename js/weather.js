var weather = {
	cityName: "",
	temperature: "",
	celsius: true,
	type: "",
	icon: "",
	convertToFahrenheit:function() {
		this.temperature = (this.temperature * 1.8 + 32).toFixed(1);
	},
	convertToCelsius: function() {
		this.temperature = ((this.temperature - 32) * 0.5556).toFixed(1);
	}		
};

init()

function init() {
	setupUnitsButton();
	navigator.geolocation.getCurrentPosition(success, errorLocation);
};

function success(position){
    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;

    var link = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;

	$(document).ready(function() {
		$.getJSON(link)
			.done(updateWeatherData)
			.fail(errorWeather);
	});

}

function updateWeatherData(data) {
	
	weather.cityName = data.name;
	weather.temperature = data.main.temp.toFixed(1);
	weather.type = data.weather[0].main;
	weather.icon = data.weather[0].icon;

	updateCityName();
	updateWeatherType();
	updateTemperature();
	updateWeatherIcon();
	updatedBackgroundImage();
};

function updatedBackgroundImage(){
	var imageUrl;
	if(weather.type === "Clear"){
		imageUrl = "https://images.unsplash.com/photo-1500320821405-8fc1732209ca?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=60dabe438f1984eec277736ff1004ac8&auto=format&fit=crop&w=1950&q=80";
	} else if (weather.type === "Clouds") {
		imageUrl = "https://images.unsplash.com/photo-1518277748204-ba05cb84d9f5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9ea3b1a82b08a4ba9764a8788c9cdaaa&auto=format&fit=crop&w=1949&q=80";
	}
	$("body").css("background-image", "url(" + imageUrl + ")")
	
}

function updateCityName(){
	$("#cityName").html(weather.cityName);
}

function updateWeatherType(){
	$("#weather").html(weather.type);
}

function updateTemperature(){
	$("#temperature").html(weather.temperature);
}

function updateWeatherIcon(){
	$("#weatherIcon").attr({"src": weather.icon,
							"alt": weather.type + " Icon"});
}

function setupUnitsButton() {
	$("#units").click(function(){
		if(weather.celsius){
			$("#units").html("F");
			weather.convertToFahrenheit();
		} else {
			$("#units").html("C")
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
