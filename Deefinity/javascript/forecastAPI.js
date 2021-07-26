// World weather online API:
const apiKey = `5dd8bf4ad7654deebe0132950210907`;

const getWeather = async (locationName) => {
    const forecastBaseULR = `https://api.worldweatheronline.com/premium/v1/weather.ashx`;
    const forecastLocation = `?key=${apiKey}&q=${locationName}&format=json&num_of_days=14&showlocaltime=yes&tp=3&extra=isDayTime,%20utcDateTime&cc=yes`;

    const response = await fetch(forecastBaseULR + forecastLocation);

    if (!response.ok) {
        const message = `An error has ocurred: ${response.status}`;
        throw new Error(message);
    }

    const { data } = await response.json();
    console.log("data: ", data);
    return data;
};

// https://api.worldweatheronline.com/premium/v1/weather.ashx?key=5dd8bf4ad7654deebe0132950210907&q=Berlin&format=json&num_of_days=14&showlocaltime=yes&tp=3&extra=isDayTime,%20utcDateTime&cc=yes
