export const getWeatherData = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2b3c898b585fd94c91b2c839cec326b0&lang=ru&units=metric`);

        return await response.json();
    } catch (error) {
        console.error(error);
        console.log("Ops! Something went wrong");
    }
}
