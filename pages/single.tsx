import BaseLayout from "@idsck/components/__global/BaseLayout/BaseLayout";
import PageContainer from "@idsck/components/__global/PageContainer/PageContainer";
import { IComponent } from "@idsck/components/interfaces";
import { IPage, IPageDataFetch } from "@idsck/global/interfaces";
import DynamicComponentHelper, { IHelperConfig } from "@idsck/helpers/DynamicComponentHelper";
import { IWithBaseComponentListener } from "@idsck/hoc/withBaseComponent/interfaces";
import withIframeCommunication from "@idsck/hoc/withIframeCommunication/withIframeCommunication";
import dayjs from "dayjs";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import Head from "next/head";
import React from "react";
import { compose } from "recompose";

export class Single extends React.Component<IPage> {

    static getInitialProps; // for getting data from the server

    state = {
        isNavMobileActive: false,
    };

    handleMobileMenuNavbar(isOpen: boolean) {
        this.setState({ isNavMobileActive: isOpen });
    }

    onComponentClicked(index) {
        // ignore typing for good reason. ;)
        // TODO: Inspect this!!
        if ((this.refs[index] as any).onComponentClicked) { (this.refs[index] as any).onComponentClicked(); }
    }

    render() {

        if (!this.props.pageData) {
            return <Error statusCode={404} />;
        }

        return (
            <BaseLayout>
                <Head>
                    <title>{this.props.pageData.title}</title>
                    <meta name="description" content={this.props.pageData.description ? this.props.pageData.description : ""} />
                    <meta property="og:title" content={this.props.pageData.title} />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={`${process.env.BASE_URL}/${typeof this.props.slug !== "undefined" ? `${this.props.slug}/` : ""}`} />
                    <meta property="og:image" content={this.props.pageData.featuredImage ? this.props.pageData.featuredImage.url : ""} />
                    <meta property="og:site_name" content="Top Indonesia" />
                    <meta property="og:description" content={this.props.pageData.description ? this.props.pageData.description : ""} />

                    {/* All meta below is Optional */}
                    <meta name="copyright" content="Top Indonesia" />
                    {/* ex: Sunday, July 18th, 2010, 5:15 pm */}
                    <meta name="revised" content={dayjs(this.props.pageData.updatedAt).format("dddd, MMMM Do, YYYY, h:mm:ss a")} />
                    <meta httpEquiv="Pragma" content="no-cache" />
                    <meta httpEquiv="Cache-Control" content="no-cache" />
                </Head>
                {this.renderCollectionTemplate()}
            </BaseLayout>
        );
    }

    /**
     * Always render this first.
     * Rendering component will always check for the template first.
     * If the template is not provided or empty, render the page component only instead.
     */
    renderCollectionTemplate(): JSX.Element[] | null {

        if (this.props.pageData && this.props.pageData.template) {

            const arrTemplateData: IComponent[] = this.props.pageData.template.components; // raw template components
            const arrPageData: IComponent[] = this.props.pageDataComponents; // raw page components

            const events: IWithBaseComponentListener = {
                onDataChanged: (data) => this.props.handleDataChange(data),
                onTriggerPropChanged: (actions) => this.props.handleTriggerPropChange(actions),
                onTriggerConfigChanged: (data) => this.props.handleTriggerConfigChange(data),
                onOverrideTemplate: (data) => this.props.handleOverrideTemplate(data),
                onCollectionAction: (data) => this.props.handleCollectionAction(data),
                onTriggerRefreshConfig: (data) => this.props.handleTriggerRefreshConfig(data),
            };

            // component that sould render inside website placeholder component
            const websiteMainComponentHolder = (
                <PageContainer key="website-content--wrapper">
                    {this.renderCollectionComponents()}
                </PageContainer>
            );

            const configs: IHelperConfig = {
                iframe: this.props.iframe,
            };

            return DynamicComponentHelper.populateObjectComponentsWithTemplate(
                arrTemplateData,
                events,
                websiteMainComponentHolder,
                arrPageData,
                configs,
            );
        }

        // fallback to render component without template.
        return this.renderCollectionComponents();
    }

    /**
     * This will render page component only.
     */
    renderCollectionComponents(): JSX.Element[] | null {
        if (this.props.pageData) {

            const arrData: IComponent[] = this.props.pageDataComponents; // raw components

            const events: IWithBaseComponentListener = {
                onDataChanged: (data) => this.props.handleDataChange(data),
                onTriggerPropChanged: (actions) => this.props.handleTriggerPropChange(actions),
                onTriggerConfigChanged: (data) => this.props.handleTriggerConfigChange(data),
                onCollectionAction: (data) => this.props.handleCollectionAction(data),
                onTriggerRefreshConfig: (data) => this.props.handleTriggerRefreshConfig(data),
            };

            const configs: IHelperConfig = {
                iframe: this.props.iframe,
            };

            return DynamicComponentHelper
                .populateObjectComponents(
                    arrData,
                    events,
                    configs,
                );
        }

        return null;
    }
}

Single.getInitialProps = async (context): Promise<IPageDataFetch> => {

    const { slug, iframe } = context.query;

    const URL = `${process.env.API_URL}/pages/single`;

    let pageData = null;

    try {
        let res;

        if (!slug || typeof slug === "undefined") {
            res = await fetch(`${URL}?defaultPage=true`);
        } else {
            res = await fetch(`${URL}?url=${slug}`);
        }

        if (res.status === 200) {
            pageData = await res.json();
        }

    } catch (err) {
        console.log("error happens dude!", err);
    }

    return {
        slug,
        pageData,
        iframe,
    };
};

export default compose(
    withIframeCommunication,
)(Single);
