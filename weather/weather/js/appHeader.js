import { getWeatherData } from "./api.js";
import { handleWeatherByGeolocation } from "./geolocation.js";
import { resetWeatherContent } from "./helper.js";

export const createHeader = (city) => {
    const header = document.createElement('header');
    const headerContainer = document.createElement('div');
    const headerName = document.createElement('p');
    const headerCity = document.createElement('div');
    const headerUnits = document.createElement('div');
    const cityChange = document.createElement('button');
    const cityLocation = document.createElement('button');
    const cityName = document.createElement('h1');
    const searchBlock = document.createElement('div');
    const searchInput = document.createElement('input');
    const searchBtn = document.createElement('button');
    const errorBlock = document.createElement('p');

    header.classList.add('header');
    headerContainer.classList.add('container', 'header__container');
    header.classList.add('header__name');
    headerCity.classList.add('header__city');
    headerUnits.classList.add('header__units');
    cityChange.classList.add('city__change', 'btn-reset');
    cityLocation.classList.add('city__location', 'btn-reset');
    cityName.classList.add('city__name');
    searchBlock.classList.add('search');
    searchInput.classList.add('search_input');
    searchBtn.classList.add('search_btn');
    errorBlock.classList.add('search__error');

    searchBtn.textContent = 'ok';
    cityName.textContent = city;
    headerName.textContent = 'Weather';
    cityChange.textContent = 'Сменить город';
    cityLocation.textContent = 'Мое местоположение';

    cityChange.addEventListener('click', () => {
        headerCity.innerHTML = '';
        searchBlock.append(searchInput, searchBtn, errorBlock);
        headerCity.append(searchBlock);
    });

    const showError = (message) => {
        errorBlock.classList.add('show-error');
        errorBlock.textContent = message;
    }

    searchBtn.addEventListener('click', async () => {
        if (!searchInput.value) {
            return;
        }

        try {
            const weather = await getWeatherData(searchInput.value);

            if(weather.message) {
                showError(weather.message);
                return;
            }

            resetWeatherContent(weather.name, weather);
        } catch (error) {
            console.log(error);
        }
    });

    window.addEventListener('click', (e) => {
        if(e.target == searchInput || e.target == searchBtn || e.target == cityChange) {
            return;
        } else {
            headerCity.innerHTML = '';
            errorBlock.classList.remove('show-error');
            searchInput.value = '';
            headerCity.append(cityName);
        }
    });

    cityLocation.addEventListener('click', handleWeatherByGeolocation);

    header.append(headerName, headerContainer, cityLocation, cityChange);
    headerContainer.append(headerCity, headerUnits);
    headerCity.append(cityName);

    return header;
}