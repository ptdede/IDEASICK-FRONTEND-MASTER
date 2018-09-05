import { ComponentCategory } from "@idsck/components/constants";
import { IComponentExport } from "@idsck/components/interfaces";

import HeroImage from "./HeroImage";
import seeder from "./seeder";

const data: IComponentExport = {
    component: HeroImage,
    seeder,
    categories: [ComponentCategory.custom],
};

export default data;
