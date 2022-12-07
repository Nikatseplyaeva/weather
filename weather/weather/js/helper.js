import { createContent } from "./appContent.js";
import { createHeader } from "./appHeader.js";

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const resetWeatherContent = (city, weather) => {
    localStorage.setItem('city', JSON.stringify(city));
    document.body.innerHTML = '';
    const header = createHeader(city);
    const content = createContent(weather);
    document.body.append(header, content);
}