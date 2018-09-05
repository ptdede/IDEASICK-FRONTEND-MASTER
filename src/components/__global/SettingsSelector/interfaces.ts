import { IComponent } from "@idsck/components/interfaces";

export enum ESettingsSelectorPosition {
    "topRight",
    "topLeft",
    "bottomRight",
    "bottomLeft",
    "centerBottom",
}

export interface ISettingsSelector extends IComponent {
    onChangeSettingsTriggered: () => void;
    position: ESettingsSelectorPosition;
}
