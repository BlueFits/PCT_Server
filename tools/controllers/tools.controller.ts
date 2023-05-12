import express, { Request, Response } from "express";
import PuppeteerBrowser from "../../utils/puppeteerBrowser";
// import code from "./code";
import * as cheerio from 'cheerio';
import { IActivity, IActivityByID, IModifiedActivity, IScan, ITargetApi_getLive, experience_targetApi } from "../../types/common.types";

class ToolsController {
    async scan(req: Request, res: Response) {
        try {
            const affected_url = req.body.affected_url;
            const code = req.body.code;
            //Check if acitvity is ok
            const instance = await PuppeteerBrowser.build();
            const $ = cheerio.load(code);
            const scriptTxt = ($($("script").get(0)).html() as string);
            const data: IScan = await instance.checkPage(affected_url, scriptTxt);
            res.status(200).send({ data });
        } catch (err) {
            console.error(err)
            res.status(400).send({ error: err });
        }
    }
}

export default new ToolsController();