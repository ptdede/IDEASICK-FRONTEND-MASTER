import { IDataExchange } from "@idsck/hoc/interfaces";

interface IWithBaseComponentProps {
    id: string;
    index: number;
    ref: number;
    tagName: string;
    copyFromTemplate: any;
    config: any;
    disabled: boolean;
    disableEdit: boolean;
    iframe: boolean;

    onTriggerPropChanged: (data: IDataExchange) => void;
    onTriggerConfigChanged: (data: IDataExchange) => void;
    onTriggerRefreshConfig: (data: IDataExchange) => void;
    onDataChanged: (data: IDataExchange) => void;
    onOverrideTemplate: (data: IDataExchange) => void;
    onCollectionAction: (data: IDataExchange) => void;
}

export {
    IWithBaseComponentProps,
};
