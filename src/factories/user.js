import API from '../lib/api';

class UserFactory {

    static resource = 'users';

    static async list() {
        let data = await API.request(`/${this.resource}`, 'GET')
        return await data.json()
    }

    static async getById(id) {
        let data = await API.request(`/${this.resource}/${id}`, 'GET')
        return await data.json()
    }

    static async create(user) {
        let data = await API.request(`/${this.resource}/`, 'POST', user)
        return await data.json()
    }

    static async update(user) {
        let data = await API.request(`/${this.resource}/${user._id}`, 'PUT', user)
        return await data.json()
    }

    static async train(user, record) {
        let data = await API.upload(`/${this.resource}/${user._id}/train`, 'POST', { record })
        return await data.json()
    }

    static async verify(user, record) {
        let data = await API.upload(`/${this.resource}/${user._id}/verify`, 'POST', { record })
        return await data.json()
    }

    static async delete(id) {
        let data = await API.request(`/${this.resource}/${id}`, 'DELETE')
        return data.status === 200
    }

    static async resetVoiceprint(id) {
        let data = await API.request(`/${this.resource}/${id}/resetVoiceprint`, 'DELETE')
        return data.status === 200
    }

}

export { UserFactory }