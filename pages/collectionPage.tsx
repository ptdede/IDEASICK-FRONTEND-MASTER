import BaseLayout from "@idsck/components/__global/BaseLayout/BaseLayout";
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

export class CollectionPage extends React.Component<IPage> {

    static getInitialProps; // for getting data from the server

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
                    <title>{`${process.env.SITE_NAME} | ${this.props.pageData.title}`}</title>
                    <meta name="description" content={this.props.pageData.description ? this.props.pageData.description : ""} />
                    <meta property="og:title" content={`${process.env.SITE_NAME} | ${this.props.pageData.title}`} />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={`${process.env.BASE_URL}/collection/${this.props.collections.collectionName}/`} />
                    <meta property="og:image" content={this.props.pageData.featuredImage ? this.props.pageData.featuredImage.url : ""} />
                    <meta property="og:site_name" content={process.env.SITE_NAME} />
                    <meta property="og:description" content={this.props.pageData.description ? this.props.pageData.description : ""} />

                    {/* All meta below is Optional */}
                    <meta name="copyright" content={process.env.SITE_NAME} />
                    {/* ex: Sunday, July 18th, 2010, 5:15 pm */}
                    <meta name="revised" content={dayjs(this.props.pageData.updatedAt).format("dddd, MMMM Do, YYYY, h:mm:ss a")} />
                    <meta httpEquiv="Pragma" content="no-cache" />
                    <meta httpEquiv="Cache-Control" content="no-cache" />
                </Head>
                {this.renderCollections()}
            </BaseLayout>
        );
    }

    renderCollections() {

        // populate component from fetched data from server.
        let componentPageData = null;

        if (this.props.pageData) {

            const arrayData: IComponent[] = this.props.pageDataComponents;
            const events: IWithBaseComponentListener = {
                onDataChanged: (data) => this.props.handleDataChange(data),
                onTriggerPropChanged: (actions) => this.props.handleTriggerPropChange(actions),
                onTriggerConfigChanged: (data) => this.props.handleTriggerConfigChange(data),
                onCollectionAction: (data) => this.props.handleCollectionAction(data),
            };
            const configs: IHelperConfig = {
                iframe: this.props.iframe,
                collections: this.props.collections,
            };

            componentPageData = DynamicComponentHelper.populateObjectComponents(
                arrayData,
                events,
                configs,
            );
        }

        return componentPageData;
    }
}

CollectionPage.getInitialProps = async (context): Promise<IPageDataFetch> => {

    const { name, iframe, page } = context.query;

    let limit = 6;

    const URL = `${process.env.API_URL}/collection-details?owner=${name}&page=${page}&limit=${limit}`;
    const URLCollectionPage = `${process.env.API_URL}/collections/${name}`;

    let pageData = null;
    let collections = null;
    let availablePages = null;

    try {
        let res;
        let resCollectionPage;

        res = await fetch(URL);
        resCollectionPage = await fetch(URLCollectionPage);

        if (res.status === 200) {
            collections = await res.json();
        }

        if (resCollectionPage.status === 200) {
            pageData = await resCollectionPage.json();
            limit = pageData.childLimit;
        }

    } catch (err) {
        console.log("error happens dude!", err);
    }

    if (collections) { availablePages = Math.ceil(collections.total / limit); }

    return {
        pageData,
        iframe,
        collections: {
            availablePages,
            collectionName: name,
            currentPage: page ? page : 1,
            currentLimit: limit,
            response: collections,
        },
    };
};

export default compose(
    withIframeCommunication,
)(CollectionPage);
