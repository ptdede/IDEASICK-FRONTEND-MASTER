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

export class CollectionDetail extends React.Component<IPage> {

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
                    <meta property="og:type" content="article" />
                    <meta property="og:url" content={`${process.env.BASE_URL}/collection/${this.props.collections.collectionName}/${this.props.slug}/`} />
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
                {this.renderCollectionTemplate()}
            </BaseLayout>
        );
    }

    renderCollectionComponents() {

        if (this.props.pageDataComponents) {

            const arrayData: IComponent[] = this.props.pageDataComponents;
            const events: IWithBaseComponentListener = {
                onDataChanged: (data) => this.props.handleDataChange(data),
                onTriggerPropChanged: (actions) => this.props.handleTriggerPropChange(actions),
                onTriggerConfigChanged: (data) => this.props.handleTriggerConfigChange(data),
                onCollectionAction: (data) => this.props.handleCollectionAction(data),
            };
            const configs: IHelperConfig = {
                iframe: this.props.iframe,
            };

            return DynamicComponentHelper.populateObjectComponents(
                arrayData,
                events,
                configs,
            );
        }

        return null;
    }

    renderCollectionTemplate() {

        if (this.props.pageData) {

            const arrayDataTemplate: IComponent[] = this.props.pageData.owner.template.components;
            const arrayWebsiteContent: IComponent[] = this.props.pageDataComponents;
            const events: IWithBaseComponentListener = {
                onDataChanged: (data) => this.props.handleDataChange(data),
                onTriggerPropChanged: (actions) => this.props.handleTriggerPropChange(actions),
                onTriggerConfigChanged: (data) => this.props.handleTriggerConfigChange(data),
                onOverrideTemplate: (data) => this.props.handleOverrideTemplate(data),
                onCollectionAction: (data) => this.props.handleCollectionAction(data),
            };
            const websiteContentHolder = (
                <PageContainer key="website-content--wrapper">
                    {this.renderCollectionComponents()}
                </PageContainer>
            );
            const configs: IHelperConfig = {
                iframe: this.props.iframe,
            };

            return DynamicComponentHelper.populateObjectComponentsWithTemplate(
                arrayDataTemplate,
                events,
                websiteContentHolder,
                arrayWebsiteContent,
                configs,
            );
        }

        return null;
    }
}

CollectionDetail.getInitialProps = async (context): Promise<IPageDataFetch> => {

    const { name, slug, iframe } = context.query;

    const URL = `${process.env.API_URL}/collection-details/${name}/${slug}`;

    let pageData = null;

    try {
        let res;

        res = await fetch(URL);

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
        collections: {
            collectionName: name,
        },
    };
};

export default compose(
    withIframeCommunication,
)(CollectionDetail);
