interface IDataExchange {
    id: string;
    index: number;
    data?: any;
    configs?: any;
    isUsingLoadash?: boolean;
    forceRender?: boolean;
    propName?: string;
    action?: string;
}

export {
    IDataExchange,
};
