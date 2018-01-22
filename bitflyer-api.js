// bitflyer api client

const API_ENDPOINTS = {
    BOARD: {
        method: 'GET',
        path: '/board'
    }
}

class Bitflyer {
    constructor(key, secret) {
        this.apiHostUrl = 'https://api.bitflyer.jp/v1/'
        this.apiKey = key
        this.apiSecret = secret
    }

    getboard() {
        return this.call(API_ENDPOINTS.BOARD)
    }

    call(ep) {
        let url = this.apiHostUrl + ep.path
        let options = {
            method: ep.method
        }

        return fetch(url, options).then(r => r.json())
    }
}
