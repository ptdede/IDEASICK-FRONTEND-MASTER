import { IWithBaseComponentProps } from "@idsck/hoc/withBaseComponent/interfaces";

interface IComponentCategories {
    [index: number]: string;
}

interface IComponentExport {
    component: React.ComponentType<IWithBaseComponentProps>;
    seeder: any;
    categories: IComponentCategories;
}

interface ISeeder {
    tagName: string;
    thumb: string;
    props?: any;
    config?: any;
}

export {
    IComponentExport,
    IComponentCategories,
    ISeeder,
};
