import { useState } from 'react'

const Weather = () => {
    // estado que almacena el nombre de la ciudad consultada
    const [city, setCity] = useState('')
    // estado para almacenar la informacion del clima retornado por la API
    const [weatherData, setWeatherData] = useState(null)
    // estado para el manejo de errores

    const API_KEY = '826cfd120ad34f84b8335702250106'
    const BASE_URL = 'http://api.weatherapi.com/v1'

    // funcion que se ejecuta al enviar el formulario
    const fetchWeather = async (e) => {
        e.preventDefault() // evita que la pagina se recargue al enviar el formulario

        // si el campo de ciudad esta vacio, no se realiza ninguna peticion
        if (!city) return

        try {
            // se realiza la peticion a la URL de la API, pasando como parametros la API_KEY y el nombre de la ciudad
            const response = await fetch(
                `${BASE_URL}/current.json?key=${API_KEY}&q=${city}`
            )

            // si la peticion no fue exitosa, se lanza un error
            if (!response.ok) throw new Error('City not found')

            // se convierte la respuesta en un objeto JSON
            const data = await response.json()

            setWeatherData(data) // se guarda la data en el estado
        } catch (error) {
            console.log(error)
            alert(error.message) // si ocurre un error se muestra
            setWeatherData(null) // se limpia el estado que almacena informacion anterior
        }
    }

    return (
        <form className="form" onSubmit={fetchWeather}>
            <div className="form_input__container">
                <input
                    className="form_input"
                    placeholder="Search"
                    onChange={(e) => setCity(e.target.value.toLocaleUpperCase())}
                    value={city}
                />
                <button className="form-btn" type="submit">
                    <span className="material-symbols-outlined">search</span>
                </button>
            </div>
            {weatherData ? (
                <div className="weather-info__container">
                    <div className="weather-info">
                        <img src={weatherData.current.condition.icon} alt="" />
                        <span className="weather-info__temp">
                            {Math.round(weatherData.current.dewpoint_c)} °C
                        </span>
                        <h3>{weatherData.location.country}</h3>
                        <h2>{weatherData.location.name}</h2>
                    </div>
                    <div className="weather-info__metadata">
                        <div>
                            <span className="material-symbols-outlined">water</span>
                            <span>{weatherData.current.humidity}%</span>
                            <span>Humidity</span>
                        </div>
                        <div>
                            <span className="material-symbols-outlined">air</span>
                            <span>{weatherData.current.wind_kph} Km/h</span>
                            <span>Wind speed</span>
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}
        </form>
    )
}

export default Weather
