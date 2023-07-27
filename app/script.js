const WEATHER_API = "ad83d224fd1ac6e5cf53a6fea4ef20e4";
const GEO_API = "at_cW8uAOLDq5QVPoLm7WqVIFDynqp8u";

//* старт получения данных API */
/* проверка есть ли в браузере геолокация */

function findLocation() {
    if (!navigator.geolocation) {
        console.log('Ваш браузер не дружит с геолокацией...')
        
    } else {
        navigator.geolocation.getCurrentPosition(getWeather, getCityWeather);
    }
}
findLocation()

/* если успешна проверка то чекаем погоду */
async function getWeather(position) {
    const lon = position.coords.longitude;
    const lat = position.coords.latitude;
    const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API}&units=metric`;
    const res = await fetch(WEATHER_URL)
    const data = await res.json()
    const temp = data.main.temp;
    
    return temp;
}


/* получаю ip */
async function getIp () {
    const IP_URL = "https://api64.ipify.org";
    const res = await fetch(IP_URL)
    const ip = await res.text();
    return ip
}


/* получение города */

async function getCity() {
    const ip = await getIp()
    const GEO_URL = `https://geo.ipify.org/api/v2/country,city?apiKey=${GEO_API}&ipAddress=${ip}`;
    const res = await fetch(GEO_URL)
    const cityInfo = await res.json()
    const city = cityInfo.location.city
    return city;
}

/* погода по городу */

async function getCityWeather() {
    const city = await getCity()
    const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API}&units=metric`;
    const res = await fetch(WEATHER_URL)
    const cityWeather = await res.json()
    console.log(cityWeather);
    // return cityWeather
}
// getCityWeather()
//* конец получения данных API */
