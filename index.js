// test
const KEY = "54606dac77b8599c32e90d01077bfac0";

async function getWeatherApiData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}`;
  const response = await fetch(url, { mode: "cors" });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error(response.status);
  }
}

getWeatherApiData("London")
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
