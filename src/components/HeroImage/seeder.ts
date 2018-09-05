import { AVAILABLE_POSITION, gradients, position } from "@idsck/components/constants";
import { IHeroImageSeederConfigs, IHeroImageSeederProps } from "@idsck/components/HeroImage/interfaces";
import { ISeeder } from "@idsck/components/interfaces";

const config: IHeroImageSeederConfigs = {
    overlay: {
        type: "select",
        available: gradients,
        isColor: true,
        isGradient: true,
        selectedIndex: 0,
        selected: { name: "none", from: "transparent", to: "transparent" },
    },
    position: {
        type: "select",
        available: position,
        selectedIndex: 0,
        selected: { name: AVAILABLE_POSITION.center },
    },
};

const props: IHeroImageSeederProps = {
    title: "Insert Title Here",
    text: "",
    image: "",
    isParallax: true,
    gradientFrom: "#000000",
    gradientTo: "#e7d162",
};

const seeder: ISeeder = {
    tagName: "HeroImage",
    thumb: "static/images/components/HeroImage.png",
    props,
    config,
};

export default seeder;
