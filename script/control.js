import {setByCoordinates, setWeather} from "./weather.js";
import {updateMap} from "./map.js";

export const appConfig = {
    _locale: "en",
    scale: "celcius", 
    _city: "Minsk",
    _coordinates : [],

    set locale(value) {
        this._locale = value;

        const feelsLikeLabel = document.getElementById("feels-like-label");
        const windLabel = document.getElementById("wind-label");
        const humidityLabel = document.getElementById("humidity-label");
        const searchButton = document.getElementById("search-button");
        const longitudeLabel = document.getElementById("longitude-label");
        const latitudeLabel = document.getElementById("latitude-label");

        feelsLikeLabel.innerHTML = localeStrings[value]["feels-like"];
        windLabel.innerHTML = localeStrings[value]["wind"];
        humidityLabel.innerHTML = localeStrings[value]["humidity"];
        searchButton.innerHTML = "<h4>" + localeStrings[value]["search"] + "</h4>";
        longitudeLabel.innerHTML = localeStrings[value]["longitude"];
        latitudeLabel.innerHTML = localeStrings[value]["latitude"];
        
        setWeather();
    },
    get locale() {
        return this._locale;
    },
    set coordinates(value) {
        this._coordinates = value;
        setByCoordinates(value);
        updateMap(value);
    },
    get coordinates() {
        return this._coordinates;
    },
    set city(value) {
        this._city = value;
        setWeather();
    },
    get city() {
        return this._city;
    },
}

const localeStrings = {
    "ru" : {
        "feels-like" : "ощущается",
        "wind" : "ветер",
        "humidity" : "влажность",
        "search": "поиск",
        "latitude": "широта",
        "longitude": "долгота"
    }, 
    "en" : {
        "feels-like" : "feels like",
        "wind" : "wind",
        "humidity" : "humidity",
        "search": "search",
        "latitude": "latitude",
        "longitude": "longitude"
    }
}

appConfig.locale="ru";

var x = 0;
var position = 0;
let temperatureChoice = document.getElementById("temperature-choice");
temperatureChoice.addEventListener("click", animateSlider);

function animateSlider(e) {
    position = position == 0 ? 1 : 0;
    let temperatureChoiceSlider = document.getElementById("temperature-choice-slider");
    if (x == 0) {
        temperatureChoiceSlider.animate([
            {transform: `translate3D(${x}px, 0, 0)`},
            {transform: 'translate3D(44px, 0, 0)'},
        ], {
            duration: 200,
            iterations: 1, 
            fill: 'forwards'
        });
        x += 44;
    } else  {
        temperatureChoiceSlider.animate([
            {transform: `translate3D(${x}px, 0, 0)`},
            {transform: 'translate3D(0px, 0, 0)'},
        ], {
            duration: 200,
            iterations: 1, 
            fill: 'forwards'
        });
        x -= 44;
    }
};

const languageChoice = document.getElementById("language-choice");

languageChoice.onclick = () => {
    let activeChoice = document.getElementById("active-option");
    if (appConfig.locale == "ru") {
        activeChoice.innerHTML = "EN";
        appConfig.locale = "en";
    } else {
        activeChoice.innerHTML = "RU";
        appConfig.locale = "ru";
    }
}