import axios from "axios";

class Api {
    #geopositionUrl = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search'
    #weatherUrl = 'http://dataservice.accuweather.com/forecasts/v1/daily/1day/'

    #geoPositionApiKey = 'vGawnsJPU3fVEdh9N8oKGAFMuOcgN8aZ'
    #weatherApiKey = '3BFGYrK2E16wZtZh1AABPGtBBr9iOfHt'
    #api = axios.create()

    constructor() {
        this.#api.interceptors.request.use(config => {
            config.params = config.params || {}

            config.params.details = 'true'
            config.params.language = 'pt-br'

            return config
        })
    }

    async getCity(lat, lon) {
        const response = await axios.get(this.#geopositionUrl, {
            params: {
                q: `${lat},${lon}`,
                apikey: this.#geoPositionApiKey
            }
        })
            .then(response => response.data)
            .catch(err => { console.log(err); return false })

        return response
    }
}

export default new Api()