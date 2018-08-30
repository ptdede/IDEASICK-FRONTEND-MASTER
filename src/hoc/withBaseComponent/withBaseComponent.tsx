import ComponentUi from "@idsck/components/__global/ComponentUi/ComponentUi";
import SettingsSelector from "@idsck/components/__global/SettingsSelector/SettingsSelector";
import RegisteredComponents from "@idsck/components/index";
import { CHANGE_IMAGE } from "@idsck/hoc/constants";
import { IWithBaseComponentProps } from "@idsck/hoc/withBaseComponent/interfaces";
import React from "react";

const withBaseComponent = (WrappedComponent, config: any = {}): React.ComponentType<IWithBaseComponentProps> => {

    return class extends React.Component<IWithBaseComponentProps> {

        comp = null; // this hold ref of the wrapped component.

        /**
         * This method will trigger open file manager on CMS side.
         * send innitial data to CMS
         * @param {string} componentProp
         * @param {boolean} isUsingLoadash
         */
        triggerOptions = (componentProp, isUsingLoadash, action) => {
            this.props.onTriggerPropChanged({
                action: action ? action : CHANGE_IMAGE,
                id: this.props.id,
                index: this.props.index,
                isUsingLoadash,
                propName: componentProp,
            });
        }

        /**
         * This method will trigger open component's settings popup on CMS side.
         * helpfull for changing configs
         */
        triggerSettings = () => {
            this.props.onTriggerConfigChanged({
                action: "CHANGE_CONFIG",
                configs: this.props.config,
                id: this.props.id,
                index: this.props.index,
            });
        }

        /**
         * This method will trigger open component's settings popup on CMS side.
         * helpfull for changing configs
         */
        triggerRefreshSettings = () => {

            const updatedConfigSeeder = RegisteredComponents[this.props.tagName].seeder.config;

            if (!this.props.onTriggerRefreshConfig) { return; }

            this.props.onTriggerRefreshConfig({
                id: this.props.id,
                index: this.props.index,
                configs: updatedConfigSeeder,
                action: "REFRESH_CONFIG",
            });
        }

        /**
         * This method will called EVERY TIME changes on text appear.
         * used for sync text data on frontend and CMS.
         * @param {string} propName
         * @param {string} data
         */
        handleDataChange = (propName, data, isUsingLoadash, forceRender) => {

            if (!this.props.onDataChanged) { return; }

            this.props.onDataChanged({
                id: this.props.id,
                index: this.props.index,
                isUsingLoadash,
                forceRender,
                propName,
                data,
            });
        }

        /**
         * Handle template override function.
         * basically copy the template's component to new object with new UID.
         * also add it to page basic component.
         */
        handleOverrideTemplate = () => {
            if (this.props.onOverrideTemplate) {
                this.props.onOverrideTemplate({
                    id: this.props.id,
                    index: this.props.index,
                });
            }
        }

        /**
         * Handle collection manipulation.
         * actions: ADD, REMOVE
         */
        handleCollectionAction = (propName, action, data) => {
            if (this.props.onCollectionAction) {
                this.props.onCollectionAction({
                    id: this.props.id,
                    index: this.props.index,
                    propName,
                    action,
                    data,
                });
            }
        }

        onComponentClicked = () => {
            this.comp.scrollIntoView({ block: "end", behavior: "smooth" });
        }

        render() {

            if (!WrappedComponent) { return null; }

            return (
                <ComponentUi
                    innerRef={(comp) => this.comp = comp}
                    id={`ideasick-comp-${this.props.id}`}
                    baseConfig={config}
                    disabled={this.props.disableEdit}
                    iframe={this.props.iframe}
                    {...this.props}
                    {...this.props.config}
                >

                    <WrappedComponent
                        // listener
                        handleDataChange={this.handleDataChange}
                        triggerOptions={this.triggerOptions}
                        triggerSettings={this.triggerSettings}
                        handleOverrideTemplate={this.handleOverrideTemplate}
                        handleCollectionAction={this.handleCollectionAction}
                        {...this.props}
                    />

                    {this.renderSettingComponent()}

                    <SettingsSelector
                        position="centerBottom"
                        disabled={!this.props.disableEdit}
                        iframe={this.props.iframe}
                        onChangeSettingsTriggered={() => this.handleOverrideTemplate()}
                    >
                        Click to Override Template
                    </SettingsSelector>
                </ComponentUi>
            );
        }

        renderSettingComponent() {
            if (this.props.iframe && !this.props.disabled) {
                return (
                    <div className="component-settings">
                        <SettingsSelector
                            position="bottomLeft"
                            disabled={this.props.disableEdit}
                            iframe={this.props.iframe}
                            onChangeSettingsTriggered={() => this.triggerSettings()}
                        >
                            <p><span className="ti-settings" /></p>
                        </SettingsSelector>

                        <div
                            className="setting-update"
                            onClick={() => this.triggerRefreshSettings()}
                        >
                            <p><span className="ti-reload" /></p>
                        </div>
                    </div>
                );
            } else {
                return null;
            }
        }
    };
};

export default withBaseComponent;
