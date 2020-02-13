import { RxFormControlRef } from '../classes';

export interface IFormControlProps {
  /**
   * Used to reflect the behaviour of the control and enhances communications between form related components.
   **/
  controlRef: RxFormControlRef;
  refresh?: boolean;
}
