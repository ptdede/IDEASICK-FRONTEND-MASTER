import RegisteredComponents, { generatedComponentBasedOnCategory } from "@idsck/components/index";
import { IIFrameCommunication } from "@idsck/global/interfaces";
import { initGA, logPageView } from "@idsck/helpers/AnalyticHelper";
import WindowHelper from "@idsck/helpers/WindowHelper";
import {
    ADD_PAGE_COMPONENT,
    GOTO_COMPONENT,
    REFRESH_CONFIG,
    TRIGGER_COLLECTION_ACTION,
    TRIGGER_COMPONENT_CONFIG_CHANGE,
    TRIGGER_COMPONENT_PROPS_CHANGE,
    TRIGGER_OVERRIDE_TEMPLATE,
    UPDATE_COMPONENT_DATA_BY_ID,
    UPDATE_PAGE_COMPONENT,
} from "@idsck/hoc/constants";
import { IDataActionListener } from "@idsck/hoc/interfaces";
import { AVAILABLE_COMPONENTS, PAGE_COMPONENTS, PAGE_DATA, PAGE_TEMPLATE } from "@idsck/hoc/withIframeCommunication/constants";
import React from "react";
import uuid from "uuid";

const withIframeCommunication = (WrappedComponent, registeredDataToSend?) => {

    return class extends React.Component<IIFrameCommunication> implements IDataActionListener {

        /**
         * This will passing functionality from HOC to ./Pages that implement this HOC.
         * This ensure getInitialProps on the page is working properly with the right context.
         */
        static getInitialProps(ctx) {
            return WrappedComponent.getInitialProps(ctx);
        }

        page = null; // this var holding reference of the enchanced page.
        state = {
            sendDataSeeder: registeredDataToSend ? registeredDataToSend : RegisteredComponents, // holding all component references.
            pageDataComponents: this.props.pageData ? this.props.pageData.components ? this.props.pageData.components : [] : [], // actual pageData, sent from ./Pages (fetched data)
            isIframe: false,
        };

        /**
         * ======================================================
         * LIFECYCLE METHOD
         * ======================================================
         */
        componentWillReceiveProps(newProps) {
            if (newProps.pageData !== this.props.pageData) {
                this.setState({
                    pageDataComponents: newProps.pageData ? newProps.pageData.components : [],
                });
            }
        }

        componentDidMount() {

            this.initGoogleAnalytic();

            this.checkIfIframe();

            if (this.props.pageData) {

                // send/broadcast page data
                this.sendData({
                    key: PAGE_DATA,
                    data: this.props.pageData,
                });

                this.sendData({
                    key: PAGE_COMPONENTS,
                    data: this.props.pageData.components,
                });

                this.sendData({
                    key: PAGE_TEMPLATE,
                    data: this.props.pageData.owner ? this.props.pageData.owner : this.props.pageData,
                });
            }

            // send/broadcast all registered component also on component mount!
            this.sendData({
                key: AVAILABLE_COMPONENTS,
                data: generatedComponentBasedOnCategory(),
            });
        }

        componentWillUnmount() {
            this.unregisterWindowListener();
        }
        /**
         * ======================================================
         */

        registerWindowListener() {
            if (typeof window === "undefined") { return; }

            if (WindowHelper.checkIfIframe) {
                window.addEventListener("message", this.listenIFrameData);
            }
        }

        unregisterWindowListener() {
            if (typeof window === "undefined") { return; }

            if (WindowHelper.checkIfIframe) {
                window.removeEventListener("message", this.listenIFrameData);
            }
        }

        render() {

            return (
                <WrappedComponent
                    pageDataComponents={this.state.pageDataComponents}
                    isIframe={this.state.isIframe}

                    ref={(page) => this.page = page}

                    handleDataChange={(data) => this.handleDataChange(data)}
                    handleTriggerPropChange={(data) => this.handleTriggerPropChange(data)}
                    handleTriggerConfigChange={(data) => this.handleTriggerConfigChange(data)}
                    handleOverrideTemplate={(data) => this.handleOverrideTemplate(data)}
                    handleCollectionAction={(data) => this.handleCollectionAction(data)}
                    handleTriggerRefreshConfig={(data) => this.handleTriggerRefreshConfig(data)}

                    {...this.props}
                />
            );
        }

        /**
         * =================================================================
         * CORE HANDLING EVENT
         * This is based on @code[IDataActionListener]
         * All method below is specifically do change on component model.
         * =================================================================
         */

        /**
         * This method for handling data change type text.
         * triggered every time onChange event on MediumEditor plugin triggered.
         * will replace new content and send to cms
         * @param {*} data
         */
        handleDataChange(data) {
            this.sendData({
                key: UPDATE_COMPONENT_DATA_BY_ID,
                data,
            });
        }

        /**
         * This method will handling whenever CORE props inside component is changed
         * ex: Selecting file/media/photo/video.
         * this will replaced soon with one for all method later.
         * TODO: refactor this!!
         * @param {*} data
         */
        handleTriggerPropChange(data) {
            this.sendData({
                key: TRIGGER_COMPONENT_PROPS_CHANGE,
                data,
            });
        }

        /**
         * This method is for handling CORE CONFIG changes in a component.
         * basically config in component data is used for design.
         * ex: background color, size, custom data, etc.
         * @param {*} data
         */
        handleTriggerConfigChange(data) {
            this.sendData({
                key: TRIGGER_COMPONENT_CONFIG_CHANGE,
                data,
            });
        }

        /**
         * Basically copy template data based on index to page componets index.
         * @param {*} data
         */
        handleOverrideTemplate(data) {
            this.sendData({
                key: TRIGGER_OVERRIDE_TEMPLATE,
                data,
            });
        }

        /**
         * Basically copy template data based on index to page componets index.
         * @param {*} data
         */
        handleCollectionAction(data) {
            this.sendData({
                key: TRIGGER_COLLECTION_ACTION,
                data,
            });
        }

        /**
         * This will replace old props config to new config that provided in Component Seeder
         * after manual update by Developer
         * @param data
         */
        handleTriggerRefreshConfig(data) {
            this.sendData({
                key: REFRESH_CONFIG,
                data,
            });
        }
        /**
         * =================================================================
         */

        /**
         * =================================================================
         * HELPERS METHOD
         * =================================================================
         */
        initGoogleAnalytic() {

            // Don't allow GA to detect pageView when inside IFrame.
            if (WindowHelper.checkIfIframe() || this.props.pageData == null || !document) { return; }

            // Somehow, Next not update document title on time.
            // So, we manually append the title before sent to GA dashboard.
            document.title = this.props.pageData.title;

            if (!(window as any).GA_INITIALIZED) {
                initGA();
                (window as any).GA_INITIALIZED = true;
            }

            logPageView();
        }

        checkIfIframe() {
            if (typeof window === "undefined") { return; }

            try {
                if (window.self !== window.top) {
                    this.setState({ isIframe: true });
                    this.registerWindowListener();
                }
            } catch (e) {
                console.log("error determining iframe", e);
                return;
            }
        }

        listenIFrameData = (ev) => {
            this.switchIframeData(ev.data);
        }

        switchIframeData(message) {
            switch (message.key) {
                case UPDATE_PAGE_COMPONENT:
                    this.setState({
                        pageDataComponents: message.data,
                    });
                    break;
                case ADD_PAGE_COMPONENT:
                    this.addPageComponent(message.data);
                    break;
                case GOTO_COMPONENT:
                    this.page.onComponentClicked(message.data);
                    break;
                default:
                    break;
            }
        }

        addPageComponent(data) {

            const componentWannabe = JSON.parse(JSON.stringify(this.state.sendDataSeeder[data.data.tagName].seeder)); // must do this to make new reference!

            if (data.isExist) {
                componentWannabe.props = data.data.props;
                componentWannabe.config = data.data.config;
            }

            const updatedData = [...this.state.pageDataComponents, {
                id: uuid(),
                ...componentWannabe,
            }];

            this.setState({
                pageDataComponents: updatedData,
            });

            // send/broadcast page data after updating page
            this.sendData({
                key: PAGE_COMPONENTS,
                data: updatedData,
            });
        }

        sendData(data) {
            window.top.postMessage(data, "*");
        }
        /**
         * =================================================================
         */
    };
};

export default withIframeCommunication;
