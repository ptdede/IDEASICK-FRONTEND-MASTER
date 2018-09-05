import { ComponentCategory } from "@idsck/components/constants";
import { IComponentExport } from "@idsck/components/interfaces";

import Image from "./Image";
import seeder from "./seeder";

const data: IComponentExport = {
    component: Image,
    seeder,
    categories: [ComponentCategory.custom],
};

export default data;
