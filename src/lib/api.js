class API {

    static url = 'https://izity-api.herokuapp.com'

    static async request(path, method, body) {
        return await fetch(`${API.url}${path}`, {
            headers: new Headers({ 'Content-Type': 'application/json' }),
            method: method,
            body: JSON.stringify(body)
        })
    }

    static async upload(path, method, body) {
        let formData  = new FormData()
        for(let name in body) {
            formData.append(name, body[name])
        }
        console.log(formData)
        return await fetch(`${API.url}${path}`, {
            method: method,
            body: formData
        })
    }

}

export default API