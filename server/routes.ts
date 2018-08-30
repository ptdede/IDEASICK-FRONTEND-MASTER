import * as express from "express";
import { Router } from "express-serve-static-core";

/**
 * Define all possible route here.
 * It contains:
 * --- Single page
 * --- Collection page master
 * --- Collection page detail
 * --- Template page
 * Any other route than all above is routed exactly what it is.
 * ex: route for images, css, public, etc.
 */

const router = express.Router();

const routes = (app): Router => {

    const handle = app.getRequestHandler();

    /**
     * This endpoint for handling template preview.
     * Nothing will displayed at all if not accessed trough admin.
     */
    router.get("/template", (req, res) => {
        const queryParams = { iframe: req.query.iframe };
        app.render(req, res, "/template", queryParams);
    });

    /**
     * This endpoint for handling POST COLLECTION data.
     */
    router.get("/collection/:name/:slug", (req, res) => {
        const actualPage = "/collectionDetail";
        const queryParams = { name: req.params.name, slug: req.params.slug, iframe: req.query.iframe };
        app.render(req, res, actualPage, queryParams);
    });

    /**
     * This endpoint for handling POST COLLECTION data.
     */
    router.get("/collection/:name", (req, res) => {
        const actualPage = "/collectionPage";
        const queryParams = { name: req.params.name, iframe: req.query.iframe, page: req.query.page };
        app.render(req, res, actualPage, queryParams);
    });

    /**
     * Handle Every single page request.
     * Make this work also for client navigation (prefetch)
     */
    router.get(["/", "/:page"], async (req, res) => {
        const actualPage = "/single";
        const queryParams = { slug: req.params.page, iframe: req.query.iframe };
        app.render(req, res, actualPage, queryParams);
    });

    /**
     * Fallback for everything.
     */
    router.get("*", (req, res) => {
        return handle(req, res);
    });

    return router;
};

export default routes;
