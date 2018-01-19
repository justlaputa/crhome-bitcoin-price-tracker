// background.js

let bitflyer = new Bitflyer('', '')

function getPrice() {
    return bitflyer.getboard().then(board => {
        console.debug('get price from bitflyer api: ', board)
        return board.mid_price
    })
}

function update() {
    getPrice().then(price => {
        updateBadgeWithPrice(price)
    }).catch(err => {
        console.warn('could not get any price, skip')
        updateBadgeWithUnknown()
    })
}

function updateBadgeWithPrice(price) {
    let priceIn10Thousand = Math.ceil(price / 1000)
    chrome.browserAction.setBadgeText({ text: priceIn10Thousand.toString() })
}

function updateBadgeWithUnknown() {
    chrome.browserAction.setBadgeText({ text: '??' })
    chrome.browserAction.setBadgeBackgroundColor({ color: '#FF0000' })
}

function start() {
    update()
}

function onAlarm(alarm) {
    console.debug('got alarm', alarm)
    if (alarm && alarm.name == 'refresh') {
        console.log('got refresh alarm, updating again...')
        update()
    }
}

function setup() {
    chrome.alarms.onAlarm.addListener(onAlarm)
    chrome.alarms.create('refresh', { periodInMinutes: 1 })
}


if (chrome.runtime && chrome.runtime.onStartup) {
    chrome.runtime.onStartup.addListener(() => {
        console.log('starting...')
        setup()
        start()
    })
}

chrome.management.getSelf((info) => {
    if (info.installType === 'development') {
        setup()
        start()
    }
})
