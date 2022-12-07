import { capitalizeFirstLetter } from "./helper.js";

export const createContent = (data) => {
    const main = document.createElement('main');
    const section = document.createElement('section');
    const container = document.createElement('div');
    const inner = document.createElement('div');
    const temperature = document.createElement('h2');
    const units = document.createElement('span');
    const description = document.createElement('p');
    const weatherInfo = document.createElement('div');

    section.classList.add('weather');
    container.classList.add('container', 'weather__container');
    inner.classList.add('weather__inner');
    temperature.classList.add('weather__temperature');
    units.classList.add('weather__units');
    description.classList.add('weather__description');
    weatherInfo.classList.add('weather-info');
    temperature.textContent = Math.floor(data.main.temp);
    description.textContent = capitalizeFirstLetter(data.weather[0].description);
    units.textContent = '℃';

    const createWeatherItemTitle = (text) => {
        const span = document.createElement('span');
        span.textContent = text;

        return span;
    }

    weatherInfo.append(
        createWeatherItemTitle('With love by Nika'),
    );

    main.append(section);
    section.append(container);
    container.append(inner, description, weatherInfo);
    inner.append(temperature, units);

    return main;
}