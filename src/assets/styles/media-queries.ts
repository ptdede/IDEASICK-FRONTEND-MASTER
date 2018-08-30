import { css } from "styled-components";

export const breakpointsSize = {
    desktop: 2560,
    laptop: 1024,
    laptopL: 1440,
    mobileL: 425,
    mobileM: 375,
    mobileS: 320,
    tablet: 768,
};

export const breakpoints = {
    desktop: `(min-width: ${breakpointsSize.desktop}px)`,
    desktopL: `(min-width: ${breakpointsSize.desktop}px)`,
    laptop: `(min-width: ${breakpointsSize.laptop}px)`,
    laptopL: `(min-width: ${breakpointsSize.laptopL}px)`,
    mobileL: `(min-width: ${breakpointsSize.mobileL}px)`,
    mobileM: `(min-width: ${breakpointsSize.mobileM}px)`,
    mobileS: `(min-width: ${breakpointsSize.mobileS}px)`,
    tablet: `(min-width: ${breakpointsSize.tablet}px)`,
};

export const paddings = {
    mobile: css`padding-left: 2rem; padding-right: 2rem;`,
    tablet: css`padding-left: 5rem; padding-right: 5rem;`,
};
