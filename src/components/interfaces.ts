import { IWithBaseComponentProps } from "@idsck/hoc/withBaseComponent/interfaces";

/**
 * Hi, let me introduce you to components interface.
 * Every component that you decide to create,
 * THAT will registered to @code[RegisteredComponents] in index.js must follow these interface.
 * warm hug, idsck
 */

export interface IComponent {
    id?: string;
    index?: number;
    props?: any;
    config?: any;
    iframe?: boolean;
    ref?: number | any;
    tagName?: string;
    copyFromTemplate?: any;
    disabled?: boolean;
    disableEdit?: boolean;
}

export interface IComponentDataListener {
    handleDataChange?: (propName: string, data: any, isUsingLoadash?: boolean, forceRender?: boolean) => void;
    triggerOptions?: (componentProp: string, isUsingLoadash?: boolean, action?: string) => void;
    triggerSettings?: () => void;
    handleOverrideTemplate?: () => void;
    triggerRefreshSettings?: () => void;
    handleCollectionAction?: (propName: string, action: string, data: any) => void;
}

export interface IComponentRender extends IComponent, IComponentDataListener {
}

export interface IComponentCategories {
    [index: number]: string;
}

export interface IComponentExport {
    component: React.ComponentType<IWithBaseComponentProps>;
    seeder: ISeeder;
    categories: IComponentCategories;
}

export interface ISeeder {
    tagName: string;
    thumb: string;
    props?: any;
    config?: any;
}

export interface IComponentBaseOnCategories {
    category: string;
    components: ISeeder[];
}

export interface IComponentConfig {
    type: string;
    available: any;
    isColor?: boolean;
    isGradient?: boolean;
    selectedIndex: number;
    selected: any;
}
