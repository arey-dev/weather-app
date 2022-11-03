// test
getWeatherApi("manila");

async function getWeatherApi(city) {
  const KEY = "54606dac77b8599c32e90d01077bfac0";
  const UNIT = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=${UNIT}`;

  const response = await fetch(url, { mode: "cors" });
  const data = await response.json();

  console.log(data);

  // create weather obj
  const weatherData = weather(data);
  fillCardInfo(weatherData);
}

// returns an object with the needed weather data
function weather(obj) {
  const parseTemp = (value) => {
    return value.toFixed(1);
  };

  const parseDate = (dt, timezone) => {
    const date = new Date(dt * 1000 + timezone * 1000);
    const hours = date.getUTCHours();
    const minutes = '0' + date.getUTCMinutes();

    return hours + ":" + minutes.slice(-2);
  };

  const parseWind = (value) => {
    return (value * 3.6).toFixed(1);
  };

  return {
    city: obj.name,
    dt: parseDate(obj.dt, obj.timezone),
    temp: parseTemp(obj.main.temp),
    weather: obj.weather[0].description,
    icon: obj.weather[0].icon,
    wind: parseWind(obj.wind.speed),
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

  const ICON_URL_BASE = "http://openweathermap.org/img/wn/";
  const IMAGE_EXT = ".png"
  icon.src = ICON_URL_BASE + obj.icon + IMAGE_EXT;
}
