let unsplashAccessKey;


$.getJSON('../config.json', function(config) {
    const apiKey = config.apiKey;
    const lat = config.lat;
    const lon = config.lon;
    unsplashAccessKey = config.unsplashAccessKey;
    const link = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${apiKey} `;

    // Get weather data
    $.getJSON(link, function(data) {
        const weatherCondition = data.weather[0].main.toLowerCase();
        console.log(data['weather'][0]);

        setTemperature(data.main.temp);
        // Update background based on weather condition
        updateBackground(weatherCondition);
    });
}).fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
});

function updateBackground(weatherCondition) {
    const body = $('body');

    try {
        fetchImage(weatherCondition)
            .then(imageUrl => {
                body.css('background', `url(${imageUrl}) no-repeat center center fixed`);
                body.css('background-size', 'cover');
            });
    } catch (err) {
        console.log(err);
    }
}

function fetchImage(keyword) {
    const unsplashUrl = `https://api.unsplash.com/photos/random?query=${keyword}&orientation=landscape&client_id=${unsplashAccessKey}&featured=true`;

    return fetch(unsplashUrl)
        .then(response => response.json())
        .then(data => data.urls.full);
}

function setTemperature(temp) {
    const temperature = Math.round(temp - 273.15);
    const temperatureElement = $('.currentTemperature');
    temperatureElement.text(` | ${temperature}°C`);
}