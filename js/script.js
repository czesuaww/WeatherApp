let $input;
let $button;
let $cityName;
let $warning;
let $photo;
let $weatherr;
let $temperature;
let $humidity;

const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=34c3f8263d75ddc4ac5c0d94575ce3a2";
const API_UNITS = "&units=metric";

const prepareDOMElements = () => {
  $input = document.querySelector("input");
  $button = document.querySelector(".top__mainInfo-buttons-send");
  $cityName = document.querySelector(".top__mainInfo-cityName");
  $warning = document.querySelector(".top__mainInfo-warning");
  $photo = document.querySelector(".top__mainInfo-photo");
  $weatherr = document.querySelector(".bottom__weatherInfo-weather");
  $temperature = document.querySelector(".bottom__weatherInfo-temperature");
  $humidity = document.querySelector(".bottom__weatherInfo-humidity");
};

const prepareDOMEvents = () => {
  const getWeather = () => {
    const city = $input.value;
    const URL = API_LINK + city + API_KEY + API_UNITS;

    axios
      .get(URL)
      .then((res) => {
        console.log(res.data);
        const temp = res.data.main.temp;
        const hum = res.data.main.humidity;
        // const status = Object.assign({}, ...res.data.weather);
        const status = res.data.weather[0];
        console.log(temp);
        console.log(hum);
        console.log(status);

        $cityName.textContent = res.data.name;
        $temperature.textContent = Math.floor(temp) + "°C";
        $humidity.textContent = hum + "%";
        $weatherr.textContent = status.main;
        $warning.textContent = "";
        $input.value = "";

        if (status.id >= 200 && status.id < 300) {
          $photo.setAttribute("src", "./img/thunderstorm.png");
        } else if (status.id >= 300 && status.id < 400) {
          $photo.setAttribute("src", "./img/drizzle.png");
        } else if (status.id >= 500 && status.id < 600) {
          $photo.setAttribute("src", "./img/rain.png");
        } else if (status.id >= 600 && status.id < 700) {
          $photo.setAttribute("src", "./img/snowy.png");
        } else if (status.id >= 700 && status.id < 800) {
          $photo.setAttribute("src", "./img/foog.png");
        } else if (status.id === 800) {
          $photo.setAttribute("src", "./img/sun.png");
        } else if (status.id >= 800 && status.id < 900) {
          $photo.setAttribute("src", "./img/cloud.png");
        } else {
          $photo.setAttribute("src", "./img/unknown.png");
        }
      })
      .catch(() => ($warning.textContent = "Please enter a valid city name"));
  };

  const enterCheck = (e) => {
    if (e.key === "Enter") {
      getWeather();
    }
  };

  $input.addEventListener("keyup", enterCheck);
  $button.addEventListener("click", getWeather);
  getWeather();
};

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
};

document.addEventListener("DOMContentLoaded", main);
