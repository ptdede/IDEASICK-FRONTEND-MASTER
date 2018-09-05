import { IComponentConfig, IComponentRender } from "@idsck/components/interfaces";

export interface IHeroImageProps extends IHeroImageSeederProps, IComponentRender {
    config: IHeroImageSeederConfigs;
}

export interface IHeroImageSeederConfigs {
    position: IComponentConfig;
    overlay: IComponentConfig;
}

export interface IHeroImageSeederProps {
    title: string;
    text: string;
    image: string;
    isParallax: boolean;
    gradientFrom: string;
    gradientTo: string;
}

export interface IStyledHeroImageProps {
    position: string;
}
