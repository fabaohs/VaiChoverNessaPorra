import axios from "axios";

class Api {
    #tomorrowApiUrl = 'https://api.tomorrow.io/v4/weather/forecast'
    #openWeatherApiUrl = 'http://api.openweathermap.org/geo/1.0/direct'

    #tomorrowApiKey = 'wBykIj0F2H0yv3TpijbeQVVvQaipx3fR'
    #openWeatherApiKey = '8d73e549e7b857c5e74599ee42b94991'

    #api = axios.create()

    constructor() {
        this.#api.interceptors.request.use(config => {
            config.params = config.params || {}

            return config
        })
    }

    async getCity(lat, lon) {
        console.log('Latitude e Longitude', { lat, lon })

        const response = await this.#api.get(this.#tomorrowApiUrl, {
            params: {
                location: `${lat},${lon}`,
                timesteps: '1d',
                units: 'metric',
                apikey: this.#tomorrowApiKey
            }
        })
            .then(response => response.data)
            .catch(err => { console.log(err); return false })
        console.log(response)
        return response
    }

    async searchCity(city) {
        console.log(city)

        if (city === '') {
            return []
        }

        const response = await this.#api.get(this.#openWeatherApiUrl, {
            params: {
                appid: this.#openWeatherApiKey,
                q: city,
                limit: 100
            }
        })
            .then(response => response.data)
            .catch(err => { console.log(err); return false })

        return response
    }
}


export default new Api()