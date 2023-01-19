import * as path from 'path';
// eslint-disable-next-line node/no-unpublished-import
import puppeteer from 'puppeteer';

function getPath(filename: string) {
    return path.join(__dirname, '..', 'assets', filename)
}

async function sleep(ms = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function main() {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({width: 1920, height: 1080})

    await page.goto('http://localhost:3000')
    await page.screenshot({path: getPath('landing-page.png')})

    await page.click('#nav-button-framework')
    await page.screenshot({path: getPath('framework.png')})

    await page.goto('http://localhost:3000/classification');
    await page.click('#panel1a-header')
    await sleep()
    await page.screenshot({path: getPath('classification.png')})

    await page.goto('http://localhost:3000/questionnaire');
    await page.screenshot({path: getPath('questionnaire.png')})

    await page.setViewport({width: 1080, height: 1900})
    await page.goto('http://localhost:3000')
    await page.screenshot({path: getPath('tosss.png')})

    await browser.close()
}

main();
