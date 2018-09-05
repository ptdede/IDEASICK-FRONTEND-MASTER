import RegisteredComponents from "@idsck/components/index";
import { IComponent } from "@idsck/components/interfaces";
import { ICollections } from "@idsck/global/interfaces";
import { IWithBaseComponentListener, IWithBaseComponentProps } from "@idsck/hoc/withBaseComponent/interfaces";
import React from "react";

export interface IHelperConfig {
    iframe?: boolean;
    collections?: ICollections;
}

class DynamicComponentHelper {

    /**
     * This method will populate components base on {RegisteredComponents}
     * @param arrayData
     * @param events
     * @param configs
     * @param cb
     */
    static populateObjectComponents(
        arrayData: IComponent[],
        events: IWithBaseComponentListener,
        configs: IHelperConfig = {}): JSX.Element[] {

        if (arrayData === undefined || arrayData === null) {
            return null;
        }

        // filter all element with registered element only
        const filteredArrayData = arrayData.filter((component) =>
            RegisteredComponents[component.tagName] &&
            RegisteredComponents[component.tagName].component);

        // mapping filtered result into proper JSX for rendering
        return filteredArrayData.map((component, index) => {
            const TagName = RegisteredComponents[component.tagName].component;

            // if not iframe, do not assign the listener for the best performance!
            if (!configs.iframe) {
                return (
                    <TagName
                        index={index}
                        disableEdit={true}
                        id={component.id}
                        copyFromTemplate={component.copyFromTemplate}
                        key={`ideasick-${component.tagName}-${component.id}`}
                        config={component.config}
                        {...component.props}
                        {...configs}
                    />
                );
            }

            // Don't worry, TagName should be found because filter function should be working!
            return (
                <TagName
                    index={index}
                    id={component.id}
                    ref={index}
                    tagName={component.tagName}
                    copyFromTemplate={component.copyFromTemplate}
                    key={`ideasick-${component.tagName}-${component.id}`}
                    {...component.props}
                    config={component.config}
                    onDataChanged={events.onDataChanged}
                    onTriggerPropChanged={events.onTriggerPropChanged}
                    onTriggerConfigChanged={events.onTriggerConfigChanged}
                    onCollectionAction={events.onCollectionAction}
                    onTriggerRefreshConfig={events.onTriggerRefreshConfig}
                    {...configs}
                />
            );
        });
    }

    /**
     * This method will populate components base on {RegisteredComponents}
     * it's with template
     * @param arrayData
     * @param events
     * @param websiteContent
     * @param arrWebsiteContent
     * @param configs
     */
    static populateObjectComponentsWithTemplate(
        arrayDataTemplate: IComponent[],
        events: IWithBaseComponentListener,
        websiteContent: JSX.Element,
        arrWebsiteContent: IComponent[],
        configs: IHelperConfig = {}): JSX.Element[] {

        if (arrayDataTemplate === undefined || arrayDataTemplate === null) {
            return null;
        }

        // filter all element with registered element only
        const filteredArrayData = arrayDataTemplate.filter((component: IComponent): boolean => {

            const data = RegisteredComponents[component.tagName] && RegisteredComponents[component.tagName].component;
            let filterPass = true;

            if (!data) { return false; }

            if (arrWebsiteContent) {
                for (const element of arrWebsiteContent) {
                    if (element.copyFromTemplate === component.id) {
                        filterPass = false;
                        break;
                    }
                }
            }
            return filterPass;
        });

        // mapping filtered result into proper JSX for rendering
        return filteredArrayData.map((component, index): JSX.Element => {

            const TagName: React.ComponentType<IWithBaseComponentProps> = RegisteredComponents[component.tagName].component;

            if (component.tagName === "WebsiteContentPlaceholder") {
                return websiteContent;
            }

            // if not iframe, do not assign the listener for the best performance!
            if (!configs.iframe) {
                return (
                    <TagName
                        index={index}
                        disableEdit={true}
                        id={component.id}
                        copyFromTemplate={component.copyFromTemplate}
                        key={`ideasick-${component.tagName}-${component.id}`}
                        config={component.config}
                        {...component.props}
                        {...configs}
                    />
                );
            }

            // Don't worry, TagName should be available because filter function should be working!
            return (
                <TagName
                    index={index}
                    disableEdit={true}
                    id={component.id}
                    copyFromTemplate={component.copyFromTemplate}
                    key={`ideasick-${component.tagName}-${component.id}`}
                    tagName={component.tagName}
                    config={component.config}
                    onDataChanged={events.onDataChanged}
                    onTriggerPropChanged={events.onTriggerPropChanged}
                    onTriggerConfigChanged={events.onTriggerConfigChanged}
                    onOverrideTemplate={events.onOverrideTemplate}
                    onCollectionAction={events.onCollectionAction}
                    onTriggerRefreshConfig={events.onTriggerRefreshConfig}
                    {...component.props}
                    {...configs}
                />
            );
        });
    }

}

export default DynamicComponentHelper;
