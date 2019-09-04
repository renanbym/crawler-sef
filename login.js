const openPage = require('./openPage')
const logger = require('./logger')

module.exports = async (browser, email, password) => {
    const loginUrl = 'https://www.sef.pt/pt/Pages/Homepage.aspx'
    const page = await openPage(browser, loginUrl)
    logger.info('login', `logging at: ${loginUrl}`)


    const build = async (select, name) => {
        await page.select('#Places_List', select);
        logger.info('login', `Selecionou ${select} - ${name}`)

        await page.waitFor(10000);
        await page.screenshot({ path: `img/${select}-${name}.png` });
    }


    await page.goto(loginUrl)
    await page.waitFor('#txtUsername')

    await page.$('#pnlLogin a').then((btn) => btn.click());
    await page.$('#txtUsername').then((emailElement) => emailElement.type(email, { delay: 100 }))
    await page.$('#txtPassword').then((passwordElement) => passwordElement.type(password, { delay: 100 }))
    await page.$('#btnLogin').then((button) => button.click())

    logger.info('login', 'Waiting to login');
    await page.waitFor(5000);

    await page.goto('https://www.sef.pt/pt/mySEF/Pages/agendamento.aspx')
    logger.info('login', 'pagina de agendamento')

    await page.select('#Services_List', '7');
    logger.info('login', 'Selecionou titulo de residencia')

    await page.waitFor(10000);

    await build('316', 'Posto de Atend. Portas Benfica');
    await build('300', 'Dir. Regional de Lisboa, Vale do Tejo e Alentejo');
    await build('3PF', 'DRLVTA - Posto SEF CNAI-Lisboa');
    await build('350', 'Delegação de Santarém');

    await page.close()
    logger.info('login', 'Close')

    return true;
}
