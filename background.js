// background.js

import bitflyer from './bitflyer-api'

function getPrices() {
    //TODO dummy data
    return {
        bitflyer: {
            price: Math.ceil((Math.random() + 1) * 1000000)
        }
    }
}

function update() {
    let prices = getPrices()
    if (prices && prices.bitflyer) {
        updateBadgeWithPrice(prices['bitflyer'].price)
    } else {
        console.warn('could not get any price, skip')
        updateBadgeWithUnknown()
    }

}

function updateBadgeWithPrice(price) {
    let priceIn10Thousand = Math.ceil(price / 10000)
    chrome.browserAction.setBadgeText({ text: priceIn10Thousand.toString() + 'w' })
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
    chrome.alarms.create('refresh', { periodInMinutes: 0.2 })
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
