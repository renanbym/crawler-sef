const fs = require('fs');
const express = require('express')
const app = express()
const port = 8080
const puppeteer = require('puppeteer')
const login = require('./login')
const logger = require('./logger')
const config = require('./config')

const getFiles = (dir) => {

    return fs.readdirSync(dir).reduce((acc, file) => {
        acc.push(file)
        return acc;
    }, []);

}

app.use(express.static('img'))
app.set('view engine', 'pug')
app.get('/', function (req, res) {
    res.render('./index', { title: 'Try SEF', files: getFiles('img') })
})

app.post('/apagar', function (req, res) {

    for (const arq of getFiles('img')) {
        fs.unlink(`img/${arq}`, function (err, res) {
     
        });
    }

    res.status(200).end();
})

app.post('/gerar', async function (req, res) {


    logger.info('scrapedin', 'initializing')

    const browser = await puppeteer.launch(Object.assign({ headless: true }))

    try {
        await login(browser, config.user, config.pass, logger)
    } catch (e) {
        await browser.close()
        throw e
    }

    res.status(200).end();
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))