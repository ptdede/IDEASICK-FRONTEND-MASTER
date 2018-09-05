import { ComponentCategory } from "@idsck/components/constants";
import { IComponentBaseOnCategories, ISeeder } from "@idsck/components/interfaces";

import WebsiteContentPlaceholder from "./__global/WebsiteContentPlaceholder/export";
import HeroImage from "./HeroImage/export";

/**
 * This index will introduce the App which component is Available as a references.
 * We'll crete component dynamically using TagName.
 *
 * Be wise to reference component! Thanks!
 *
 * More information: open docs at [TODO: create DOCS]!
 */
const RegisteredComponents = {
    HeroImage,
    WebsiteContentPlaceholder,
};

export const generatedComponentBasedOnCategory = (): IComponentBaseOnCategories[] => {
    const categories = Object.keys(ComponentCategory);
    const componentObjKey: string[] = Object.keys(RegisteredComponents);

    return categories.map((category: string): IComponentBaseOnCategories => {

        let components: ISeeder[] = [];

        componentObjKey.map((component) => {

            if (RegisteredComponents[component].categories.includes(category)) {
                components = [...components, RegisteredComponents[component].seeder];
            }
        });

        return { category, components };
    });
};

export default RegisteredComponents;
