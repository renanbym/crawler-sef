const puppeteer = require('puppeteer')
const login = require('./login')
const logger = require('./logger')
const config = require('./config')

const init = async () => {

    logger.info('scrapedin', 'initializing')

    const browser = await puppeteer.launch(Object.assign({ headless: true }))

    try {
        await login(browser, config.user, config.pass, logger)
    } catch (e) {
        await browser.close()
        throw e
    }
}

init();