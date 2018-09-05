import { PageTransition } from "next-page-transitions";
import App, { Container } from "next/app";
import React from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import { injectGlobal } from "styled-components";
import generateStyledJsx from "../src/assets/styles/page-transition";

export default class MyApp extends App {

    /**
     * Bypass getInitialProps to each page
     * so they can handle their own implementation
     */
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        return { pageProps };
    }

    config = {
        TIMEOUT: 400,
    };

    render() {
        const { Component, pageProps }: any = this.props;

        // append global styling.
        const injectedStyle = injectGlobal`${generateStyledJsx(this.config.TIMEOUT)}`;

        return (
            <Container>
                <PageTransition
                    timeout={this.config.TIMEOUT}
                    classNames="page-transition"
                    loadingTimeout={{ enter: this.config.TIMEOUT, exit: 0 }}
                    loadingClassNames="loading-indicator"
                >

                    <ParallaxProvider>
                        <Component {...pageProps} />
                    </ParallaxProvider>
                </PageTransition>
            </Container>
        );
    }
}
