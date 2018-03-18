import API from '../lib/api';

class CallFactory {

    static resource = 'calls';

    static async list() {
        let data = await API.request(`/${this.resource}`, 'GET')
        return await data.json()
    }

    static async getById(id) {
        let data = await API.request(`/${this.resource}/${id}`, 'GET')
        return await data.json()
    }

    static async getAudioById(id) {
        window.open(`${API.url}/${this.resource}/${id}/audio`, '_blank')
        return
    }

    static async create(record) {
        let data = await API.upload(`/${this.resource}/`, 'POST', { record })
        return await data.json()
    }

}

export { CallFactory }