import { ComponentCategory } from "@idsck/components/constants";
import { IComponentExport } from "@idsck/components/interfaces";

import seeder from "./seeder";
import WebsiteContentPlaceholder from "./WebsiteContentPlaceholder";

const data: IComponentExport = {
  component: WebsiteContentPlaceholder,
  seeder,
  categories: [ComponentCategory.custom],
};

export default data;
