import StyledSettingsSelector from "@idsck/components/__global/SettingsSelector/StyledSettingsSelector";
import { COMPONENT_MARGINS } from "@idsck/components/constants";
import styled, { css } from "styled-components";

const marginLoad = (margin, test) => {
    switch (margin.selected.name) {
        case COMPONENT_MARGINS.none:
            return css`
                ${[test]}: 0;
            `;
        case COMPONENT_MARGINS.medium:
            return css`
                ${[test]}: 2rem;
            `;
        case COMPONENT_MARGINS.large:
            return css`
                ${[test]}: 4rem;
            `;
        case COMPONENT_MARGINS.xtraLarge:
            return css`
                ${[test]}: 6rem;
            `;
        default:
            break;
    }
};

const StyledComponentUi = styled.div`
    position: relative;

    /* Margin-Padding auto load to components UI */
    ${ (props: any) => props.marginLeft && marginLoad(props.marginLeft, "padding-left") }
    ${ (props: any) => props.marginRight && marginLoad(props.marginRight, "padding-right") }
    ${ (props: any) => props.marginTop && marginLoad(props.marginTop, "padding-top") }
    ${ (props: any) => props.marginBottom && marginLoad(props.marginBottom, "padding-bottom") }

    .component-settings {
        display: flex;
        position: absolute;
        bottom: 10px;
        left: 10px;

        ${StyledSettingsSelector} {
            position: static;
            border-radius: 0;
        }
        .setting-update {
            display: flex;
            justify-content: center;
            align-items: center;
            background: #111;
            color: #fff;
            padding: 1rem;
            cursor: pointer;
        }
    }

`;

export default StyledComponentUi;
