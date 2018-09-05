import { IComponent } from "@idsck/components/interfaces";
import { IDataExchange } from "@idsck/hoc/interfaces";

interface IWithBaseComponentProps extends IComponent, IWithBaseComponentListener {
}

interface IWithBaseComponentListener {
    onTriggerPropChanged?: (data: IDataExchange) => void;
    onTriggerConfigChanged?: (data: IDataExchange) => void;
    onTriggerRefreshConfig?: (data: IDataExchange) => void;
    onDataChanged?: (data: IDataExchange) => void;
    onOverrideTemplate?: (data: IDataExchange) => void;
    onCollectionAction?: (data: IDataExchange) => void;
}

export {
    IWithBaseComponentProps,
    IWithBaseComponentListener,
};
