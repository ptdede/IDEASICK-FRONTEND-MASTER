import ReactGA, { InitializeOptions } from "react-ga";

export const initGA = (): void => {
    console.log("===INITIALIZE GA===");
    if (!checkGa()) { return console.log("no valid tracking code detected"); }

    const trackID: string = process.env.ANALYTIC_TRACKING_ID;
    const opts: InitializeOptions = {
        gaOptions: { cookieDomain: "auto" },
    };
    ReactGA.initialize([{ trackingId: trackID }], opts);
};

export const logPageView = (): void => {
    if (!checkGa()) { return; }
    console.log(`Logging pageview for ${window.location.pathname}`);
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
};

export const logEvent = (category = "", action = ""): void => {
    if (!checkGa()) { return; }
    if (category && action) {
        ReactGA.event({ category, action });
    }
};

export const logException = (description = "", fatal = false): void => {
    if (description) {
        ReactGA.exception({ description, fatal });
    }
};

function checkGa() {
    const trackID: string = process.env.ANALYTIC_TRACKING_ID;
    if (trackID === "") {
        return false;
    }
    return true;
}
