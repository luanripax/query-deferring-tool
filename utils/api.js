const puppeteer = require('puppeteer');

let getAPIData = async (query, host, port, db) => {
    const queryEncoded = Buffer.from(query).toString('base64');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`${host}:${port}/relax/api/${db}?query=${queryEncoded}`);
    const html = await page.evaluate(() => document.documentElement.outerHTML);
    await browser.close();
    return html;
}

module.exports = getAPIData;