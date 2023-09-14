import axios from "axios";

class Api {
    #baseUrl = 'https://api.tomorrow.io/v4/weather/forecast'

    #apikey = 'wBykIj0F2H0yv3TpijbeQVVvQaipx3fR'

    #api = axios.create()

    constructor() {
        this.#api.interceptors.request.use(config => {
            config.baseURL = this.#baseUrl

            config.params = config.params || {}
            config.params.apikey = this.#apikey

            return config
        })
    }

    async getCity(lat, lon) {
        console.log('Latitude e Longitude', { lat, lon })

        const response = await this.#api.get('', {
            params: {
                location: `${lat},${lon}`,
                timesteps: '1d',
                units: 'metric',
            }
        })
            .then(response => response.data)
            .catch(err => { console.log(err); return false })

        return response
    }

    async searchCity(city) {
        //     console.log(city)

        //     if (city === '') {
        //         console.log('City is empty')
        //         return
        //     }

        //     const response = await this.#api.get(`${this.#getCityUrl}?q=${city}`, {
        //         params: { apikey: this.#searchCityApiKey }
        //     })
        //         .then(response => response.data)
        //         .catch(err => { console.log(err); return false })

        //     return response
        // }
    }
}

export default new Api()