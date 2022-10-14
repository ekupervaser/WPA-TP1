const apiKey = "52f0017957482e60439b6f8d8ec85ca2";

let video = document.getElementById("video");
let busqueda = document.getElementById("userInput");
let boton = document.getElementById("boton");
let contenedor = document.getElementById("show");
let lugar = document.getElementById("lugar");
let img = document.getElementById("imagen-icono");
let clima = document.getElementById("weather-main");
let temp = document.getElementById("temp");
let max = document.getElementById("max");
let min = document.getElementById("min");
let humedad = document.getElementById("humedad");
let st = document.getElementById("st");
let pa = document.getElementById("pa");
let vv = document.getElementById("vv");


// Si hay una ciudad guardada en local storage, se muestra la info de esas ciudad
if (localStorage.getItem("ciudad")) {
    let city = localStorage.getItem("ciudad");
    getWeatherFromStorage(city); 
    // Si no hay ciudad guardada en local storage, solicito permiso GEO para mostrar del lugar donde está el usuario
} else {
    weatherByGeo();
}


// Función para obtener el clima de la ciudad por geolocalización
function weatherByGeo () {
window.addEventListener("load", () => {
    let lon;
    let lat;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(geolocalizacion => {
            lon = geolocalizacion.coords.longitude;
            lat = geolocalizacion.coords.latitude;
           
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=sp`
            fetch(url)
            .then(response => response.json())
            .then(data => showResults(data))
            .catch(error => searchError());

            console.log(url)
        })
    }
})
}


// Función para obtener el clima a partir de la barra de búsqueda
function getWeather() {
    city = busqueda.value;
    localStorage.setItem("ciudad", busqueda.value)
    const options = {
        method: 'GET'
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=sp`
    fetch(url, options)
    .then(response => response.json())
    .then(data => showResults(data))
    .catch(error => searchError());
}


// Función para obtener el clima a partir de la información guardada en local storage
function getWeatherFromStorage(city) {
    const options = {
        method: 'GET'
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=sp`
    fetch(url, options)
    .then(response => response.json())
    .then(data => showResults(data))
    .catch(error => searchError());
}


// Función para mostrar los resultados
function showResults(data) {

    tempFormat = data.main.temp.toString().slice(0, -1);
    stFormat = data.main.temp.toString().slice(0, -1);
    tempMinFormat = data.main.temp_min.toString().slice(0, -1);
    tempMaxFormat = data.main.temp_max.toString().slice(0, -1);

    lugar.innerHTML = (data.name)
    img.innerHTML = `<img src="https://openweathermap.org/img/wn/${(data.weather[0].icon)}@2x.png" alt="${(data.weather[0].description)}">`;
    clima.innerHTML = capitalizeFirstLetter(data.weather[0].description);
    temp.innerHTML = `Temperatura actual: ${(tempFormat)}°`;
    st.innerHTML = `ST: ${stFormat}°`;
    min.innerHTML = `Mínima: ${tempMinFormat} °C`;
    max.innerHTML = `Máxima: ${tempMaxFormat} °C`;
    humedad.innerHTML = `Humedad: ${(data.main.humidity)}%`;
    pa.innerHTML = `Presión atmosférica: ${(data.main.pressure)} hPa`;
    vv.innerHTML = `Velocidad del viento: ${(data.wind.speed)} m/s`;

    if(data.weather[0].id >= 200 && data.weather[0].id <= 232) {
        video.src = "/img/Thunderstorm.mp4"
    } else if (data.weather[0].id >= 300 && data.weather[0].id <= 321) {
        video.src = "/img/Drizzle.mp4"
    } else if (data.weather[0].id >= 500 && data.weather[0].id <= 531) {
        video.src = "/img/Rain.mp4"
    } else if (data.weather[0].id >= 600 && data.weather[0].id <= 622) {
        video.src = "/img/Snow.mp4"
    } else if (data.weather[0].id == 800) {
        video.src = "/img/Clear.mp4"
    } else if (data.weather[0].id >= 801 && data.weather[0].id <= 804) {
        video.src = "/img/Clouds.mp4"
    }
    
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

function removeLastCharacter (string) {
   let newString = string.slice(0, str.length - 1);
    return newString
}

  function searchError () {
    lugar.innerHTML = `No se encontró el lugar buscado. Prueba con otro lugar.`;
    img.innerHTML = "";
    clima.innerHTML = "";
    temp.innerHTML = "";
    st.innerHTML = "";
    min.innerHTML = "";
    max.innerHTML = "";
    humedad.innerHTML = "";
    pa.innerHTML = "";
    vv.innerHTML = "";

    return lugar;
  }

boton.addEventListener("click", getWeather);

busqueda.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("boton").click();
  }
});