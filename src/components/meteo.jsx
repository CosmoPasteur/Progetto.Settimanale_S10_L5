useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const geoResponse = await fetch(``
          http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=b6b74c121d0d6facac90def2acb25803
        );
        const geoData = await geoResponse.json();
        const { lat, lon } = geoData[0];

        // Chiamata per il meteo attuale
        const weatherResponse = await fetch(
          https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b6b74c121d0d6facac90def2acb25803
        );
        const weatherData = await weatherResponse.json();
        setWeatherData(weatherData);

        // Chiamata per la previsione meteo dei prossimi 5 giorni
        const forecastResponse = await fetch(
          https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=b6b74c121d0d6facac90def2acb25803
        );
        const forecastData = await forecastResponse.json();
        setForecastData(forecastData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };