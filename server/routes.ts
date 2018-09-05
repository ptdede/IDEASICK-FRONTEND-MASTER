import * as express from "express";
import { Router } from "express-serve-static-core";
import { getCacheKey } from "./helpers/cacheHelpers";

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

const routes = (app, ssrCache): Router => {

    const handle = app.getRequestHandler();

    /**
     * This endpoint for handling template preview.
     * Nothing will displayed at all if not accessed trough admin.
     */
    router.get("/template", (req, res) => {
        const actualPage = "/template";
        const queryParams = { iframe: req.query.iframe };
        renderAndCache(req, res, actualPage, queryParams);
        // app.render(req, res, "/template", queryParams);
    });

    /**
     * This endpoint for handling POST COLLECTION data.
     */
    router.get("/collection/:name/:slug", (req, res) => {
        const actualPage = "/collectionDetail";
        const queryParams = { name: req.params.name, slug: req.params.slug, iframe: req.query.iframe };
        renderAndCache(req, res, actualPage, queryParams);
        // app.render(req, res, actualPage, queryParams);
    });

    /**
     * This endpoint for handling POST COLLECTION data.
     */
    router.get("/collection/:name", (req, res) => {
        const actualPage = "/collectionPage";
        const queryParams = { name: req.params.name, iframe: req.query.iframe, page: req.query.page };
        renderAndCache(req, res, actualPage, queryParams);
        // app.render(req, res, actualPage, queryParams);
    });

    /**
     * Handle Every single page request.
     * Make this work also for client navigation (prefetch)
     */
    router.get(["/", "/:page"], async (req, res) => {
        const actualPage = "/single";
        const queryParams = { slug: req.params.page, iframe: req.query.iframe };
        renderAndCache(req, res, actualPage, queryParams);
        // app.render(req, res, actualPage, queryParams);
    });

    /**
     * Fallback for everything.
     */
    router.get("*", (req, res) => {
        return handle(req, res);
    });

    /**
     * GO CACHE IT ALL !!!
     */
    async function renderAndCache(req, res, pagePath, queryParams) {

        // get page key format.
        const refresh = req.headers["x-ideasick-refresh-cache"];
        const key = getCacheKey(req);

        res.setHeader("X-Powered-By", "Ideasick | Express");

        // try to find the page inside lru cache. return html if found.
        if (ssrCache.has(key) && !refresh) {
            res.setHeader("X-IDSCK-Cache", "HIT");
            res.send(ssrCache.get(key));
            return;
        }

        // if page not found in memory cache, we need to render and save page to the cache.
        try {
            const html = await app.renderToHTML(req, res, pagePath, queryParams);

            // Something is wrong with the request, let's skip the cache
            if (res.statusCode !== 200) {
                res.send(html);
                return;
            }

            // Let's cache this page
            ssrCache.set(key, html);

            if (!refresh) {
                res.setHeader("X-IDSCK-Cache", "MISS");
            } else {
                res.setHeader("X-IDSCK-Cache", "REFRESH");
            }
            res.send(html);
        } catch (err) {
            app.renderError(err, req, res, pagePath, queryParams);
        }
    }

    return router;
};

export default routes;
