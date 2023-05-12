declare var ttMETA: any;
declare var adobe: any;
declare var $: any;

import pupeteer from "puppeteer";
import { IScan } from "../types/common.types";
import puppeteer from "puppeteer";

class PuppeteerBrowser {
    browser;

    constructor(browser: any) {
        this.browser = browser;
    }

    static async build() {
        let browser = await pupeteer.launch({
            executablePath:
                process.env.NODE_ENV === "production"
                    ? process.env.PUPPETEER_EXECUTABLE_PATH
                    : puppeteer.executablePath(),
            headless: true,
            devtools: false,
            defaultViewport: null,
            ignoreHTTPSErrors: true,
            "args": [
                "--fast-start",
                "--disable-extensions",
                "--no-sandbox",
            ],
        });
        return new PuppeteerBrowser(browser);
    }

    async checkPage(link: string, code: string) {
        const pages = await this.browser.pages();
        const page = pages[0];
        // const user = 'bmoqa';
        // const password = 'Kanto23c';
        // await page.setViewport({ width: 1920, height: 1080 });
        // await page.authenticate({ username: user, password: password });
        await page.goto(link, { waitUntil: 'load', timeout: 0 });
        // @ts-ignore
        const siteDetails = await page.evaluate(async (code) => {
            // @ts-ignore
            let errors = [];

            try {
                eval(code);
            } catch (err: any) {
                errors.push(err.message)
            }

            return await new Promise((res) => {
                if ($.important && $.important.length > 0) {
                    for (let val of $.important) {
                        if (val.length === 0) errors.push(`Selector: ${val.selector} does not exist on the page`)
                    }
                }

                const report: IScan = {
                    // @ts-ignore
                    errors,
                    adobe: adobe.target,
                }

                res(report)
            });
        }, code);

        this.browser.close();
        return siteDetails;
    }
};

export default PuppeteerBrowser;