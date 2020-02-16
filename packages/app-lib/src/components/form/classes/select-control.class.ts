import { ControlTypeEnum } from '../enums/control-type.enum';
import { Subject } from 'rxjs';
import { RxFormGroupRef } from './form-group.class';
import { IRxFormControlRef, IRxFormControlRefExtras } from '../interfaces';

// TODO: change it to input control ref or base control ref or regular control ref
export class RxSelectControlRef implements IRxFormControlRef {
  public hasError: boolean = false;
  public isDirty: boolean = false;
  public isTouched: boolean = false;

  public label: string = '';
  public value: Set<any> = new Set<any>();
  public validators: Function[] = [];
  public formGroupRef!: RxFormGroupRef; // prettier-ignore

  public unsubscribe: Subject<void> = new Subject<void>();

  public extras: IRxFormControlRefExtras = {
    isMultiple: false,
    options: []
  };

  private _errors: Map<string, string> = new Map();

  constructor(public key: string, public type: ControlTypeEnum) {
    this.setError = this.setError.bind(this);
  }

  public get valid(): boolean {
    return !this.invalid;
  }

  public get errors(): string[] {
    if (this.hasError) {
      return Array.from(this._errors.values());
    }
    return [];
  }

  public get invalid(): boolean {
    if (!this.validators.length) {
      return this.hasError;
    }

    this.hasError = this.validators.reduce(this.setError, true);
    return this.hasError;
  }

  public clear(): void {
    this.hasError = false;
    this.isDirty = false;
    this.isTouched = false;
    this.value.clear();
  }

  private setError(hasError: boolean, validator: Function): boolean {
    const error = validator(this.value);
    if (!!error) {
      this._errors.set(error.key, error.msg);
    }
    return hasError && !!error;
  }
}
