const citiesForm = document.getElementsByClassName("change-location")[0];
const optionalCity = document.getElementById("2nd-location");
const getWeatherButton = document.getElementById("get-weather");
const addLocationButton = document.getElementById("add-location");
const current = document.getElementById("current-weather-details");
const dataContainer = document.getElementById("data-container");
const twoWeeksForecast = document.getElementById("two-weeks-forecast");
const dayTime = document.getElementById("time-card");
const icon = document.getElementById("weather-icon");

// 2nd location optional button:
addLocationButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    if (optionalCity.classList.contains("hidden")) {
        optionalCity.classList.remove("hidden");
    }
});

const submitForms = async () => {
    const cities = Array.from(citiesForm.getElementsByTagName("input"));
    // get city value and trim any whitespace:
    // const city = citiesForm[0].value.trim();
    // const trimmedInput = city.value.trim();

    let results = [];

    try {
        let requests = cities.forEach(
            ({ value }) => getWeather(value).then((data) => results.push(data)),
            results // save the data as object inside an array!! or a json... ??
        );
        console.log("results: ", results);
        console.log("requests: ", requests);
        // const results = await Promise.all(requests);
        // updateCard(results, value);
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

const updateCard = (data, city) => {
    console.log("data and city in updateCard fn: ", data, city);
    // let locationTime = data.time_zone[0].localtime;
    // let timeFormatAdjusted = locationTime.slice(11);

    // change image source in accordance to time of the day:
    if (data.current_condition[0].isdaytime == "yes") {
        dayTime.setAttribute("src", "icons/day.png");
    } else dayTime.setAttribute("src", "icons/night.png");

    // update the weather card with current weather condition :
    // make a async function that populates the data with 1 currentHTML, 2 weather icon and 3 two weeks array
    current.innerHTML = `
    <h5 class="city-name">${city}</h5>
                    <div class="weather-condition">
                        <span>${data.current_condition[0].weatherDesc[0].value}</span><br>
                        <span>CLOUD COVER: ${data.current_condition[0].cloudcover}%</span>

                    </div>
                    <div class="temperature">
                        <span>${data.current_condition[0].temp_C}</span>
                        <span>&deg;C</span> / <span>${data.current_condition[0].temp_F}</span>
                        <span>&deg;F</span>
                    </div>
                    `;

    // update the icon with api provided image
    icon.setAttribute(
        "src",
        `${data.current_condition[0].weatherIconUrl[0].value}`
    );

    //render the 14 days array into the html:
    let aggregatedTwoWeeksData = data.weather.reduce((result, object, i) => {
        return (
            result +
            `<div id="array-element">
                    <span>${i}</span>
                    <span>${object.date}</span>
                    <span>${object.avgtempC}</span>
                    <span>&deg;C</span> / <span>${object.avgtempF}</span>
                    <span>&deg;F</span>
                    <br>
                </div>`
        );
    }, "");

    twoWeeksForecast.innerHTML = aggregatedTwoWeeksData;
};

// const results = cities.map(async ({ value }) => {
//     try {
//         getWeather(value).then((data) => {
//             console.log("try block data and value: ", data, value),
//                 updateCard(data, value);
//         });
//     } catch (err) {
//         console.log(err);
//     }
// });
