import { Subject } from 'rxjs';
import { RxFormGroupRef } from '../classes';
import { ControlTypeEnum } from '../enums';

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

  readonly valid: boolean;
  readonly errors: string[];
  readonly invalid: boolean;
  clear: () => void;
}