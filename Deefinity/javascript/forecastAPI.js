// World weather online API:
const apiKey = `5dd8bf4ad7654deebe0132950210907`;

const getWeather = async (locationName) => {
    const forecastBaseULR = `https://api.worldweatheronline.com/premium/v1/weather.ashx`;
    const forecastLocation = `?key=${apiKey}&q=${locationName}&format=json&num_of_days=14&showlocaltime=yes&tp=3&extra=isDayTime,%20utcDateTime&cc=yes`;

    // make async api call:
    const response = await fetch(forecastBaseULR + forecastLocation);
    const { data } = await response.json();
    return data;
};

// https://api.worldweatheronline.com/premium/v1/weather.ashx?key=5dd8bf4ad7654deebe0132950210907&q=Berlin&format=json&num_of_days=14&showlocaltime=yes&tp=3&extra=isDayTime,%20utcDateTime&cc=yes
