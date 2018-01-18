// bitflyer api client

import request from 'request'
import crypto from 'crypto'

const API_ENDPOINTS = {
    BOARD: {
        method: 'POST',
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
        call(API_ENDPOINTS.BOARD)
    }

    call(endpoint) {

    }
}

export default bitflyer = new Bitflyer()