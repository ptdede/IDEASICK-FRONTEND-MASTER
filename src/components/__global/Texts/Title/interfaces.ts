import { IComponentRender } from "@idsck/components/interfaces";

export interface ITitleState {
    editorState: any;
}

export interface ITitleProps extends IComponentRender {
    color?: string;
    forceUpdate?: boolean;
    noMargin?: boolean;
    marginBottomMedium?: boolean;
    centered?: boolean;
    uppercase?: boolean;
    onDataChanged?: (text: string) => void;
}
