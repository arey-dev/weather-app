// test
const KEY = "54606dac77b8599c32e90d01077bfac0";

// work on search input

getWeatherApi("Manila");

async function getGeocodeApi(city) {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${KEY}`;

  const response = await fetch(url, { mode: "cors" });
  const data = await response.json();

  console.log(data);
  return data;
}

async function getWeatherApi(city) {
  const geocode = await getGeocodeApi(city);
  const lat = geocode[0].lat;
  const lon = geocode[0].lon;

  const UNIT = "metric";
  
  // doesn't return desired city
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}&units=${UNIT}`;

  const response = await fetch(url, { mode: "cors" });
  const data = await response.json();

  console.log(data);

  // create weather obj
  const weatherData = weather(data);
  fillCardInfo(weatherData);
}

// returns an object with the needed weather data
function weather(obj) {
  const fixDecimalPoint = (value, places) => {
    return value.toFixed(places);
  };

  const parseDate = (dt, timezone) => {
    const date = new Date(dt * 1000 + timezone * 1000);
    const hours = date.getUTCHours();
    const minutes = "0" + date.getUTCMinutes();

    return hours + ":" + minutes.slice(-2);
  };

  const convertMphToKph = (value) => {
    return value * 3.6;
  };

  return {
    city: obj.name,
    dt: parseDate(obj.dt, obj.timezone),
    temp: fixDecimalPoint(obj.main.temp, 1),
    weather: obj.weather[0].description,
    icon: obj.weather[0].icon,
    wind: fixDecimalPoint(convertMphToKph(obj.wind.speed), 1),
    humid: obj.main.humidity,
    clouds: obj.clouds.all,
  };
}

function fillCardInfo(obj) {
  const place = document.getElementById("place");
  const time = document.getElementById("time");
  const temp = document.getElementById("temp");
  const weather = document.getElementById("weather");
  const wind = document.getElementById("wind");
  const humid = document.getElementById("humid");
  const clouds = document.getElementById("clouds");
  const icon = document.getElementById("weather-icon");

  place.textContent = obj.city;
  time.textContent = obj.dt;
  temp.textContent = obj.temp + "°C";
  weather.textContent = obj.weather;
  wind.textContent = obj.wind + " km/h";
  humid.textContent = obj.humid + " %";
  clouds.textContent = obj.clouds + " %";

  const icon_url = `http://openweathermap.org/img/wn/${obj.icon}.png`;
  icon.src = icon_url;
}
