import * as compression from "compression";
import * as express from "express";
import * as next from "next";
import routes from "./routes";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

app .prepare()
    .then(() => {
        const server = express();

        // load Gzip compression module
        server.use(compression());

        /**
         * Disable cache,
         * don't know how to handle cache if user has been updated the page.
         * TODO: FIGURE IT OUT LATER!!!
         */
        server.use((_, res, next) => {
            res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
            res.header("Expires", "-1");
            res.header("Pragma", "no-cache");
            next();
        });

        /**
         * Load server routes.
         * passing app instance to be used on other files.
         */
        server.use(routes(app));

        /**
         * TODO: move port to single .env setting page.
         */
        server.listen(3030, (err) => {
            if (err) { throw err; }
            console.log("> Ready on http://localhost:3030");
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
