function generateStyledJsx(TIMEOUT): string {
    return `
        .page-transition-enter {
            opacity: 0;
            transform: translate3d(0,20px,0);
        }
        .page-transition-enter-active {
            opacity: 1;
            transform: translate3d(0,0,0);
            transition: all ${TIMEOUT}ms;
            transition-timing-function: ease-in-out;
        }
        .page-transition-exit {
            opacity: 1;
        }
        .page-transition-exit-active {
            opacity: 0;
            transform: translate3d(0,-20px,0);
            transition: all ${TIMEOUT}ms;
            transition-timing-function:  ease-in-out;
        }
        .loading-indicator-appear,
        .loading-indicator-enter {
            opacity: 0;
        }
        .loading-indicator-appear-active,
        .loading-indicator-enter-active {
            opacity: 1;
            transition: opacity ${TIMEOUT}ms;
        }
    `;
}

export default generateStyledJsx;
