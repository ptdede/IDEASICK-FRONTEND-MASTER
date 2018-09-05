import { IComponent } from "@idsck/components/interfaces";

export interface IMediaChooserProps extends IComponent {
  type?: string;
  label?: string;
  stacked?: boolean;
  position?: string;
  pulseSecondary?: string;
  onChangePropTriggered?: () => void;
}
