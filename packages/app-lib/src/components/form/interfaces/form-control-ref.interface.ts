import { Subject } from 'rxjs';
import { RxFormGroupRef } from '../classes';
import { ControlTypeEnum } from '../enums';
import { IControlSelectOption } from '../components/form-control/control-select/control-select.interface';

export interface IRxFormControlRef {
  key: string;
  type: ControlTypeEnum;

  hasError: boolean;
  isDirty: boolean;
  isTouched: boolean;

  label: string;
  value: any;
  validators: Function[]; // TODO: define validator type

  formGroupRef: RxFormGroupRef;
  unsubscribe: Subject<void>;

  extras?: IRxFormControlRefExtras;

  readonly valid: boolean;
  readonly errors: string[];
  readonly invalid: boolean;
  clear: () => void;
}

export interface IRxFormControlRefExtras {
  isMultiple?: boolean;
  options?: IControlSelectOption<any>[];
}
