import { IComponentRender } from "@idsck/components/interfaces";

export interface IImageProps extends IComponentRender {
    raw?: any;
    size?: string;
    src?: string;
    placeholder?: string;
    type?: string;
    typeAttributes?: any;
    overflowing?: boolean;
    loading?: boolean;
    image?: any;
}
