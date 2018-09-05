import { IComponentRender } from "@idsck/components/interfaces";

export interface IParagraphState {
    editorState: any;
}

export interface IParagraphProps extends IComponentRender {
    maxWidth: string;
    color: string;
    forceUpdate?: boolean;
    options?: any;
    centered?: boolean;
    onDataChanged?: (text: string) => void;
}
