export interface IDataExchange {
    id?: string;
    index?: number;
    data?: any;
    configs?: any;
    isUsingLoadash?: boolean;
    forceRender?: boolean;
    propName?: string;
    action?: string;
}

export interface IDataActionListener {
    handleDataChange: (data: IDataExchange) => void;
    handleTriggerPropChange: (data: IDataExchange) => void;
    handleTriggerConfigChange: (data: IDataExchange) => void;
    handleOverrideTemplate: (data: IDataExchange) => void;
    handleCollectionAction: (data: IDataExchange) => void;
    handleTriggerRefreshConfig: (data: IDataExchange) => void;
}
