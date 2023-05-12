import express from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import ToolsMiddleware from "./middleware/tools.middleware";
import toolsController from "./controllers/tools.controller";
import { body, query } from "express-validator";
import validationMiddleware from "../common/middleware/validation.middleware";

class ToolsRoutes extends CommonRoutesConfig {
    constructor(name: string) {
        super(name, express.Router());
    }

    configureRoute(): void {
        this.router.route("/scan")
            .post(
                body("affected_url").exists().isString(),
                body("code").exists().isString(),
                validationMiddleware.verifyFieldErrors,
                toolsController.scan
            );

        // this.router.param("type", ToolsMiddleware.extractType);
        // this.router.param("activityID", ToolsMiddleware.extractActivityID);
    }
}

export default ToolsRoutes;