import { IComponent } from "@idsck/components/interfaces";
import { IDataActionListener } from "@idsck/hoc/interfaces";

export interface ITemplate {
    components: IComponent[];
}

export interface IPageDataProps {
    title: string;
    components: [];
    owner: {
        template: ITemplate,
    };
    template?: ITemplate;
    description: string;
    featuredImage: IImage;
    updatedAt: string;
}

export interface IIFrameCommunication {
    pageData?: IPageDataProps;
    slug?: string;
}

export interface IPageDataFetch extends IIFrameCommunication {
    pageDataComponents?: IComponent[]; // components to render in Page
    iframe: boolean; // determine if page is inside a iframe
    collections?: ICollections;
}

export interface IPage extends IPageDataFetch, IIFrameCommunication, IDataActionListener {
}

export interface ICollections {
    availablePages?: number;
    collectionName?: string;
    currentPage?: number;
    currentLimit?: number;
    response?: IPageDataProps[];
}

export interface IImage {
    url: string;
}
