// Get configuration from config.json
$.getJSON('../config.json', function(config) {
    const apiKey = config.apiKey;
    const lat = config.lat;
    const lon = config.lon;

    // Get weather data 
    $.getJSON(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`, function(data) {
        const weatherCondition = data.weather[0].main.toLowerCase();

        // Update background based on weather condition
        updateBackground(weatherCondition);
    });
});

function updateBackground(weatherCondition) {
    const body = $('body');

    switch (weatherCondition) {
        case 'rain':
            console.log('rainy');
            // Set background image or color for rainy weather
            body.css('background', 'url(rainy-background.jpg) no-repeat center center fixed');
            body.css('background-size', 'cover');
            break;
        default:
            console.log('other: ' + weatherCondition);
            body.css('background', '#1c1c1c');
            break;
    }
}