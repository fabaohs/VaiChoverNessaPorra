import axios from "axios";

class Api {
    #geopositionUrl = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search'
    #weatherUrl = 'http://dataservice.accuweather.com/forecasts/v1/daily/1day/'

    #geoPositionApiKey = 'vGawnsJPU3fVEdh9N8oKGAFMuOcgN8aZ'
    #api = axios.create()

    constructor() {
        this.#api.interceptors.request.use(config => {
            config.params = config.params || {}

            config.params.details = 'true'
            config.params.language = 'pt-br'
            config.params.apikey = this.#geoPositionApiKey

            return config
        })
    }

    async getCity(lat, lon) {
        const response = await this.#api.get(this.#geopositionUrl, {
            params: {
                q: `${lat},${lon}`,
            }
        })
            .then(response => response.data)
            .catch(err => { console.log(err); return false })

        return response
    }

    async getWeather(city) {
        const response = await this.#api.get(`${this.#weatherUrl}/${city}`)
            .then(response => response.data)
            .catch(err => { console.log(err); return false })

        return response
    }
}

export default new Api()