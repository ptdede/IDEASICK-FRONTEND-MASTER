import * as compression from "compression";
import * as cors from "cors";
import * as express from "express";
import * as LRUCache from "lru-cache";
import * as next from "next";

import routes from "./routes";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

const ssrCache = new LRUCache({
    max: 100,
    maxAge: 1000 * 60 * 60, // 1hour
});

app .prepare()
    .then(() => {
        const server = express();

        // load Gzip compression module
        server.use(compression());

        // load cors. allow all connection
        server.use(cors());
        server.options("*", cors());

        /**
         * Load server routes.
         * passing app instance to be used on other files.
         */
        server.use(routes(app, ssrCache));

        /**
         * TODO: move port to single .env setting page.
         */
        server.listen(process.env.PORT, (err) => {
            if (err) { throw err; }
            console.log(`> Ready on http://localhost:${process.env.PORT}`);
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
