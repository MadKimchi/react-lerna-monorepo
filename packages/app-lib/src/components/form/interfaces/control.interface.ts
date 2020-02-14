import { RxFormControlRef } from '../classes';

export interface IFormControlProps {
  /**
   * Represents the behaviour of the control and communicates with other form related components.
   **/
  controlRef: RxFormControlRef;
  refresh?: boolean;
}
