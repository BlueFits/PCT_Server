import express from "express";

class ToolsMiddleware {

    async extractType(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) {
        req.body.type = req.params.type;
        next();
    }
    async extractActivityID(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) {
        req.body.id = req.params.activityID;
        next();
    }
}

export default new ToolsMiddleware();