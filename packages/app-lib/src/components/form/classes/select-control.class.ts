import { IRxFormControlRefExtras } from '../interfaces';
import { RxBaseControlRef } from './base-control.class';

// TODO: change it to input control ref or base control ref or regular control ref
export class RxSelectControlRef extends RxBaseControlRef {
  public value: Set<any> = new Set<any>();

  public extras: IRxFormControlRefExtras = {
    isMultiple: false,
    options: []
  };

  public clear(): void {
    super.clear()
    this.value.clear();
  }
}
