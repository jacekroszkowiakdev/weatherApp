const citiesForm = document.getElementsByClassName("change-location")[0];
const optionalLocation = document.getElementById("2nd-location");
const getWeatherButton = document.getElementById("get-weather");
const addLocationButton = document.getElementById("add-location");
const dataContainer = document.getElementById("data-container");
const twoWeeksForecast = document.getElementById("two-weeks-forecast");
const dayTime = document.getElementById("time-card");

// 2nd location optional button:
addLocationButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    if (optionalLocation.classList.contains("hidden")) {
        optionalLocation.classList.remove("hidden");
    }
});

const submitForms = async () => {
    const cities = Array.from(citiesForm.getElementsByTagName("input"));
    // get city value and trim any whitespace:
    // const city = citiesForm[0].value.trim();
    // const trimmedInput = city.value.trim();

    const requests = cities.map(({ value }) => getWeather(value));
    try {
        const results = await Promise.all(requests);
        dataContainer.innerHTML = "";
        results.forEach((element) => updateCard(element));
    } catch (err) {
        console.log(err);
    } finally {
        // set input fields to null
        cities.forEach((city) => (city.value = null));
    }

    // remove "off" class to make the data visible:
    if (dataContainer.classList.contains("off")) {
        dataContainer.classList.remove("off");
    }
};

const updateCard = async (data) => {
    let locationTime = data.time_zone[0].localtime;
    let localTimeFormatted = locationTime.slice(11);

    // change source of image representing time of day accordingly:
    let timeOfDay = "";

    data.current_condition[0].isdaytime == true
        ? (timeOfDay = "./icons/day.png")
        : (timeOfDay = "./icons/night.png");

    //render the 14 days array into the html:
    let aggregatedTwoWeeksData = data.weather.reduce((result, object, i) => {
        return (
            result +
            `<div class="array-element">
                <span>${i}</span>
                <span>${object.date}</span>
                <span>${object.avgtempC}</span>
                <span>&deg;C</span> / <span>${object.avgtempF}</span>
                <span>&deg;F</span>
                <br>
                </div>`
        );
    }, "");

    // inject HTML with data:
    dataContainer.innerHTML += `
    <div id="day-night">
                    <img
                        src=${timeOfDay}
                        id="time-card"
                        alt="image representing the time of day"
                    />
                </div>
    <h5 class="city-name">${data.request[0].query}</h5>
                    <div class="weather-condition">
                        <span>Local Time: ${localTimeFormatted}</span><br>
                        <span>${data.current_condition[0].weatherDesc[0].value}</span><br>
                        <span>CLOUD COVER: ${data.current_condition[0].cloudcover}%</span>
                    </div>
                    <div id="weather-icon-container">
                    <!-- api icon provided icon  -->
                    <img
                        src="${data.current_condition[0].weatherIconUrl[0].value}"
                        id="weather-icon"
                        alt="weather icon"
                    />
                </div>
                    <div class="temperature">
                        <span>${data.current_condition[0].temp_C}</span>
                        <span>&deg;C</span> / <span>${data.current_condition[0].temp_F}</span>
                        <span>&deg;F</span>
                    </div>
                    ${aggregatedTwoWeeksData}
                    `;
};
