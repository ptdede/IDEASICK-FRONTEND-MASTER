
/**
 * Make all key the same input and output.
 * We use URL link for the key of pages.
 * @param req
 */
export function getCacheKey(req) {
    return `${req.url}`;
}
